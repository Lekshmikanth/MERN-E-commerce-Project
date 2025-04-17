import * as React from 'react';
import BasicMenu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import { Avatar, Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartDrawer from '../Drawer/CartDrawer';
import { useGetCartQuery, useLogoutUserMutation } from '../../appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../Authentication/authSlice';
import { useNavigate } from 'react-router-dom';
import { notifyError, notifySuccess } from '../Notifications/constants';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import OrdersDrawer from '../Drawer/OrdersDrawer';

export default function Menu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [ordersOpen, setOrdersOpen] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleOrderDrawer = () => {
    setOrdersOpen(!ordersOpen);
    handleClose();
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutUserMutation();

  const { user } = useSelector((state) => state.auth);

  const { data: products } = useGetCartQuery(user?._id, { skip: !user, });

  const totalItems = products?.products?.length;

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      notifySuccess("Logged Out Successfully");
      dispatch(logoutUser());
      navigate('/login');
    } catch (err) {
      notifyError("Logout Failed");
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <OrdersDrawer open={ordersOpen} toggleDrawer={toggleOrderDrawer} />
      <IconButton size="small" sx={{ ml: 1 }}>
        <Avatar sx={{ width: 32, height: 32 }}>
          <AccountCircleIcon />
        </Avatar>
      </IconButton>
      <IconButton color="inherit" onClick={toggleDrawer}>
        <Badge badgeContent={totalItems} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <CartDrawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
      <IconButton
        id="button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <ArrowDropDownCircleIcon sx={{ color: "white" }} />
      </IconButton>
      <BasicMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={toggleOrderDrawer}>My Orders</MenuItem>
        <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
      </BasicMenu>
    </div>
  );
}
