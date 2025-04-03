import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SubMenu from './SubMenu';

const DrawerContent = ({ menuItems }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Toolbar><Typography component="h1">LOGO</Typography></Toolbar>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ "&:hover": { backgroundColor: "#1976d2" } }} onClick={() => navigate(menuItems[1]?.children[0]?.path)}>
            <ListItemIcon sx={{ fontSize: "8px" }}>ICON</ListItemIcon>
            <ListItemText primary={menuItems[1]?.children[0]?.title} />
          </ListItemButton>
        </ListItem>
        {menuItems[1]?.children[1]?.children && <SubMenu menuItem={menuItems[1]?.children[1]} />}
      </List>
    </div>
  )
}

export default DrawerContent