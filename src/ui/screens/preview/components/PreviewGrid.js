import React from "react";
import {names} from "../../../../utils/Constants";
import DropMenu from "./drop_menu/DropMenu";
import TraitPreview from "../../../components/TraitPreview";
import {Stack, Typography} from "@mui/material";
import {toSvgFile} from "../../../../utils/files/FileHelper";

const PreviewGrid = ({
                       traits,
                       setTraits,
                       combinedTraits,
                       onVisibilityChange,
                       onSrcChange,
                       onSrcReset,
                       isDarkTheme,
                   }) => {
    const handleDragStart = (index) => (event) => {
        event.dataTransfer.setData('text/plain', index);

        const draggedElement = event.currentTarget;

        const dragImage = draggedElement.cloneNode(true);
        dragImage.style.position = 'absolute';
        dragImage.style.top = '-9999px';
        dragImage.style.left = '-9999px';
        dragImage.style.pointerEvents = 'none';

        document.body.appendChild(dragImage);

        event.dataTransfer.setDragImage(dragImage, dragImage.clientWidth / 2, dragImage.clientHeight / 2);

        event.target.addEventListener('dragend', () => {
            document.body.removeChild(dragImage);
        }, {once: true});
    };

    const handleDrop = (index) => (event) => {
        const draggedIndex = parseInt(event.dataTransfer.getData('text/plain'), 10);
        if (draggedIndex === index) return;

        const newTraits = [...traits];
        [newTraits[draggedIndex], newTraits[index]] = [newTraits[index], newTraits[draggedIndex]];
        setTraits(newTraits);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '16px',
                alignItems: 'stretch',
                justifyItems: 'center',
            }}
        >
            {combinedTraits.map((trait, i) => (
                <Stack spacing={1} direction="column">
                    <Stack
                        width={138 + 4}
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Typography align="center">
                            {names[i]}
                        </Typography>

                        <DropMenu
                            isVisible={trait.isVisible}
                            index={i}
                            onVisibilityChange={onVisibilityChange}
                            onSrcChange={onSrcChange}
                            onSrcReset={onSrcReset}/>
                    </Stack>

                    {!trait.isBackground
                        ? <div
                            key={i}
                            draggable
                            onDragStart={handleDragStart(i)}
                            onDrop={handleDrop(i)}
                            onDragOver={handleDragOver}
                            style={{
                                position: 'relative',
                                width: 138,
                                height: 184,
                                cursor: 'grab',
                                borderRadius: 5,
                                boxSizing: 'border-box',
                                overflow: 'hidden',
                            }}
                        >
                            <TraitPreview
                                width={138}
                                height={184}
                                borderRadius={5}
                                trait={toSvgFile(trait.src)}
                                isVisible={trait.isVisible}
                                isDarkTheme={isDarkTheme}
                            />
                        </div>
                        : <TraitPreview
                            width={138}
                            height={184}
                            borderRadius={5}
                            trait={toSvgFile(trait.src)}
                            isVisible={trait.isVisible}
                            isDarkTheme={isDarkTheme}
                        />
                    }
                </Stack>
            ))}
        </div>
    );
};

export default PreviewGrid;