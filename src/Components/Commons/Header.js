import {AppBar, Box, Button, Stack, Toolbar, Typography} from '@mui/material';
import {Favorite, ShoppingCart} from '@mui/icons-material';
import {Outlet, useNavigate} from 'react-router-dom';
import SearchBox from "./SearchBox";
import UserButton from "./UserButton";
import React, {useState} from 'react';
import Footer from "./Footer";
import AuthService from "../../api/AuthService";
import client from "../../api/HttpClient";

const Header = () => {
    // hooks
    const navigate = useNavigate();

    // States
    const [userDetails,] = useState(AuthService.getUserDetails());

    return (
        <>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}>
                <Box component="header" sx={{mb: 10}}>
                    <AppBar position={"fixed"}>
                        <Toolbar>
                            {/*Logo with Home button*/}
                            <Stack
                                direction="row"
                                sx={{
                                    justifyContent: 'center',
                                    alignItems: 'end',
                                    mr: 5
                                }}
                            >
                                <Button onClick={() => navigate('/')} sx={{p: 0, ml: 10}}>
                                    <Box
                                        component="img"
                                        src={`${client.defaults.baseURL}/orders/invoice/image/logo.png`}
                                        alt="Ezzy Buy Logo"
                                        sx={{
                                            width: 'auto',
                                            objectFit: 'scale-down',
                                            height: 72
                                        }}
                                    />
                                </Button>
                            </Stack>

                            {/*Search Box*/}
                            <Stack
                                direction="row"
                                sx={{
                                    flexGrow: 1,
                                    px: 10
                                }}
                            >
                                <SearchBox/>
                            </Stack>

                            <Stack direction='row' spacing={3}>
                                {/*Right Side Buttons*/}
                                <Button
                                    size="medium"
                                    sx={{
                                        color: theme => theme.palette.primary.contrastText,
                                        ':hover': theme => {
                                            return {bgcolor: theme.palette.primary.dark}
                                        }
                                    }}
                                    onClick={() => {
                                        if (userDetails)
                                            navigate('/wishlist');
                                        else
                                            navigate('/Login?ref=/wishlist');
                                    }}
                                    startIcon={<Favorite/>}
                                >
                                    <Typography
                                        variant={'subtitle1'}
                                        sx={{textTransform: 'capitalize'}}
                                    >
                                        WishList
                                    </Typography>
                                </Button>
                                <Button
                                    size="medium"
                                    sx={{
                                        color: theme => theme.palette.primary.contrastText,
                                        ':hover': theme => {
                                            return {bgcolor: theme.palette.primary.dark}
                                        }
                                    }}
                                    onClick={() => navigate('/cart')}
                                    startIcon={<ShoppingCart/>}
                                >
                                    <Typography
                                        variant={'subtitle1'}
                                        sx={{textTransform: 'capitalize'}}
                                    >
                                        Cart
                                    </Typography>
                                </Button>
                                {/*Authorized button*/}
                                <UserButton/>
                            </Stack>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Box>
                    <Outlet/>
                </Box>
                <Footer/>
            </Box>
        </>
    );
}

export default Header;
