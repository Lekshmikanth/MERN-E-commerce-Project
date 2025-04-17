import { useSelector } from 'react-redux';
import { useGetOrdersQuery } from '../../appSlice';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Chip,
    Divider,
    Stack,
    Grid,
} from '@mui/material';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Orders = () => {
    const { user } = useSelector((state) => state.auth);
    const { data: orders, isLoading, error } = useGetOrdersQuery(user?._id, { skip: !user });
    let total = 0;

    if (isLoading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">Failed to load orders</Typography>;

    if (!orders?.length) return <Typography>No orders found.</Typography>;

    const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    return (
        <Box sx={{ p: 2 }}>
            <Stack spacing={3}>
                {orders.map(order => {
                    total = 0
                    return (
                        <Card key={order._id} variant="outlined" sx={{ borderRadius: 2 }}>
                            <CardContent>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Order ID: <b>{order._id.slice(-6)}</b>
                                </Typography>

                                <Divider sx={{ my: 1 }} />

                                {order.products.map(item => {
                                    total += (item?.product?.price * item?.quantity)
                                    return (
                                        <Box key={item.product._id} sx={{ mb: 1, display: "flex", gap: "20px" }}>
                                            <img src={item?.product?.image} alt={item?.product?.name} width={60} height={60} style={{ borderRadius: 8 }} />
                                            <Grid>
                                                <Typography variant="body1">
                                                    {item.product.name} × {item.quantity}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    ₹{item.product.price * item.quantity}
                                                </Typography>
                                            </Grid>
                                        </Box>
                                    )
                                })}

                                <Divider sx={{ my: 2 }} />

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Chip
                                        icon={<CheckCircleIcon />}
                                        label="Order Placed"
                                        color="success"
                                        variant="outlined"
                                    />
                                    <Box textAlign="right">
                                        <Typography variant="body2" color="textSecondary" fontWeight={"bold"}>
                                            Sub Total: {total}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Ordered on: {formatDate(order.createdAt || order.date)}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Expected delivery in 5–7 days
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    )
                })}
            </Stack>
        </Box>
    );
};

export default Orders;
