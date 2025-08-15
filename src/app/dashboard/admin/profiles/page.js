'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  Stack,
  Divider,
  IconButton,
  TextField,
  InputAdornment,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Card,
  CardContent,
  Grid,
  Menu,
  MenuItem
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Work as WorkIcon,
  People as PeopleIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Star as PremiumIcon
} from '@mui/icons-material';
import Link from 'next/link';

import {
  rootBox,
  drawerPaper,
  drawerHeader,
  listItemButton,
  mainContentBox,
  pageHeader,
  pageHeaderText,
  pageHeaderIcon,
  searchField,
  addClientButton,
  clientCard,
  tableContainer,
  tableHeader,
  tableHeaderCell,
  tableRow,
  clientTableCell,
  clientLogoAvatar,
  contactIcon,
  projectsIcon,
  statusChip,
  actionButton,
  statsCard,
  statsCardContent,
  statsAvatar,
  menuPaper,
  menuItem,
  menuDivider
} from '../styles';

/**
 * Client Profiles Management Screen
 * * Features:
 * - Pure black background (#000000) with high contrast UI
 * - Client listing with status tracking
 * - Client statistics overview
 * - Search and filtering capabilities
 * - Dark theme with gold accents
 * - Responsive layout
 */

// Sidebar navigation items for admin panel
const adminMenu = [
  { name: 'Dashboard Overview', path: '/dashboard/admin/overview' },
  { name: 'Client Profiles', path: '/dashboard/admin/profiles' },
  { name: 'Projects', path: '/dashboard/admin/projects' },
  { name: 'Teams & Users', path: '/dashboard/admin/users' },
  { name: 'Permissions', path: '/dashboard/admin/permissions' },
  { name: 'Performance Reports', path: '/dashboard/admin/reports' },
  { name: 'Settings', path: '/dashboard/admin/settings' }
];

export default function ClientProfiles() {
  // State for client data management
  const [clients, setClients] = useState([
    { 
      id: 1, 
      name: 'Acme Corporation', 
      contact: 'john.doe@acme.com', 
      projects: 5, 
      status: 'premium',
      logo: '/toroLogo.jpg'
    },
    { 
      id: 2, 
      name: 'Globex Inc', 
      contact: 'jane.smith@globex.com', 
      projects: 3, 
      status: 'active',
      logo: '/toroLogo.jpg'
    },
    { 
      id: 3, 
      name: 'Toro Informatics', 
      contact: 'toroi@toroinfo.com', 
      projects: 2, 
      status: 'active',
      logo: '/toroLogo.jpg'
    },
    { 
      id: 4, 
      name: 'Umbrella Corp', 
      contact: 'alice.wesker@umbrella.com', 
      projects: 7, 
      status: 'premium',
      logo: '/toroLogo.jpg'
    },
    { 
      id: 5, 
      name: 'Wayne Enterprises', 
      contact: 'bruce.wayne@wayne.com', 
      projects: 4, 
      status: 'inactive',
      logo: '/toroLogo.jpg'
    }
  ]);

  // State for action menu control
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);

  /**
   * Opens the action menu for a specific client
   */
  const handleMenuOpen = (event, clientId) => {
    setAnchorEl(event.currentTarget);
    setSelectedClient(clientId);
  };

  // Closes the action menu
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedClient(null);
  };

  /**
   * Deletes the selected client
   */
  const handleDeleteClient = () => {
    setClients(clients.filter(client => client.id !== selectedClient));
    handleMenuClose();
  };

  /**
   * Changes the status of a client
   */
  const handleStatusChange = (clientId, newStatus) => {
    setClients(clients.map(client => 
      client.id === clientId ? { ...client, status: newStatus } : client
    ));
    handleMenuClose();
  };

  return (
    <Box sx={rootBox}>
      {/* ===== SIDEBAR NAVIGATION ===== */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': drawerPaper
        }}
      >
        {/* Sidebar Header */}
        <Box sx={drawerHeader}>
          <Typography variant="h5">
            Admin Portal
          </Typography>
        </Box>
        
        {/* Navigation Menu */}
        <List>
          {adminMenu.map(({ name, path }, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton 
                component={Link} 
                href={path}
                sx={listItemButton}
              >
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* ===== MAIN CONTENT AREA ===== */}
      <Box component="main" sx={mainContentBox}>
        {/* Page Header with Search and Add Client Button */}
        <Box sx={pageHeader}>
          <Typography variant="h4" sx={pageHeaderText}>
            <PeopleIcon sx={pageHeaderIcon} />
            Client Profiles
          </Typography>
          <Stack direction="row" spacing={2} sx={{ width: { xs: '100%', sm: 'auto' } }}>
            {/* Search Field */}
            <TextField
              size="small"
              placeholder="Search clients..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="text.secondary" />
                  </InputAdornment>
                ),
                sx: searchField
              }}
              sx={{ flexGrow: { xs: 1, sm: 0 } }}
            />
            {/* Add Client Button */}
            <Button 
              variant="outlined" 
              startIcon={<AddIcon />}
              sx={addClientButton}
            >
              Add Client
            </Button>
          </Stack>
        </Box>

        {/* Clients Table */}
        <Card sx={clientCard}>
          <CardContent>
            <Typography variant="h6" sx={pageHeaderText}>
              All Clients
            </Typography>
            <TableContainer component={Paper} sx={tableContainer}>
              <Table>
                <TableHead sx={tableHeader}>
                  <TableRow>
                    <TableCell sx={tableHeaderCell}>Client</TableCell>
                    <TableCell sx={tableHeaderCell}>Contact</TableCell>
                    <TableCell sx={tableHeaderCell}>Projects</TableCell>
                    <TableCell sx={tableHeaderCell}>Status</TableCell>
                    <TableCell sx={tableHeaderCell}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {clients.map((client) => (
                    <TableRow 
                      key={client.id} 
                      hover 
                      sx={tableRow}
                    >
                      {/* Client Name with Logo */}
                      <TableCell sx={clientTableCell}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar 
                            src={client.logo} 
                            sx={clientLogoAvatar}
                          >
                            <PersonIcon />
                          </Avatar>
                          <Typography>{client.name}</Typography>
                        </Stack>
                      </TableCell>
                      
                      {/* Contact Email */}
                      <TableCell sx={clientTableCell}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <EmailIcon fontSize="small" sx={contactIcon} />
                          <Typography>{client.contact}</Typography>
                        </Stack>
                      </TableCell>
                      
                      {/* Project Count */}
                      <TableCell sx={clientTableCell}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <WorkIcon fontSize="small" sx={projectsIcon} />
                          <Typography>{client.projects}</Typography>
                        </Stack>
                      </TableCell>
                      
                      {/* Status Chip */}
                      <TableCell>
                        <Chip
                          icon={
                            client.status === 'premium' ? <PremiumIcon color="success" /> :
                            client.status === 'active' ? <PersonIcon color="info" /> :
                            <PersonIcon color="disabled" />
                          }
                          label={client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                          sx={statusChip(client.status)}
                        />
                      </TableCell>
                      
                      {/* Action Menu */}
                      <TableCell>
                        <IconButton 
                          color="text.secondary"
                          onClick={(e) => handleMenuOpen(e, client.id)}
                          sx={actionButton}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Client Statistics Cards */}
        <Grid container spacing={3}>
          {/* Total Clients Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={statsCard}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" sx={pageHeaderText}>
                      Total Clients
                    </Typography>
                    <Typography variant="h4" sx={statsCardValue('coral')}>
                      {clients.length}
                    </Typography>
                  </Box>
                  <Avatar sx={statsAvatar('highlight', 'coral')}>
                    <PeopleIcon color="primary" />
                  </Avatar>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Active Clients Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={statsCard}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" sx={pageHeaderText}>
                      Active Clients
                    </Typography>
                    <Typography variant="h4" sx={statsCardValue('info')}>
                      {clients.filter(c => c.status === 'active').length}
                    </Typography>
                  </Box>
                  <Avatar sx={statsAvatar('highlight', 'info')}>
                    <PeopleIcon color="info" />
                  </Avatar>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Premium Clients Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={statsCard}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" sx={pageHeaderText}>
                      Premium Clients
                    </Typography>
                    <Typography variant="h4" sx={statsCardValue('success')}>
                      {clients.filter(c => c.status === 'premium').length}
                    </Typography>
                  </Box>
                  <Avatar sx={statsAvatar('highlight', 'success')}>
                    <PremiumIcon color="success" />
                  </Avatar>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Action Menu Dropdown */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: menuPaper
        }}
      >
        <MenuItem onClick={handleMenuClose} sx={menuItem}>
          <EditIcon sx={{ mr: 1, color: 'info.main' }} />
          Edit Client
        </MenuItem>
        <MenuItem onClick={handleDeleteClient} sx={menuItem}>
          <DeleteIcon sx={{ mr: 1, color: 'error.light' }} />
          Delete Client
        </MenuItem>
        <Divider sx={menuDivider} />
        <MenuItem 
          onClick={() => handleStatusChange(selectedClient, 'premium')}
          sx={menuItem}
        >
          <Chip 
            icon={<PremiumIcon color="success" />}
            label="Premium" 
            size="small" 
            sx={statusChip('premium')}
          />
        </MenuItem>
        <MenuItem 
          onClick={() => handleStatusChange(selectedClient, 'active')}
          sx={menuItem}
        >
          <Chip 
            label="Active" 
            size="small" 
            sx={statusChip('active')}
          />
        </MenuItem>
        <MenuItem 
          onClick={() => handleStatusChange(selectedClient, 'inactive')}
          sx={menuItem}
        >
          <Chip 
            label="Inactive" 
            size="small" 
            sx={statusChip('inactive')}
          />
        </MenuItem>
      </Menu>
    </Box>
  );
}