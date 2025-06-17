export const rgbToHex = (r, g, b) => {
    const toHex = (n) => {
        const hex = n.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return '#' + toHex(r) + toHex(g) + toHex(b);
}

export const replaceColors = (src, bodyColor, hairColor, eyesColor) => {
    return src
        .replace(/#00[Ff][Ff]00/g, bodyColor)
        .replace(/#0[Ff]0/g, bodyColor)
        .replace(/\blime\b/g, bodyColor)
        .replace(/#[Ff][Ff][Ff][Ff]00/g, eyesColor)
        .replace(/#[Ff][Ff]0/g, eyesColor)
        .replace(/\bblue\b/g, hairColor)
}