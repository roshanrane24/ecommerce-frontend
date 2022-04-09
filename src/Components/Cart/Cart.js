import React, { useEffect, useState } from 'react';
import CartService from "../../api/CartService";
import ProductListCard from "../Commons/ProductListCard";
import { Stack, Box, Paper, Button } from '@mui/material';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AuthService from '../../api/AuthService';
const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        CartService.getShoppingCart()
            .then(cart => {
                setCartItems(cart);
                console.log(cart)
            })
            .catch(error => console.log(error))
    }, []);
    return (
        <>
            <Stack
                sx={{
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    px: 30,
                    pt: 2,
                    flexGrow: 1

                }} spacing={5}
                direction='row' >
                <Stack spacing={2}
                    sx={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexGrow: 1,
                        width: "75%"
                    }}>
                    {
                        cartItems.length > 0 ? (cartItems.map((product) =>
                            <Box width='100%' sx={{
                                px: 2
                            }}>
                                <ProductListCard product={product} cart />
                            </Box>
                        )) : ("Cart is empty")

                    }
                </Stack>
                <Stack
                    sx={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexGrow: 1,
                        width: "25%"
                    }}>
                    <Box component={Paper}>
                        order Summary
                    </Box>

                    <Button
                        variant="contained"
                        endIcon={<ShoppingCartIcon />}
                    // onClick={() => {
                    //     // validate user to checkout else Login
                    //     if (AuthService.getUserDetails()) {
                    //         // set single quantity
                    //         productDetails.quantity = quantity;

                    //         // for failed redirection
                    //         sessionStorage.setItem('co', productDetails.id);

                    //         // set contexr details & navigate
                    //         checkout.products.set([productDetails]);
                    //         navigate(`/checkout`);
                    //     } else {
                    //         navigate(`/login?ref=/product/${productDetails.id}`);
                    //     }
                    // }}
                    // disabled={buyButtonState}
                    >
                        Buy Now
                    </Button>
                </Stack>
            </Stack >
        </>


    );
};

export default Cart;
