// src/components/Header.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChildCareIcon from '@mui/icons-material/ChildCare';

function Header() {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: '#4A90E2', // Soft Blue
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <ChildCareIcon sx={{ color: '#FFFFFF', fontSize: 40, mr: 1 }} />
        <Typography variant="h4" noWrap component="div" sx={{ flexGrow: 1, color: '#FFFFFF', fontWeight: 'bold' }}>
          BusyBees
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" noWrap component="div" sx={{ color: '#FFFFFF', mr: 2 }}>
            Welcome to
          </Typography>
          <Typography variant="h6" noWrap component="div" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
            Daycare Management System
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;