import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../api/AuthService";

const UserButton = () => {
    // Hooks
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [userDetails, setUserDetails] = useState(AuthService.getUserDetails());

    // Handler Function
    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {
                userDetails &&
                <>
                    <Button
                        size="medium"
                        aria-label="user options menu"
                        aria-controls="menu-user"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                        endIcon={<KeyboardArrowDown />}
                    >
                        <Typography
                            variant={'subtitle1'}
                            sx={{
                                textTransform: 'capitalize',
                                marginLeft: 1
                            }}
                        >
                            {userDetails.firstname}
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

                        <MenuItem onClick={() => {
                            AuthService.logout();
                            handleClose();
                            setUserDetails(null);
                            navigate('/');
                        }}>
                            Logout
                        </MenuItem>
                    </Menu>
                </>
            }
            {
                !userDetails &&
                <Button
                    size="medium"
                    color="inherit"
                    onClick={() => {
                        navigate('/login');
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
                        sx={{ textTransform: 'capitalize' }}
                    >
                        Login
                    </Typography>
                </Button>
            }
        </>
    );
}

export default UserButton;
