import React, { useState } from 'react';
import {
    Button,
    Modal,
    Box,
    Typography,
    TextField,
    Grid,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    maxHeight: '90vh',
    overflowY: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 3,
};

const PlaceOrderPopup = ({ open, onClose, onPlaceOrder }) => {
    const [address, setAddress] = useState({
        name: '',
        phone: '',
        email: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
    });

    const [payment, setPayment] = useState({
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
    });

    const handlePlaceOrder = () => {
        console.log('Address:', address);
        console.log('Payment:', payment);
        onPlaceOrder();
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                {/* Close Button */}
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: 'grey.700',
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <Typography variant="h6" gutterBottom>Shipping Address</Typography>
                <Grid container spacing={2}>
                    {[
                        { label: 'Full Name', name: 'name' },
                        { label: 'Phone Number', name: 'phone' },
                        { label: 'Email', name: 'email' },
                        { label: 'Address Line 1', name: 'address1' },
                        { label: 'Address Line 2', name: 'address2' },
                        { label: 'City', name: 'city' },
                        { label: 'State', name: 'state' },
                        { label: 'Country', name: 'country' },
                        { label: 'Pincode', name: 'pincode' },
                    ].map(field => (
                        <Grid item xs={12} sm={field.name === 'address2' ? 12 : 6} key={field.name}>
                            <TextField
                                fullWidth
                                label={field.label}
                                value={address[field.name]}
                                onChange={(e) => setAddress({ ...address, [field.name]: e.target.value })}
                            />
                        </Grid>
                    ))}
                </Grid>

                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Payment Information</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Cardholder Name"
                            value={payment.cardName}
                            onChange={(e) => setPayment({ ...payment, cardName: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Card Number"
                            value={payment.cardNumber}
                            onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Expiry Date (MM/YY)"
                            value={payment.expiry}
                            onChange={(e) => setPayment({ ...payment, expiry: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="CVV"
                            type="password"
                            value={payment.cvv}
                            onChange={(e) => setPayment({ ...payment, cvv: e.target.value })}
                        />
                    </Grid>
                </Grid>

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 3 }}
                    onClick={handlePlaceOrder}
                >
                    Place Order
                </Button>
            </Box>
        </Modal>
    );
};

export default PlaceOrderPopup;
