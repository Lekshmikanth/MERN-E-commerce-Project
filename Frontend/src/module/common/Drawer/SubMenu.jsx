import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const SubMenu = ({ menuItem }) => {
  const navigate = useNavigate();
  const path = menuItem?.path;

  return (
    <>
        {menuItem?.children?.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ borderBottom: "1px solid #ddd" }}>
            <ListItemButton sx={{ "&:hover": { backgroundColor: "#1976d2" } }} onClick={() => navigate(`${path}/${item?.path}`)}>
              <ListItemIcon sx={{ fontSize: "8px" }}> ICON </ListItemIcon>
              <ListItemText sx={{ fontSize: "10px" }} primary={item?.title} />
            </ListItemButton>
          </ListItem>))
        }
    </>
  )
}

export default SubMenu