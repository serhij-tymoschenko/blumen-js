export const toSvgFile = (svgSrc) => {
    const blob = new Blob([svgSrc], {type: 'image/svg+xml'})
    return URL.createObjectURL(blob)
}