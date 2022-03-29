import React from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";

const ProductCard = (props) => {
    return (
        <>
            <Card sx={{
                maxWidth: 180,
                maxHeight: 350,
                overflow: "hidden",
                textOverflow: "ellipsis",
            }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={`http://localhost:8080/api/products/image/${props.product._id}`}
                    alt={props.product.name}
                />
                <CardContent
                    sx={{
                        width: "100%",
                        display: "flex",
                        overflow: "auto",
                        textOverflow: "ellipsis",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 14,
                            overflow: "hidden",
                        }}
                        color="text.primary"
                        gutterBottom
                    >
                        {props.product.name}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">
                        <Typography sx={{fontSize: 14}} color="text.primary" gutterBottom>
                            {props.product.price}
                        </Typography>
                    </Button>
                </CardActions>

            </Card>
        </>
    );
};

export default ProductCard;
