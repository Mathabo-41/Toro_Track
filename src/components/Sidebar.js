// src/components/Sidebar.js
'use client';

import { Box, List, ListItem, ListItemText, Divider, Typography } from '@mui/material';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <Box
      sx={{
        width: 240,
        bgcolor: 'background.paper',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        px: 2,
        py: 3,
        boxShadow: 1,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Admin Panel
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <List>
        <ListItem button component={Link} href="/dashboard/admin/overview">
          <ListItemText primary="Overview" />
        </ListItem>
        <ListItem button component={Link} href="/dashboard/admin/clients">
          <ListItemText primary="Clients" />
        </ListItem>
        <ListItem button component={Link} href="/dashboard/admin/projects">
          <ListItemText primary="Projects" />
        </ListItem>
        <ListItem button component={Link} href="/dashboard/admin/teams">
          <ListItemText primary="Teams" />
        </ListItem>
      </List>
    </Box>
  );
}
