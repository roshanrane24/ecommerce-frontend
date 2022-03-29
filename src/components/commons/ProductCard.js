import React, {useState} from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const ProductCard = (props) => {
    const navigate = useNavigate();
    const [variant, setVariant] = useState("outlined");

    return (
        <>
            <Card
                sx={{
                    maxWidth: 200,
                    minWidth: 200,
                    maxHeight: 300,
                    minHeight: 300,
                    p: 2
                }}
                onMouseOver={() => setVariant("elevation")}
                onMouseLeave={() => setVariant("outlined")}
                onClick={() => navigate(`/product/${props.product._id}`)}
                variant={variant}
                elevation={15}
            >
                <CardMedia
                    component="img"
                    height="200"
                    width="160"
                    image={<img src={`http://localhost:8080/api/products/image/${props.product._id}`} loading="lazy"/>}
                    alt={props.product.name}

                />
                <CardContent
                    sx={{p: 0, width: 170,}}
                    style={{
                        "display": "-webkit-box",
                        "-webkit-line-clamp": "2",
                        "-webkit-box-orient": "vertical",
                        "overflow": "clip",
                        "text-overflow": "ellipsis",
                    }}
                >
                    <Typography
                        sx={{fontSize: 14,}}
                        color="text.primary"
                    >
                        {props.product.name}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Stack sx={{flexGrow: 1}} alignItems="center">
                        <Typography sx={{fontSize: 13}} color="text.primary">
                            {props.product.price.toLocaleString('en-IN', {
                                style: 'currency',
                                currency: 'INR',
                                maximumSignificantDigits: 3,
                            })}
                        </Typography>
                    </Stack>
                </CardActions>

            </Card>
        </>
    );
};

export default ProductCard;
