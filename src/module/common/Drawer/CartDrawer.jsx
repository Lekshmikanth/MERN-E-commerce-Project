import { Avatar, Button, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const CartDrawer = ({ toggleDrawer, drawerOpen }) => {
    const cartItems = [
        { id: 1, title: 'Laptop', price: '899.99', image: 'https://via.placeholder.com/50', quantity: 1 },
        { id: 2, title: 'Smartphone', price: '499.99', image: 'https://via.placeholder.com/50', quantity: 1 },
        { id: 3, title: 'Headphones', price: '149.99', image: 'https://via.placeholder.com/50', quantity: 1 },
    ]
    return (
        <>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer} sx={{
                width: 450,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 450,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 2,
                }
            }}>
                <div style={{ flex: 1, overflowY: 'auto' }}     >
                    <IconButton onClick={toggleDrawer} style={{ position: 'absolute', top: 10, right: 10 }}>
                        <CloseIcon color='danger' />
                    </IconButton>
                    <Typography variant="h6" color='primary'>Cart Items</Typography>
                    <List>
                        {cartItems.length === 0 ? (
                            <ListItem>
                                <ListItemText primary="Your cart is empty" />
                            </ListItem>
                        ) : (
                            cartItems.map((item) => (
                                <ListItem key={item.id} style={{ display: 'flex', alignItems: 'center' }}>
                                    {/* Product Image */}
                                    <ListItemAvatar sx={{ ml: -1 }}>
                                        <Avatar alt={item.title} src={item.image} />
                                    </ListItemAvatar>
                                    <Grid container display={"flex"} flexDirection={"column"}>
                                        <Typography sx={{ fontSize: "14px" }}>{item.title}</Typography>
                                        <Typography sx={{ fontSize: "12px" }}>{`$${item.price}`}</Typography>
                                    </Grid>
                                    {/* <ListItemText
                                        primary={item.title}
                                        secondary={`$${item.price}`}
                                    /> */}

                                    <Grid container alignItems="center" style={{ marginLeft: 'auto', display: 'flex', justifyContent: 'center' }}>
                                        <Grid item>
                                            <IconButton
                                                onClick={""}
                                                disabled={item.quantity <= 1} // Disable the minus button if quantity is 1
                                                size="small"
                                            >
                                                <RemoveIcon fontSize="small" />
                                            </IconButton>
                                        </Grid>
                                        <Grid item>
                                            <Typography style={{ width: 30, textAlign: 'center', fontSize: "14px" }}>{item.quantity}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <IconButton onClick={""} size="small" >
                                                <AddIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                    {/* Product Total Price */}
                                    <Typography variant="body2" style={{ marginLeft: 16 }}>
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </Typography>

                                    {/* Delete Button */}
                                    <IconButton onClick={""}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItem>
                            ))
                        )}
                    </List>
                    <Divider />
                    <Grid container display={'flex'} justifyContent={"end"} marginTop={"10px"}>
                        <Grid item display={"flex"} alignItems={"center"} marginRight={"40px"}>
                            <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>Total :</Typography>
                            <Typography sx={{ fontSize: "12px", ml: 1 }}>$2000</Typography>
                        </Grid>
                    </Grid>
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