import {CONTENT_BODY_REGEX, DEFS_BODY_REGEX, DEFS_REGEX, STYLE_BODY_REGEX, STYLE_REGEX} from "./CombinerRegex";
import {removeRedundantInfo} from "../corrector/Corrector";
import Fill from "../../data/models/Fill";

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

export const combineTogether = ({
                                    traits,
                                    width,
                                    height,
                                    isPureTrait = false,
                                    fillPos = Fill.NONE
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
                <g transform="translate(${offX}, ${offY})" fill='${
                (fillPos === Fill.NONE)
                    ? 'none'
                    : (fillPos === Fill.ALL)
                        ? 'black'
                        : (fillPos !== i)
                            ? 'black'
                            : 'none'
            }'>
                    ${content}
                </g>
            `;
        } else {
            const [imageW, imageH] = (trait.isBackground)
                ? [552, 736]
                : [380, 600];

            combinedContent += `
                <image
                    x="${offX}"
                    y="${offY}"
                    width="${imageW}px"
                    height="${imageH}px"
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
        <svg xmlns="http://www.w3.org/2000/svg" ${(isPureTrait) ? "" : `fill="none"`} viewBox="0 0 ${width} ${height}">
            ${defs}
            ${content}
        </svg>    
    `
        .trim();
}

export const combineGrid = (traits, requiredWidth, requiredHeight) => {
    let combinedContent = "";
    let combinedStyles = [];
    let combinedDefs = [];

    const rowsCount = Math.floor(traits.length / 5);

    let localItems = traits.length > 5
        ? [
            traits
                .slice(0, 5)
                .map(trait => trait.src),
            traits
                .slice(5)
                .map(trait => trait.src)
        ]
        : [
            traits
                .slice(0, 5)
                .map(trait => trait.src)
        ]

    for (let i = 0; i < localItems.length; i++) {
        const offsetY = i * requiredHeight;
        for (let j = 0; j < localItems[i].length; j++) {
            const item = localItems[i][j];

            const svg = item.replace(/cls-/g, `item-${i}${j}-cls-`);

            const styles = extractStyle(svg);
            if (styles) combinedStyles.push(styles);

            const defs = extractDefs(svg);
            if (defs) combinedDefs.push(defs);

            const offsetX = (j) * requiredWidth

            const content = extractContent(svg);
            combinedContent += `
            <g transform="translate(${offsetX}, ${offsetY})">
                ${content}
            </g>
        `;
        }
    }

    const defs = `
        <defs>
            ${combinedDefs.join("\n")}
            <style>
                ${combinedStyles.join("\n")}
            </style>
        </defs>
    `;

    return `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="${requiredWidth * 5}" height="${requiredHeight * rowsCount}" viewBox="0 0 ${requiredWidth * 5} ${requiredHeight * rowsCount}">
            ${defs}
            ${combinedContent}
        </svg>
    `;
}

