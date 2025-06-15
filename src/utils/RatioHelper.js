const REQUIRED_RATIO = 380 / 600;

export const hasExactRatio = (width, height) => {
    return (width / height) === REQUIRED_RATIO;
};

export const hasScaledRatio = (width, height, baseWidth, baseHeight) => {
    if (width * baseHeight !== height * baseWidth) return false;
    const widthRatio = width / baseWidth;
    const heightRatio = height / baseHeight;

    return Number.isInteger(widthRatio) && Number.isInteger(heightRatio);
};