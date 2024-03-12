import axios from "axios";
import e from "express";

export const scrapeCSSContent = async (cssUrl) => {
  try {
    // Fetch the CSS file content
    const response = await axios.get(cssUrl);
    const cssContent = response.data;

    // Process the CSS content as needed
    checkFontFamilyOverwrites(cssUrl, cssContent)
  } catch (error) {
    console.error("Error fetching CSS: ", cssUrl);
  }
};

const checkFontFamilyOverwrites = (cssURL, cssContent) => {
  const fontFamilyPattern = /font-family\s*:\s*([^\;]+)\;/g;
  const fontFamilyMatches = cssContent.matchAll(fontFamilyPattern);
  const fontFamilyValues = [
    "Open Sans",
    "微软雅黑",
    "Microsoft yahei",
    "微軟正黑體",
    "メイリオ",
    "Microsoft JhengHei",
    "Meriyo",
    "NanumGothic",
  ];

  if (fontFamilyMatches[0] === undefined) {
    console.log(cssURL, " : no font-family declarations found.");
  } else {
    for (const match of fontFamilyMatches) {
      const declaredValue = match[1].trim().replace(/['"]/g, "");

      for (const fontFamily of fontFamilyValues) {
        if (declaredValue !== fontFamily) {
          console.log("Unapproved font family: ", fontFamily);
        } else {
            console.log(fontFamily)
        }
      }
    }
  }
};
