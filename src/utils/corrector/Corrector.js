import {
    COMMENT_REGEX,
    DOCTYPE_REGEX, EMPTY_LINE_REGEX,
    INK_GROUP_REGEX,
    INK_LABEL_REGEX,
    SINGLE_DEFS_REGEX,
    SODI_1_REGEX,
    SODI_2_REGEX,
    STYLE_REGEX,
    SVG_REGEX,
    XML_REGEX
} from "./CorrectorRegex";
import {DEFS_REGEX} from "../combiner/CombinerRegex";
import {addCss} from "./CssHelper";

export const removeRedundantInfo = (svgSrc) => {
    return svgSrc
        .replace(XML_REGEX, "")
        .replace(DOCTYPE_REGEX, "")
        .replace(COMMENT_REGEX, "")
}

const correctInkscape = (svgSrc) => {
    return svgSrc
        .replace(SODI_1_REGEX, "")
        .replace(SODI_2_REGEX, "")
        .replace(INK_LABEL_REGEX, "")
        .replace(INK_GROUP_REGEX, "")
}

const correctDesigner = (svgSrc) => {
    return svgSrc
        .replace("<style type=\"text/css\">", "<style>");
}

const correctBlue = (svgSrc) => {
    return svgSrc
        .replace(/#0000[Ff][Ff]/g, "blue")
        .replace(/00[Ff]]/g, "blue")
}

const removeDefs = (svgSrc) => {
    return svgSrc
        .replace(SINGLE_DEFS_REGEX, "")
}

const correctSvg = (svgSrc) => {
    return svgSrc
        .replace(SVG_REGEX, "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 600\">")
}

const removeEmptyLines = (svgSrc) => {
    return svgSrc.replace(EMPTY_LINE_REGEX, "");
}

const addClasses = (svgSrc) => {
    if (!STYLE_REGEX.test(svgSrc)) {
        let localSvg = svgSrc.replace(SINGLE_DEFS_REGEX, "")
        localSvg = addCss(localSvg)
        return localSvg
    }
    return svgSrc
}

export const correct = (svgSrc) => {
    let localSvg = svgSrc;

    localSvg = removeRedundantInfo(localSvg)
    localSvg = correctSvg(localSvg)
    localSvg = correctInkscape(localSvg)
    localSvg = correctDesigner(localSvg)
    localSvg = addClasses(localSvg)
    localSvg = removeDefs(localSvg)
    localSvg = correctBlue(localSvg)
    localSvg = removeEmptyLines(localSvg)

    return localSvg
}
