// src/components/Sidebar.js
'use client';

import { Box, List, ListItem, ListItemText, Divider, Typography, Avatar, Button } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

export default function Sidebar() {
  return (
    <Box
      sx={{
        width: 240,
        bgcolor: '#283618', // Dark green background
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        px: 2,
        py: 3,
        boxShadow: 1,
        display: 'flex',
        flexDirection: 'column',
        color: '#fefae0' // Light text color
      }}
    >
      {/* Logo/Header Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Image 
          src="/toroLogo.jpg" 
          width={40} 
          height={40} 
          alt="Logo"
          style={{ borderRadius: '8px' }}
        />
        <Typography variant="h6">Toro Track</Typography>
      </Box>

      <Divider sx={{ borderColor: '#6b705c', mb: 2 }} />

      {/* Navigation Links */}
      <List sx={{ flexGrow: 1 }}>
        <ListItem 
          button 
          component={Link} 
          href="/dashboard/admin/overview"
          sx={{
            borderRadius: 1,
            mb: 0.5,
            '&:hover': { backgroundColor: '#6b705c' }
          }}
        >
          <ListItemText primary="Overview" />
        </ListItem>
        <ListItem 
          button 
          component={Link} 
          href="/dashboard/admin/clients"
          sx={{
            borderRadius: 1,
            mb: 0.5,
            '&:hover': { backgroundColor: '#6b705c' }
          }}
        >
          <ListItemText primary="Clients" />
        </ListItem>
        {/* Add other navigation items similarly */}
      </List>

      {/* Profile Section - Added at bottom */}
      <Box sx={{ 
        borderTop: '2px solid #6b705c',
        pt: 2,
        pb: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Avatar 
            src="/toroLogo.jpg"
            sx={{ 
              width: 40, 
              height: 40,
              border: '2px solid #f3722c' // Orange border
            }}
          />
          <Box>
            <Typography variant="subtitle1">John Doe</Typography>
            <Typography variant="caption">admin@toro.com</Typography>
          </Box>
        </Box>
        
        <Button
          fullWidth
          variant="outlined"
          sx={{
            color: '#fefae0',
            borderColor: '#fefae0',
            '&:hover': {
              backgroundColor: '#6b705c',
              borderColor: '#6b705c'
            }
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}