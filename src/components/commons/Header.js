import {Box, Stack, AppBar, Typography, Button, Toolbar, IconButton} from '@mui/material';
import {ShoppingCart, Favorite} from '@mui/icons-material';
import {Outlet, useNavigate} from 'react-router-dom';
import CategoryList from "./CategoryList";
import SearchBox from "./SearchBox";
import UserButton from "./UserButton";
import React, {useContext} from 'react';
import {UserContext} from "../../Context/UserContext";

const Header = () => {
    // hooks
    const navigate = useNavigate();

    // Context
    const [userDetails,] = useContext(UserContext);

    return (
        <>
            <Box component="header" sx={{flexGrow: 1,}}>
                <AppBar position={"fixed"}>
                    <Toolbar>
                        {/*Logo with home button*/}
                        <Button onClick={() => navigate('/')}>
                            <img src={"logo192.png"} alt="logo" width={32}/>
                        </Button>

                        {/*Categories menu*/}
                        <CategoryList/>

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
                                        navigate('/wishlist');
                                    else
                                        navigate('login');
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
            <Box sx={{marginTop: theme => theme.mixins.toolbar.minHeight + 10 + 'px'}}>
                <Outlet/>
            </Box>
        </>
    );
}

export default Header;
