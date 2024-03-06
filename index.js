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

import {
  checkForGoogleFonts,
  checkForBootstrapImports,
  testMethodAlwaysFalse,
  checkForBootstrapClasses,
  checkForAEMGridClasses,
  hasImgWithoutLazyLoading,
  hasImgWithoutAlt,
  hasIncorrectVideoPlayerImport,
  hasIframeTag,
  hasStyleAttribute,
  hasUniqueParentElementId,
  hasBodyOrHeadInFragment,
  hasH4TagsAndBelow,
  hasTagsAboveH4,
  tablesHasCaption,
  searchForSocialSharingElements,
  imgHasSizeParameters,
} from "./methods.js";

const checkList = [
  { method: checkForGoogleFonts, description: "Has Google Fonts imports" },
  {
    method: checkForBootstrapImports,
    description: "Has Bootstrap css imports",
  },
  { method: checkForBootstrapClasses, description: "Has Bootstrap classes" },
  { method: checkForAEMGridClasses, description: "Has AEM Grid classes" },
  {
    method: hasImgWithoutLazyLoading,
    description: "Has img without lazy-loading class",
  },
  { method: hasImgWithoutAlt, description: "Has img without alt attribute" },
  {
    method: imgHasSizeParameters,
    description: "All Img src have size parameters",
  },
  {
    method: hasIncorrectVideoPlayerImport,
    description: "Has incorrect video player import",
  },
  { method: hasStyleAttribute, description: "Has style attribute" },
  {
    method: hasUniqueParentElementId,
    description: "Has unique parent element id",
  },
  {
    method: hasBodyOrHeadInFragment,
    description: "Has <body> or <head> in fragment",
  },
  { method: hasH4TagsAndBelow, description: "Has h4 tags and below (h5,h6)" },
  { method: hasTagsAboveH4, description: "Has tags above h4 (h1,h2,h3)" },
  { method: tablesHasCaption, description: "Tables has caption" },
  {
    method: searchForSocialSharingElements,
    description: "Has social sharing elements",
  },
  { method: hasIframeTag, description: "Has iframe" },
];

let workbook;
fs.access("PageResults.xlxs", fs.constants.F_OK, (err) => {
  if (!err) {
    workbook = XLSX.read("PageResults.xlxs");
  } else {
    workbook = XLSX.utils.book_new();
  }
});

const excelHeader = ["RULE DESCRIPTION", "CHECK RESULT", "VALUE (if passed)"];

const createResultsWorkbook = (results, url) => {
  const worksheet = XLSX.utils.json_to_sheet(results);

  XLSX.utils.book_append_sheet(workbook, worksheet, "Page" + urls.indexOf(url));
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

    let results = [{description: undefined, result: undefined, value: undefined}];
    checkList.forEach(({ method, description }) => {
      const { result, value } = method(website);
      results.push({ description, result, value });
    });
    results.push({description: undefined, result: undefined, value: undefined})
    results.push({description: "PAGE URL", result: undefined, value: url})

    console.table(results);

    createResultsWorkbook(results, url);
  }
};
runProcess();
