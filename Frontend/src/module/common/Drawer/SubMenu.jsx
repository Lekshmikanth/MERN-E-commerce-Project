import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const SubMenu = ({menuItem}) => {
    const navigate = useNavigate();
    console.log("second", menuItem);
    const path = menuItem?.path;

  return (
    <>
    <List>
              {menuItem?.children?.map((item, index) => (
               <ListItem key={index} disablePadding>
               <ListItemButton sx={{"&:hover":{backgroundColor: "#1976d2"}}} onClick={() => navigate(`${path}/${item?.path}`)}>
                 <ListItemIcon sx={{fontSize: "8px"}}> ICON </ListItemIcon>
                 <ListItemText sx={{fontSize: "10px"}} primary={item?.title} />
               </ListItemButton>
                </ListItem>))
               }
              </List>
    </>
  )
}

export default SubMenu