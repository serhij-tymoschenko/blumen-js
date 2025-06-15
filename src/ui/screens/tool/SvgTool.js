import {useEffect, useState} from "react";
import {Stack} from "@mui/material";
import TraitPreview from "../../components/TraitPreview";
import ToolActions from "./components/ToolActions";
import ToolOutput from "./components/ToolOutput";
import {combineTogether} from "../../../utils/combiner/Combiner";
import Trait from "../../../data/models/Trait";
import {correct} from "../../../utils/corrector/Corrector";
import {toSvgFile} from "../../../utils/FileHelper";

const SvgTool = ({
                     setOpenSnackbar,
                     setSnackbarMessage
                 }) => {
    const [svgSrc, setSvgSrc] = useState("<svg></svg>");
    const [svgName, setSvgName] = useState(null);
    const [pngSrc, setPngSrc] = useState(null);

    const [combinedSvgSrc, setCombinedSvgSrc] = useState("<svg></svg>");

    const REQUIRED_RATIO = 380 / 600;
    const hasExactRatio = (width, height) => {
        return (width / height) === REQUIRED_RATIO;
    };

    useEffect(() => {
        const correctedSvgSrc = correct(svgSrc)

        const src = pngSrc
            ? combineTogether({
                traits: [new Trait({src: correctedSvgSrc}), new Trait({src: pngSrc})],
                width: 380,
                height: 600,
                isPureTrait: true
            })
            : combineTogether({
                traits: [new Trait({src: correctedSvgSrc})],
                width: 380,
                height: 600,
                isPureTrait: true
            })

        setCombinedSvgSrc(src);
    }, [pngSrc, svgSrc]);

    const onPngRemove = () => {
        setPngSrc(null)
    }

    const onSvgChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'image/svg+xml') {
            const reader = new FileReader();
            reader.onloadend = () => {
                const img = new Image();
                img.onload = () => {
                    if (!hasExactRatio(img.width, img.height)) {
                        setSnackbarMessage('SVG must have an exact 380:600 aspect ratio');
                        setOpenSnackbar(true);
                        return;
                    }
                    setSvgName(file.name);
                };
                img.src = reader.result;
            };
            reader.readAsDataURL(file);

            const textReader = new FileReader();
            textReader.onloadend = () => {
                setSvgSrc(textReader.result);
            };
            textReader.readAsText(file);
        }
    }

    const onPngChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'image/png') {
            const reader = new FileReader();
            reader.onloadend = () => {
                const img = new Image();
                img.onload = () => {
                    if (!hasExactRatio(img.width, img.height)) {
                        setSnackbarMessage('PNG must have an exact 380:600 aspect ratio');
                        setOpenSnackbar(true);
                        return;
                    }
                    setPngSrc(reader.result);
                };
                img.src = reader.result;
            };
            reader.readAsDataURL(file);
        }
    };

    return <>
        <Stack
            spacing={2}
            direction={"row"}
        >
            <Stack
                spacing={2}
                alignSelf={"Center"}
            >
                <ToolActions
                    onSvgChange={onSvgChange}
                    onPngChange={onPngChange}
                    pngSrc={pngSrc}
                    onPngRemove={onPngRemove}
                />

                {svgSrc !== "<svg></svg>" &&
                    <ToolOutput
                        combinedSvgSrc={combinedSvgSrc}
                        svgName={svgName}
                        svgSrc={svgSrc}
                        pngSrc={pngSrc}
                    />
                }
            </Stack>

            <TraitPreview
                trait={toSvgFile(combinedSvgSrc)}
                width={285}
                height={450}
                borderRadius={0}/>
        </Stack>
    </>
}

export default SvgTool;