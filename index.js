import axios from "axios";
import cheerio from "cheerio";
//import { render } from 'pug';
//import chalk from 'chalk';
import * as XLSX from "xlsx";
import { urls } from "./urls.js";

/* load 'fs' for readFile and writeFile support */
import * as fs from "fs";
XLSX.set_fs(fs);

/* load 'stream' for stream support */
import { Readable } from "stream";
XLSX.stream.set_readable(Readable);

import { checkList } from "./checklist.js";

let unstyledWorkbook;
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
  "PRIORITY",
  "DONE",
  "COMMENTS",
  "FLUID COMMENTS",
];

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
  styleWorkbook();
  setTimeout(() => 1000);
  XLSX.writeFile(unstyledWorkbook, "PageResults.xlsx", { compression: true });
};

const styleWorkbook = () => {
  var sheet_name_list = unstyledWorkbook.SheetNames;
  sheet_name_list.forEach(function (y) {
    /* iterate through sheets */ var worksheet = unstyledWorkbook.Sheets[y];
    for (let z in worksheet) {
      worksheet[z].v == "PASS"
        ? (worksheet[z].s = {
            fill: {
              fgColor: { rgb: "FF0000" },
            },
          })
        : what = "what"
    }
  });
};

const runProcess = async () => {
  for (const url of urls) {
    const response = await axios.get(url);
    const website = cheerio.load(response.data);
    console.log(
      "##########################################################################################"
    );
    console.log(
      "##########################################################################################"
    );
    console.log("URL: ", url);
    let results = [];
    let methodNumber = 0;
    checkList.forEach(
      ({
        section,
        method,
        checkpoint,
        priority,
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
          priority,
          done,
          comments,
          fluidComments,
        });
        console.log({ checkpoint, result, value });
      }
    );
    results.push({
      methodNumber: undefined,
      section: undefined,
      checkpoint: undefined,
      result: undefined,
      priority: undefined,
      done: undefined,
      comments: undefined,
      fluidComments: undefined,
    });
    results.push({
      methodNumber: undefined,
      section: "PAGE URL",
      checkpoint: url,
      result: undefined,
      priority: undefined,
      done: undefined,
      comments: undefined,
      fluidComments: undefined,
    });

    createUnstyledResultsWorkbook(results, url);
  }
};

runProcess();
