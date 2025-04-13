import { Divider, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import SubMenu from './SubMenu';
import { useSelector } from 'react-redux';

const DrawerContent = ({ menuItems }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div>
      <Toolbar><Typography component="h1">LOGO</Typography></Toolbar>
      <Divider />
      <List disablePadding>
        {menuItems[1]?.children[0] && (
          <ListItemButton selected={location?.pathname === menuItems[1]?.children[0]?.path} disablePadding sx={{ borderBottom: "1px solid #ddd", '&.Mui-selected': { backgroundColor: '#1976d2', color: '#fff', '&:hover': { backgroundColor: '#1565c0', }, }, '&:hover': { backgroundColor: '#1976d2', } }} onClick={() => navigate(menuItems[1]?.children[0]?.path)}>
            <ListItemIcon sx={{ fontSize: "8px" }}>ICON</ListItemIcon>
            <ListItemText primary={menuItems[1]?.children[0]?.title} />
          </ListItemButton>
        )}
        {user?.isAdmin === true &&
          <ListItemButton disablePadding selected={location?.pathname === menuItems[1]?.children[1]?.path} sx={{ borderBottom: "1px solid #ddd", '&.Mui-selected': { backgroundColor: '#1976d2', color: '#fff', '&:hover': { backgroundColor: '#1565c0', }, }, '&:hover': { backgroundColor: '#1976d2', } }} onClick={() => navigate(menuItems[1]?.children[1]?.path)}>
            <ListItemIcon sx={{ fontSize: "8px" }}>ICON</ListItemIcon>
            <ListItemText primary={menuItems[1]?.children[1]?.title} />
          </ListItemButton>
        }
        {menuItems[1]?.children[2] &&
          <ListItemButton disablePadding selected={location?.pathname === menuItems[1]?.children[2]?.children[0]?.path} sx={{ borderBottom: "1px solid #ddd", '&.Mui-selected': { backgroundColor: '#1976d2', color: '#fff', '&:hover': { backgroundColor: '#1565c0', }, }, '&:hover': { backgroundColor: '#1976d2', } }} onClick={() => navigate(menuItems[1]?.children[2]?.children[0]?.path)}>
            <ListItemIcon sx={{ fontSize: "8px" }}>ICON</ListItemIcon>
            <ListItemText primary={menuItems[1]?.children[2]?.title} />
          </ListItemButton>
        }

        {/* {menuItems[1]?.children[2]?.children && <SubMenu menuItem={menuItems[1]?.children[2]} />} */}
      </List>
    </div>
  )
}

export default DrawerContent;
