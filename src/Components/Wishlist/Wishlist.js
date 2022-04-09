import React, {useEffect, useState} from 'react';
import ProductListCard from "../Commons/ProductListCard";
import WishListService from "../../api/WishListService";
import {Box, Stack} from '@mui/material';

const Wishlist = () => {

    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        WishListService.getWishList()
            .then(wishlist => {
                setWishlistItems(wishlist);
            })
            .catch(error => console.log(error))
    }, []);
    return (
        <>
            {/* <Stack sx={{
                mt: 2,
                justifyContent: 'center',

            }}>
                <Typography variant='h4' sx={{ textAlign: 'center' }} gutterBottom>Wishlist</Typography>
                <Divider />
            </Stack> */}

            <Stack
                sx={{
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    px: 30,
                    pt: 2,
                    flexGrow: 1

                }} spacing={5}
                direction='row'>
                <Stack
                    spacing={2}
                    sx={{
                        alignItems: 'center',
                        justifyContent: 'center', flexGrow: 1
                    }}
                >
                    {
                        wishlistItems.length > 0 ? (wishlistItems.map((product) =>
                            <Box width='100%' sx={{
                                px: 2
                            }}>
                                <ProductListCard product={product} wishlist/>
                            </Box>
                        )) : ("Wishlist is empty")

                    }
                </Stack>
            </Stack>
        </>

    );
};

export default Wishlist;
