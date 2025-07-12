import { Divider, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DrawerContent = ({ menuItems }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div>
      <Toolbar sx={{ padding: "0px !important" }}>
        <img src='icon.png' alt='logo' width={"100%"} height={"64px"} />
      </Toolbar>
      <Divider sx={{ borderColor: "#333" }} />
      <List sx={{ padding: 0 }}>
        {menuItems[1]?.children[0] && (
          <ListItemButton
            selected={location?.pathname === menuItems[1]?.children[0]?.path}
            sx={{
              borderBottom: "1px solid #333",
              color: '#fff',
              '&.Mui-selected': {
                backgroundColor: '#FF9021',
                color: '#fff',
                '&:hover': { backgroundColor: '#CC711A' },
              },
              '&:hover': { backgroundColor: '#CC711A' },
            }}
            onClick={() => navigate(menuItems[1]?.children[0]?.path)}
          >
            <ListItemIcon sx={{ color: '#fff', fontSize: "8px" }}>
              {menuItems[1]?.children[0]?.icon}
            </ListItemIcon>
            <ListItemText primary={menuItems[1]?.children[0]?.title} />
          </ListItemButton>
        )}

        {user?.isAdmin === true && (
          <ListItemButton
            selected={location?.pathname === menuItems[1]?.children[1]?.path}
            sx={{
              borderBottom: "1px solid #333",
              color: '#fff',
              '&.Mui-selected': {
                backgroundColor: '#FF9021',
                color: '#fff',
                '&:hover': { backgroundColor: '#CC711A' },
              },
              '&:hover': { backgroundColor: '#CC711A' },
            }}
            onClick={() => navigate(menuItems[1]?.children[1]?.path)}
          >
            <ListItemIcon sx={{ color: '#fff', fontSize: "8px" }}>
              {menuItems[1]?.children[1]?.icon}
            </ListItemIcon>
            <ListItemText primary={menuItems[1]?.children[1]?.title} />
          </ListItemButton>
        )}

        {menuItems[1]?.children[2] && (
          <ListItemButton
            selected={location?.pathname === menuItems[1]?.children[2]?.children[0]?.path}
            sx={{
              borderBottom: "1px solid #333",
              color: '#fff',
              '&.Mui-selected': {
                backgroundColor: '#FF9021',
                color: '#fff',
                '&:hover': { backgroundColor: '#CC711A' },
              },
              '&:hover': { backgroundColor: '#CC711A' },
            }}
            onClick={() => navigate(menuItems[1]?.children[2]?.children[0]?.path)}
          >
            <ListItemIcon sx={{ color: '#fff', fontSize: "8px" }}>
              {menuItems[1]?.children[2]?.icon}
            </ListItemIcon>
            <ListItemText primary={menuItems[1]?.children[2]?.title} />
          </ListItemButton>
        )}

        {menuItems[1]?.children[3] && (
          <ListItemButton
            selected={location?.pathname === menuItems[1]?.children[3]?.path}
            sx={{
              borderBottom: "1px solid #333",
              color: '#fff',
              '&.Mui-selected': {
                backgroundColor: '#FF9021',
                color: '#fff',
                '&:hover': { backgroundColor: '#CC711A' },
              },
              '&:hover': { backgroundColor: '#CC711A' },
            }}
            onClick={() => navigate(menuItems[1]?.children[3]?.path)}
          >
            <ListItemIcon sx={{ color: '#fff', fontSize: "8px" }}>
              {menuItems[1]?.children[3]?.icon}
            </ListItemIcon>
            <ListItemText primary={menuItems[1]?.children[3]?.title} />
          </ListItemButton>
        )}

        {menuItems[1]?.children[4] && (
          <ListItemButton
            selected={location?.pathname === menuItems[1]?.children[4]?.path}
            sx={{
              borderBottom: "1px solid #333",
              color: '#fff',
              '&.Mui-selected': {
                backgroundColor: '#FF9021',
                color: '#fff',
                '&:hover': { backgroundColor: '#CC711A' },
              },
              '&:hover': { backgroundColor: '#CC711A' },
            }}
            onClick={() => navigate(menuItems[1]?.children[4]?.path)}
          >
            <ListItemIcon sx={{ color: '#fff', fontSize: "8px" }}>
              {menuItems[1]?.children[4]?.icon}
            </ListItemIcon>
            <ListItemText primary={menuItems[1]?.children[4]?.title} />
          </ListItemButton>
        )}
      </List>
    </div>
  );
};

export default DrawerContent;
