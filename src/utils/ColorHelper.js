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
        .replace(/lime/g, bodyColor)
        .replace(/#[Ff][Ff][Ff][Ff]00/g, eyesColor)
        .replace(/#ff0/g, eyesColor)
        .replace(/blue/g, hairColor);
}