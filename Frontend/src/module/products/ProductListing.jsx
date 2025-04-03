import { Card, CardContent, CardMedia, Button, Typography, Grid, Grid2 } from '@mui/material';
import React from 'react'

const ProductListing = ({ products, category }) => {
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
                                <Button size="small" variant="contained" color="primary" onClick={() => alert('Added to cart')}> Add to Cart </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default ProductListing