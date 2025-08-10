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

/**
 * Client Profiles Management Screen
 * 
 * Features:
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

  // Status color configuration
  const statusColors = {
    premium: { 
      bg: 'rgba(46, 125, 50, 0.2)', 
      color: '#81c784', 
      icon: <PremiumIcon color="success" />,
      border: '1px solid #2e7d32'
    },
    active: { 
      bg: 'rgba(2, 136, 209, 0.2)', 
      color: '#4fc3f7', 
      icon: <PersonIcon color="info" />,
      border: '1px solid #0288d1'
    },
    inactive: { 
      bg: 'rgba(97, 97, 97, 0.2)', 
      color: '#bdbdbd', 
      icon: <PersonIcon color="disabled" />,
      border: '1px solid #616161'
    }
  };

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
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh', 
      minWidth:'90vw',
      backgroundColor: '#fefae0' 
    }}>
      {/* ===== SIDEBAR NAVIGATION ===== */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#283618',
            borderRight: '2px solid #222',
           color: '#fefae0'
          }
        }}
      >
        {/* Sidebar Header */}
        <Box sx={{ p: 2, borderBottom: '2px solid #6b705c' }}>
          <Typography variant="h5">
            Admin Portal
          </Typography>
        </Box>
        
        {/* Navigation Menu */}
        <List>
          {adminMenu.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton 
                component={Link} 
                href={item.path}
                sx={{ 
                  color: '#fefae0',
                  '&:hover': {
                    backgroundColor: '#6b705c'
                  }
                }}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* ===== MAIN CONTENT AREA ===== */}
      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: 3,
        backgroundColor: '#fefae0' 
      }}>
        {/* Page Header with Search and Add Client Button */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4,
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Typography variant="h4" sx={{ 
            color: '#525252',
            fontWeight: 500
          }}>
            <PeopleIcon sx={{ 
              mr: 1, 
              verticalAlign: 'middle',
              color: '#525252' 
            }} />
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
                    <SearchIcon sx={{ color: '#525252' }} />
                  </InputAdornment>
                ),
                sx: { 
                  color: '#525252',
                  backgroundColor: '#fefae0',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#525252', 
                    },
                  },
                }
              }}
              sx={{ flexGrow: { xs: 1, sm: 0 } }}
            />
            {/* Add Client Button */}
            <Button 
              variant="outlined" 
              startIcon={<AddIcon />}
              sx={{
                backgroundColor: '#283618', 
                color: '#fefae0', 
                fontWeight: 500,
                '&:hover': { 
                  backgroundColor: '#606c38',
                  borderColor: '#fefae0'
                },
                whiteSpace: 'nowrap'
              }}
            >
              Add Client
            </Button>
          </Stack>
        </Box>

        {/* Clients Table */}
        <Card sx={{ 
          backgroundColor: '#fefae0', 
          mb: 3,
          border: '1px solid #222' // Subtle border
        }}>
          <CardContent>
            <Typography variant="h6" sx={{ 
              color: '#525252',
              mb: 2,
              fontWeight: 500
            }}>
              All Clients
            </Typography>
            <TableContainer component={Paper} sx={{ 
              backgroundColor: 'transparent',
              border: '2px solid #525252'
            }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#fefae0', fontWeight: 'bold' }}>Client</TableCell>
                    <TableCell sx={{ color: '#fefae0', fontWeight: 'bold' }}>Contact</TableCell>
                    <TableCell sx={{ color: '#fefae0', fontWeight: 'bold' }}>Projects</TableCell>
                    <TableCell sx={{ color: '#fefae0', fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell sx={{ color: '#fefae0', fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {clients.map((client) => (
                    <TableRow 
                      key={client.id} 
                      hover 
                      sx={{ 
                        '&:hover': { 
                          backgroundColor: '#1a1a1a' 
                        } 
                      }}
                    >
                      {/* Client Name with Logo */}
                      <TableCell sx={{ color: '#283618' }}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar 
                            src={client.logo} 
                            sx={{ 
                              width: 40, 
                              height: 40, 
                              bgcolor: '#333',
                              border: '1px solid #444'
                            }}
                          >
                            <PersonIcon />
                          </Avatar>
                          <Typography>{client.name}</Typography>
                        </Stack>
                      </TableCell>
                      
                      {/* Contact Email */}
                      <TableCell sx={{ color: '#525252' }}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <EmailIcon fontSize="small" sx={{ color: '#f3722c' }} />
                          <Typography>{client.contact}</Typography>
                        </Stack>
                      </TableCell>
                      
                      {/* Project Count */}
                      <TableCell sx={{ color: '#14213d'}}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <WorkIcon fontSize="small" sx={{ color: '#f3722c' }} />
                          <Typography>{client.projects}</Typography>
                        </Stack>
                      </TableCell>
                      
                      {/* Status Chip */}
                      <TableCell>
                        <Chip
                          icon={statusColors[client.status].icon}
                          label={client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                          sx={{ 
                            backgroundColor: statusColors[client.status].bg,
                            color: statusColors[client.status].color,
                            border: statusColors[client.status].border,
                            fontWeight: 'bold',
                            pl: 1 // Padding for icon
                          }}
                        />
                      </TableCell>
                      
                      {/* Action Menu */}
                      <TableCell>
                        <IconButton 
                          sx={{ color: '#525252' }}
                          onClick={(e) => handleMenuOpen(e, client.id)}
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
            <Card sx={{ 
              backgroundColor: '#fefae0',
              border: '1px solid #222',
              height: '100%'
            }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" sx={{ color: '#525252'}}>
                      Total Clients
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#f3722c', fontWeight: 500 }}>
                      {clients.length}
                    </Typography>
                  </Box>
                  <Avatar sx={{ 
                    bgcolor: 'rgba(244, 193, 15, 0.1)',
                    width: 56, 
                    height: 56,
                    border: '1px solid #f3722c'
                  }}>
                    <PeopleIcon color="primary" />
                  </Avatar>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Active Clients Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ 
              backgroundColor: '#fefae0',
              border: '1px solid #222',
              height: '100%'
            }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" sx={{ color: '#525252' }}>
                      Active Clients
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#4fc3f7', fontWeight: 500 }}>
                      {clients.filter(c => c.status === 'active').length}
                    </Typography>
                  </Box>
                  <Avatar sx={{ 
                    bgcolor: 'rgba(2, 136, 209, 0.1)', // Light blue background
                    width: 56, 
                    height: 56,
                    border: '1px solid #0288d1'
                  }}>
                    <PeopleIcon color="info" />
                  </Avatar>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Premium Clients Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ 
              backgroundColor: '#fefae0',
              border: '1px solid #222',
              height: '100%'
            }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" sx={{ color: '#525252' }}>
                      Premium Clients
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#81c784', fontWeight: 500 }}>
                      {clients.filter(c => c.status === 'premium').length}
                    </Typography>
                  </Box>
                  <Avatar sx={{ 
                    bgcolor: 'rgba(46, 125, 50, 0.1)', // Light green background
                    width: 56, 
                    height: 56,
                    border: '1px solid #2e7d32'
                  }}>
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
          sx: {
            backgroundColor: '#f1faee',
            color: '#283618',
            border: '2px solid #283618',
            minWidth: '200px'
          }
        }}
      >
        <MenuItem onClick={handleMenuClose} sx={{ '&:hover': { backgroundColor: '#606c38' } }}>
          <EditIcon sx={{ mr: 1, color: '#2196f3' }} />
          Edit Client
        </MenuItem>
        <MenuItem onClick={handleDeleteClient} sx={{ '&:hover': { backgroundColor: '#606c38'} }}>
          <DeleteIcon sx={{ mr: 1, color: '#f44336' }} />
          Delete Client
        </MenuItem>
        <Divider sx={{ backgroundColor: '#333' }} />
        <MenuItem 
          onClick={() => handleStatusChange(selectedClient, 'premium')}
          sx={{ '&:hover': { backgroundColor: '#6b705c' } }}
        >
          <Chip 
            icon={<PremiumIcon color="success" />}
            label="Premium" 
            size="small" 
            sx={{ 
              backgroundColor: 'rgba(46, 125, 50, 0.2)',
              color: '#81c784',
              border: '1px solid #2e7d32',
              mr: 1 
            }} 
          />
        </MenuItem>
        <MenuItem 
          onClick={() => handleStatusChange(selectedClient, 'active')}
          sx={{ '&:hover': { backgroundColor: '#6b705c'} }}
        >
          <Chip 
            label="Active" 
            size="small" 
            sx={{ 
              backgroundColor: 'rgba(2, 136, 209, 0.2)',
              color: '#4fc3f7',
              border: '1px solid #0288d1',
              mr: 1 
            }} 
          />
        </MenuItem>
        <MenuItem 
          onClick={() => handleStatusChange(selectedClient, 'inactive')}
          sx={{ '&:hover': { backgroundColor: '#6b705c' } }}
        >
          <Chip 
            label="Inactive" 
            size="small" 
            sx={{ 
              bgcolor: 'rgba(244, 193, 15, 0.1)',
              color: '#f3722c',
              border: '1px solid #f3722c',
              mr: 1 
            }} 
          />
        </MenuItem>
      </Menu>
    </Box>
  );
}