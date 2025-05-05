// LayoutBase.jsx
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

export const LayoutBase = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed">
        <Toolbar>
          <LocalHospitalIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }} />

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Diabetes App
          </Typography>

          <Typography variant="p" sx={{ mr: 1 }}>AAAA</Typography>

          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="Cuenta de usuario"
          >
            <AccountCircle />
          </IconButton>

          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="Abrir menú"
            onClick={handleMenuOpen}
            sx={{ ml: 1 }}
          >
            <MenuIcon />
          </IconButton>

          {/* Menu hamburguesa */}
          {/* <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
          </Menu> */}
        </Toolbar>
      </AppBar>

      {/* Contenido principal */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {children}
      </Box>
    </Box>
  );
};
