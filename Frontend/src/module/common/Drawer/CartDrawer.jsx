import { Button, Drawer, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import Cart from './Cart';
import { useSelector } from 'react-redux';
import { useGetCartQuery, usePlaceOrderFromCartMutation } from '../../appSlice';
import { notifyError, notifySuccess } from '../Notifications/constants';
import PlaceOrderPopup from './PlaceOrderPopup';

const CartDrawer = ({ toggleDrawer, drawerOpen }) => {
    const { user, isLoggedIn } = useSelector((state) => state.auth);
    const [openPopup, setOpenPopup] = useState(false);
    const [placeOrderFromCart, { isLoading }] = usePlaceOrderFromCartMutation();
    const { data: products, error } = useGetCartQuery(user?._id, { skip: !user, });

    const handlePlaceOrder = async () => {
        try {
            await placeOrderFromCart(user._id).unwrap();
            notifySuccess('Order placed successfully!');
        } catch (err) {
            notifyError('Failed while placing the order.');
        }
    };
    return (
        <>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer} sx={{
                width: 400,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 400,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 2,
                }
            }}>
                <div style={{ flex: 1, overflowY: 'auto' }}     >
                    <IconButton onClick={toggleDrawer} style={{ position: 'absolute', top: 10, right: 10, zIndex: 999 }}>
                        <CloseIcon color='danger' />
                    </IconButton>
                    <Typography variant="h6" color='primary'>Cart Items</Typography>
                    <Cart products={products} error={error} user={user} isLoggedIn={isLoggedIn} />
                </div>
                <PlaceOrderPopup
                    open={openPopup}
                    onClose={() => setOpenPopup(false)}
                    onPlaceOrder={() => {
                        handlePlaceOrder();
                        console.log('Placing order...');
                    }}
                />
                {products?.products?.length > 0 && <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpenPopup(true)}
                    fullWidth
                    style={{ marginTop: 'auto' }}
                    disabled={isLoading}
                >
                    {isLoading ? 'Placing Order...' : 'Place Order'}
                </Button>}
            </Drawer>
        </>
    )
}

export default CartDrawer