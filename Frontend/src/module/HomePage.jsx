import React, { useEffect } from 'react';
import ProductListing from './products/ProductListing';
import { useGetProductsQuery } from './appSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Container, Grid, Typography } from '@mui/material';

const HomePage = () => {
    const filterKey = "isTrending";
    const { data: products = {}, isLoading: trendingLoading } = useGetProductsQuery({ filterKey, filterValue: true });
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    return (
        <Container maxWidth="lg" sx={{ py: 4, bgcolor: '#1e1e1e' }}>
            {/* Hero Section */}
            <Box
                sx={{
                    backgroundColor: "#2a2a2a",
                    borderRadius: 4,
                    p: 4,
                    textAlign: "center",
                    mb: 5,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                }}
            >
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{ color: '#FF9021', mb: 1 }}
                >
                    Welcome to Shopping Zone 🛒
                </Typography>
                <Typography variant="h6" sx={{ color: '#ccc' }}>
                    Discover trending deals and new arrivals!
                </Typography>
            </Box>

            {/* Trending Products */}
            <Box>
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ color: '#FF9021', mb: 2 }}
                >
                    🔥 Trending Products
                </Typography>
                {trendingLoading ? (
                    <Box display="flex" justifyContent="center" py={4}>
                        <CircularProgress sx={{ color: "#FF9021" }} />
                    </Box>
                ) : (
                    <Grid container spacing={3} mb={6} sx={{ justifyContent: "center" }}>
                        <ProductListing products={products?.products} />
                    </Grid>
                )}
            </Box>
        </Container>
    );
};

export default HomePage;
