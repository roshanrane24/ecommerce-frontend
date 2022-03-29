import React, {useState} from 'react';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {KeyboardArrowDown} from "@mui/icons-material";
import {Button} from "@mui/material";
import Stack from "@mui/material/Stack";
import {useNavigate} from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const CategoryCard = (props) => {
    // Navigation Hooks
    const navigate = useNavigate();

    // Menu States
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Paper
                elevation={0}
                sx={{p: 1}}
            >
                <Stack
                    direction="row"
                    onClick={() => navigate(`/search?category=${props.category.categoryName.toLowerCase()}`)}
                    sx={{
                        p: 1,
                        justifyContent: "center",
                        alignItems: "flex-start",
                        flexGrow: 1
                    }}
                >
                    <img
                        alt={props.category.categoryName}
                        src={`http://localhost:8080/api/categories/image/${props.category.id}`}
                        height={60}
                    />
                </Stack>
                <Button
                    id="subcategory-button"
                    aria-haspopup="true"
                    aria-controls={open ? 'subcategory-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    endIcon={
                        props.category.subCategory.length > 0 &&
                        <KeyboardArrowDown sx={{ml: -1}}/>
                    }
                >
                    <Typography
                        align="center"
                        color="black"
                        variant="subtitle2"
                        sx={{textTransform: "capitalize"}}
                    >
                        {props.category.categoryName}
                    </Typography>
                </Button>
            </Paper>
            <Menu
                id="subcategory-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'subcategory-button',
                }}
            >
                {
                    props.category.subCategory.length > 0 &&
                    props.category.subCategory.map((subCategory, idx) => {
                        return <MenuItem
                            key={idx}
                            onClick={() => {
                                navigate(`/search?category=${props.category.categoryName.toLowerCase()}`
                                    + `&subcategory=${subCategory.toLowerCase()}`)
                            }}>
                            {subCategory}
                        </MenuItem>
                    })
                }
            </Menu>
        </>
    );
};

export default CategoryCard;