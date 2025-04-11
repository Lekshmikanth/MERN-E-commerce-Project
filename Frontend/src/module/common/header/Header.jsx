import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react'
import Menu from './Menu';
import Breadcrumb from '../Breadcrumbs/Breadcrumbs';

const Header = (props) => {
  const { drawerWidth, handleDrawerToggle } = props;
  return (
    <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` }, }} >
      <Toolbar>
        <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }} >
          <MenuIcon />
        </IconButton>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          <Typography variant="h6" noWrap component="div">Shopping Zone</Typography>
          <Breadcrumb />
          <Menu />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header