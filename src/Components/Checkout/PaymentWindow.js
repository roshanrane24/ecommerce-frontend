import React, {useContext, useEffect, useState} from 'react';
import {CheckOutContext} from "../../Context/CheckOutContext";
import useTheme from "@mui/material/styles/useTheme";
import {Box} from "@mui/material";
import Button from "@mui/material/Button";
import AuthService from "../../api/AuthService";

const PaymentWindow = ({orderId, handlers}) => {
    // Context
    const checkout = useContext(CheckOutContext);

    // Theme
    const theme = useTheme();

    // State
    const [id,] = useState(orderId);

    // load script
    const loadScript = (src) => {
        return new Promise((resolve) => {
            // Create Script element
            const script = document.createElement("script");
            script.src = src;

            // Try loading script
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };

            // Load script in element
            document.getElementById('paymentWindow').appendChild(script);
        });
    }


    // Load payment window
    async function displayRazorpay(options) {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on('payment.failed', handlers.failure);
    }

    useEffect(async () => {
        // User Details
        const user = await AuthService.getUserDetails();

        // Options
        const options = {
            "key": "rzp_test_VVOzaRtoIXQGUP",
            "amount": checkout.total.get * 100,
            "currency": "INR",
            "name": "EZZY BUY",
            "description": "Please select your payment method.",
            "order_id": orderId,
            "handler": handlers.success,
            "prefill": {
                "name": user.name,
                "email": user.email,
                "contact": checkout.billing.get.mobileNumber
            },
            "notes": {
                "address": "Opposite Laxmi Chit Fund"
            },
            "theme": {
                "color": theme.palette.primary.main
            },
            "modal": {
                "confirm_close": true
            },
            "retry": {
                "enabled": false
            }
        };

        // Display razorpay window
        displayRazorpay(options);

        // clear total price
        checkout.total.set(0);
    }, []);

    return (
        <Box component="div" id="paymentWindow">
            <Button
                onClick={() => {
                    // Crate response
                    const response = {
                        error: {
                            metadata: {payment_id: "CANCELED", orderId: id}
                        }
                    };

                    // call fail handler
                    handlers.failure(response);
                }}
                sx={{mx: 5}}
                variant="contained"
            >
                Cancel
            </Button>
        </Box>
    );
};

export default PaymentWindow;
