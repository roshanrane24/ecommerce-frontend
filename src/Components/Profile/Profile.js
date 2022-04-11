import React, {useEffect, useState} from 'react';
import {Box, Button, Container, Modal, Paper, Stack, TextField} from '@mui/material'
import UserService from '../../api/UserService';
import AddressCard from '../Checkout/AddressCard';
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from "@mui/material/Grid";

const Profile = () => {

    // States
    // Change password form
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordHelperText, setPasswordHelperText] = useState('');
    const [confirmPasswordHelperText, setConfirmPasswordHelperText] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [passwordLoading, setPasswordLoading] = useState(false);

    // User Details Form
    const [userDetails, setUserDetails] = useState({});
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(false);

    // User Address
    const [userAddress, setUserAddress] = useState({});

    // Modal
    const [edit, setEdit] = useState(true)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Snackbar
    const [openBar, setOpenBar] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("info");


    // validate password
    function validatePassword(password) {
        // reset error message
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

    // validate confirm password
    function validateConfirmPassword(confirmPassword) {
        // reset error message
        setConfirmPasswordHelperText('');
        if (password === confirmPassword)
            return true;
        else {
            setConfirmPasswordHelperText("Password and Confirm Password field should match");
            return false;
        }
    }

    // Edit Details
    const editOrSaveDetails = () => {
        if (edit) {
            // Enable name edit
            setEdit(false);
        } else {
            // For animation
            setLoading(true)
            setEdit(true);

            UserService.updateUserDetails({
                firstname: firstName,
                lastname: lastName
            })
                .then(() => {
                        // Success alert
                        setSeverity("success");
                        setMessage("Successfully updated user details.")
                        setOpenBar(true)

                        setEdit(true)
                        setLoading(false)
                    }
                )
                .catch(() => {
                    // Failed alert
                    setSeverity("error");
                    setMessage("Error while updating user details.")
                    setOpenBar(true)

                    setEdit(true)
                    setLoading(false)
                });
        }
    }

    // Update user address state
    function updateUserAddresses() {
        UserService.getSavedAddresses()
            .then(addr => {
                setUserAddress(addr);
            })
            .catch(error => {
                // Failed alert
                setSeverity("error");
                setMessage(error.response.data ? error.response.data.message : "Error while fetching user addresses.")
                setOpenBar(true)
            })
    }

    // Init
    useEffect(() => {
        // Fetch user details
        UserService.getUserDetails()
            .then(user => {
                setUserDetails(user);
            })
            .catch(error => {
                // Failed alert
                setSeverity("error");
                setMessage(error.response.data ? error.response.data.message : "Error while fetching user details.")
                setOpenBar(true)
            })

        updateUserAddresses();
    }, []);

    useEffect(() => {
        if (userDetails.firstname && userDetails.lastname) {
            setFirstName(userDetails.firstname)
            setLastName(userDetails.lastname)
        }
    }, [userDetails]);

    // Snackbar
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway')
            return;

        setOpenBar(false);
        setSeverity("info");
    };

    // Delete address
    function deleteAddress(addressId) {
        UserService.deleteAddress(addressId)
            .then(() => {
                updateUserAddresses();

                // Success alert
                setSeverity("success");
                setMessage("Successfully deleted address.")
                setOpenBar(true)
            })
            .catch(error => {
                // Success alert
                setSeverity("error");
                setMessage(error.response.data ? error.response.data.message : "Successfully deleted address.")
                setOpenBar(true)
            })
    }

    const handleChangePassword = () => {
        setPasswordLoading(true);

        UserService.updateUserPassword({
            oldPassword,
            newPassword: password
        })
            .then(() => {
                // Success alert
                setSeverity("success");
                setMessage("Successfully changed password.")
                setOpenBar(true)

                setPasswordLoading(false);
                handleClose();
            })
            .catch(error => {
                // Failed alert
                setSeverity("error");
                setMessage(error.response.data ? error.response.data.message : "Error while fetching user details.")
                setOpenBar(true)

                setPasswordLoading(false);
            })
    }

    return (
        <Container maxWidth="md">
            <Snackbar open={openBar} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={severity} sx={{width: '100%'}}>
                    {message}
                </Alert>
            </Snackbar>
            <Stack
                component={Paper}
                spacing={1}
                sx={{
                    p: 2, m: 2,
                    flexGrow: 1,
                    alignItems: 'center'
                }}
            >
                <Typography variant="h5" gutterBottom>My Profile</Typography>
                {/*Profile*/}
                <Stack sx={{p: 2, width: "100%"}} spacing={2}>
                    <Stack
                        direction="row"
                        spacing={8}
                        sx={{
                            flexGrow: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: "100%"
                        }}
                        name="firstname"
                    >
                        <Typography> First Name </Typography>
                        <TextField
                            value={firstName}
                            variant='standard'
                            disabled={edit}
                            onChange={event => setFirstName(event.target.value)}
                        />
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={8}
                        sx={{
                            flexGrow: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: "100%"
                        }}
                        name="lastname"
                    >
                        <Typography> Last Name </Typography>
                        <TextField
                            value={lastName}
                            variant='standard'
                            disabled={edit}
                            onChange={event => setLastName(event.target.value)}
                        />
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={5}
                        sx={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            my: 3
                        }}
                    >
                        <LoadingButton
                            loading={loading}
                            variant="contained"
                            size='small'
                            onClick={editOrSaveDetails}
                        >
                            {edit ? "Edit" : "Update"}
                        </LoadingButton>
                        <Button variant="outlined" onClick={handleOpen}>Change Password</Button>
                    </Stack>
                </Stack>
                <Accordion variant={""} sx={{width: "100%"}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Addresses</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container>
                            {
                                Object.keys(userAddress).map((key, index) =>
                                    <Grid item sm={4} key={index}>
                                        <AddressCard address={userAddress[key]}/>
                                        <Button
                                            size="small"
                                            variant="text"
                                            onClick={() => deleteAddress(key)}
                                        >
                                            Delete
                                        </Button>
                                    </Grid>
                                )
                            }
                        </Grid>
                    </AccordionDetails>
                </Accordion>

                {/* Change password */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                >
                    <Box sx={{py: 20, px: 50}}>
                        <Paper sx={{p: 2}} elevation={10}>
                            <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
                                Change Password
                            </Typography>
                            <TextField
                                sx={{mb: 2}}
                                onChange={
                                    event => setOldPassword(event.target.value)
                                }
                                name="oldPassword"
                                label="Old Password"
                                value={oldPassword}
                                type='password'
                                id='oldPassword'
                                fullWidth
                            />
                            <TextField
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                    validatePassword(event.target.value);
                                }}
                                sx={{
                                    mb: 2
                                }}
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={password}
                                error={!!passwordHelperText}
                                helperText={passwordHelperText}
                            />
                            <TextField
                                onChange={(event) => {
                                    setConfirmPassword(event.target.value);
                                    validateConfirmPassword(event.target.value);
                                }}
                                sx={{mb: 2}}
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                error={!!confirmPasswordHelperText}
                                helperText={confirmPasswordHelperText}
                            />
                            <Stack
                                direction="row"
                                sx={{
                                    flexGrow: 1,
                                    justifyContent: 'space-evenly',
                                    alignItems: 'center'
                                }}
                            >
                                <LoadingButton
                                    loading={passwordLoading}
                                    variant={"contained"}
                                    onClick={handleChangePassword}
                                >
                                    Save
                                </LoadingButton>
                                <Button
                                    variant={"outlined"}
                                    onClick={handleClose}
                                >
                                    Cancel
                                </Button>
                            </Stack>
                        </Paper>
                    </Box>
                </Modal>

            </Stack>
            <Stack sx={{
                width: "25%",
                p: 2
            }}>
            </Stack>
        </Container>
    );
};

export default Profile;
