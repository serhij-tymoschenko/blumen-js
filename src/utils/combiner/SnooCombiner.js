import {combineTogether} from "./Combiner";
import { Canvg } from 'canvg';

export const getHexSrc = (base64PngSrc) => {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 600 600" fill="none">
            <g transform="translate(50, 100)">
                <image x="-15" y="0" width="500" height="500" preserveAspectRatio="xMidYMid meet" href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIHZpZXdCb3g9JzAgMCA2NCA2NCcgZmlsbD0nbm9uZSc+CiAgPHBhdGggZD0nTTI5IDEuNzMyMDVDMzAuODU2NCAwLjY2MDI1NCAzMy4xNDM2IDAuNjYwMjU0IDM1IDEuNzMyMDVMNTYuNzEyOCAxNC4yNjc5QzU4LjU2OTIgMTUuMzM5NyA1OS43MTI4IDE3LjMyMDUgNTkuNzEyOCAxOS40NjQxVjQ0LjUzNTlDNTkuNzEyOCA0Ni42Nzk1IDU4LjU2OTIgNDguNjYwMyA1Ni43MTI4IDQ5LjczMjFMMzUgNjIuMjY3OUMzMy4xNDM2IDYzLjMzOTcgMzAuODU2NCA2My4zMzk3IDI5IDYyLjI2NzlMNy4yODcxOSA0OS43MzIxQzUuNDMwNzggNDguNjYwMyA0LjI4NzE5IDQ2LjY3OTUgNC4yODcxOSA0NC41MzU5VjE5LjQ2NDFDNC4yODcxOSAxNy4zMjA1IDUuNDMwNzggMTUuMzM5NyA3LjI4NzE5IDE0LjI2NzlMMjkgMS43MzIwNVonIGZpbGw9J3VybCgjcGFpbnQwX2RpYW1vbmRfMjYwMjZfMTczOTQ0KScvPgogIDxwYXRoIGQ9J00yOSAxLjczMjA1QzMwLjg1NjQgMC42NjAyNTQgMzMuMTQzNiAwLjY2MDI1NCAzNSAxLjczMjA1TDU2LjcxMjggMTQuMjY3OUM1OC41NjkyIDE1LjMzOTcgNTkuNzEyOCAxNy4zMjA1IDU5LjcxMjggMTkuNDY0MVY0NC41MzU5QzU5LjcxMjggNDYuNjc5NSA1OC41NjkyIDQ4LjY2MDMgNTYuNzEyOCA0OS43MzIxTDM1IDYyLjI2NzlDMzMuMTQzNiA2My4zMzk3IDMwLjg1NjQgNjMuMzM5NyAyOSA2Mi4yNjc5TDcuMjg3MTkgNDkuNzMyMUM1LjQzMDc4IDQ4LjY2MDMgNC4yODcxOSA0Ni42Nzk1IDQuMjg3MTkgNDQuNTM1OVYxOS40NjQxQzQuMjg3MTkgMTcuMzIwNSA1LjQzMDc4IDE1LjMzOTcgNy4yODcxOSAxNC4yNjc5TDI5IDEuNzMyMDVaJyBmaWxsPSd1cmwoI3BhaW50MV9saW5lYXJfMjYwMjZfMTczOTQ0KScvPgogIDxkZWZzPgogICAgPHJhZGlhbEdyYWRpZW50IGlkPSdwYWludDBfZGlhbW9uZF8yNjAyNl8xNzM5NDQnIGN4PScwJyBjeT0nMCcgcj0nMScgZ3JhZGllbnRVbml0cz0ndXNlclNwYWNlT25Vc2UnIGdyYWRpZW50VHJhbnNmb3JtPSd0cmFuc2xhdGUoLTYuNTk5NzQgMjMuMTk5OSkgcm90YXRlKDE1LjkwOTcpIHNjYWxlKDQ0LjUwNTEgMjE0MDYuNyknPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPScjMTE4NUI1Jy8+CiAgICAgIDxzdG9wIG9mZnNldD0nMC4yOTQ1Micgc3RvcC1jb2xvcj0nI0Q3RjdGRicvPgogICAgICA8c3RvcCBvZmZzZXQ9JzAuNTI2MDQyJyBzdG9wLWNvbG9yPScjNUVGNkQ4Jy8+CiAgICAgIDxzdG9wIG9mZnNldD0nMC44Mzg0MzQnIHN0b3AtY29sb3I9JyM1RUY2RDgnLz4KICAgICAgPHN0b3Agb2Zmc2V0PScwLjg2NzI0Nicgc3RvcC1jb2xvcj0nIzE5OTBCOScvPgogICAgICA8c3RvcCBvZmZzZXQ9JzEnIHN0b3AtY29sb3I9JyMzRjlGQzYnLz4KICAgIDwvcmFkaWFsR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9J3BhaW50MV9saW5lYXJfMjYwMjZfMTczOTQ0JyB4MT0nMjMuNTY4NycgeTE9JzIyLjcwNjEnIHgyPSc0NC4xMTgzJyB5Mj0nNTMuNDgxNycgZ3JhZGllbnRVbml0cz0ndXNlclNwYWNlT25Vc2UnPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPScjMDA0RTVGJy8+CiAgICAgIDxzdG9wIG9mZnNldD0nMScgc3RvcC1jb2xvcj0nIzcyN0NEOCcgc3RvcC1vcGFjaXR5PScwLjgxJy8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KPC9zdmc+"/>
                <image x="0" y="0" width="500" height="500" preserveAspectRatio="xMidYMid meet" href="data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiB2aWV3Qm94PSIwIDAgMzIgMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJhZGlhbEdyYWRpZW50IGlkPSJhIiBjeD0iMCIgY3k9IjAiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMjAuMDYyNjggNi4wOTk5IC0zMDk3LjU1ODE1IDEwMTg3LjkxMjI1IC0zLjEgMTEuNikiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiByPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMxMTg1YjUiLz48c3RvcCBvZmZzZXQ9Ii4yOSIgc3RvcC1jb2xvcj0iI2Q3ZjdmZiIvPjxzdG9wIG9mZnNldD0iLjUzIiBzdG9wLWNvbG9yPSIjNWVmNmQ4Ii8+PHN0b3Agb2Zmc2V0PSIuODQiIHN0b3AtY29sb3I9IiM1ZWY2ZDgiLz48c3RvcCBvZmZzZXQ9Ii44NyIgc3RvcC1jb2xvcj0iIzE5OTBiOSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzNmOWZjNiIvPjwvcmFkaWFsR3JhZGllbnQ+PHBhdGggZD0iTTEzLjc3IDEuMWMuNzYtLjQxIDEuNy0uNDEgMi40NiAwTDI4IDcuNThjLjc1LjQyIDEuMiAxLjE3IDEuMiAxLjk2djEyLjk0YzAgLjc5LS40NSAxLjU0LTEuMiAxLjk1TDE2LjIzIDMwLjljLS43Ni40Mi0xLjcuNDItMi40NiAwTDIgMjQuNDJhMi4yNSAyLjI1IDAgMCAxLTEuMi0xLjk1VjkuNTNDLjggOC43NCAxLjI0IDggMiA3LjU3eiIgc3Ryb2tlPSJ1cmwoI2EpIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjEuNTkiLz48L3N2Zz4="/>
            </g>
  
            <g clip-path="url(#clip-shape-img)" transform="scale(6)">
                <image href="${base64PngSrc}" x="0" y="3" height="100" width="100" preserveAspectRatio="xMidYMid slice" />
            </g>
  
            <defs>
                <clipPath id="clip-shape-img">
                    <polygon points="0,0 100,2 100,50 100,70 47,96 6,75" />
                </clipPath>
            </defs>
        </svg>
    `;
}

export const toPngSrc = async (svgString) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set canvas size based on SVG attributes or fallback
    const widthMatch = svgString.match(/width="(\d+)"/);
    const heightMatch = svgString.match(/height="(\d+)"/);
    const width = widthMatch ? parseInt(widthMatch[1]) : 600;
    const height = heightMatch ? parseInt(heightMatch[1]) : 600;
    canvas.width = width;
    canvas.height = height;

    // Render SVG onto canvas
    const v = await Canvg.from(ctx, svgString);
    await v.render();

    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    function isRowTransparent(y) {
        for (let x = 0; x < width; x++) {
            if (data[(y * width + x) * 4 + 3] !== 0) return false;
        }
        return true;
    }

    let topVisibleRow = 0;
    for (; topVisibleRow < height; topVisibleRow++) {
        if (!isRowTransparent(topVisibleRow)) break;
    }

    const cropWidth = Math.max(1, Math.round(-1.0975 * topVisibleRow + 600));
    const cropHeight = cropWidth;
    const cropX = Math.max(0, Math.floor((width - cropWidth) / 2));
    let cropY = topVisibleRow;
    if (cropY + cropHeight > height) {
        cropY = Math.max(0, height - cropHeight);
    }

    const croppedCanvas = document.createElement("canvas");
    croppedCanvas.width = cropWidth;
    croppedCanvas.height = cropHeight;
    const croppedCtx = croppedCanvas.getContext("2d");
    croppedCtx.drawImage(canvas, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

    return croppedCanvas.toDataURL("image/png");
};

export const getShowcaseAndHexSrcs = async (traits) => {
    let localTraits = [
        traits[9],
        traits[6],
        traits[3],
        traits[2],
        traits[0],
        traits[1],
        traits[5],
        traits[4],
        traits[7],
        traits[8],
    ].filter(trait => trait.isVisible)

    const showcaseSrc = combineTogether({
        traits: localTraits,
        width: 552,
        height: 736
    })

    const hexTraits = localTraits.filter(trait => !trait.isBackground)
    const combinedHexTraitsSrc = combineTogether({
        traits: hexTraits,
        width: 552,
        height: 736
    })

    const hexSrc = getHexSrc(await toPngSrc(combinedHexTraitsSrc));
    return [showcaseSrc, hexSrc]
}