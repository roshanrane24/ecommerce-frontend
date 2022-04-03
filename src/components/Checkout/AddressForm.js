import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {
    Button,
    Box,
    Card,
    FormControl,
    FormLabel,
    Radio,
    RadioGroup
} from '@mui/material';
const ADDR = [
    {
        _id: 2090568637,
        type_address: "HOME",
        country: "INDIA",
        state: "Rajasthan",
        fullName: "Aman Gangwar",
        mobile_number: 7068398252,
        pincode: 302022,
        line1: "Sitapura",
        line2: "Amravati",
        landmark: "Near Bank of India",
        town_city: "Jaipur"
    },
    {
        _id: 2090568638,
        type_address: "HOME",
        country: "INDIA",
        state: "Rajasthan",
        fullName: "Aman Gangwar",
        mobile_number: 7068398252,
        pincode: 302022,
        line1: "Sitapura",
        line2: "Amravati",
        landmark: "Near Bank of India",
        town_city: "Jaipur"
    }
]

export default function AddressForm() {
    const [fullName, setFullName] = React.useState('');
    const [address1, setAddress1] = React.useState('');
    const [address2, setAddress2] = React.useState('');
    const [landmark, setLandmark] = React.useState('');
    const [city, setCity] = React.useState('');
    const [state, setState] = React.useState('');
    const [pinCode, setPinCode] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [show, setShow] = React.useState(false);
    const [radioValue, setRadioValue] = React.useState('');
    const [address, setAddress] = React.useState(ADDR)

    return (
        <React.Fragment>
            <Box sx={
                {
                    mb: 2,
                    p: 2
                }
            }>
                <FormControl>
                    <FormLabel id='address-group-label'>
                        Addresses:
                    </FormLabel>
                    <RadioGroup name='address-group' aria-labelledby='address-group-label' value={radioValue}
                        onChange={(event) => {
                            setRadioValue(event.target.value)
                            console.log(radioValue)
                        }} row>

                        {
                            address.map((key) => (
                                <FormControlLabel control={<Radio />}
                                    label={<Card sx={{
                                        mb: 2, p: 1
                                    }} display='flex'
                                        flexDirection='row'>
                                        <strong> {key.fullName}</strong>
                                        <br />
                                        {key.line1},
                                        <br />
                                        {key.line2},
                                        <br />
                                        {key.landmark},
                                        <br />
                                        {key.town_city},
                                        <br />
                                        {key.pincode},
                                        <br />
                                        {key.state},
                                        <br />
                                        {key.country}.
                                    </Card>}
                                    value={key._id} />
                            ))}
                    </RadioGroup>
                </FormControl>
            </Box>

            <Button variant='contained' onClick={() => setShow(prev => !prev)}>Add Address</Button>
            {show && <Box component='form'  >
                <Typography variant="h6" gutterBottom>
                    Shipping address
                </Typography>
                <Grid container spacing={3}  >
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="fullName"
                            name="fullName"
                            label="Full name"
                            fullWidth
                            autoComplete="given-name"
                            variant="standard"
                            onChange={(event) => {
                                setFullName(event.target.value)
                            }}
                            value={fullName}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            required
                            id="address1"
                            name="address1"
                            label="Address line 1"
                            fullWidth
                            autoComplete="shipping address-line1"
                            variant="standard"
                            onChange={(event) => {
                                setAddress1(event.target.value)
                            }}
                            value={address1}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="address2"
                            name="address2"
                            label="Address line 2"
                            fullWidth
                            autoComplete="shipping address-line2"
                            variant="standard"
                            onChange={(event) => {
                                setAddress2(event.target.value)
                            }}
                            value={address2}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField

                            id="landmark"
                            name="landmark"
                            label="Landmark"
                            fullWidth
                            autoComplete="shipping landmark"
                            variant="standard"
                            onChange={(event) => {
                                setLandmark(event.target.value)
                            }}
                            value={landmark}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="city"
                            name="city"
                            label="City"
                            fullWidth
                            autoComplete="shipping address-level2"
                            variant="standard"
                            onChange={(event) => {
                                setCity(event.target.value)
                            }}
                            value={city}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="state"
                            name="state"
                            label="State"
                            fullWidth
                            variant="standard"
                            onChange={(event) => {
                                setState(event.target.value)
                            }}
                            value={state}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="pinCode"
                            name="pinCode"
                            label="Pin code"
                            fullWidth
                            autoComplete="shipping pin-code"
                            variant="standard"
                            onChange={(event) => {
                                setPinCode(event.target.value)
                            }}
                            value={pinCode}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="country"
                            name="country"
                            label="Country"
                            fullWidth
                            autoComplete="shipping country"
                            variant="standard"
                            onChange={(event) => {
                                setCountry(event.target.value)
                            }}
                            value={country}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                            label="Use this address for payment details"
                        />
                    </Grid>
                    <Grid item xs={6}
                        fullWidth>
                        <Button variant='contained' onClick={() => {
                            const newAddress = {
                                _id: 2090568639,
                                country: country,
                                state: state,
                                fullName: fullName,
                                pincode: pinCode,
                                line1: address1,
                                line2: address2,
                                landmark: landmark,
                                town_city: city
                            }
                            console.log(newAddress)
                            setAddress([...address, newAddress])
                            setFullName('');
                            setAddress1('');
                            setAddress2('');
                            setLandmark('');
                            setCity('');
                            setPinCode('');
                            setState('');
                            setCountry('');



                        }}>Add</Button>
                    </Grid>
                </Grid>
            </Box>}
        </React.Fragment >
    );
}