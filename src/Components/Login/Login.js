import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import LoadingButton from '@mui/lab/LoadingButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Link as RouterLink, useNavigate, useSearchParams} from "react-router-dom";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Copyright from "./Copyright";
import CloseIcon from '@mui/icons-material/Close';
import AuthService from "../../api/AuthService";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Collapse from "@mui/material/Collapse";


const Login = () => {
    // states
    const [email, setEmail] = useState("");
    const [emailHelperText, setEmailHelperText] = useState("");
    const [password, setPassword] = useState("");
    const [passwordHelperText, setPasswordHelperText] = useState("");
    const [loginIn, setLoginIn] = useState(false);
    const [alertData, setAlertData] = useState(null);
    const [alert, setAlert] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState("info");
    const [searchParams,] = useSearchParams();

    // Navigation
    const navigate = useNavigate();

    // Submission
    const handleSubmit = (event) => {
        event.preventDefault();

        // Form Data
        let data = new FormData(event.currentTarget)
        data = {
            email: data.get('email'),
            password: data.get('password'),
        }

        // When validated
        if (validateEmail(data.email) && validatePassword(data.password)) {

            // animations
            setLoginIn(true);
            setAlertData(null)

            // Login Request
            AuthService.login(data)
                .then(() => {
                    // Show Alert
                    setAlertSeverity("success");
                    setAlertData({message: "You have successfully logged in."});
                    setAlert(true);
                    setLoginIn(false);

                    // Redirection
                    setTimeout(() => {
                        // check if to redirect
                        if (searchParams.get('ref')) {
                            navigate(searchParams.get('ref'));
                            return;
                        }
                        // Redirect to Home
                        navigate('/');
                    }, 1000);
                })
                .catch(error => {
                    // Stop loading animation
                    setLoginIn(false);

                    // Set error message
                    let err = {statusCode: error.response.status}

                    if (err.statusCode === 401)
                        err.message = "The username or password is incorrect.";
                    else
                        err.message = "Error has occured while Login";

                    // Set Alert
                    setAlertSeverity("error");
                    setAlertData(err);
                    setAlert(true);
                });
        }
    };

    // Validation
    function validatePassword(password) {
        // Reset error
        setPasswordHelperText("");

        // Password validations
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

    function validateEmail(email) {
        // Reset Error
        setEmailHelperText("");

        // Email Validation
        if (!(/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email))) {
            setEmailHelperText("Enter a valid email address");
            return false;
        }
        return true;
    }

    return (
        <>
            <Stack direction="row"
                   sx={{
                       justifyContent: 'flex-end;',
                       flexGrow: 1,
                   }}
            >
                <IconButton onClick={() => navigate('/')}>
                    <CloseIcon/>
                </IconButton>
            </Stack>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Collapse in={alert} sx={{mb: -6}}>
                    <Alert
                        severity={alertSeverity}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => setAlert(false)}
                            >
                                <CloseIcon fontSize="inherit"/>
                            </IconButton>
                        }
                        sx={{mb: 2}}
                    >
                        <AlertTitle sx={{textTransform: 'capitalize'}}>{alertData && alertSeverity}</AlertTitle>
                        {alertData && alertData.message}
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
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            error={emailHelperText}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                                validateEmail(event.target.value);
                            }}
                            helperText={emailHelperText}
                        />
                        <TextField
                            error={passwordHelperText}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                                validatePassword(event.target.value);
                            }}
                            helperText={passwordHelperText}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <LoadingButton
                            loading={loginIn}
                            loadingPosition="start"
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </LoadingButton>
                        <Grid container>
                            <Grid item xs>
                                <RouterLink to='/forgot'>
                                    <Link variant="body2">
                                        Forgot password?
                                    </Link>
                                </RouterLink>
                            </Grid>
                            <Grid item>
                                <RouterLink to={`/signup?ref=${searchParams.get('ref')}`}>
                                    <Link variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </RouterLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{mt: 8, mb: 4}}/>
            </Container>
        </>
    );
}

export default Login;