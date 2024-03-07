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

let workbook;
fs.access("PageResults.xlxs", fs.constants.F_OK, (err) => {
  if (!err) {
    workbook = XLSX.read("PageResults.xlxs");
  } else {
    workbook = XLSX.utils.book_new();
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

const createResultsWorkbook = (results, url) => {
  const worksheet = XLSX.utils.json_to_sheet(results);

  XLSX.utils.book_append_sheet(workbook, worksheet, `Page ${urls.indexOf(url) + 1}`);
  XLSX.utils.sheet_add_aoa(worksheet, [excelHeader], { origin: "A1" });

  let wscols = [];
  excelHeader.map((arr) => {
    wscols.push({ wch: arr.length + 5 });
  });
  worksheet["!cols"] = wscols;

  XLSX.writeFile(workbook, "PageResults.xlsx", { compression: true });
};

const runProcess = async () => {
  for (const url of urls) {
    const response = await axios.get(url);
    const website = cheerio.load(response.data);

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
        comments = result == "FAIL" ? comments : ""
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
        console.log({checkpoint, result, value})
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
    results.push({ methodNumber: undefined,
      section: "PAGE URL",
      checkpoint: url,
      result: undefined,
      priority: undefined,
      done: undefined,
      comments: undefined,
      fluidComments: undefined, });

    

    createResultsWorkbook(results, url);
  }
};
runProcess();
