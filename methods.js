const globalSelector = '.html-fragment-content ';

const checkForGoogleFonts = ($) => {
    for(const element of $(globalSelector + 'link')) {
        if ($(element).attr('href').includes('fonts.googleapis.com'))
            return { result : true, value : $(element).attr('href') };
    }
    return { result : false };
}

const checkForBootstrapImports = ($) => {
    for(const element of $(globalSelector + 'link')) {
        if ($(element).attr('href').includes('bootstrap'))
            return { result : true, value : $(element).attr('href') };
    }
    return { result : false };
}

const checkForBootstrapClasses = ($) => {
    if ($(globalSelector + '*[class*="col-md"]').length > 0) {
        return { result : true, value : $(globalSelector + '*[class*="col-md"]').attr('class')};
    }
    return { result : false };
}

const checkForAEMGridClasses = ($) => {
    if ($(globalSelector + '*[class*="aem-Grid"]').length > 0) {
        return { result : true, value : $(globalSelector + '*[class*="aem-Grid"]').attr('class')};
    }
    return { result : false };
}

const hasImgWithoutLazyLoading = ($) => {
    if ($(globalSelector + 'img[class*="lazy-image"]').length === 0) {
        return { result : true, value : $(globalSelector + 'img[class*="lazy-image"]').length};
    }
    return { result : false };
}

const hasImgWithoutAlt = ($) => {
    if ($(globalSelector + 'img:not([alt])').length > 0) {
        return { result : true, value : $(globalSelector + 'img:not([alt])').length};
    }
    return { result : false };
}

const imgHasSizeParameters = ($) => {
    let allImagesOK = false;
    for(const element of $(globalSelector + 'img')) {
        if ($(element).attr('src').includes('wid=') || $(element).attr('src').includes('hei=')) {
            allImagesOK = true;
        } else {
            allImagesOK = false;
        }
    }
    return { result : allImagesOK };
}

const hasIncorrectVideoPlayerImport = ($) => {
    let result = false;
    if ($(globalSelector + 'video').length > 0 || $(globalSelector + '*[video-id]').length > 0 || $(globalSelector + '*[data-video-id]').length > 0){
        result = true;
        for(const element of $(globalSelector + 'link')) {
            if ($(element).attr('href').includes('content/dam/assets-shared/custom/third-party-scripts/js/video-8.3.0.js')) {
                result = false;
            }
        }
    }
    return { result : result };
}

const hasIframeTag = ($) => {
    if ($(globalSelector + 'iframe').length > 0) {
        return { result : true, value : $(globalSelector + 'iframe').attr('src')};
    }
    return { result : false };
}

const hasStyleAttribute = ($) => {
    if ($(globalSelector + '*[style]').length > 0) {
        return { result : true, value : $(globalSelector + '*[style]').attr('style')};
    }
    return { result : false };
}

const hasUniqueParentElementId = ($) => {
    let result = false;
    if ($(globalSelector).attr('id')) {
        result = true;
        if ($('#' + $(globalSelector).attr('id')).length >= 1) {
            result = false;
        }
    }
    return { result : result, value : $(globalSelector).attr('id')};
}

const hasBodyOrHeadInFragment = ($) => {
    if (($(globalSelector + 'body').length >= 1) || ($(globalSelector + 'head').length >= 1)) {
        return { result : true };
    }
    return { result : false };
}

const hasH4TagsAndBelow = ($) => {
    if ($(globalSelector + 'h4').length > 0 || $(globalSelector + 'h5').length > 0 || $(globalSelector + 'h6').length > 0){
        return { result : true };
    }
    return { result : false };
}

const hasTagsAboveH4 = ($) => {
    if ($(globalSelector + 'h3').length > 0 || $(globalSelector + 'h2').length > 0 || $(globalSelector + 'h1').length > 0){
        return { result : true };
    }
    return { result : false };
}

const tablesHasCaption = ($) => {
    if ($(globalSelector + 'table').length > 0 && $(globalSelector + 'table').children('caption').length > 0) {
        return { result : true };
    }
    return { result : false };
}

const searchForSocialSharingElements = ($) => {
    let result = false;
    if (($(globalSelector + '*[class*="facebook"]').length > 0) || ($(globalSelector + '*[class*="instagram"]').length > 0) || ($(globalSelector + '*[class*="linkedin"]').length > 0) || ($(globalSelector + '*[class*="twitter"]').length > 0)) {
        result = true;
    }
    return { result : result };
}

const testMethodAlwaysFalse = ($) => {
    return { result : false };
}

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
    hasUniqueParentElementId
}