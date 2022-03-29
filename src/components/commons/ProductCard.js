import React, {useState} from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import {useNavigate} from "react-router-dom";
import Stack from "@mui/material/Stack";

const ProductCard = (props) => {
    // Navigation
    const navigate = useNavigate();

    // For Card Animation
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
                elevation={7}
            >
                <Stack
                    component="div"
                    sx={{
                        height: 200,
                        width: 160,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <CardMedia
                        component="img"
                        height="auto"
                        width="160"
                        image={`http://localhost:8080/api/products/image/${props.product._id}`}
                        alt={props.product.name}
                    />
                </Stack>
                <CardContent
                    sx={{
                        p: 0,
                        width: 170,
                        "display": "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        "overflow": "clip",
                        textOverflow: "ellipsis",
                    }}
                >
                    <Typography sx={{fontSize: 14,}} color="text.primary">
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
