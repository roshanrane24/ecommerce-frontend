import React, {useEffect, useState} from 'react';
import CategoryService from "../../api/CategoryService";
import Grid from "@mui/material/Grid";
import CategoryCard from "../commons/CategoryCard";
import {Paper} from "@mui/material";
import Stack from "@mui/material/Stack";

const CategoryBar = () => {

    // Render Categories
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        CategoryService.getCategoryList()
            .then(response => setCategories(response))
            .catch(response => setCategories(response))
    }, []);


    return (
        <Stack
            direction="row"
            spacing={2}
            justifyContent="space-around"
            alignItems="center"
            sx={{
                maxWidth: "100%",
            }}
        >
            {
                categories.map((category, idx) => <CategoryCard key={idx} category={category}/>)
            }

        </Stack>
    );
};

export default CategoryBar;
