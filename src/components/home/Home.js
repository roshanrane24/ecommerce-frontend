import Container from "@mui/material/Container";
import React from "react";
import CategoryBar from "./CategoryBar";
import NewProducts from "./NewProducts";

const Home = () => {
    return (
        <>
            <Container>
                <CategoryBar/>
                <NewProducts/>
            </Container>
        </>
    );
}
export default Home;