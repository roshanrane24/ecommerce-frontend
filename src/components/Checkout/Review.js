import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box, Stack, Paper } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

const products = [
    {
        name: "APPLE Watch Series 3 GPS",
        desc: "The Apple Watch Series 3 is a sleek accessory that's a must-have if yo...",
        price: 19850,
        quantity: 1,
        image: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-13-pro-01.jpg'
    },
    {
        name: "APPLE Watch Series 7 GPS MKN63HN/A 45 mm Aluminium Case  (White Strap,...",
        desc: "Attend calls and reply to messages using the GPS model with the latest...",
        price: 44850,
        quantity: 1,
        image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MKUQ3_VW_34FR+watch-45-alum-midnight-cell-7s_VW_34FR_WF_CO?wid=700&hei=700&trim=1%2C0&fmt=p-jpg&qlt=95&.v=1632171067000%2C1631661677000'
    },
];

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];

export default function Review() {
    const [totalPrice, setTotalPrice] = React.useState(0);

    React.useEffect(() => {
        setTotalPrice(0);
        products.map(product => {
            setTotalPrice(prevPrice => prevPrice + (product.price * product.quantity))
            console.log(totalPrice)
        })
    }, []);
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <Box>
                <Stack
                    spacing={2}
                    sx={{
                        justifyContent: 'space-evenly',
                        flexGrow: 1,
                        alignItems: 'flex-start',
                        display: 'flex',
                        px: 5,
                        py: 2
                    }}>
                    {products.map((product) =>
                        <Stack component={Paper}
                            sx={{
                                justifyContent: 'space-around',
                                width: "100%"
                            }} direction="row">
                            <Stack sx={{
                                p: 1,
                                m: 1,
                            }}>
                                <Stack>
                                    {product.name}
                                </Stack>
                                <Stack>
                                    Quantity: {product.quantity}
                                </Stack>
                                <Stack>
                                    <strong> {product.price.toLocaleString('en-IN', {
                                        style: 'currency',
                                        currency: 'INR',
                                        // maximumSignificantDigits: 3
                                    })}
                                    </strong>
                                </Stack>
                            </Stack>
                            <Stack sx={{
                                display: 'flex',
                                flexGrow: 1,
                                alignItems: 'flex-end',
                                justifyContent: 'space-around',
                                pr: 12,
                                ml: 12
                            }}
                                width='70%' >
                                <Box component='img' src={product.image} sx={{
                                    p: 2,
                                    height: 'auto',
                                    width: '150px',

                                }} />
                            </Stack>
                        </Stack>
                    )}
                </Stack>

                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {totalPrice.toLocaleString('en-IN', {
                            style: 'currency',
                            currency: 'INR',
                            // maximumSignificantDigits: 3
                        })}
                    </Typography>
                </ListItem>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Shipping
                    </Typography>
                    <Typography gutterBottom>John Smith</Typography>
                    <Typography gutterBottom>{addresses.join(', ')}</Typography>
                </Grid>
            </Grid>
        </React.Fragment >
    );
}