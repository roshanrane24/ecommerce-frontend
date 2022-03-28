import React from 'react';
import CategoryService from "../../api/CategoryService";
import Grid from "@mui/material/Grid";
import CategoryCard from "../commons/CategoryCard";
import {Paper} from "@mui/material";
import Stack from "@mui/material/Stack";

const CategoryBar = () => {
    return (
        <Stack
            direction="row"
            spacing={2}
            sx={{
                p: 2,
                overflowX: "scroll"
            }}
            justifyContent="space-evenly"
            alignItems="center"
        >
            {CategoryService.getCategoryList().map(category =>
                <CategoryCard category={category}/>
            )
            }
        </Stack>
    );
};

export default CategoryBar;
