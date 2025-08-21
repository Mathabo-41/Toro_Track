// A separate file to handle the main content of the Client Profiles Page.
'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Box, Typography, Button, Table,
  TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Avatar,
  Chip, Stack, Divider, IconButton,
  TextField, InputAdornment, Drawer,
  List, ListItem, ListItemButton,
  ListItemText, Card, CardContent,
  Grid, Menu, MenuItem, FormControl,
  InputLabel, Select, Snackbar, Alert
} from '@mui/material';

import {
  Add as AddIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Work as WorkIcon,
  People as PeopleIcon,
  Delete as DeleteIcon,
  Star as PremiumIcon,
  Logout as LogoutIcon,
  AdminPanelSettings as AdminIcon,
  FilterList as FilterIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import Image from 'next/image';

import useProfiles from './useProfiles/page';
import { useAdminStore, adminMenu } from '../common/adminStore';
import * as globalStyles from '../common/styles';
import * as styles from './styles';

export default function ClientProfContent() {
  const {
    clients, loading, error,
    anchorEl, selectedClientId,
    handleMenuOpen, handleMenuClose,
    handleDelete, handleStatusChange
  } = useProfiles();

  const { selectedMenu, setSelectedMenu } = useAdminStore();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const router = useRouter();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
  
  const handleLogout = () => {
    showSnackbar('Logging out...', 'info');
    setTimeout(() => {
      router.push('/login');
    }, 1500);
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const filteredClients = React.useMemo(() => {
    return clients.filter(client => {
      const matchesSearch = searchTerm === '' || 
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (client.email && client.email.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [clients, searchTerm, statusFilter]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleDeleteWithNotification = () => {
    handleDelete();
    showSnackbar('Client deleted successfully!');
    handleMenuClose();
  };

  const handleEditClient = () => {
    showSnackbar('Edit client feature coming soon!', 'info');
    handleMenuClose();
  };

  const handleStatusChangeWithNotification = (clientId, status) => {
    handleStatusChange(clientId, status);
    showSnackbar(`Client status changed to ${status}`, 'info');
    handleMenuClose();
  };

  const handleAddClient = () => {
    showSnackbar('Redirecting to invite client page...', 'info');
    setTimeout(() => {
      router.push('/dashboard/admin/users');
    }, 1000);
  };

  return (
    <Box sx={globalStyles.rootBox}>
      {/* RENDER: Sidebar Navigation */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{ '& .MuiDrawer-paper': globalStyles.drawerPaper }}
      >
        <Box sx={globalStyles.drawerHeader}>
          <Typography variant="h5">Admin Portal</Typography>
        </Box>
        
        {/* Navigation Menu */}
        <List>
          {adminMenu.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={Link}
                href={item.path}
                sx={
                  item.name === 'Client Profiles'
                    ? globalStyles.activeListItemButton
                    : globalStyles.listItemButton
                }
                selected={selectedMenu === item.path}
                onClick={() => setSelectedMenu(item.path)}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* RENDER: User Profile Section */}
        <Box sx={{
          padding: '1rem',
          borderTop: '2px solid #6b705c',
          marginTop: 'auto'
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '1rem',
            overflow: 'hidden',
            gap: '0.75rem'
          }}>
            <Box sx={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              overflow: 'hidden',
              position: 'relative',
              flexShrink: 0,
              border: '2px solid #f3722c'
            }}>
              <Image
                src="/toroLogo.jpg"
                alt="User Profile"
                fill
                style={{ objectFit: 'cover' }}
              />
            </Box>
            {sidebarOpen && (
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ 
                  fontWeight: '600', 
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: '#fefae0'
                }}>
                  John Doe
                </Typography>
                <Typography sx={{ 
                  fontSize: '0.8rem', 
                  opacity: 0.8, 
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: 'rgba(254, 250, 224, 0.7)'
                }}>
                  admin@toro.com
                </Typography>
              </Box>
            )}
          </Box>
          <Button 
            onClick={handleLogout}
            fullWidth
            sx={{
              padding: '0.75rem',
              background: 'transparent',
              border: '1px solid #fefae0',
              borderRadius: '8px',
              color: '#fefae0',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              '&:hover': {
                background: '#6b705c'
              }
            }}
          >
            {sidebarOpen ? 'Logout' : <LogoutIcon />}
          </Button>
        </Box>
      </Drawer>

      {/* RENDER: Main Content */}
      <Box component="main" sx={globalStyles.mainContentBox}>
        {/* RENDER: Header with Search and Add Button */}
        <Box sx={globalStyles.pageHeader}>
          <PeopleIcon sx={globalStyles.pageHeaderIcon} />
          <Typography variant="h4" sx={globalStyles.pageHeaderText}>
            Client Profiles
          </Typography>
          <Stack direction="row" sx={{ ml: 'auto', gap: 2, alignItems: 'center' }}>
            {/* Search Field */}
            <TextField
              size="small"
              placeholder="Search clients by name, email or contact…"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: styles.searchField
              }}
            />
            
            {/* Status Filter Dropdown */}
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={handleStatusFilterChange}
                label="Status"
                startAdornment={
                  <InputAdornment position="start">
                    <FilterIcon fontSize="small" />
                  </InputAdornment>
                }
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="premium">Premium</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
            
            {/* Add Client Button */}
            <Button
              variant="outlined"
              onClick={handleAddClient}
              startIcon={<AddIcon />}
              sx={styles.addClientButton}
            >
              Add Client
            </Button>
          </Stack>
        </Box>

        {/* RENDER: Results Count */}
        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          Showing {filteredClients.length} of {clients.length} clients
          {searchTerm && ` matching "${searchTerm}"`}
          {statusFilter !== 'all' && ` with status "${statusFilter}"`}
        </Typography>

        {/* RENDER: Error Message (if any) */}
        {error && (
          <Typography color="error.main" sx={{ mb: 2 }}>
            {error.message}
          </Typography>
        )}

        {/* RENDER: Clients Table */}
        <Card sx={styles.clientCard}>
          <CardContent>
            <TableContainer component={Paper} sx={styles.tableContainer}>
              <Table stickyHeader>
                <TableHead sx={styles.tableHeader}>
                  <TableRow>
                    <TableCell sx={styles.tableHeaderCell}>Client</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Contact</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Projects</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Status</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                        <Typography>Loading clients...</Typography>
                      </TableCell>
                    </TableRow>
                  ) : filteredClients.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                        <Typography color="text.secondary">
                          {searchTerm || statusFilter !== 'all' 
                            ? 'No clients match your search criteria' 
                            : 'No clients found'}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredClients.map((client) => (
                      <TableRow key={client.id} hover sx={styles.tableRow}>
                        <TableCell sx={styles.clientTableCell}>
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar src={client.logo} sx={styles.clientLogoAvatar}>
                              <PersonIcon />
                            </Avatar>
                            <Box>
                              <Typography variant="body1" fontWeight="medium">
                                {client.name}
                              </Typography>
                              {client.email && (
                                <Typography variant="body2" color="text.secondary">
                                  {client.email}
                                </Typography>
                              )}
                            </Box>
                          </Stack>
                        </TableCell>
                        <TableCell sx={styles.clientTableCell}>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <EmailIcon sx={styles.contactIcon} />
                            <Typography>{client.contact}</Typography>
                          </Stack>
                        </TableCell>
                        <TableCell sx={styles.clientTableCell}>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <WorkIcon sx={styles.projectsIcon} />
                            <Typography>{client.projects}</Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Chip
                            icon={
                              client.status === 'premium'
                                ? <PremiumIcon color="success" />
                                : <PersonIcon color="info" />
                            }
                            label={client.status}
                            sx={styles.statusChip(client.status)}
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={(e) => handleMenuOpen(e, client.id)}
                            sx={styles.actionButton}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* RENDER: Statistics Cards */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {[
            { label: 'Total Clients', value: clients.length, icon: <PeopleIcon />, color: '#525252' },
            { label: 'Active Clients', value: clients.filter(c => c.status === 'active').length, icon: <PersonIcon color="info" />, color: '#ffb703' },
            { label: 'Premium Clients', value: clients.filter(c => c.status === 'premium').length, icon: <PremiumIcon color="success" />, color: '#40916c' },
            { label: 'Filtered Results', value: filteredClients.length, icon: <FilterIcon color="action" />, color: '#6c757d' }
          ].map(({ label, value, icon, color }) => (
            <Grid item xs={12} sm={6} md={3} key={label}>
              <Card sx={styles.statsCard}>
                <CardContent sx={styles.statsCardContent}>
                  <Box>
                    <Typography variant="body2" sx={globalStyles.pageHeaderText}>
                      {label}
                    </Typography>
                    <Typography variant="h4" sx={styles.statsCardValue(color)}>
                      {value}
                    </Typography>
                  </Box>
                  <Avatar sx={styles.statsAvatar('grey.200', color)}>
                    {icon}
                  </Avatar>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* RENDER: Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{ sx: styles.menuPaper }}
      >
        <MenuItem onClick={handleEditClient} sx={styles.menuItem}>
          <EditIcon fontSize="small" sx={{ mr: 1, color: 'info.main' }} />
          Edit Client
        </MenuItem>
        <MenuItem onClick={handleDeleteWithNotification} sx={styles.menuItem}>
          <DeleteIcon fontSize="small" sx={{ mr: 1, color: 'error.main' }} />
          Delete Client
        </MenuItem>
        <Divider sx={styles.menuDivider} />
        <MenuItem onClick={() => handleStatusChangeWithNotification(selectedClientId, 'premium')} sx={styles.menuItem}>
          <PremiumIcon fontSize="small" sx={{ mr: 1, color: 'success.main' }} />
          Set as Premium
        </MenuItem>
        <MenuItem onClick={() => handleStatusChangeWithNotification(selectedClientId, 'active')} sx={styles.menuItem}>
          <PersonIcon fontSize="small" sx={{ mr: 1, color: 'info.main' }} />
          Set as Active
        </MenuItem>
        <MenuItem onClick={() => handleStatusChangeWithNotification(selectedClientId, 'inactive')} sx={styles.menuItem}>
          <PersonIcon fontSize="small" sx={{ mr: 1, color: 'warning.main' }} />
          Set as Inactive
        </MenuItem>
      </Menu>
      
      {/* RENDER: Snackbar for showing notifications for various actions */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          severity={snackbarSeverity}
          sx={{ 
            width: '100%', 
            fontWeight: 'bold',
            fontSize: '1rem'
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}