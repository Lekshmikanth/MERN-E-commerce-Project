import { Card, CardContent, CardMedia, Button, Typography, Grid, CardActions } from '@mui/material';
import React from 'react'
import { useAddToCartMutation } from '../appSlice';
import { useSelector } from 'react-redux';
import { notifyError, notifySuccess, notifyWarn } from '../common/Notifications/constants';

const ProductListing = ({ products, title }) => {

    const { user } = useSelector((state) => state.auth);
    const [addToCart] = useAddToCartMutation();

    const handleAddToCart = async (product) => {

        try {
            if (!user) return notifyWarn('Please login first');
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
                    <Typography variant="h5" fontWeight="bold" gutterBottom>{title}</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={3} mb={6} sx={{ display: "flex", justifyContent: "center" }}>
                {products?.length > 0 ? products?.map((product) => (
                    <Grid key={product?._id}>
                        <Card elevation={3} sx={{ height: "100%", width: "230px", display: "flex", flexDirection: "column", backgroundColor: "#F0F7FF", transition: "0.4s", "&:hover": { backgroundColor: "#BBDEFB" } }}>
                            <CardMedia
                                component="img"
                                height="160"
                                image={`http://localhost:5000/api/products/image/${product?.image}`}
                                alt={product?.name}
                                sx={{ objectFit: "contain", p: 1 }}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom> {product?.name} </Typography>
                                <Typography color="primary" variant="subtitle2"> ₹{product?.price} </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
                                {/* <Button size="small" 
                    // onClick={() => handleViewDetails(product._id)}
                    >
                        View
                    </Button> */}
                                <Button size="small" variant="contained" onClick={() => handleAddToCart(product)}>
                                    Add to Cart
                                </Button>
                            </CardActions>
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