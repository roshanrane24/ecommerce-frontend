import React from 'react';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const Footer = () => {
    return (
        <Paper sx={{backgroundColor: theme => theme.palette.primary.main, height: "100%"}}>
            <Stack
                direction="row"
                sx={{
                    flexGrow: 1,
                    justifyContent: "center",
                    p: 2,
                }}
            >
                <Typography variant="subtitle2" sx={{color: 'primary.contrastText'}}>2021-2022</Typography>
            </Stack>
        </Paper>
    );
};

export default Footer;
