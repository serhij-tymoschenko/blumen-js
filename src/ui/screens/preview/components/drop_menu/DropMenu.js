import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Button, Menu, MenuItem} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from '@mui/icons-material/Visibility';
import {useRef, useState} from "react";

const DropMenu = ({index, isVisible, onVisibilityChange, onSrcChange, onSrcReset}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const onMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const onMenuClose = () => {
        setAnchorEl(null);
    };

    const inputRef = useRef(null);

    const onAddButtonClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleFileChange = () => {
        const file = inputRef.current.files[0];
        if (file) {
            console.log("gG")
            onSrcChange(file, index);
            inputRef.current.value = '';
        }
    }

    return <>
        <Button
            id="drop-button"
            variant="outlined"
            aria-controls={open ? 'drop-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={onMenuOpen}
            style={{
                minWidth: 0,
                width: 24,
                height: 24,
                padding: 0,
                borderRadius: '50%',
                border: '1px solid #ccc',
            }}
        >
            <MoreVertIcon fontSize="small"/>
        </Button>

        <input ref={inputRef} hidden type="file" accept="image/*"
               onChange={handleFileChange}
        />

        <Menu
            id="drop-menu"
            aria-labelledby="drop-button"
            anchorEl={anchorEl}
            open={open}
            onClose={onMenuClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            <MenuItem onClick={onMenuClose}>
                <Button
                    variant="outlined"
                    onClick={onAddButtonClick}
                    style={{
                        minWidth: 0,
                        width: 24,
                        height: 24,
                        padding: 0,
                        borderRadius: '50%',
                        border: '1px solid #ccc',
                    }}
                >
                    <AddIcon fontSize="small"/>
                </Button>
            </MenuItem>

            <MenuItem onClick={onMenuClose}>
                <Button
                    variant="outlined"
                    onClick={() => onSrcReset(index)}
                    style={{
                        minWidth: 0,
                        width: 24,
                        height: 24,
                        padding: 0,
                        borderRadius: '50%',
                        border: '1px solid #ccc',
                    }}
                >
                    <RemoveIcon fontSize="small"/>
                </Button>
            </MenuItem>

            <MenuItem onClick={onMenuClose}>
                <Button
                    variant="outlined"
                    onClick={() => onVisibilityChange(index)}
                    style={{
                        minWidth: 0,
                        width: 24,
                        height: 24,
                        padding: 0,
                        borderRadius: '50%',
                        border: '1px solid #ccc',
                    }}
                >
                    {isVisible
                        ? <VisibilityOffIcon fontSize="small"/>
                        : <VisibilityIcon fontSize="small"/>
                    }
                </Button>
            </MenuItem>
        </Menu>
    </>
}

export default DropMenu;