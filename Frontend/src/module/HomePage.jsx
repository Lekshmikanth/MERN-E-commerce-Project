import React, { useEffect } from 'react'
import ProductListing from './products/ProductListing'
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, navigate])

    return (
        <>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                {/* Hero Section */}
                <Box
                    sx={{
                        backgroundColor: "#e3f2fd",
                        borderRadius: 4,
                        p: 3,
                        textAlign: "center",
                        mb: 4,
                    }}
                >
                    <Typography variant="h4" fontWeight="bold">
                        Welcome to Shopping Zone 🛒
                    </Typography>
                    <Typography variant="h6" color="text.secondary" mt={1}>
                        Discover trending deals and new arrivals!
                    </Typography>
                </Box>

                {/* Trending Products */}
                {trendingLoading ? (
                    <Box display="flex" justifyContent="center" py={4}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Grid container spacing={3} mb={6} sx={{display: "flex", justifyContent: "center"}}>
                            <ProductListing products={products?.products} title={"🔥 Trending Products"} />
                            {/* {products?.products?.map(renderProductCard)} */}
                    </Grid>
                )}
                {/* <div style={{ padding: "20px" }}>
                </div> */}

                {/* New Arrivals */}
                {/* <Typography variant="h5" fontWeight="bold" gutterBottom>
                    🆕 New Arrivals
                </Typography> */}
                {/* {arrivalsLoading ? (
                    <Box display="flex" justifyContent="center" py={4}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {newArrivals?.products?.map(renderProductCard)}
                    </Grid>
                )} */}
            </Container>

        </>
    )
}

export default HomePage