
import React from "react";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  FormControlLabel, 
  Checkbox,
  Avatar,
  Link
} from "@mui/material";
import { useState } from "react";


const Login = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto"
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    alert(`Email : ${email} Password : ${password}`);
  }

  const btnstyle = { margin: "8px 0" };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">

          <h2>Sign In</h2>
        </Grid>
        <TextField
          label="Username"
          fullWidth
          type={"email"}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
          onClick={handleSubmit}
        >
          Sign in
        </Button>
        <Typography>
          <Link href="#">Forgot password ?</Link>
        </Typography>
        <Typography>
          {" "}
          Do you have an account ?<Link href="/register">Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;

