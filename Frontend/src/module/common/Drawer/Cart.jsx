import { Divider, Grid, Grid2, IconButton, Typography } from '@mui/material';
import { useDeleteFromCartMutation, useGetCartQuery } from '../../appSlice';
import { useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';

function Cart() {
    const { user, isLoggedIn } = useSelector((state) => state.auth);

    const { data: products, isLoading, error } = useGetCartQuery(user?._id, { skip: !user, });
    const [deleteFromCart] = useDeleteFromCartMutation();
    let totalPrice = 0;
    console.log("first", products);

    if (!isLoggedIn) return <p>Please login to view your cart.</p>;
    if (isLoading) return <p>Loading cart...</p>;
    if (error) return <p>Failed to load cart.</p>;

    return (
        <div>
            {products?.products?.length === 0 ? (
                <p>Cart is empty.</p>
            ) : (
                <Grid2 container width={"368px"} spacing={1.5} display={"flex"} flexDirection={"column"} sx={{ mt: 1 }}>
                    {products?.products?.map((item) => {
                        totalPrice += (item?.product?.price * item?.quantity)
                        return (
                            <Grid2 item sx={{ borderBottom: "1px solid #cdcdcd", pb: 1, gap: "10px" }} key={item?.product?._id} display={"flex"} alignItems={"center"}>
                                <Grid2><img width={"100px"} height={"100px"} src={item?.product?.image} alt="" /></Grid2>
                                <Grid2 sx={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "120px" }}>
                                    <span>{item?.product?.name}</span>
                                    <p style={{ fontSize: "13px", margin: 0 }}>Price: ₹{item?.product?.price}</p>
                                    <p style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", margin: 0 }}>Qty: <span><input type='number' value={item?.quantity} style={{ width: "40px", height: "30px", padding: "0px", paddingLeft: "7px", outline: "none", borderRadius: "10px", border: "2px solid rgb(27, 178, 238)" }} /></span></p>
                                </Grid2>
                                <Grid2 sx={{ fontSize: "14px", width: "80px" }}>Total: {item?.product?.price * item?.quantity}</Grid2>
                                <Grid2><IconButton onClick={() => deleteFromCart({userId: user?._id, productId: item?.product?._id})}><DeleteIcon /></IconButton></Grid2>
                            </Grid2>
                        )
                    })
                    }

                    {/* <ul>
                        {products?.products?.map((item) => (
                            <li key={item?.product?._id}>
                                <h4>{item?.product?.name}</h4>
                                <p>Price: ₹{item?.product?.price}</p>
                                <p>Quantity: {item?.quantity}</p>
                            </li>
                        ))}
                    </ul> */}
                </Grid2>
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