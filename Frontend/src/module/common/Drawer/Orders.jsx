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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Orders = () => {
    const { user } = useSelector((state) => state.auth);
    const { data: orders, isLoading, error } = useGetOrdersQuery(user?._id, { skip: !user });
    let total = 0;

    if (isLoading)
        return (
            <Box sx={{ p: 2, color: '#ccc' }}>
                <Typography>Loading...</Typography>
            </Box>
        );

    if (error)
        return (
            <Box sx={{ p: 2 }}>
                <Typography color="error">Failed to load orders</Typography>
            </Box>
        );

    if (!orders?.length)
        return (
            <Box sx={{ p: 2, color: '#ccc' }}>
                <Typography>No orders found.</Typography>
            </Box>
        );

    const formatDate = (dateStr) =>
        new Date(dateStr).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });

    return (
        <Box sx={{ p: 2, bgcolor: '#1e1e1e', minHeight: '100vh' }}>
            <Stack spacing={3}>
                {orders?.map((order) => {
                    total = 0;
                    return (
                        <Card
                            key={order?._id}
                            variant="outlined"
                            sx={{
                                borderRadius: 2,
                                bgcolor: '#2a2a2a',
                                color: '#fff',
                                borderColor: '#333',
                            }}
                        >
                            <CardContent>
                                <Typography variant="subtitle1" sx={{ color: '#FF9021' }}>
                                    Order ID: <b>{order?._id.slice(-6)}</b>
                                </Typography>

                                <Divider sx={{ my: 1, borderColor: '#444' }} />

                                {order?.products?.map((item) => {
                                    total += item?.product?.price * item?.quantity;
                                    return (
                                        <Box
                                            key={item?.product?._id}
                                            sx={{ mb: 2, display: 'flex', gap: 2 }}
                                        >
                                            <img
                                                src={`http://localhost:5000/api/products/image/${item?.product?.image}`}
                                                alt={item?.product?.name}
                                                width={60}
                                                height={60}
                                                style={{ borderRadius: 8, objectFit: 'cover' }}
                                            />
                                            <Grid>
                                                <Typography variant="body1" sx={{ color: '#fff' }}>
                                                    {item?.product?.name} × {item?.quantity}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: '#ccc' }}>
                                                    ₹{item?.product?.price * item?.quantity}
                                                </Typography>
                                            </Grid>
                                        </Box>
                                    );
                                })}

                                <Divider sx={{ my: 2, borderColor: '#444' }} />

                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        flexWrap: 'wrap',
                                        rowGap: 1,
                                    }}
                                >
                                    <Chip
                                        icon={<CheckCircleIcon />}
                                        label="Order Placed"
                                        sx={{
                                            color: '#FF9021',
                                            borderColor: '#FF9021',
                                            '& .MuiChip-icon': { color: '#FF9021' },
                                        }}
                                        variant="outlined"
                                    />
                                    <Box textAlign="right">
                                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#FF9021' }}>
                                            Sub Total: ₹{total}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#ccc' }}>
                                            Ordered on: {formatDate(order?.createdAt || order?.date)}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#ccc' }}>
                                            Expected delivery in 5–7 days
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    );
                })}
            </Stack>
        </Box>
    );
};

export default Orders;
