import { Button, Drawer, IconButton, Typography } from '@mui/material'
import React from 'react'
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import Cart from './Cart';

const CartDrawer = ({ toggleDrawer, drawerOpen }) => {

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
                    <Cart />
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={""}
                    fullWidth
                    style={{ marginTop: 'auto' }}
                >
                    Place Order
                </Button>
            </Drawer>
        </>
    )
}

export default CartDrawer