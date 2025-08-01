import {toSvgFile} from "./FileHelper";
import JSZip from "jszip";
import {emptyTraitSvgSrc, names, emptyTraitBehindSvgSrc} from "../Constants";
import {combineGrid} from "../combiner/Combiner";

export const downloadSvg = (svgSrc, svgName) => {
    const svg = toSvgFile(svgSrc)
    const a = document.createElement('a')
    a.href = svg;
    a.download = `modified-${svgName}`
    a.click()
}

const addFromUrl = async (zip, url, filename) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}`);
    const blob = await response.blob();
    zip.file(filename, blob);
}

export const downloadZip = async (combinedTraits, showcaseSrc, hexSrc) => {
    const zip = new JSZip();

    for (let i = 0; i < combinedTraits.length; i++) {
        if (combinedTraits[i].src !== emptyTraitSvgSrc
        && combinedTraits[i].src !== emptyTraitBehindSvgSrc) {
            await addFromUrl(zip, toSvgFile(combinedTraits[i].src), `${names[i]}.svg`)
        }
    }

    const firstRowSvg = combineGrid(combinedTraits.slice(0, 5), 552, 736);
    const secondRowSvg = combineGrid(combinedTraits.slice(5), 552, 736);
    const fullSvg = combineGrid(combinedTraits, 552, 736)

    await addFromUrl(zip, toSvgFile(hexSrc), "Hex.svg")
    await addFromUrl(zip, toSvgFile(showcaseSrc), "Showcase.svg")
    await addFromUrl(zip, toSvgFile(firstRowSvg), "First row.svg")
    await addFromUrl(zip, toSvgFile(secondRowSvg), "Second row.svg")
    await addFromUrl(zip, toSvgFile(fullSvg), "Full.svg")

    const content = await zip.generateAsync({type: "blob"});

    const url = URL.createObjectURL(content);
    const a = document.createElement("a");
    a.href = url;
    a.download = "archive.zip";
    a.click();
    URL.revokeObjectURL(url);
};