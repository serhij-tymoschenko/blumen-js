import React, {useState} from "react";
import ScreenType from "../data/models/ScreenType";
import {Alert, Box, Snackbar} from "@mui/material";
import BottomBar from "./components/navigation/BottomBar";
import TopAppBar from "./components/navigation/TopAppBar";
import SvgTool from "./screens/tool/SvgTool";
import Preview from "./screens/preview/Preview";

const Main = () => {
    const [screenType, setScreenType] = useState(ScreenType.PREVIEW);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const onButtonClick = (buttonType) => {
        setScreenType(buttonType);
    };

    const screen = (screenType === ScreenType.SVG_TOOL)
        ? <SvgTool setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage}/>
        : <Preview setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage}/>

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
            <TopAppBar
                onButtonClick={onButtonClick}
            />

            <Box
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {screen}
            </Box>

            <BottomBar/>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{width: '100%'}}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default Main;