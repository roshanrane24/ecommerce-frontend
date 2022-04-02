import {
    Box,
    Button,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarIcon from "@mui/icons-material/Star";
import ProductService from "../../api/ProductService";
import {useNavigate, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from 'react';
import client from "../../api/HttpClient";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import AuthService from "../../api/AuthService";
import {CheckOutContext} from "../../Context/CheckOutContext";

const ProductPage = () => {
    // Theme
    const ThemeButton = createTheme({
        palette: {
            primary: {
                main: "#b71c1c"
            }
        }
    });

    const ThemeIncl = createTheme({
        palette: {
            primary: {
                main: "#9e9e9e"
            }
        }
    });

    // Context
    const checkout = useContext(CheckOutContext);

    // Routing
    const navigate = useNavigate();
    const params = useParams()

    // States
    const [productDetails, setProductDetails] = useState(null);
    const [wishlistIcon, setWishlistIcon] = useState(<FavoriteBorder/>);

    // Product details handler
    const getProductDetails = () => {
        ProductService.getProductDetails(params.product_id).then((result) => {
            setProductDetails(result)
        })
    }

    // Wishlist handler
    const toggleWishList = () => {
        if (ProductService.productInWishlist()) {
            ProductService.addToWishList().then(() =>
                setWishlistIcon(<Favorite/>)
            )
        } else {
            // Remove to wishlist
            ProductService.removeToWishList().then(() =>
                setWishlistIcon(<FavoriteBorder/>)
            );
        }
    }


    // init
    useEffect(() => {
        // Product details
        getProductDetails();

        // wishlist
        if (ProductService.productInWishlist()) {
            setWishlistIcon(<Favorite/>);
        }
    }, []);

    return (
        <Stack
            direction="row"
            spacing={5}
            sx={{
                justifyContent: 'space-around',
                flexGrow: 1,
                alignItems: 'flex-start',
                display: 'flex',
                px: 5,
                py: 2
            }}
        >
            {
                productDetails &&
                <>
                    {/*Product Image*/}
                    <Box
                        sx={{
                            minWidth: '40vw',
                            minHeight: '90vh',
                            position: "-webkit-sticky"
                        }}
                    >
                        <Paper
                            sx={{
                                p: 3,
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            <Stack
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Box component="img"
                                     src={`${client.defaults.baseURL}/products/image/${productDetails.id}`}/>
                            </Stack>
                        </Paper>
                    </Box>

                    {/*Product Description*/}
                    <Box
                        sx={{
                            textAlign: 'left',
                            minWidth: '30vw',
                            maxWidth: '60vw',
                            maxHeight: '90vh',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            overflowY: 'scroll',
                            msOverflowStyle: 'none',
                            px: 3,
                            "::-webkit-scrollbar": {
                                display: 'none'
                            }
                        }}
                    >
                        <Stack
                            direction="row"
                        >
                            <Typography
                                variant="h6"
                                gutterBottom
                                sx={{
                                    flexGrow: 1,
                                    paddingRight: 5,
                                }}
                            >
                                {productDetails.name}
                            </Typography>
                            <IconButton
                                sx={{
                                    p: 2,
                                    width: 10,
                                    height: 10,
                                }}
                                onClick={() => toggleWishList()}
                            >
                                {wishlistIcon}
                            </IconButton>
                        </Stack>
                        <Typography variant="h4" sx={{mt: 1, fontWeight: "bold"}}>
                            {productDetails.price.toLocaleString('en-IN', {
                                style: 'currency',
                                currency: 'INR',
                                maximumSignificantDigits: 3
                            })}
                        </Typography>
                        <ThemeProvider theme={ThemeIncl}>
                            <Typography gutterBottom sx={{color: "primary.main", textTransform: "capitalize", mb: 1}}>
                                inclusive of all taxes
                            </Typography>
                        </ThemeProvider>
                        <Button
                            variant="contained"
                            endIcon={<StarIcon/>}
                            color="success"
                            size="small"
                            disableElevation
                            disableRipple
                            sx={{mt: 2}}
                        >
                            {productDetails.rating}
                        </Button>
                        <ThemeProvider theme={ThemeButton}>
                            <Stack
                                direction="row"
                                spacing={2}
                                display="block"
                                sx={{my: 3}}
                            >
                                <Button variant="contained" endIcon={<ShoppingCartIcon/>}
                                        onClick={() => {
                                            // validate user to checkout else login
                                            if (AuthService.getUserDetails()) {
                                                navigate(`/checkout`);

                                                // set contex details
                                                checkout.products.set(products => [...products, productDetails]);
                                            } else {
                                                navigate(`/login?ref=/product/${productDetails.id}`);
                                            }
                                        }}>
                                    Buy Now
                                </Button>
                                <Button variant="outlined" endIcon={<AddShoppingCartIcon/>}>
                                    Add to Cart
                                </Button>
                            </Stack>
                        </ThemeProvider>
                        <Typography variant="subtitle1" sx={{fontWeight: "bold"}} gutterBottom>Description</Typography>
                        <Typography variant="body2" gutterBottom sx={{mb: 5}}>
                            <p>
                                {Object.values(productDetails.description)}
                            </p>
                        </Typography>
                        <TableContainer component={Paper} disableElevation>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell colSpan={2}>
                                            <Typography
                                                variant="subtitle1"
                                                sx={{fontWeight: "bold"}}
                                            >
                                                Highlights
                                            </Typography>

                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        Object.keys(productDetails.additionalDetails).map((key) => (
                                            <TableRow
                                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                            >
                                                <TableCell
                                                    sx={{
                                                        textTransform: 'capitalize'
                                                    }}
                                                >
                                                    <Typography
                                                        variant="body2"
                                                        sx={{fontWeight: "bold"}}
                                                    >
                                                        {key}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2">
                                                        {productDetails.additionalDetails[key]}
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </>
            }
            {
                !productDetails &&
                <Backdrop
                    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                    open={!productDetails}
                >
                    <CircularProgress color="inherit"/>
                </Backdrop>
            }
        </Stack>
    );
};

export default ProductPage;
