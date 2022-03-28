import React from 'react';
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import {KeyboardArrowDown} from "@mui/icons-material";
import {Button} from "@mui/material";
import Stack from "@mui/material/Stack";

const CategoryCard = (props) => {
    return (
        <>
            <Paper
                elevation={0}
                sx={{p: 1}}
            >
                <Stack
                    direction="row"
                    sx={{
                        p: 1,
                        justifyContent: "center",
                        alignItems: "flex-start",
                        flexGrow: 1
                    }}
                >
                    <img
                        alt={props.category.categoryName}
                        src={"https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"}
                        height={60}
                    />
                </Stack>
                <Button
                    endIcon={<KeyboardArrowDown
                        sx={{
                            ml: -1
                        }}
                    />}
                >
                    <Typography
                        align="center"
                        color="black"
                        variant="subtitle2"
                        sx={{
                            textTransform: "capitalize"
                        }}
                    >
                        {props.category.categoryName}
                    </Typography>
                </Button>
            </Paper>
        </>
    );
};

export default CategoryCard;