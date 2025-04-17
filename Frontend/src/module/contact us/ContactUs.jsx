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
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Contact Us
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Name"
                                name="name"
                                fullWidth
                                value={formData.name}
                                onChange={handleChange}
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                name="email"
                                fullWidth
                                value={formData.email}
                                onChange={handleChange}
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Subject"
                                name="subject"
                                fullWidth
                                value={formData.subject}
                                onChange={handleChange}
                                error={!!errors.subject}
                                helperText={errors.subject}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Message"
                                name="message"
                                fullWidth
                                multiline
                                minRows={4}
                                value={formData.message}
                                onChange={handleChange}
                                error={!!errors.message}
                                helperText={errors.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" fullWidth>
                                Send Message
                            </Button>
                        </Grid>
                    </Grid>
                </form>

                {/* Social Links */}
                <Box mt={4} textAlign="center">
                    <Typography variant="subtitle1" gutterBottom>
                        Connect with us:
                    </Typography>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <IconButton
                            component="a"
                            href="https://www.facebook.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            color="primary"
                        >
                            <FacebookIcon />
                        </IconButton>
                        <IconButton
                            component="a"
                            href="https://twitter.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            color="primary"
                        >
                            <TwitterIcon />
                        </IconButton>
                        <IconButton
                            component="a"
                            href="https://www.instagram.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            color="primary"
                        >
                            <InstagramIcon />
                        </IconButton>
                        <IconButton
                            component="a"
                            href="https://www.linkedin.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            color="primary"
                        >
                            <LinkedInIcon />
                        </IconButton>
                    </Stack>
                </Box>
            </Paper>
        </Box>
    );
};

export default ContactUs;
