import React from 'react';
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ProductListCard from "../Commons/ProductListCard";

const OrderCard = ({order}) => {
    return (
        <Paper
            variant="outlined"
            sx={{
                width: "100%",
                p: 1,
            }}
        >
            <Stack
                direction="row"
                sx={{
                    flexGrow: 1,
                    justifyContent: 'space-around'
                }}
            >
                <Typography variant="body2">
                    Order Id : {order.id}
                </Typography>
                <Typography variant="body2">
                    Status : {order.orderStatus}
                </Typography>
            </Stack>
            <Stack spacing={1}>
                {
                    order.itemList.map(product => <ProductListCard product={product} orderHistory/>)
                }
            </Stack>

        </Paper>


    );
};

export default OrderCard;
