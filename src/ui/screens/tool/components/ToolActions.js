import {Box, Button, Stack} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import FileUploadIcon from '@mui/icons-material/FileUpload';

function RefreshIcon(props) {
    return null;
}

const ToolActions = ({
                         onSvgChange,
                         onPngChange,
                         pngSrc,
                         onPngRemove
                     }) => {
    return <>
        <Stack spacing={2} direction="column">
            <Box alignSelf={"flex-end"}>
                <Button
                    component="label"
                    endIcon={<FileUploadIcon/>}
                >
                    Upload SVG
                    <input hidden type="file" accept=".svg" onChange={onSvgChange}/>
                </Button>
            </Box>

            <Stack spacing={2} direction="row" alignItems="center" justifyContent="center">
                <Button
                    variant="outlined"
                    onClick={onPngRemove}
                    style={{
                        minWidth: 0,
                        width: 30,
                        height: 30,
                        padding: 0,
                        borderRadius: '50%',
                        border: '1px solid #ccc',
                        visibility: pngSrc ? 'visible' : 'hidden'
                    }}>
                    <ClearIcon fontSize="small"/>
                </Button>

                <Button
                    component="label"
                    endIcon={<FileUploadIcon/>}
                >
                    Upload PNG
                    <input hidden type="file" accept=".png" onChange={onPngChange}/>
                </Button>
            </Stack>
        </Stack>
    </>
}

export default ToolActions;