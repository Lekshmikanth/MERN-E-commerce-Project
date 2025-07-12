import {
    Card,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Grid,
    CardActions,
    IconButton,
    Tooltip,
} from '@mui/material';
import React, { useState } from 'react';
import { useAddToCartMutation } from '../appSlice';
import { useSelector } from 'react-redux';
import {
    notifyError,
    notifySuccess,
    notifyWarn,
} from '../common/Notifications/constants';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ProductListing = ({ products, title }) => {
    const { user } = useSelector((state) => state.auth);
    const [addToCart] = useAddToCartMutation();
    const [wishlist, setWishlist] = useState([]);

    const handleAddToCart = async (product) => {
        try {
            if (!user) return notifyWarn('Please login first');

            await addToCart({
                userId: user?._id,
                productId: product?._id,
                quantity: 1,
            }).unwrap();

            notifySuccess('Added to cart');
        } catch {
            notifyError('Failed To Add Cart');
        }
    };

    const handleWishListButton = (id) => {
        if (wishlist?.includes(id)) {
            setWishlist(prev => prev?.filter(item => item !== id));
            notifySuccess('Removed From Wishlist');
        } else {
            setWishlist(prev => [...prev, id]);
            notifySuccess('Added To Wishlist');
        }
    };

    return (
        <>
            {title && (
                <Grid container>
                    <Grid
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            mb: 2,
                        }}
                    >
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            sx={{ color: '#FF9021' }}
                            gutterBottom
                        >
                            {title}
                        </Typography>
                    </Grid>
                </Grid>
            )}

            <Grid
                container
                spacing={3}
                mb={6}
                sx={{ display: 'flex', justifyContent: 'center' }}
            >
                {products?.length > 0 ? (
                    products.map((product) => (
                        <Grid item key={product?._id}>
                            <Card
                                elevation={3}
                                sx={{
                                    height: '100%',
                                    width: 230,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    bgcolor: '#2a2a2a',
                                    color: '#fff',
                                    transition: '0.3s',
                                    borderRadius: 2,
                                    position: 'relative',
                                    '&:hover': {
                                        boxShadow: '0 0 10px rgba(255, 144, 33, 0.6)',
                                    },
                                }}
                            >
                                {/* Wishlist Toggle (UI only) */}
                                <Tooltip title={wishlist?.includes(product?._id) ? "Remove fro wishlist" : "Add to wish list"}>
                                    <IconButton
                                        onClick={() => handleWishListButton(product._id)}
                                        sx={{
                                            position: 'absolute',
                                            top: 8,
                                            right: 8,
                                            color: wishlist?.includes(product._id) ? '#FF9021' : '#fff',
                                            bgcolor: '#1e1e1e',
                                            '&:hover': {
                                                bgcolor: '#CC711A',
                                                color: '#fff',
                                            },
                                        }}
                                    >
                                        {wishlist?.includes(product._id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                    </IconButton>
                                </Tooltip>

                                {/* Image */}
                                <CardMedia
                                    component="img"
                                    height="160"
                                    image={`http://localhost:5000/api/products/image/${product?.image}`}
                                    alt={product?.name}
                                    sx={{ objectFit: 'contain', p: 1 }}
                                />

                                {/* Name & Price */}
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight="bold"
                                        gutterBottom
                                        sx={{ color: '#fff' }}
                                    >
                                        {product?.name}
                                    </Typography>
                                    <Typography variant="subtitle2" sx={{ color: '#FF9021' }}>
                                        ₹{product?.price}
                                    </Typography>
                                </CardContent>

                                {/* Button */}
                                <CardActions
                                    sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}
                                >
                                    <Button
                                        size="small"
                                        variant="contained"
                                        onClick={() => handleAddToCart(product)}
                                        sx={{
                                            bgcolor: '#FF9021',
                                            color: '#fff',
                                            fontWeight: 'bold',
                                            textTransform: 'none',
                                            '&:hover': {
                                                bgcolor: '#CC711A',
                                            },
                                        }}
                                    >
                                        Add to Cart
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Grid
                        container
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: '50vh',
                        }}
                    >
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                            alt="No Products"
                            style={{ width: '150px', opacity: 0.6 }}
                        />
                        <Typography
                            style={{ fontSize: '18px', color: '#999', marginTop: '10px' }}
                        >
                            No products found
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </>
    );
};

export default ProductListing;
