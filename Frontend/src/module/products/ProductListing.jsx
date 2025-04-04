import { Card, CardContent, CardMedia, Button, Typography, Grid, Grid2 } from '@mui/material';
import React from 'react'
import { useAddToCartMutation } from '../appSlice';
import { useSelector } from 'react-redux';

const ProductListing = ({ products, category }) => {

    const { user } = useSelector((state) => state.auth);   const [addToCart] = useAddToCartMutation();

    const handleAddToCart = async (product) => {
        if (!user) return alert('Please login first');
        await addToCart({
            userId: user?._id,
            productId: product?._id,
            quantity: 1,
        }).unwrap();
        alert('Added to cart!');
    };

    return (
        <>
            <Grid2 container>
                <Grid2 sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                    <Typography>{category}</Typography>
                </Grid2>
            </Grid2>
            <Grid container spacing={2}>
                {products?.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product?._id}>
                        <Card sx={{ maxWidth: 345, margin: 2 }}>
                            <CardMedia component="img" alt={product?.name} height="140" image={product?.image} />
                            <CardContent>
                                <Typography variant="h6" component="div"> {product.title} </Typography>
                                <Typography variant="body2" color="text.secondary"> ${product?.price} </Typography>
                                <Button size="small" variant="contained" color="primary" onClick={() => handleAddToCart(product)}> Add to Cart </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default ProductListing