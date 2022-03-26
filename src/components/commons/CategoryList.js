import MenuItem from "@mui/material/MenuItem";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Menu, Typography} from "@mui/material";
import {KeyboardArrowDown} from "@mui/icons-material";

const CategoryList = () => {
    // Hooks
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    // Test data
    const categories = ["Audio", "Computers", "Phones"];

    // Category menu function
    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        if (event.target.firstChild)
            navigate(`/category/${event.target.firstChild.data}`);
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                size="medium"
                aria-label="list of categories"
                aria-controls="menu-categories"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{
                    color: theme => theme.palette.primary.contrastText,
                    ':hover': theme => {
                        return {bgcolor: theme.palette.primary.dark}
                    }
                }}
                endIcon={<KeyboardArrowDown/>}
            >
                <Typography
                    variant={'subtitle1'}
                    sx={{
                        textTransform: 'capitalize',
                    }}
                >
                    Categories
                </Typography>
            </Button>
            <Menu
                id="menu-categories"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                {categories.map((c) => <MenuItem onClick={handleClose}>{c}</MenuItem>)}
            </Menu>
        </div>
    );
}

export default CategoryList;