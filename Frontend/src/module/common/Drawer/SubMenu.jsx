import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const SubMenu = ({ menuItem }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = menuItem?.path;

  return (
    <>
      {menuItem?.children?.map((item, index) => (
        <ListItemButton key={index} selected={location?.pathname === `${path}/${item?.path}`} sx={{ borderBottom: "1px solid #ddd", '&.Mui-selected': { backgroundColor: '#1976d2', color: '#fff', '&:hover': { backgroundColor: '#1565c0', }, }, '&:hover': { backgroundColor: '#1976d2', } }} onClick={() => navigate(`${path}/${item?.path}`)}>
          <ListItemIcon sx={{ fontSize: "8px" }}> ICON </ListItemIcon>
          <ListItemText sx={{ fontSize: "10px" }} primary={item?.title} />
        </ListItemButton>
      ))
      }
    </>
  )
}

export default SubMenu