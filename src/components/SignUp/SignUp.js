import { Stack, Box, Typography, Grid, TextField, Button, Link, CssBaseline, Container, Avatar, Alert, AlertTitle, Collapse } from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import AuthService from "../../api/AuthService";
import IconButton from "@mui/material/IconButton";
import { Link as RouterLink, useNavigate, useSearchParams } from "react-router-dom";




const theme = createTheme();
const SignUp = () => {


    const [firstName, setFirstName] = useState('');
    const [firstNameHelperText, setFirstNameHelperText] = useState('');
    const [lastName, setLastName] = useState('');
    const [lastNameHelperText, setLastNameHelperText] = useState('');
    const [email, setEmail] = useState('');
    const [emailHelperText, setEmailHelperText] = useState('');
    const [password, setPassword] = useState('');
    const [passwordHelperText, setPasswordHelperText] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordHelperText, setconfirmPasswordHelperText] = useState('');
    const [errorData, setErrorData] = useState(null);
    const [error, setError] = useState(false);
    const [loginIn, setLoginIn] = useState(false);
    const [searchParams,] = useSearchParams();
    const navigate = useNavigate();


    function validateFirstName() {
        setFirstNameHelperText('');
        if (firstName === "") {
            setFirstNameHelperText("This Field Cannot be Empty")
            return false;
        }
        return true;
    }

    function validatLastName() {
        setLastNameHelperText('');
        if (lastName === "") {
            setLastNameHelperText("This Field Cannot be empty");
            return false;
        }
        return true;
    }

    function validateEmail() {
        setEmailHelperText('');
        if (!(/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email))) {
            setEmailHelperText("Enter a valid email address");
            return false;
        }
        return true;
    }
    function validatePassword() {
        setPasswordHelperText('');

        if (password.length < 8) {
            setPasswordHelperText("Password length must be at least 8 characters");
            return false;
        } else if (password.length > 32) {
            setPasswordHelperText("Password length must not exceed 32 characters");
            return false;
        } else if (!(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@#$%^&,?~_+-=|]).{8,32}$/.test(password))) {
            setPasswordHelperText("Your password must be contain at least 1 number, 1 uppercase & 1 lowercase character & 1 special character.");
            return false;
        }
        return true;
    }

    function validateConfirmPassword() {
        if (password == confirmPassword)
            return true;
        else {
            setconfirmPasswordHelperText("Password and Confirm Password field should match");
            return false;
        }
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if (validateFirstName() && validatLastName() && validateEmail() && validatePassword() && validateConfirmPassword()) {
            const userRegistrationData = {
                firstname: firstName,
                lastname: lastName,
                email: email,
                password: password,

            };
            AuthService.register(userRegistrationData).then(() => {


                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');

                navigate('/login');
            }).catch(error => {
                // Stop loading animation
                setLoginIn(false);

                // Set error message
                let err = { statusCode: error.response.status }

                if (err.statusCode === 401)
                    err.message = "The username or password is incorrect.";
                else
                    err.message = "Error has occured while login";

                // Set Alert
                setErrorData(err);
                setError(true);
            });


        }


    }





    return (

        <ThemeProvider theme={theme}>
            <Stack direction="row"
                sx={{
                    justifyContent: 'flex-end;',
                    flexGrow: 1,
                }}
            >
                <IconButton onClick={() => navigate('/')}>
                    <CloseIcon />
                </IconButton>
            </Stack>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Collapse in={error} sx={{ mb: -6 }}>
                    <Alert
                        severity="error"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => setError(false)}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        <AlertTitle>Error : <strong>{errorData && errorData.statusCode}</strong></AlertTitle>
                        {errorData && errorData.message}
                    </Alert>
                </Collapse>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={submitHandler} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField

                                    fullWidth
                                    label="First Name"
                                    name="firstName"
                                    value={firstName}
                                    onChange={(event) => {
                                        setFirstName(event.target.value);
                                        validateFirstName();
                                    }}
                                    error={firstNameHelperText}
                                    helperText={firstNameHelperText}

                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={(event) => {
                                        setLastName(event.target.value);
                                        validatLastName();
                                    }}
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    value={lastName}
                                    error={lastNameHelperText}
                                    helperText={lastNameHelperText}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={(event) => {
                                        setEmail(event.target.value);
                                        validateEmail();
                                    }}
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    value={email}
                                    error={emailHelperText}
                                    helperText={emailHelperText}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={(event) => {
                                        setPassword(event.target.value);
                                        validatePassword();
                                    }}
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    value={password}
                                    error={passwordHelperText}
                                    helperText={passwordHelperText}

                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={(event) => {
                                        setConfirmPassword(event.target.value);
                                        validateConfirmPassword();
                                    }}
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    error={confirmPasswordHelperText}
                                    helperText={confirmPasswordHelperText}

                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <RouterLink to='/login'>
                                    <Link variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </RouterLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider >

    );
}

export default SignUp;