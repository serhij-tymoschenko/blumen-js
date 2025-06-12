import {useEffect, useState} from "react";
import {Stack} from "@mui/material";
import TraitPreview from "../../components/TraitPreview";
import ToolActions from "./components/ToolActions";
import ToolOutput from "./components/ToolOutput";

const SvgTool = () => {
    const [svgSrc, setSvgSrc] = useState(null);
    const [svgName, setSvgName] = useState(null);
    const [pngSrc, setPngSrc] = useState(null);

    const [combinedSvgSrc, setCombinedSvgSrc] = useState("<svg></svg>");

    useEffect(() => {
        const svgSrc = pngSrc

    }, []);

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
                    onSvgChange={null}
                    onPngChange={null}
                    pngSrc={pngSrc}
                    onPngRemove={null}
                />

                <ToolOutput
                    combinedSvgSrc={combinedSvgSrc}
                    svgName={svgName}
                    svgSrc={svgSrc}
                    pngSrc={pngSrc}
                />
            </Stack>

            <TraitPreview
                trait={null}
                width={285}
                height={450}
                borderRadius={0}/>
        </Stack>
    </>
}

export default SvgTool;