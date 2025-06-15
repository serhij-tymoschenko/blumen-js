import {RGB_REGEX, STYLE_PARAM_REGEX} from "./CorrectorRegex";
import {rgbToHex} from "../ColorHelper";

export const addCss = (svgSrc) => {
    const classes = {};
    let clsIndex = 0;
    let localSvg = svgSrc;

    [...localSvg.matchAll(STYLE_PARAM_REGEX)].forEach(match => {
        let style = match[1].replace(RGB_REGEX, (match, r, g, b) => {
            return rgbToHex(parseInt(r), parseInt(g), parseInt(b));
        });

        classes[clsIndex++] = style;
        console.log(classes[clsIndex - 1])
        const clsId = Object.keys(classes).find(key => classes[key] === style);
        localSvg = localSvg.replace(`style="${match[1]}"`, `class="cls-${clsId}"`);
    })

    let svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 600\">"
    let index = localSvg.indexOf(svg) + svg.length;

    const clss = Object.entries(classes)
        .map(([k, v]) =>
            `.cls-${k} { ${v.trim()}${v.endsWith(";") ? '' : ';'} }`
        )
        .join("\n");

    const styledSvg =
        localSvg.slice(0, index)
        + `
            <defs>
                <style>
                    ${clss}
                </style>
            </defs>
        `
        + localSvg.slice(index);

    return styledSvg
}