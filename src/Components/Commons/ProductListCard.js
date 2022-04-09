import React, {useState} from 'react';
import {Box, Paper, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import {Add, Close, Favorite, Remove, ShoppingCart} from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import client from "../../api/HttpClient";
import CartService from "../../api/CartService";
import Snackbar from "@mui/material/Snackbar";
import {Link} from 'react-router-dom';
import WishListService from "../../api/WishListService";

const ProductListCard = ({product, order, wishlist, cart, history}) => {
    // States
    const [cartDisabled, setCartDisabled] = useState(false);
    const [saveDisabled, setSaveDisabled] = useState(false);
    const [quantity, setQuantity] = useState(product.quantity);
    const [openBar, setOpenBar] = useState(false);
    const [message, setMessage] = useState("");
    const [render, setRender] = useState(true);

    // Cart Handler
    function increaseCart() {
        setCartDisabled(true);

        // Add one at a time
        let newProduct = product;
        newProduct.quantity = 1;
        CartService.addToCart(newProduct)
            .then(() => {
                setQuantity(quantity => quantity + 1);
                setCartDisabled(false);
            })
            .catch((error) => {
                setCartDisabled(false);
                setMessage(error.response.data ? error.response.data.message : "Error occured while changing cart quantity");
                setOpenBar(true);
            });
    }

    function decreaseCart() {
        setCartDisabled(true);

        // Add one at a time
        let newProduct = product;
        newProduct.quantity = 1;
        CartService.removeFromCart(newProduct)
            .then(async () => {
                await setQuantity(quantity => quantity - 1);

                if (quantity === 0)
                    setRender(false);

                setCartDisabled(false);
            })
            .catch((error) => {
                setCartDisabled(false);
                setMessage(error.response.data ? error.response.data.message : "Error occured while changing cart quantity");
                setOpenBar(true);
            });
    }

    const removeProduct = () => {
        CartService.removeProductFromCart(product.id)
            .then(() => {
                setQuantity(0);
                setRender(false);
            })
            .catch((error) => {
                setMessage(error.response.data ? error.response.data.message : "Error while removing product from cart");
                setOpenBar(true);
            });
    }

    const saveForLater = () => {
        setSaveDisabled(true)
        WishListService.addToWishList(product.id)
            .then(() => {
                CartService.removeProductFromCart(product.id)
                    .then(() => {
                        setRender(false);
                        setSaveDisabled(false)
                    })
                    .catch((error) => {
                        setMessage(error.response.data ? error.response.data.message : "Product added to wishlist.\n Error occured while removing product form cat.");
                        setOpenBar(true);
                        setSaveDisabled(false)
                    });
            })
            .catch(error => {
                setMessage(error.response.data ? error.response.data.message : "Error while adding product in wishlist");
                setOpenBar(true);
                setSaveDisabled(false)
            });
    }

    // Wishlist
    const removeFromWishList = () => {
        WishListService.removeFromWishList(product.id)
            .then(() => {
                console.log("success");
                setRender(false);
            })
            .catch((error) => {
                setOpenBar(true);
                setMessage(error.response.data ? error.response.data.message : "Error occured while removing item from quantity");
            });

    }

    const addInCart = () => {
        setSaveDisabled(true);

        let newProduct = product;
        newProduct.quantity = 1;
        CartService.addToCart(newProduct)
            .then(() => {
                WishListService.removeFromWishList(product.id)
                    .then(() => {
                        setSaveDisabled(false);
                        setRender(false);
                    })
                    .catch(() => {
                        setSaveDisabled(false);
                        setOpenBar(true);
                        setMessage("Product Added in cart.");
                    });

                setCartDisabled(false);
            })
            .catch((error) => {
                setSaveDisabled(false);
                setOpenBar(true);
                setMessage(error.response.data ? error.response.data.message : "Error occured adding item to quantity");
            });
    }

    // Snackbar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenBar(false);
    };

    const action = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
        >
            <Close fontSize="small"/>
        </IconButton>
    );

    if (render) {
        return (
            <Stack
                component={Paper}
                direction="row"
                fullWidth
                sx={{p: 1}}
            >
                <Snackbar
                    open={openBar}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={message}
                    action={action}
                />
                <Stack sx={{flexGrow: 1, p: 1, justifyContent: 'space-between'}}>
                    <Box
                        sx={{
                            width: "70%",
                            "display": "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: wishlist || history ? 1 : 2,
                            "overflow": "clip",
                            textOverflow: "ellipsis",
                        }}
                    >
                        <Link to={`/product/${product.id}`} style={{textDecoration: 'none'}}>
                            <Typography
                                variant={history ? "body1" : "subtitle1"}
                                sx={{
                                    color: 'primary.light',
                                    textDecoration: 'none',
                                    textTransform: 'capitalize',
                                    ":hover": {
                                        textDecoration: 'underline',
                                    }
                                }}
                            >
                                {product.name}
                            </Typography>
                        </Link>
                    </Box>
                    <Stack direction="row">
                        <Stack
                            sx={{flexGrow: 1}}
                            direction={history ? "row" : "column"}
                        >
                            <Stack
                                direction="row"
                                sx={{
                                    alignItems: 'center'
                                }}
                            >
                                <Typography variant="subtitle2">
                                    Price: <strong> {product.price.toLocaleString('en-IN', {
                                    style: 'currency',
                                    currency: 'INR',
                                })}
                                </strong>
                                </Typography>
                                {
                                    wishlist &&
                                    <IconButton
                                        disabled={saveDisabled}
                                        sx={{ml: 2}}
                                        onClick={addInCart}
                                    >
                                        <ShoppingCart fontSize="small"/>
                                    </IconButton>
                                }
                            </Stack>
                            {
                                order &&
                                <Box
                                    sx={{ml: history ? 5 : 0}}
                                >
                                    <Typography variant="subtitle2">
                                        Quantity: <b>{quantity}</b>
                                    </Typography>
                                </Box>
                            }
                            {
                                cart &&
                                <>
                                    <Stack
                                        direction="row"
                                        sx={{
                                            alignItems: 'center',
                                            mt: 1
                                        }}
                                    >
                                        <Stack direction="row" spacing={1} sx={{alignItems: 'center'}}>
                                            <IconButton
                                                disabled={cartDisabled}
                                                sx={{width: 25, height: 25}}
                                                onClick={decreaseCart}
                                            >
                                                <Remove/>
                                            </IconButton>
                                            <TextField
                                                value={quantity}
                                                disabled
                                                size="small"
                                                sx={{
                                                    minWidth: 50,
                                                    maxWidth: 40,
                                                    p: 0,
                                                    m: 0,
                                                }}
                                            />
                                            <IconButton
                                                disabled={cartDisabled}
                                                sx={{width: 25, height: 25}}
                                                onClick={increaseCart}
                                            >
                                                <Add/>
                                            </IconButton>
                                        </Stack>
                                        {
                                            cart &&
                                            <IconButton
                                                disabled={saveDisabled}
                                                sx={{ml: 2}}
                                                onClick={saveForLater}
                                            >
                                                <Favorite fontSize="small"/>
                                            </IconButton>
                                        }
                                    </Stack>
                                </>
                            }
                        </Stack>
                        {
                            (cart || order) &&
                            <Box
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'flex-end'
                                }}
                            >
                                <Typography variant="subtitle2">
                                    SubTotal: <b>{(product.price * quantity).toLocaleString('en-IN', {
                                    style: 'currency',
                                    currency: 'INR',
                                })}</b>
                                </Typography>
                            </Box>
                        }
                    </Stack>
                </Stack>
                <Stack
                    sx={{
                        width: wishlist || history ? 60 : 150,
                        height: wishlist || history ? 70 : 170,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        component='img'
                        src={`${client.defaults.baseURL}/products/image/${product._id ? product._id : product.id}`}
                        sx={{
                            p: 2,
                            height: wishlist || history ? 90 : 150,
                            width: wishlist || history ? 90 : 150,
                            objectFit: "scale-down"
                        }}/>
                </Stack>
                {
                    (wishlist || cart) &&
                    <Stack sx={{justifyContent: 'space-between'}}>
                        <IconButton
                            onClick={cart ? removeProduct : removeFromWishList}
                        >
                            <Close/>
                        </IconButton>
                    </Stack>
                }
            </Stack>
        );
    }
    return null;
};

export default ProductListCard;
