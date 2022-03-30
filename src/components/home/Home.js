import React from "react";
import CategoryBar from "./CategoryBar";
import NewProducts from "./NewProducts";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

const Home = () => {
    return (
        <Stack spacing={1}>
            <Box>
                <Paper>
                    <CategoryBar/>
                </Paper>
            </Box>
            <Stack sx={{paddingX: 2, flexGrow: 1}}>
                <Paper elevation={1} sx={{p: 2}}>
                    <NewProducts/>
                </Paper>
            </Stack>
        </Stack>
    );
}
export default Home;