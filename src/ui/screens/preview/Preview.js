import {useCallback, useEffect, useState} from "react";
import Trait from "../../../data/models/Trait";
import {replaceColors} from "../../../utils/ColorHelper";
import {combineTogether} from "../../../utils/combiner/Combiner";
import {hasScaledRatio} from "../../../utils/files/RatioHelper";
import {Box, Paper, Stack, Typography} from "@mui/material";
import Showcase from "./components/lhs/Showcase";
import PreviewGrid from "./components/PreviewGrid";
import SideMenu from "./components/side_menu/SideMenu";
import {correct} from "../../../utils/corrector/Corrector";
import {useDropzone} from "react-dropzone";
import {snooSrc} from "../../../utils/Constants";
import {getShowcaseAndHexSrcs} from "../../../utils/combiner/SnooCombiner";

const Preview = ({setOpenSnackbar, setSnackbarMessage}) => {
    const [bodyColor, setBodyColor] = useState('#00FF00');
    const [hairColor, setHairColor] = useState('#0000FF');
    const [eyesColor, setEyesColor] = useState('#FFFF00');

    const [traits, setTraits] = useState(Array.from({length: 10}, () => new Trait({})));
    const [combinedTraits, setCombinedTraits] = useState(Array.from({length: 10}, () => new Trait({})));

    const [showcaseSrc, setShowcaseSrc] = useState("<svg></svg>");
    const [hexSrc, setHexSrc] = useState("<svg></svg>");

    useEffect(() => {
        const update = async (traits, bodyColor, hairColor, eyesColor) => {
            const coloredTraits = traits.map(trait => {
                return trait.copy(
                    replaceColors(
                        trait.src,
                        bodyColor,
                        hairColor,
                        eyesColor
                    )
                )
            })

            const [showcaseSrc, hexSrc] = await getShowcaseAndHexSrcs(coloredTraits);
            setShowcaseSrc(showcaseSrc);
            setHexSrc(hexSrc);

            const localTraits = coloredTraits.map((trait, index) => {
                const snooTrait = new Trait({src: snooSrc});
                const [front, back] = (index !== 9 && index !== 6)
                    ? [trait, snooTrait]
                    : [snooTrait, trait];

                return trait.copy(
                    combineTogether({
                        traits: [back, front],
                        width: 552,
                        height: 736,
                    })
                );
            })

            setCombinedTraits(localTraits)
        }

        update(traits, bodyColor, hairColor, eyesColor);
    }, [bodyColor, eyesColor, hairColor, traits]);

    const getImageData = async (file) => {
        const objectUrl = URL.createObjectURL(file);
        const isSvg = file.type === 'image/svg+xml';

        const localSrc = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => (isSvg)
                ? resolve(correct(reader.result))
                : resolve(reader.result)
            reader.onerror = reject;

            if (isSvg) {
                reader.readAsText(file);
            } else {
                reader.readAsDataURL(file);
            }
        });

        const {width, height} = await new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                resolve({width: img.naturalWidth, height: img.naturalHeight});
                URL.revokeObjectURL(objectUrl);  // clean up
            };
            img.onerror = () => {
                resolve({width: null, height: null});
                URL.revokeObjectURL(objectUrl);
            };
            img.src = localSrc;
        });

        return {src: localSrc, width, height};
    };

    const onDrop = useCallback(async (acceptedFiles) => {
        if (acceptedFiles.length > 10) {
            setSnackbarMessage('Max: 10 files');
            setOpenSnackbar(true);
            return;
        }

        try {
            const processedItems = await Promise.all(
                acceptedFiles.map(async (file) => {
                    try {
                        const data = await getImageData(file);
                        return {file, data};
                    } catch (error) {
                        console.error(`Error processing ${file.name}:`, error);
                        return null;
                    }
                })
            );

            const validItems = [];
            let background = null;

            processedItems.filter(Boolean).forEach(({file, data}) => {
                if (hasScaledRatio(data.width, data.height, 380, 600)) {
                    validItems.push(new Trait({src: data.src}));
                } else if (hasScaledRatio(data.width, data.height, 552, 736)) {
                    background = new Trait({src: data.src, isBackground: true});
                } else {
                    setSnackbarMessage(`${file.name} has invalid ratio`);
                    setOpenSnackbar(true);
                }
            });

            const emptyTrait = () => new Trait({});

            const paddedTraits = [
                ...validItems,
                ...Array.from({length: 10 - validItems.length - (background ? 1 : 0)}, emptyTrait),
                ...(background ? [background] : [])
            ];

            setTraits(paddedTraits);
        } catch (error) {
            setSnackbarMessage('Error processing files');
            setOpenSnackbar(true);
        }
    }, [setOpenSnackbar, setSnackbarMessage]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {'image/*': []},
        multiple: true,
    });

    const onVisibilityChange = (i) => {
        const updatedTraits = [...traits];
        updatedTraits[i] = updatedTraits[i].changeVisibility()
        setTraits(updatedTraits);
    }

    const onSrcReset = (i) => {
        const updatedTraits = [...traits];
        updatedTraits[i] = updatedTraits[i].copy("<svg></svg>");
        setTraits(updatedTraits);
    };

    const onSrcChange = async (file, i) => {
        const update = (data, isBackground = false) => {
            const updatedTraits = [...traits];
            updatedTraits[i] = new Trait({ src: data.src, isBackground: isBackground});
            setTraits(updatedTraits);
        }

        const onError = () => {
            setSnackbarMessage(`${file.name} has invalid ratio`);
            setOpenSnackbar(true);
        }

        const data = await getImageData(file)

        if (i < 9) {
            hasScaledRatio(data.width, data.height, 380, 600)
                ? update(data)
                : onError()
        }

        if (i === 9) {
            hasScaledRatio(data.width, data.height, 552, 736)
                ? update(data, true)
                : onError()
        }
    }

    return (
        <Stack direction="column" spacing={2} sx={{justifyContent: 'center', alignItems: 'center'}}>
            <Paper
                {...getRootProps()}
                elevation={3}
                sx={{
                    width: "89%",
                    border: '2px dashed #2f7d31',
                    padding: 4,
                    textAlign: 'center',
                    alignSelf: 'flex-start',
                    backgroundColor: isDragActive ? '#f0f0f0' : '#fafafa',
                    cursor: 'pointer',
                    mb: 4,
                }}
            >
                <input {...getInputProps()} />
                {isDragActive
                    ? <Typography>Drop the images here ...</Typography>
                    : <Typography>Drag and drop images here, or click to select files</Typography>
                }
            </Paper>

            <Stack
                direction="row"
                spacing={2}
                sx={{height: '100%'}}
                justifyContent="center"
            >
                <Box sx={{alignSelf: 'flex-end'}}>
                    <Showcase
                        showcaseSrc={showcaseSrc}
                        hexSrc={hexSrc}
                    />
                </Box>

                <PreviewGrid
                    traits={traits}
                    setTraits={setTraits}
                    combinedTraits={combinedTraits}
                    onSrcReset={onSrcReset}
                    onVisibilityChange={onVisibilityChange}
                    onSrcChange={onSrcChange}
                    sx={{alignSelf: 'flex-end'}}
                />

                <SideMenu
                    bodyColor={bodyColor}
                    setBodyColor={setBodyColor}
                    hairColor={hairColor}
                    setHairColor={setHairColor}
                    eyesColor={eyesColor}
                    setEyesColor={setEyesColor}
                    combinedTraits={combinedTraits}
                    showcaseSrc={showcaseSrc}
                    hexSrc={hexSrc}
                />
            </Stack>
        </Stack>
    );
};

export default Preview;