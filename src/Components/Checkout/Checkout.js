import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {ThemeProvider} from '@mui/material/styles';
import AddressForm from './AddressForm';
import Review from './Review';
import {useNavigate} from 'react-router-dom';
import useTheme from "@mui/material/styles/useTheme";
import {CheckOutContext} from "../../Context/CheckOutContext";
import Stack from "@mui/material/Stack";
import OrderService from "../../api/OrderService";
import PaymentWindow from "./PaymentWindow";
import Copyright from "../Commons/Copyright";
import OrderStatus from "./OrderStatus";
import LoadingButton from "@mui/lab/LoadingButton";

// TODO Try completed payment status step
const steps = ['Select Address', 'Review your order', "Process Payment", "Order Status"];

// Checkout component
export default function Checkout() {
    // theme
    const theme = useTheme();

    // Routing
    const navigate = useNavigate();

    // Context
    const checkout = useContext(CheckOutContext);

    // states
    const [activeStep, setActiveStep] = useState(0);
    const [razorpayId, setRazorpayId] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(<div/>);
    const [isLoading, setIsLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    // Cleaning
    const cleanCheckout = () => {
        checkout.clear();
        sessionStorage.removeItem('co');
    };

    // RazorPay Handler Method
    // Success
    const handleSuccess = response => {
        OrderService.updatePaymentDetail({
            transactionId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            paid: true
        })
            .then((result) => {
                // for invoice
                const newResponse = {
                    ...response,
                    order_id: result
                }

                setActiveStep(3);
                setPaymentStatus(<OrderStatus success={newResponse}/>);
            })
            .catch(error => {
                console.log(error.response)
                setActiveStep(3);
                setPaymentStatus(<OrderStatus awaiting={response}/>);
            });

        cleanCheckout();
    };

    // Failure
    const handleFailure = response => {
        console.log(response)
        OrderService.updatePaymentDetail({
            transactionId: response.error.metadata.payment_id,
            razorpayOrderId: response.error.metadata.order_id,
            paid: false
        })
            .then(() => {
                setActiveStep(3);
                setPaymentStatus(<OrderStatus failed={response.error.metadata}/>);
            })
            .catch(() => {
                setActiveStep(3);
                setPaymentStatus(<OrderStatus awaiting={response.error.metadata}/>);
            });
        cleanCheckout();
    };

    const razorPayHandlers = {
        success: handleSuccess,
        failure: handleFailure,
    }

    // Render component based on step
    function getStepContent(step) {
        // Change content
        switch (step) {
            case 0:
                return <AddressForm setDisabled={setButtonDisabled}/>;
            case 1:
                return <Review/>;
            case 2:
                return <PaymentWindow orderId={razorpayId} handlers={razorPayHandlers}/>
            case 3:
                return paymentStatus;
            default:
                throw new Error('Unknown step');
        }
    }

    // Checkout process
    function processCheckout() {
        // Create a order
        OrderService.createOrder({
            products: checkout.products.get,
            billingAddressId: checkout.billing.get.id,
            shippingAddressId: checkout.address.get.id,
        })
            .then(async ({razorpayOrderId}) => {
                // Set razorpayID
                await setRazorpayId(razorpayOrderId);

                // Switch to payment step
                setActiveStep(2);

                //stop animation
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error)
                console.log(error.response);
                setActiveStep(3);

                //stop animation
                setIsLoading(false);
            })
    }

    // Navigation Handler
    const handleNext = () => {
        // start animation
        setIsLoading(true);

        switch (activeStep) {
            case 0:
                if (activeStep === 0 && checkout.address.get === {}) {
                    // TODO Add Alert
                    console.log("Please Select Address");
                } else
                    setActiveStep(1);

                //stop animation
                setIsLoading(false);
                break;
            case 1:
                processCheckout()
                break;
            default:
                throw new Error('Unknown step');
        }
    }

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleCancel = () => {
        if (sessionStorage.getItem('co') === 'cart') {
            // if tried checking out from cart
            navigate('/user/cart');
            sessionStorage.removeItem('co');
        } else if (sessionStorage.getItem('co') === null) {
            // unauthorized
            navigate('/');
        } else if (sessionStorage.getItem('co').length > 0) {
            // if tried checking out using (Buy Now)
            navigate(`/product/${sessionStorage.getItem('co')}`);
            sessionStorage.removeItem('co');
        } else
            // unauthorized
            navigate('/');
    }

    useEffect(() => {
        // authorized access (If refreshed page during checkout)
        if (checkout.products.get.length < 1) {
            handleCancel();
        }
    }, []);


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container component="main" maxWidth="md" sx={{mb: 4}}>
                <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{pt: 3, pb: 5}}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <>
                        {/*Main Components*/}
                        {getStepContent(activeStep)}

                        {/*Buttons*/}
                        <Box
                            sx={{
                                display: activeStep < 2 ? 'flex' : 'none',
                                justifyContent: 'flex-end',
                                alignItems: 'center',

                            }}
                        >
                            {/* Cancel Button*/}
                            <Stack
                                direction="row"
                                sx={{
                                    justifyContent: 'flex-start',
                                    mx: 5,
                                    alignItems: 'center'
                                }}
                            >
                                <Button onClick={handleCancel}>
                                    Cancel
                                </Button>
                            </Stack>
                            {activeStep !== 0 && (
                                <Button
                                    onClick={handleBack}
                                    sx={{mx: 5}}
                                    variant="outlined"
                                >
                                    Back
                                </Button>
                            )}
                            <Box sx={{display: 'block'}}>
                                <LoadingButton
                                    onClick={handleNext}
                                    loading={isLoading}
                                    disabled={buttonDisabled}
                                    loadingPosition="start"
                                    variant="contained"
                                    size="small"
                                    sx={{
                                        width: 180,
                                        p: 1
                                    }}
                                >
                                    {activeStep === 1 ? 'Place order' : 'Next'}
                                </LoadingButton>
                            </Box>
                        </Box>
                    </>
                </Paper>
                <Copyright/>
            </Container>
        </ThemeProvider>
    );
}