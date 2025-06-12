import {CONTENT_BODY_REGEX, DEFS_BODY_REGEX, DEFS_REGEX, STYLE_BODY_REGEX, STYLE_REGEX} from "./CombinerRegex";
import {removeRedundantInfo} from "../corrector/Corrector";

const extractContent = (svg) => {
    const match = svg.match(CONTENT_BODY_REGEX)
    return match
        ? match[1].replace(DEFS_REGEX, "").trim()
        : "";
}

const extractStyle = (svg) => {
    const match = svg.match(STYLE_BODY_REGEX)
    return match
        ? match[1].trim()
        : "";
}

const extractDefs = (svg) => {
    const match = svg.match(DEFS_BODY_REGEX)
    return match
        ? match[1].replace(STYLE_REGEX, "").trim()
        : "";
}

const combineTogether = ({
                             traits,
                             width,
                             height,
                             isPureTrait
                         }) => {
    let combinedContent = "";
    let combinedStyle = [];
    let combinedDefs = [];

    for (let i = 0; i < traits.length; i++) {
        const trait = traits[i];
        const traitSrc = removeRedundantInfo(trait.src)
            .trim()

        const [offX, offY] = (trait.isBackground)
            ? [0, 0]
            : [(width - 380) / 2, (height - 600) / 2]

        if (traitSrc.startsWith("<svg")) {
            const svg = traitSrc.replace(/cls-/g, `item-${i}-cls-`)

            const style = extractStyle(svg)
            combinedStyle.push(style)

            const defs = extractDefs(svg)
            combinedDefs.push(defs)

            const content = extractContent(svg)
            combinedContent += `
                <g transform="translate(${offX}, ${offY})">
                    ${content}
                </g>
            `;
        } else {
            const [imageW, imageH] = (traitSrc.isBackground)
                ? [553, 736]
                : [380, 600];

            combinedContent += `
                <image
                    x="${offX}"
                    y="${offY}"
                    width="${imageW}"
                    height="${imageH}"
                    href="${traitSrc}"
                />
            `;
        }
    }

    const defs = `
        <defs>
            ${combinedDefs.join("\n")}
            <style>
                ${combinedStyle.join("\n")}
            </style>
            ${
                (isPureTrait)
                    ? ""
                    : `
                        <clipPath id="clipRect">
                            <rect width="552" height="736" rx="27.6" ry="36.8" />
                        </clipPath>
                        `
            }
        </defs>
    `;

    const content = (isPureTrait)
        ? combinedContent
        : `
            <g clip-path="url(#clipRect)">
               ${combinedContent}
            </g>
        `;

    return `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 ${width} ${height}">
    `;
}
