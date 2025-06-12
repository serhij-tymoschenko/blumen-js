import {formatSize, getSvgSize} from "../../../../utils/SvgSizeHelper";
import {Box, Button, Stack, Typography} from "@mui/material";
import {downloadSvg} from "../../../../utils/download/DownloadHelper";
import DownloadIcon from '@mui/icons-material/Download';

const ToolOutput = ({
                        combinedSvgSrc,
                        svgName,
                        svgSrc,
                        pngSrc
                    }) => {
    const svgSize = getSvgSize(combinedSvgSrc);

    return svgSrc
        ? <Box paddingLeft={5.7}>
            <Stack spacing={2} direct ion="column">
                <Button
                    variant="contained"
                    onClick={() => downloadSvg(combinedSvgSrc, svgName)}
                    endIcon={<DownloadIcon/>}
                >
                    {svgSrc && pngSrc && 'Combine'}
                    {svgSrc && !pngSrc && 'Correct'}
                </Button>

                <Typography
                    variant="body2"
                    fontWeight="bold"
                    color={
                        svgSize > 512 * 1024
                            ? 'error'
                            : 'textPrimary'
                    }
                >
                    Size: {formatSize(svgSize)}
                </Typography>
            </Stack>
        </Box>
        : null;
}

export default ToolOutput;