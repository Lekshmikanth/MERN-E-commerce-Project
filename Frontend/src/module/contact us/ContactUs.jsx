import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Grid,
    IconButton,
    Stack,
} from '@mui/material';

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { notifySuccess } from '../common/Notifications/constants';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const validate = () => {
        const tempErrors = {};
        if (!formData.name) tempErrors.name = 'Name is required';
        if (!formData.email) tempErrors.email = 'Email is required';
        if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = 'Email is invalid';
        if (!formData.subject) tempErrors.subject = 'Subject is required';
        if (!formData.message) tempErrors.message = 'Message is required';
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        console.log('Submitted:', formData);
        notifySuccess('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', my: 5, px: 2 }}>
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    bgcolor: '#2a2a2a',
                    color: '#fff',
                    borderRadius: 3,
                }}
            >
                <Typography variant="h4" gutterBottom sx={{ color: '#FF9021', fontWeight: 'bold' }}>
                    Contact Us
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {['name', 'email', 'subject', 'message'].map((field) => (
                            <Grid item xs={12} key={field}>
                                <TextField
                                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                                    name={field}
                                    fullWidth
                                    multiline={field === 'message'}
                                    minRows={field === 'message' ? 4 : 1}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    error={!!errors[field]}
                                    helperText={errors[field]}
                                    variant="outlined"
                                    InputLabelProps={{ style: { color: '#aaa' } }}
                                    InputProps={{
                                        style: {
                                            backgroundColor: '#1e1e1e',
                                            color: '#fff',
                                            borderColor: '#444',
                                        },
                                    }}
                                />
                            </Grid>
                        ))}

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
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
                                Send Message
                            </Button>
                        </Grid>
                    </Grid>
                </form>

                {/* Social Links */}
                <Box textAlign="center">
                    <Typography variant="subtitle1" gutterBottom sx={{ color: '#ccc' }}>
                        Connect with us:
                    </Typography>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        {[
                            { icon: <FacebookIcon />, href: 'https://facebook.com' },
                            { icon: <TwitterIcon />, href: 'https://twitter.com' },
                            { icon: <InstagramIcon />, href: 'https://instagram.com' },
                            { icon: <LinkedInIcon />, href: 'https://linkedin.com' },
                        ].map(({ icon, href }, index) => (
                            <IconButton
                                key={index}
                                component="a"
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    bgcolor: '#1e1e1e',
                                    color: '#FF9021',
                                    border: '1px solid #444',
                                    '&:hover': {
                                        bgcolor: '#CC711A',
                                        color: '#fff',
                                    },
                                }}
                            >
                                {icon}
                            </IconButton>
                        ))}
                    </Stack>
                </Box>
            </Paper>
        </Box>
    );
};

export default ContactUs;
