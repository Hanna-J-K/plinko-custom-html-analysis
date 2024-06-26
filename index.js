import axios from "axios";
import cheerio from "cheerio";
import * as XLSX from "xlsx";
import { urls } from "./urls.js";
import { checkList } from "./checklist.js";
import { scrapeCSSContent } from "./checkCSSFiles.js";

// imports below are a fix for XLSX to be compatible with all versions of Node from 14 up
/* load 'fs' for readFile and writeFile support */
import * as fs from "fs";
XLSX.set_fs(fs);

/* load 'stream' for stream support */
import { Readable } from "stream";
XLSX.stream.set_readable(Readable);

let unstyledWorkbook;

// create a workbook or open existing
fs.access("PageResults.xlxs", fs.constants.F_OK, (err) => {
  if (!err) {
    unstyledWorkbook = XLSX.read("PageResults.xlxs");
  } else {
    unstyledWorkbook = XLSX.utils.book_new();
  }
});

const excelHeader = [
  "NO",
  "SECTION",
  "CHECKPOINT",
  "STATUS",
  "FIXED?",
  "REVIEW COMMENTS",
  "GEO COMMENTS",
];

const cssFiles = [];

const createUnstyledResultsWorkbook = (results, url) => {
  const unstyledWorksheet = XLSX.utils.json_to_sheet(results);

  XLSX.utils.book_append_sheet(
    unstyledWorkbook,
    unstyledWorksheet,
    `Page ${urls.indexOf(url) + 1}`
  );

  XLSX.utils.sheet_add_aoa(unstyledWorksheet, [excelHeader], { origin: "A1" });

  let wscols = [];
  excelHeader.map((arr) => {
    wscols.push({ wch: arr.length + 5 });
  });
  unstyledWorksheet["!cols"] = wscols;

  XLSX.writeFile(unstyledWorkbook, "PageResults.xlsx", { compression: true });
};

const runProcess = async () => {
  for (const url of urls) {
    const response = await axios.get(url);
    const website = cheerio.load(response.data);

    let cssURL;
    let results = [];
    let methodNumber = 0;

    website('link[rel="stylesheet"]').each((index, element) => {
      cssURL = website(element).attr("href");
      if (
        !cssURL.includes("google") &&
        !cssURL.includes(".min") &&
        !cssURL.includes("bootstrap")
      ) {
        cssFiles.push(cssURL);
      }
    });

    console.log("CSS files: ", cssFiles);

    console.log(
      "##########################################################################################"
    );
    console.log(
      "##########################################################################################"
    );
    console.log("URL: ", url);
    results.push({});

    checkList.forEach(
      ({
        section,
        method,
        checkpoint,
        done,
        comments,
        fluidComments,
      }) => {
        const { result, value } = method(website);
        methodNumber += 1;
        comments = result == "FAIL" ? comments : "";
        results.push({
          methodNumber,
          section,
          checkpoint,
          result,
          done,
          comments,
          fluidComments,
        });
        if (value !== undefined) console.log({ checkpoint, result, value });
      }
    );

    // append page URL to the end of worksheet
    results.push({});
    results.push({
      section: "PAGE URL",
      checkpoint: url,
    });

    createUnstyledResultsWorkbook(results, url);

    // Scrape the content of each CSS file
    cssFiles.forEach((file) => {
      scrapeCSSContent(file);
    });
  }
};

runProcess();
