import React, {useEffect, useState} from 'react';
import {Container} from "@mui/material";
import OrderService from "../../api/OrderService";
import Stack from "@mui/material/Stack";
import OrderCard from "./OrderCard";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        OrderService.getUserOrders()
            .then((response) => {
                console.log(response)
                setOrders(response);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);


    return (
        <Container maxWidth="lg">
            <Stack spacing={2}>
                {
                    orders.map(order => <OrderCard order={order}/>)
                }
            </Stack>
        </Container>
    );
};

export default Orders;
