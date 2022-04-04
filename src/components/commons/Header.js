import {AppBar, Box, Button, Stack, Toolbar, Typography} from '@mui/material';
import {Favorite, ShoppingCart} from '@mui/icons-material';
import {Outlet, useNavigate} from 'react-router-dom';
import SearchBox from "./SearchBox";
import UserButton from "./UserButton";
import React, {useState} from 'react';
import Footer from "./Footer";
import AuthService from "../../api/AuthService";

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
                <Box component="header" sx={{mb: 8}}>
                    <AppBar position={"fixed"}>
                        <Toolbar>
                            {/*Logo with home button*/}
                            <Button onClick={() => navigate('/')}>
                                <img src={"logo192.png"} alt="logo" width={32}/>
                            </Button>

                            {/*Search Box*/}
                            <Box sx={{flexGrow: 1}}/>
                            <SearchBox/>
                            <Box sx={{flexGrow: 1}}/>

                            <Stack direction='row' spacing={2}>
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
                                            navigate('/user/wishlist');
                                        else
                                            navigate('/login?ref=/user/wishlist');
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
                                    onClick={() => navigate('/user/cart')}
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
