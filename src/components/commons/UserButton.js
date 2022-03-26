import {Button, IconButton, Menu, MenuItem, Stack, Typography} from "@mui/material";
import {KeyboardArrowDown} from "@mui/icons-material";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const UserButton = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Handle Logout
    const handleLogout = () => {
        handleClose();
        localStorage.removeItem('user');
    }

    return (
        <>
            {
                localStorage.getItem('user') &&
                <>
                    <Button
                        size="medium"
                        aria-label="user options menu"
                        aria-controls="menu-user"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                        endIcon={<KeyboardArrowDown/>}
                    >
                        <Typography
                            variant={'subtitle1'}
                            sx={{
                                textTransform: 'capitalize',
                                marginLeft: 1
                            }}
                        >
                            {JSON.parse(localStorage.getItem('user')).firstname}
                        </Typography>
                    </Button>
                    <Menu
                        id="menu-user"
                        keepMounted
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => {
                            handleClose();
                            navigate('/orders');
                        }}>My Orders</MenuItem>

                        <MenuItem onClick={() => {
                            handleClose();
                            navigate('/profile')
                        }}>My Profile</MenuItem>

                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </>
            }
            {
                !localStorage.getItem('user') &&
                <Button
                    size="medium"
                    color="inherit"
                    onClick={() => {
                        navigate('/login')
                    }}
                    sx={{
                        backgroundColor: theme => theme.palette.primary.contrastText,
                        color: theme => theme.palette.primary.main,
                        ':hover': theme => {
                            return {
                                color: theme.palette.primary.contrastText
                            }
                        }
                    }}
                >
                    <Typography
                        variant={'subtitle1'}
                        sx={{textTransform: 'capitalize'}}
                    >
                        Login
                    </Typography>
                </Button>
            }
        </>
    );
}

export default UserButton;