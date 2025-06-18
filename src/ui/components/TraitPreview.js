import {Box} from "@mui/material";

const TraitPreview = ({
    width,
    height,
    borderRadius,
    trait,
    isVisible = true,
    isDarkTheme = false
                      }) => {
    return <>
        <Box
            sx={{
                width: width,
                height: height,
                border: `2px dashed ${isVisible ? "#2f7d31" : "#ef5350"}`,
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: `${isDarkTheme ? '#272727' : '#f9f9f9'}`,
                borderRadius: borderRadius,
            }}
        >
            <img
                width={width}
                height={height}
                src={trait}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    objectFit: 'scale-down',
                    pointerEvents: 'none',
                }}
            />
        </Box>
    </>
}

export default TraitPreview;