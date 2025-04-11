import { Box, Divider, Grid, IconButton, Typography } from '@mui/material';
import { useDeleteFromCartMutation, useGetCartQuery } from '../../appSlice';
import { useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { notifyError, notifySuccess } from '../Notifications/constants';

function Cart() {
    const { user, isLoggedIn } = useSelector((state) => state.auth);

    const { data: products, isLoading, error } = useGetCartQuery(user?._id, { skip: !user, });
    const [deleteFromCart] = useDeleteFromCartMutation();
    let totalPrice = 0;

    if (!isLoggedIn) return <p>Please login to view your cart.</p>;
    if (isLoading) return <p>Loading cart...</p>;
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
                <p>Cart is empty.</p>
            ) : (
                // <Grid container width={"368px"} spacing={1.5} display={"flex"} flexDirection={"column"} sx={{ mt: 1 }}>
                //     {products?.products?.map((item) => {
                //         totalPrice += (item?.product?.price * item?.quantity)
                //         return (
                //             <Grid item sx={{ borderBottom: "1px solid #cdcdcd", pb: 1, gap: "10px" }} key={item?.product?._id} display={"flex"} alignItems={"center"}>
                //                 <Grid><img width={"100px"} height={"100px"} src={item?.product?.image} alt="" /></Grid>
                //                 <Grid sx={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "120px" }}>
                //                     <span>{item?.product?.name}</span>
                //                     <p style={{ fontSize: "13px", margin: 0 }}>Price: ₹{item?.product?.price}</p>
                //                     {/* <p style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", margin: 0 }}>Qty: <span><input type='number' value={item?.quantity} style={{ width: "40px", height: "30px", padding: "0px", paddingLeft: "7px", outline: "none", borderRadius: "10px", border: "2px solid rgb(27, 178, 238)" }} /></span></p> */}
                //                 </Grid>
                //                 {/* <Grid sx={{ fontSize: "14px", width: "80px" }}>Total: {item?.product?.price * item?.quantity}</Grid> */}
                //                 <Grid><IconButton onClick={() => handleDeleteCart({ userId: user?._id, productId: item?.product?._id })}><DeleteIcon /></IconButton></Grid>
                //             </Grid>
                //         )
                //     })
                //     }
                // </Grid>
                <Grid container width={"368px"} spacing={1.5} display={"flex"} flexDirection={"column"} sx={{ mt: 1 }}>
                    {products?.products?.map((item) => {
                        totalPrice += (item?.product?.price * item?.quantity)
                        return (< Box display="flex" gap={2} alignItems="center" mb={2} >
                            <img src={item?.product?.image} alt={item?.product?.name} width={60} height={60} style={{ borderRadius: 8 }} />
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