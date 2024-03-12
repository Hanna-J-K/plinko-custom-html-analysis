const globalSelector = ".html-fragment-content ";

const checkForGoogleFonts = ($) => {
  for (const element of $(globalSelector + "link")) {
    if ($(element).attr("href").includes("fonts.googleapis.com"))
      return { result: "FAIL", value: $(element).attr("href") };
  }
  return { result: "PASS" };
};

// maybe needs to be updated to include specific Bootstrap version?
const checkForBootstrapImports = ($) => {
  for (const element of $(globalSelector + "link")) {
    if ($(element).attr("href").includes("bootstrap"))
      return { result: "FAIL", value: $(element).attr("href") };
  }
  return { result: "PASS" };
};

const checkForBootstrapClasses = ($) => {
  if ($(globalSelector + '*[class*="col-md"]').length > 0) {
    return {
      result: "FAIL",
      value: $(globalSelector + '*[class*="col-md"]').attr("class"),
    };
  }
  return { result: "PASS" };
};

const checkForAEMGridClasses = ($) => {
  if ($(globalSelector + '*[class*="aem-Grid"]').length > 0) {
    return {
      result: "PASS",
      value: $(globalSelector + '*[class*="aem-Grid"]').attr("class"),
    };
  }
  return { result: "FAIL" };
};

const hasImgWithoutLazyLoading = ($) => {
  if ($(globalSelector + 'img[class*="lazy-image"]').length === 0) {
    return {
      result: "PASS",
      value: $(globalSelector + 'img[class*="lazy-image"]').length,
    };
  }
  return { result: "FAIL" };
};

// this needs to be expanded with checkpoints for decorative images
const hasImgWithoutAlt = ($) => {
  if ($(globalSelector + "img:not([alt])").length > 0) {
    return {
      result: "FAIL",
      value: $(globalSelector + "img:not([alt])").length,
    };
  }
  return { result: "PASS" };
};

const imgHasSizeParameters = ($) => {
  let allImagesOK = "FAIL";
  for (const element of $(globalSelector + "img")) {
    if (
      $(element).attr("src").includes("wid=") ||
      $(element).attr("src").includes("hei=")
    ) {
      allImagesOK = "PASS";
    } else {
      allImagesOK = "FAIL";
    }
  }
  return { result: allImagesOK };
};

// needs to be updated for where page has no video at all
const hasIncorrectVideoPlayerImport = ($) => {
  let result = "FAIL";
  if (
    $(globalSelector + "video").length <= 0 ||
    $(globalSelector + "video") === undefined
  ) {
    return { result: "PASS" };
  }
  if (
    $(globalSelector + "video").length > 0 ||
    $(globalSelector + "*[video-id]").length > 0 ||
    $(globalSelector + "*[data-video-id]").length > 0
  ) {
    result = "FAIL";
    for (const element of $(globalSelector + "link")) {
      if (
        $(element)
          .attr("href")
          .includes(
            "content/dam/assets-shared/custom/third-party-scripts/js/video-8.3.0.js"
          )
      ) {
        result = "PASS";
      }
    }
  }
  return { result: result };
};

const hasIframeTag = ($) => {
  if ($(globalSelector + "iframe").length > 0) {
    return { result: "FAIL", value: $(globalSelector + "iframe").attr("src") };
  }
  return { result: "PASS" };
};

const hasStyleAttribute = ($) => {
  if ($(globalSelector + "*[style]").length > 0) {
    return {
      result: "FAIL",
      value: $(globalSelector + "*[style]").attr("style"),
    };
  }
  return { result: "PASS" };
};

const hasUniqueParentElementId = ($) => {
  let result = "FAIL";
  if ($("div.html-fragment-content > div").attr("id")) {
    result = "PASS";
    if ($("#" + $(globalSelector).attr("id")).length >= 1) {
      result = "FAIL";
    }
  }
  return { result: result, value: $(globalSelector).attr("id") };
};

const hasBodyOrHeadInFragment = ($) => {
  if (
    $(globalSelector + "body").length >= 1 ||
    $(globalSelector + "head").length >= 1
  ) {
    return { result: "FAIL" };
  }
  return { result: "PASS" };
};

const hasH4TagsAndBelow = ($) => {
  if (
    $(globalSelector + "h4").length <= 0 &&
    $(globalSelector + "h5").length <= 0 &&
    $(globalSelector + "h6").length <= 0
  ) {
    return { result: "PASS" };
  }
  if (
    $(globalSelector + "h4").length > 0 ||
    $(globalSelector + "h5").length > 0 ||
    $(globalSelector + "h6").length > 0
  ) {
    return { result: "PASS" };
  }
  return { result: "FAIL" };
};

const hasTagsAboveH4 = ($) => {
  if (
    $(globalSelector + "h3").length > 0 ||
    $(globalSelector + "h2").length > 0 ||
    $(globalSelector + "h1").length > 0
  ) {
    return { result: "FAIL" };
  }
  return { result: "PASS" };
};

// a bug in this one
const tablesHasCaption = ($) => {
  if ($(globalSelector + "table").length > 0) {
    return { result: "PASS" };
  }
  if (
    $(globalSelector + "table").length > 0 &&
    $(globalSelector + "table").children("caption").length > 0
  ) {
    return { result: "PASS" };
  }
  return { result: "FAIL", value: $(globalSelector + "table") };
};

const searchForSocialSharingElements = ($) => {
  let result = "FAIL";
  if (
    $(globalSelector + '*[class*="facebook"]').length > 0 ||
    $(globalSelector + '*[class*="instagram"]').length > 0 ||
    $(globalSelector + '*[class*="linkedin"]').length > 0 ||
    $(globalSelector + '*[class*="twitter"]').length > 0
  ) {
    result = "PASS";
  } else if (
    $(globalSelector + '*[class*="facebook"]').length <= 0 &&
    $(globalSelector + '*[class*="instagram"]').length <= 0 &&
    $(globalSelector + '*[class*="linkedin"]').length <= 0 &&
    $(globalSelector + '*[class*="twitter"]').length <= 0
  ) {
    result = "PASS";
  }
  return { result: result };
};

const checkCustomCSS = ($) => {
  let result = "PASS";
  if ($(globalSelector + "style").length > 0) {
    console.log($(globalSelector).prop("style"));
    result = "FAIL";
  }
  return { result: result, value: $(globalSelector + "style").text() };
};

const searchForFontAwesomeIcons = ($) => {
  let result = "PASS";
  for (const element of $(globalSelector + "link")) {
    if ($(element).attr("href").includes("font-awesome")) {
      result = "FAIL";
    }
  }
  return { result: result };
};

const testMethodAlwaysFalse = ($) => {
  return { result: "FAIL" };
};

export {
  checkForGoogleFonts,
  checkForBootstrapImports,
  testMethodAlwaysFalse,
  checkForBootstrapClasses,
  checkForAEMGridClasses,
  hasImgWithoutLazyLoading,
  hasImgWithoutAlt,
  imgHasSizeParameters,
  hasIframeTag,
  hasStyleAttribute,
  hasIncorrectVideoPlayerImport,
  hasBodyOrHeadInFragment,
  hasH4TagsAndBelow,
  hasTagsAboveH4,
  tablesHasCaption,
  searchForSocialSharingElements,
  hasUniqueParentElementId,
  checkCustomCSS,
  searchForFontAwesomeIcons
};
