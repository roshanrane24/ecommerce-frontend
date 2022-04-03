import React, {useEffect, useState} from 'react';
import Card from "@mui/material/Card";

const AddressCard = ({address, selectedAddress}) => {
    // States
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        setSelected(address.id == selectedAddress ? true : false)
    }, [selectedAddress]);


    return (
        <Card
            display='flex'
            flexDirection='row'
            sx={{
                m: 1,
                py: 1,
                px: 1,
                minWidth: 240,
                maxWidth: 300,
                border: selected ? '1px solid' : '0px',
                borderColor: selected ? 'primary.main' : '',
            }}
        >
            <strong> {address.fullName}</strong>
            <p/>
            {address.line1},<br/>
            {address.line2},<br/>
            {address.landmark}, {address.town_city},<br/>
            {address.state}, {address.country}<br/>
            {address.pincode},
            <p/>
            Mobile : {address.mobileNumber}
        </Card>
    );
};

export default AddressCard;
