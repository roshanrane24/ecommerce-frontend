import { useState, useEffect } from 'react';
import { Button, Paper, Stack, TextField, Typography, Modal, Box } from '@mui/material'
import UserService from '../../api/UserService';
import AddressCard from '../Checkout/AddressCard';
const Profile = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordHelperText, setPasswordHelperText] = useState('');
    const [confirmPasswordHelperText, setConfirmPasswordHelperText] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [userDetails, setUserDetails] = useState({});
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userAddress, setUserAddress] = useState({});
    const [edit, setEdit] = useState(true)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        UserService.getUserDetails().
            then(user => {
                setUserDetails(user);
            })
        UserService.getSavedAddresses().
            then(addr => {
                setUserAddress(addr);

            })
    }, []);

    useEffect(() => {
        if (userDetails.firstname && userDetails.lastname) {

            setFirstName(userDetails.firstname)
            setLastName(userDetails.lastname)
        }
    }, [userDetails]);

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
    return (
        <Stack component={Paper} sx={{
            p: 2,
            m: 2,
            ml: 50,
            flexGrow: 1,
            width: "50%",


        }} direction='row'>
            <Stack sx={{
                width: "25%",
                p: 2
            }}>
                <TextField value={firstName} variant='standard' disabled={edit} onChange={event => {
                    setFirstName(event.target.value)
                }} />
                <TextField value={lastName} variant='standard' disabled={edit} onChange={
                    event => setLastName(event.target.value)
                } />
                <Stack sx={{
                    pt: 2
                }} direction='row'>
                    {
                        Object.keys(userAddress).map((keys, index) => {
                            return <AddressCard address={userAddress[keys]} key={index} />
                        })
                    }
                </Stack>
                <Button onClick={handleOpen}>Change Password</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}>
                        <TextField
                            sx={{
                                mb: 2
                            }}
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
                            error={passwordHelperText}
                            helperText={passwordHelperText}
                        />
                        <TextField
                            onChange={(event) => {
                                setConfirmPassword(event.target.value);
                                validateConfirmPassword(event.target.value);
                            }}
                            sx={{
                                mb: 2
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
                        <Button onClick={() => {

                            UserService.updateUserPassword({ oldPassword, newPassword: password }).then(response => {
                                console.log(response);
                                handleClose();
                            }).catch(error => {
                                console.log(error.response);
                            })
                        }}>
                            Save
                        </Button>
                    </Box>
                </Modal>

            </Stack>
            <Stack sx={{
                width: "25%",
                p: 2
            }}>
                <Button variant='text' size='small' onClick={(event) => {
                    setEdit(false);
                    if (edit === false) {

                        UserService.updateUserDetails({ firstname: firstName, lastname: lastName }).then(
                            response => {
                                console.log(response)
                                setEdit(true)
                            }
                        )
                    }
                }}>edit</Button>
            </Stack>


        </Stack >
    );
};

export default Profile;
