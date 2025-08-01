import React, {useEffect, useState} from "react";
import ScreenType from "../data/models/ScreenType";
import {Alert, Box, Snackbar, Typography} from "@mui/material";
import BottomBar from "./components/navigation/BottomBar";
import TopAppBar from "./components/navigation/TopAppBar";
import SvgTool from "./screens/tool/SvgTool";
import Preview from "./screens/preview/Preview";
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {darkTheme, lightTheme} from "./theme/Theme";

const Main = () => {
    const [screenType, setScreenType] = useState(ScreenType.PREVIEW);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [isDarkTheme, setIsDarkTheme] = useState(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

    useEffect(() => {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            setIsDarkTheme(e.matches);
        });
    })

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const onButtonClick = (buttonType) => {
        setScreenType(buttonType);
    };

    const onThemeChange = () => {
        setIsDarkTheme(!isDarkTheme);
    }

    const screen = (screenType === ScreenType.SVG_TOOL)
        ? <SvgTool setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} isDarkTheme={isDarkTheme}/>
        : <Preview setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} isDarkTheme={isDarkTheme}/>

    const remarkText = (screenType === ScreenType.SVG_TOOL)
        ? <>
            * SVG only - for correcting
            <br/>
            * SVG with PNG - for combining
        </>
        : <>
        </>

    return (
        <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
            <CssBaseline/>
            <Box sx={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
                <TopAppBar
                    onButtonClick={onButtonClick}
                    isDarkTheme={isDarkTheme}
                    onThemeChange={onThemeChange}
                />

                <Typography variant="caption" color="#ef5350" padding={1} component="div" alignSelf={"start"}
                            justifySelf={"start"}>
                    {remarkText}
                </Typography>

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

                <BottomBar isDarkTheme={isDarkTheme} />

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
        </ThemeProvider>
    );
}

export default Main;