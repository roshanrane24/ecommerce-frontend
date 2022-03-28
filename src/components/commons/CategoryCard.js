import React from 'react';
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";

const CategoryCard = (props) => {
    return (
        <>
            <Paper
                elevation={1}
                sx={{
                    p: 1
                }}
            >
                <Box
                    sx={{
                        p: 1
                    }}
                >
                    <img
                        alt={props.category.name}
                        src={"https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"}
                    />
                </Box>
                <Typography
                    align="center"
                >
                    {props.category.name}
                </Typography>
            </Paper>
        </>
    );
};

export default CategoryCard;