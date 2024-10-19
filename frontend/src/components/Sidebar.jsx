// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Typography, Avatar, Box, Button } from '@mui/material';
import BabyIcon from '@mui/icons-material/ChildCare';
import BabySitterIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ClassIcon from '@mui/icons-material/Class';
import LogoutIcon from '@mui/icons-material/Logout';

function Sidebar({ onLogout }) {  // Accept onLogout as a prop
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 280,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 280,
          boxSizing: 'border-box',
          backgroundColor: '#f7f9fc',
          borderRight: '1px solid #e0e0e0',
          padding: '20px 10px',
          top: '64px', // Adjust this value if your header height is different
        },
      }}
    >
      {/* Profile Section */}
      {/* <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Avatar
          alt="User Profile"
          src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-1.jpg"
          sx={{ width: 80, height: 80, mx: 'auto', mb: 1 }}
        />
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1a73e8' }}>
          Mathew
        </Typography>
        <Typography variant="body2" sx={{ color: '#8D939D' }}>
          Admin
        </Typography>
      </Box>
      <Divider /> */}

      {/* Sidebar Title */}
      <Typography
        variant="h6"
        align="center"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#1a73e8', paddingBottom: '10px' }}
      >
        Daycare Management
      </Typography>

      <List>
        <List>
          <ListItem
            button
            component={Link}
            to="/dashboard"
            sx={{
              '&:hover': { backgroundColor: '#e1f5fe' },
            }}
          >
            <ListItemIcon>
              <HomeIcon sx={{ color: '#039be5' }} />
            </ListItemIcon>
            <ListItemText primary="Home" primaryTypographyProps={{ fontWeight: 'bold' }} />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/babyDetails"
            sx={{
              '&:hover': { backgroundColor: '#ffe0b2' },
            }}
          >
            <ListItemIcon>
              <BabyIcon sx={{ color: '#ff9800' }} />
            </ListItemIcon>
            <ListItemText primary="Babies" primaryTypographyProps={{ fontWeight: 'bold' }} />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/guardianDetails"
            sx={{
              '&:hover': { backgroundColor: '#f8bbd0' },
            }}
          >
            <ListItemIcon>
              <PersonIcon sx={{ color: '#e91e63' }} />
            </ListItemIcon>
            <ListItemText primary="Guardians" primaryTypographyProps={{ fontWeight: 'bold' }} />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/classroomDetails"
            sx={{
              '&:hover': { backgroundColor: '#dcedc8' },
            }}
          >
            <ListItemIcon>
              <ClassIcon sx={{ color: '#4caf50' }} />
            </ListItemIcon>
            <ListItemText primary="Classrooms" primaryTypographyProps={{ fontWeight: 'bold' }} />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/babySitterDetails"
            sx={{
              '&:hover': { backgroundColor: '#c5cae9' },
            }}
          >
            <ListItemIcon>
              <BabySitterIcon sx={{ color: '#673ab7' }} />
            </ListItemIcon>
            <ListItemText primary="Staff" primaryTypographyProps={{ fontWeight: 'bold' }} />
          </ListItem>

          {/* Logout Button */}
          <ListItem
            button
            onClick={onLogout}
            sx={{
              '&:hover': { backgroundColor: '#ffebee', cursor: 'pointer' },
              mt: 'auto',
            }}
          >
            <ListItemIcon>
              <LogoutIcon sx={{ color: '#d32f2f' }} />
            </ListItemIcon>
            <ListItemText primary="Logout" primaryTypographyProps={{ fontWeight: 'bold', color: '#d32f2f' }} />
          </ListItem>
        </List>

      </List>

      <Divider sx={{ marginTop: '20px' }} />
    </Drawer>
  );
}

export default Sidebar;
