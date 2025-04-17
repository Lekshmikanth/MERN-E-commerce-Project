import { Drawer, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Orders from './Orders';

function OrdersDrawer({ open, toggleDrawer }) {
    return (
        <Drawer anchor="right" open={open} onClose={toggleDrawer}>
            <div style={{ width: 400, padding: 16 }}>
                <IconButton onClick={toggleDrawer} style={{ float: 'right' }}>
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" gutterBottom>My Orders</Typography>
                <Orders />
            </div>
        </Drawer>
    );
}
export default OrdersDrawer;
