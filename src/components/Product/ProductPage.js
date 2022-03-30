import { Box, Typography, Button, Stack, Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarIcon from "@mui/icons-material/Star";
import ProductService from "../../api/ProductService";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

const ProductPage = (props) => {
    const navigate = useNavigate();
    const [productDetails, setproductDetails] = useState(null);

    const params = useParams()
    const getProductDetails = () => {
        ProductService.getProductDetails(params.product_id).then((result) => {
            setproductDetails(result)
        })
        console.log(params);

    }
    useEffect(() => {
        getProductDetails();
    }, []);
    const themeButton = createTheme({
        palette: {
            primary: {
                main: "#b71c1c"
            }
        }
    });
    const themeIncl = createTheme({
        palette: {
            primary: {
                main: "#9e9e9e"
            }
        }
    });
    return (
        <Stack
            sx={{ p: "8" }}
            direction="row"
            justifyContent="space-evenly"
            spacing={2}
            flexGrow="1"
            alignItems="flex-start"
            display="flex"
        >
            {
                productDetails &&
                <>
                    <Box
                        sx={{
                            // backgroundColor: "primary.main",
                            minWidth: "500px",
                            minHeight: "500px",
                            m: "2px"
                        }}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <img
                            src={`http://localhost:8080/api/products/image/${productDetails.id}`}
                            alt={productDetails.name}
                            width="auto"
                            height="auto"
                        />
                    </Box>

                    <Box
                        sx={{
                            // backgroundColor: "primary.main",
                            textAlign: "left",
                            minWidth: "500px",
                            minHeight: "500px",
                            m: "2px",
                            padding: "16px"
                        }}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Typography variant="h5" gutterBottom>
                            {productDetails.name}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            {productDetails.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumSignificantDigits: 3 })}
                        </Typography>
                        <ThemeProvider theme={themeIncl}>
                            <Typography gutterBottom sx={{ color: "primary.main" }}>
                                inclusive of all taxes
                            </Typography>
                        </ThemeProvider>
                        <Button
                            variant="contained"
                            endIcon={<StarIcon />}
                            color="success"
                            size="small"
                            disableElevation
                            disableRipple
                            sx={{ mb: "16px" }}
                        >
                            {productDetails.rating}
                        </Button>
                        <ThemeProvider theme={themeButton}>
                            <Stack
                                direction="row"
                                spacing={2}
                                display="block"
                                sx={{ mb: "16px" }}
                            >
                                <Button variant="contained" endIcon={<ShoppingCartIcon />} onClick={() => navigate(`/checkout/${productDetails.id}`)}>
                                    Buy Now
                                </Button>
                                <Button variant="outlined" endIcon={<AddShoppingCartIcon />}>
                                    Add to Cart
                                </Button>
                            </Stack>
                        </ThemeProvider>
                        <Typography sx={{ fontWeight: "bold" }}>Description</Typography>
                        <Typography><li>{Object.values(productDetails.description)}</li></Typography>
                        <TableContainer component={Paper} disableElevation>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Highlights</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        Object.keys(productDetails.additionalDetails).map((key) => (
                                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell sx={{
                                                    textTransform: 'capitalize'
                                                }}>{key}</TableCell>
                                                <TableCell>{productDetails.additionalDetails[key]}</TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </>
            }
        </Stack >
    );
};

export default ProductPage;
