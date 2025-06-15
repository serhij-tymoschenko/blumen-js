import {toSvgFile} from "../FileHelper";
import JSZip from "jszip";

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

export const downloadZip = async (combinedTraits, showcase, hex) => {
    const zip = new JSZip();

    for (let i = 0; i < combinedTraits.length; i++) {
        await addFromUrl(zip, toSvgFile(combinedTraits[i].src), `${names[i]}.svg`)
    }

    // const firstRowSvg = combineGrid(snooItems.slice(0, 5), 552, 736);
    // const secondRowSvg = combineGrid(snooItems.slice(5), 552, 736);
    // const fullSvg = combineGrid(snooItems, 552, 736)

    // await addFromUrl(zip, toSvgFile(hex), "Hex.svg")
    // await addFromUrl(zip, toSvgFile(showcase), "Showcase.svg")
    // await addFromUrl(zip, toSvgFile(firstRowSvg), "First row.svg")
    // await addFromUrl(zip, toSvgFile(secondRowSvg), "Second row.svg")
    // await addFromUrl(zip, toSvgFile(fullSvg), "Full.svg")

    const content = await zip.generateAsync({type: "blob"});

    const url = URL.createObjectURL(content);
    const a = document.createElement("a");
    a.href = url;
    a.download = "archive.zip";
    a.click();
    URL.revokeObjectURL(url);
};