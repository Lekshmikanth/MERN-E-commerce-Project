import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent } from '@mui/material';

const AboutPage = () => {
    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                About Us
            </Typography>
            <Typography variant="body1" paragraph>
                Welcome to ShopSmart! We’re your one-stop destination for the best deals on electronics, fashion, home appliances, and more.
                Our mission is to deliver quality products at unbeatable prices, right to your doorstep.
            </Typography>

            <Typography variant="h5" sx={{ mt: 4 }}>
                Why Choose Us?
            </Typography>

            <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6}>
                    <Card elevation={3}>
                        <CardContent>
                            <Typography variant="h6">Wide Range of Products</Typography>
                            <Typography variant="body2">
                                From gadgets to groceries – we’ve got it all.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card elevation={3}>
                        <CardContent>
                            <Typography variant="h6">Secure Payments</Typography>
                            <Typography variant="body2">
                                Shop with confidence using trusted payment gateways.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card elevation={3}>
                        <CardContent>
                            <Typography variant="h6">Fast Delivery</Typography>
                            <Typography variant="body2">
                                Get your orders delivered quickly and safely.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card elevation={3}>
                        <CardContent>
                            <Typography variant="h6">24/7 Customer Support</Typography>
                            <Typography variant="body2">
                                We’re here whenever you need us.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h6">Contact Us</Typography>
                <Typography variant="body2">
                    Have questions? Reach out to our team at support@shopsmart.com.
                </Typography>
            </Box>
        </Container>
    );
};

export default AboutPage;
