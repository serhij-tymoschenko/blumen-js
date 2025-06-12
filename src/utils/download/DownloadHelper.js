import {toSvgFile} from "../FileHelper";

export const downloadSvg = (svgSrc, svgName) => {
    const svg = toSvgFile(svgSrc)
    const a = document.createElement('a')
    a.href = svg;
    a.download = `modified-${svgName}`
    a.click()
}