import Container from "@mui/material/Container";
import React from "react";
import CategoryBar from "./CategoryBar";
import NewProducts from "./NewProducts";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

const Home = () => {
    return (
        <>
            <Box>
                <Paper>
                    <CategoryBar/>
                </Paper>
            </Box>
            <NewProducts/>
        </>
    );
}
export default Home;