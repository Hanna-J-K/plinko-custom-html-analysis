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

export const checkList = [
  {
    section: "Coding",
    checkpoint: "Google Fonts imports (3rd party)",
    method: checkForGoogleFonts,
    priority: undefined,
    done: undefined,
    comments: "Do not use 3rd party imports for fonts, do not define custom font family",
    fluidComments: "",
  },
  {
    section: "Coding",
    checkpoint: "Bootstrap CSS import exists",
    method: checkForBootstrapImports,
    priority: undefined,
    done: undefined,
    comments: "Use Bootstrap framework for CSS",
    fluidComments: "",
  },
  {
    section: "Coding",
    checkpoint: "Bootstrap classes",
    method: checkForBootstrapClasses,
    priority: undefined,
    done: undefined,
    comments: "Utilize Bootstrap CSS classes from Bootstrap v3.1.1",
    fluidComments: "",
  },
  {
    section: "Coding",
    checkpoint: "AEM Grid",
    method: checkForAEMGridClasses,
    priority: undefined,
    done: undefined,
    comments: "Use AEM Grid classes",
    fluidComments: "",
  },
  {
    section: "Images",
    checkpoint: "Image lazy-loading",
    method: hasImgWithoutLazyLoading,
    priority: undefined,
    done: undefined,
    comments: "Lazyload images below fold",
    fluidComments: "",
  },
  {
    section: "Accessibility",
    checkpoint: "Img alt attribute",
    method: hasImgWithoutAlt,
    priority: undefined,
    done: undefined,
    comments: "All images should have alt attribute, decorative images have alt=\"\" or role=presentation",
    fluidComments: "",
  },
  {
    section: "Images",
    checkpoint: "Image resolution",
    method: imgHasSizeParameters,
    priority: undefined,
    done: undefined,
    comments: "All images have defined width and height",
    fluidComments: "",
  },
  {
    section: "Coding",
    checkpoint: "Video player import",
    method: hasIncorrectVideoPlayerImport,
    priority: undefined,
    done: undefined,
    comments: "Video player has to be imported correctly for AEM to generate a correct link",
    fluidComments: "",
  },
  {
    section: "Coding",
    checkpoint: "Inline style",
    method: hasStyleAttribute,
    priority: undefined,
    done: undefined,
    comments: "Do not use inline styling",
    fluidComments: "",
  },
  {
    section: "Coding",
    checkpoint: "Unique parent element ID",
    method: hasUniqueParentElementId,
    priority: undefined,
    done: undefined,
    comments: "Parent element should always have a unique ID",
    fluidComments: "",
  },
  {
    section: "Coding",
    checkpoint: "<body> or <head> exist in fragment",
    method: hasBodyOrHeadInFragment,
    priority: undefined,
    done: undefined,
    comments: "HTML fragment should NOT contain <body> or <head> elements",
    fluidComments: "",
  },
  {
    section: "Coding",
    checkpoint: "h4 tags and below (h5,h6)",
    method: hasH4TagsAndBelow,
    priority: undefined,
    done: undefined,
    comments: "Component should only have <h4> tags and smaller",
    fluidComments: "",
  },
  {
    section: "Coding",
    checkpoint: "tags above h4 (h1,h2,h3)",
    method: hasTagsAboveH4,
    priority: undefined,
    done: undefined,
    comments: "Component should not use tags larger than h4",
    fluidComments: "",
  },
  {
    section: "Coding",
    checkpoint: "Tables <caption>",
    method: tablesHasCaption,
    priority: undefined,
    done: undefined,
    comments: "All tables should have a caption",
    fluidComments: "",
  },
  {
    section: "Coding",
    checkpoint: "Social sharing elements",
    method: searchForSocialSharingElements,
    priority: undefined,
    done: undefined,
    comments: "Social sharing elements are embedded incorrectly",
    fluidComments: "",
  },
  {
    section: "Coding",
    checkpoint: "iframe",
    method: hasIframeTag,
    priority: undefined,
    done: undefined,
    comments: "Do not use <iframe> elements",
    fluidComments: "",
  },
];
