import AppBar from '@mui/material/AppBar';
import {Box, Button, IconButton, Stack, Typography} from "@mui/material";
import logo from "../../../res/raw/logo.png";
import ScreenType from "../../../data/models/ScreenType";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const TopAppBar = ({
                       onButtonClick,
                       isDarkTheme,
                       onThemeChange,
                   }) => {
    return <>
        <AppBar position="static" color="success">
            <Box position="relative" width="100vw">
                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    position="absolute"
                    left={16}
                    top="50%"
                    sx={{transform: "translateY(-50%)"}}
                >
                    <IconButton color="inherit" onClick={onThemeChange}>
                        {isDarkTheme
                            ? <DarkModeIcon fontSize="small"/>
                            : <LightModeIcon fontSize="small"/>
                        }
                    </IconButton>
                    <Typography variant="h6">Blumen</Typography>
                    <img src={logo} alt={"logo"} width={32} height={32}/>
                </Stack>

                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                >
                    <Button onClick={() => onButtonClick(ScreenType.SVG_TOOL)} color={"inherit"}>
                        Svg Tool
                    </Button>
                    <Button onClick={() => onButtonClick(ScreenType.PREVIEW)} color={"inherit"}>
                        Preview
                    </Button>
                </Stack>

                <Stack
                    direction="row"
                    alignItems="center"
                    position="absolute"
                    right={16}
                    top="50%"
                    sx={{transform: "translateY(-50%)"}}
                >

                </Stack>
            </Box>
        </AppBar>
    </>
}

export default TopAppBar;