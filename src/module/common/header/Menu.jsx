import * as React from 'react';
import Button from '@mui/material/Button';
import BasicMenu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import { Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartDrawer from '../Drawer/CartDrawer';

export default function Menu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
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

  return (
    <div>
      <IconButton color="inherit" onClick={toggleDrawer}>
        <Badge badgeContent={"0"} color="secondary">
          <ShoppingCartIcon />
          <CartDrawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
        </Badge>
      </IconButton>
      <Button
        id="button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <ArrowDropDownCircleIcon sx={{ color: "white" }} />
      </Button>
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
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </BasicMenu>
    </div>
  );
}
