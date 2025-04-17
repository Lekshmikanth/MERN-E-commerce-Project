import { Box, Divider, Grid, IconButton, Typography } from '@mui/material';
import { useDeleteFromCartMutation } from '../../appSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import { notifyError, notifySuccess } from '../Notifications/constants';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function Cart({ products, error, user, isLoggedIn }) {
    const [deleteFromCart] = useDeleteFromCartMutation();
    let totalPrice = 0;

    if (!isLoggedIn) return <p>Please login to view your cart.</p>;
    if (error) return <p>Failed to load cart.</p>;

    const handleDeleteCart = async ({ userId, productId }) => {
        try {
            await deleteFromCart({ userId, productId });
            notifySuccess("Product Removed From Cart");
        } catch {
            notifyError("Failed To Remove");
        }
    };

    return (
        <div>
            {products?.products?.length === 0 ? (
                <Box textAlign="center">
                    <DotLottieReact
                        src="https://lottie.host/68e14079-76b8-496a-8f54-0904ec1d949c/kUrrOup7BX.lottie"
                        loop
                        autoplay
                    />
                    <Typography variant="h6" color="textSecondary" mt={2}>
                        Your cart is empty
                    </Typography>
                </Box>) : (
                <Grid container width={"368px"} spacing={1.5} display={"flex"} flexDirection={"column"} sx={{ mt: 1 }}>
                    {products?.products?.map((item) => {
                        totalPrice += (item?.product?.price * item?.quantity)
                        return (< Box display="flex" gap={2} alignItems="center" mb={2} key={item?.product?._id} >
                            <img src={`http://localhost:5000/api/products/image/${item?.product?.image}`} alt={item?.product?.name} width={60} height={60} style={{ borderRadius: 8 }} />
                            <Box flexGrow={1}>
                                <Typography>{item?.product?.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    ₹{item?.product?.price} × {item?.quantity}
                                </Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" mt={2}>
                                <Typography variant="subtitle1">Subtotal : </Typography>
                                <Typography variant="subtitle1">₹{item?.product?.price * item?.quantity}</Typography>
                            </Box>
                            <IconButton onClick={() => handleDeleteCart({ userId: user?._id, productId: item?.product?._id })}>
                                <DeleteIcon color="error" />
                            </IconButton>
                        </Box>
                        )
                    })
                    }
                </Grid>
            )
            }
            <Divider />
            <Grid container display={'flex'} justifyContent={"end"} marginTop={"10px"}>
                <Grid item display={"flex"} alignItems={"center"} marginRight={"40px"}>
                    <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>Total :</Typography>
                    <Typography sx={{ fontSize: "12px", ml: 1 }}>{totalPrice}</Typography>
                </Grid>
            </Grid>
        </div >
    );
}
export default Cart;