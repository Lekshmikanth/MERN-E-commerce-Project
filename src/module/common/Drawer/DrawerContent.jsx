import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SubMenu from './SubMenu';

const DrawerContent = ({menuItems}) => {
  const navigate = useNavigate();
  return (
    <div>
      <Toolbar><Typography component="h1">LOGO</Typography></Toolbar>
      <Divider />
      <List>
        {menuItems[1]?.children?.map((item, index) => (
          <>
          <ListItem key={index} disablePadding>
            <ListItemButton sx={{"&:hover":{backgroundColor: "#1976d2"}}} onClick={() => navigate(item?.path)}>
              <ListItemIcon sx={{fontSize: "8px"}}>ICON</ListItemIcon>
              <ListItemText primary={item?.title} />
            </ListItemButton>
          </ListItem>
              {item?.children && <SubMenu menuItem={item} />}
          </>
        ))}
      </List>
    </div>
  )
}

export default DrawerContent