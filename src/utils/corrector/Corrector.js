import {COMMENT_REGEX, DOCTYPE_REGEX, XML_REGEX} from "./CorrectorRegex";

export const removeRedundantInfo = (svgSrc) => {
    return svgSrc
        .replace(XML_REGEX, "")
        .replace(DOCTYPE_REGEX, "")
        .replace(COMMENT_REGEX, "")
}

