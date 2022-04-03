import * as React from 'react';
import {useContext, useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import {ThemeProvider} from '@mui/material/styles';
import AddressForm from './AddressForm';
import Review from './Review';
import {Link as RouterLink} from 'react-router-dom';
import useTheme from "@mui/material/styles/useTheme";
import {CheckOutContext} from "../../Context/CheckOutContext";

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <RouterLink to="/">
                <Link color="inherit">
                    EZ-BUY
                </Link>
            </RouterLink>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO Try completed payment status step
const steps = ['Shipping address', 'Review your order'];

function getStepContent(step) {
    switch (step) {
        case 0:
            return <AddressForm/>;
        case 1:
            return <Review/>;
        default:
            throw new Error('Unknown step');
    }
}

// Checkout component
export default function Checkout() {
    // theme
    const theme = useTheme();

    // Context
    const checkout = useContext(CheckOutContext);

    // states
    const [activeStep, setActiveStep] = useState(0);

    // Step Handler
    const handleNext = () => {
        if (activeStep === 0 && checkout.address.get === {}) {
            console.log("Please Select Address")
            return;
        }
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

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
                        {activeStep === steps.length ? (
                            <>
                                <Typography variant="h5" gutterBottom>
                                    Thank you for your order.
                                </Typography>
                                <Typography variant="subtitle1">
                                    Your order number is #2001539. We have emailed your order
                                    confirmation, and will send you an update when your order has
                                    shipped.
                                </Typography>
                            </>
                        ) : (
                            <>
                                {getStepContent(activeStep)}
                                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} sx={{mt: 3, ml: 1}}>
                                            Back
                                        </Button>
                                    )}

                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{mt: 3, ml: 1}}
                                    >
                                        {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                    </Button>
                                </Box>
                            </>
                        )}
                    </>
                </Paper>
                <Copyright/>
            </Container>
        </ThemeProvider>
    );
}