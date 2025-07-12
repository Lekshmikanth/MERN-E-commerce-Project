import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import Menu from './Menu';
import Breadcrumb from '../Breadcrumbs/Breadcrumbs';

const Header = (props) => {
  const { drawerWidth, handleDrawerToggle } = props;

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        bgcolor: '#1e1e1e', // light black background
        color: '#fff',
        boxShadow: 'none',
        borderBottom: '1px solid #333',
      }}
    >
      <Toolbar>
        <IconButton
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            mr: 2,
            display: { sm: 'none' },
            color: '#FF9021', // orange icon
            '&:hover': {
              color: '#CC711A', // hover orange
            },
          }}
        >
          <MenuIcon />
        </IconButton>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              fontWeight: 600,
              color: '#FF9021',
            }}
          >
            Shopping Zone
          </Typography>

          <Breadcrumb />

          <Menu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
