import { Card, CardContent, CardMedia, Button, Typography, Grid } from '@mui/material';
import React from 'react'
import { useAddToCartMutation } from '../appSlice';
import { useSelector } from 'react-redux';
import { notifyError, notifySuccess } from '../common/Notifications/constants';

const ProductListing = ({ products, category }) => {

    const { user } = useSelector((state) => state.auth);
    const [addToCart] = useAddToCartMutation();

    const handleAddToCart = async (product) => {

        try {
            if (!user) return alert('Please login first');
            await addToCart({
                userId: user?._id,
                productId: product?._id,
                quantity: 1,
            }).unwrap();
            notifySuccess("Added to cart");
        } catch {
            notifyError("Failed To Add Cart")
        }

    };

    return (
        <>
            <Grid container>
                <Grid sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                    <Typography>{category}</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                {products?.length > 0 ? products?.map((product) => (
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
                )) :
                    <Grid container sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", height: "50vh" }}>
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                            alt="No Products"
                            style={{ width: '150px', opacity: 0.6 }}
                        />
                        <Typography style={{ fontSize: '18px', color: '#666', marginLeft: "10px" }}>No products found</Typography>
                    </Grid>
                }
            </Grid>
        </>
    )
}

export default ProductListing