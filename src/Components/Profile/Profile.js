import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

export default function Profile() {
    const [firstName, setFirstName] = useState(""); 
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
  
    const[readOnlyFirstName, setReadOnlyFirstName] = useState(true);
    const[readOnlyLastName, setReadOnlyLastName] = useState(true);
    const[readOnlyEmail, setReadOnlyEmail] = useState(true);
    const [open, setOpen] = useState(false);
    
    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };


    const handleSaveChanges = () => {
        console.log(`${firstName}`);
        console.log(`${lastName}`);
        console.log(`${email}`);
    }


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    useEffect(() => {
        setFirstName("Deepanshu");
        setLastName("Rautela");
        setEmail("deepanshu.mb20@gmail.com");
    }, []);

    return (
    <Stack
      component="form"
      sx={{
            marginTop: '10',
        
      }}
      spacing={2}
      noValidate
      autoComplete="off"
    >
      <TextField
          id="outlined-read-only-input"
          label="First Name"
          defaultValue={firstName}
          InputProps={{
            readOnly: readOnlyFirstName,
          }}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Button variant="contained" onClick={() => setReadOnlyFirstName(prev => !prev)}>Edit</Button>

         <TextField
          id="outlined-read-only-input"
          label="Last Name"
          defaultValue={lastName}
          InputProps={{
            readOnly: readOnlyLastName,
          }}
            onChange={(e) => setLastName(e.target.value)}
        />
        <Button variant="contained" onClick={() => setReadOnlyLastName(prev => !prev)}>Edit</Button>


         <TextField
          id="outlined-read-only-input"
          label="Email"
          defaultValue={email}
          InputProps={{
            readOnly: readOnlyEmail,
          }}
            onChange={(e) => setEmail(e.target.value)}
        />
        <Button variant="contained" onClick={() => setReadOnlyEmail(prev => !prev)}>Edit</Button>

        <Button variant="contained" color="error" onClick={handleSaveChanges}>Save Changes</Button>
        <Button variant="contained" color="success" onClick={handleOpen}>Change Password</Button>


        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={style}>
          <h2 id="parent-modal-title">Change Password</h2>
            <TextField
                id="outlined-read-only-input"
                label="Enter Password"
                type="password"
                onChange={(e) => console.log(e.target.value)}
            />
            <TextField
                id="outlined-read-only-input"
                label="Enter Password"
                type="password"
                onChange={(e) => console.log(e.target.value)}
            />
            <Button variant="contained" color="success">Change Password</Button>
        </Box>
      </Modal>
    </Stack>
  );
}
