import React from 'react';
import {
    Container,
    Typography,
    Box,
    Grid,
    Card,
    CardContent
} from '@mui/material';

const AboutPage = () => {

    return (
        <Box sx={{ backgroundColor: '#121212', minHeight: 'calc(100vh - 64px)', py: 4, color: '#fff' }}>
            <Container maxWidth="md">
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ color: '#FF9021', fontWeight: 'bold', textAlign: 'center' }}
                >
                    About Us
                </Typography>

                <Typography variant="body1" paragraph sx={{ color: '#ddd', textAlign: 'center' }}>
                    Welcome to <b>ShopSmart</b>! We’re your one-stop destination for the best deals on electronics,
                    fashion, home appliances, and more.
                    Our mission is to deliver quality products at unbeatable prices, right to your doorstep.
                </Typography>

                <Typography variant="h5" sx={{ mt: 4, color: '#FF9021', fontWeight: 'bold' }}>
                    Why Choose Us?
                </Typography>

                <Grid container spacing={3} sx={{ mt: 1 }}>
                    {[
                        {
                            title: 'Wide Range of Products',
                            desc: 'From gadgets to groceries – we’ve got it all.',
                        },
                        {
                            title: 'Secure Payments',
                            desc: 'Shop with confidence using trusted payment gateways.',
                        },
                        {
                            title: 'Fast Delivery',
                            desc: 'Get your orders delivered quickly and safely.',
                        },
                        {
                            title: '24/7 Customer Support',
                            desc: 'We’re here whenever you need us.',
                        },
                    ].map((item, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <Card
                                elevation={4}
                                sx={{
                                    backgroundColor: '#1e1e1e',
                                    color: '#fff',
                                    borderRadius: 2,
                                    height: '100%',
                                    '&:hover': {
                                        backgroundColor: '#2c2c2c',
                                    },
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6" sx={{ color: '#FF9021', fontWeight: 'bold' }}>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#ccc' }}>
                                        {item.desc}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ mt: 6 }}>
                    <Typography variant="h6" sx={{ color: '#FF9021', fontWeight: 'bold' }}>
                        Contact Us
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#bbb' }}>
                        Have questions? Reach out to our team at <b>support@shopsmart.com</b>.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default AboutPage;
