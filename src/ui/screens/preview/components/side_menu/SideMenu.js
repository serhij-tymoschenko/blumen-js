import {Box, Stack} from "@mui/material";
import ColorSection from "./ColorSection";
import ZipDownload from "./ZipDownload";

const SideMenu = ({
                      bodyColor,
                      setBodyColor,
                      hairColor,
                      setHairColor,
                      eyesColor,
                      setEyesColor,
                      combinedTraits,
                      showcaseSrc,
                      hexSrc
                  }) => {
    return <>
        <Stack
            direction="row"
            alignItems="center"
            spacing={1}
        >
            <Box sx={{flexGrow: 1}}/>

            <Box sx={{flexGrow: 0}}>
                <ColorSection
                    bodyColor={bodyColor}
                    setBodyColor={setBodyColor}
                    hairColor={hairColor}
                    setHairColor={setHairColor}
                    eyesColor={eyesColor}
                    setEyesColor={setEyesColor}
                />
            </Box>

            <Box sx={{flexGrow: 1}}/>

            <Box sx={{flexGrow: 0}}>
                <ZipDownload combinedTraits={combinedTraits} hexSrc={hexSrc} showcaseSrc={showcaseSrc}/>
            </Box>
        </Stack>
    </>
}

export default SideMenu;