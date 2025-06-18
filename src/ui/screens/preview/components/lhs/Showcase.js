import Hex from "./Hex";
import {Stack} from "@mui/material";
import TraitPreview from "../../../../components/TraitPreview";
import {toSvgFile} from "../../../../../utils/files/FileHelper";

const Showcase = ({showcaseSrc, hexSrc, isDarkTheme}) => {
    return (
        <Stack
            sx={{
                height: '100%',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
            }}
            spacing={2}
        >
            <Hex hexSrc={hexSrc}/>

            <TraitPreview
                width={207}
                height={276}
                borderRadius={5}
                trait={toSvgFile(showcaseSrc)}
                isDarkTheme={isDarkTheme}
            />
        </Stack>
    );
};

export default Showcase;