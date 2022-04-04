import React from 'react';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                mt: 'auto',
            }}
        >
            <Paper
                sx={{
                    mt: 2,
                    py: 1,
                    px: 2,
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[300]
                            : theme.palette.grey[800]
                }}
            >
                <Stack
                    direction="row"
                    sx={{
                        flexGrow: 1,
                        justifyContent: "center",
                        p: 2,
                    }}
                >
                    <Typography variant="subtitle2" sx={{color: 'text'}}>2021-2022</Typography>
                </Stack>
            </Paper>
        </Box>
    );
};

export default Footer;
