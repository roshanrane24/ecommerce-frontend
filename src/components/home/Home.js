import Container from "@mui/material/Container";
import React from "react";
import CategoryBar from "./CategoryBar";
import NewProducts from "./NewProducts";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

const Home = () => {
    return (
        <>
            <Stack
                spacing={2}
            >
                <Box>
                    <Paper>
                        <CategoryBar/>
                    </Paper>
                </Box>
                <Container maxWidth="xl" disableGutters sx={{paddingX: 1}}>
                    <Paper elevation={1} sx={{p: 2}}>
                        <NewProducts/>
                    </Paper>
                </Container>
            </Stack>
        </>
    );
}
export default Home;