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
  InputLabel, Select, Snackbar, Alert, Dialog,
  DialogTitle, DialogActions, DialogContent

} from '@mui/material';

//dashboard icon import 
import DashboardIcon from '@mui/icons-material/Dashboard';

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
    handleDelete, handleStatusChange,
    profileData, loadingProfile,
    loadClientProfile
  } = useProfiles();

  const { selectedMenu, setSelectedMenu } = useAdminStore();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [priorityFilter, setPriorityFilter] = React.useState('all');
  const router = useRouter();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');

  //state for opening a clients file/information that will be displayed with a pop up 
  const [selectedClient, setSelectedClient] = React.useState(null);
  const [openProfile, setOpenProfile] = React.useState(false);
  
  const handleLogout = () => {
    showSnackbar('Logging out...', 'info');
    setTimeout(() => {
      router.push('/login');
    }, 1500);
  };

  //helpers for closing and opening a certain users profile 
  const handleOpenProfile = (client) => {
    setSelectedClient(client);
    loadClientProfile(client.id);
    setOpenProfile(true);
  };

  const handleCloseProfile = () => {
    setSelectedClient(null);
    setOpenProfile(false);
  };

//helper to filter priority filtering 
const formatPriorityText = (priority) => {
  switch ((priority || '').toLowerCase()) {
    case 'high': return 'High Priority';
    case 'medium': return 'Medium Priority';
    case 'low': return 'Low Priority';
    default: return priority || 'Not Set';
  }
};

//snack bar 
  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  //handle for filtering clients 
  const filteredClients = React.useMemo(() => {
    return clients.filter(client => {
      const matchesSearch = searchTerm === '' || 
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (client.email && client.email.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = priorityFilter === 'all' || client.priority === priorityFilter;
      return matchesSearch && matchesStatus;
    });
  }, [clients, searchTerm, priorityFilter]);

  //helper for searching and search change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
//helper for filtering the priorities for each Client's project
  const handlePriorityFilterChange = (e) => {
    setPriorityFilter(e.target.value);
  };

  //handler to delete client with a success snack bar notification

  const handleDeleteWithNotification = () => {
    handleDelete();
    showSnackbar('Client deleted successfully!');
    handleMenuClose();
  };

  //handler for editing clients information
  const handleEditClient = () => {
    showSnackbar('Edit client feature coming soon!', 'info');
    handleMenuClose();
  };

  //handles the change of a priority for a project and displays a success message via snack bar
  const handlePriorityChangeWithNotification = (clientId, priority) => {
    handleStatusChange(clientId, priority);
    showSnackbar(`Client status changed to ${formatPriorityText(priority)}`, 'info');
    handleMenuClose();
  };
//handler for adding a client
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
          <Box sx={{ 
              p: 1,
              borderBottom: '2px solid #6b705c',
              display: 'flex', 
              alignItems: 'center', 
              gap: 1 
                     }}>
 {/**Redirection for the icon to Navigate to the main Dashboard */}
         <Link href="/dashboard" passHref>
      <IconButton sx={{ color: 'green' }} aria-label="Go to Dashboard">
        <DashboardIcon />
      </IconButton>
    </Link>
    <Typography variant="h5" sx={{ color: '#fefae0'}}>
      Admin Portal
    </Typography>
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
            
            {/* Priority Filter Dropdown */}
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={priorityFilter}
                onChange={handlePriorityFilterChange}
                label="Priority"
                startAdornment={
                  <InputAdornment position="start">
                    <FilterIcon fontSize="small" />
                  </InputAdornment>
                }
              >
                <MenuItem value="all">All Priorities</MenuItem>
                <MenuItem value="high">High Priority</MenuItem>
                <MenuItem value="medium">Medium Priority</MenuItem>
                <MenuItem value="low">Low Priority</MenuItem>
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
       {priorityFilter !== 'all' && ` with priority "${formatPriorityText(priorityFilter)}"`}
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
                    <TableCell sx={styles.tableHeaderCell}>Priority</TableCell>
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
                          {searchTerm || priorityFilter !== 'all' 
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
                              client.priority === 'high'
                                ? <PremiumIcon color="success" />
                                : <PersonIcon color="info" />
                            }
                            label={formatPriorityText(client.priority)}
                            sx={styles.statusChip(client.priority)}
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
            { label: 'Low Priority Clients', value: clients.filter(c => c.priority === 'low').length, icon: <PersonIcon color="info" />, color: '#ffb703' },
            { label: 'High Priority Clients', value: clients.filter(c => c.priority === 'high').length, icon: <PremiumIcon color="success" />, color: '#40916c' },
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
        {/**View Profile Button */}
       <MenuItem
           onClick={() => {
           const clientData = clients.find(c => c.id === selectedClientId);
           if (clientData) {
           handleOpenProfile(clientData);
           }
           handleMenuClose();
          }}
        >
        <PersonIcon sx={{ mr: 1 }} /> View Profile
        </MenuItem>


        <MenuItem onClick={handleDeleteWithNotification} sx={styles.menuItem}>
          <DeleteIcon fontSize="small" sx={{ mr: 1, color: 'error.main' }} />
          Delete Client
        </MenuItem>
        <Divider sx={styles.menuDivider} />
        <MenuItem onClick={() => handlePriorityChangeWithNotification(selectedClientId, 'high')} sx={styles.menuItem}>
          <PremiumIcon fontSize="small" sx={{ mr: 1, color: 'success.main' }} />
          Set as High Priority
        </MenuItem>
        <MenuItem onClick={() => handlePriorityChangeWithNotification(selectedClientId, 'medium')} sx={styles.menuItem}>
          <PersonIcon fontSize="small" sx={{ mr: 1, color: 'info.main' }} />
          Set as Medium Priority
        </MenuItem>
        <MenuItem onClick={() => handlePriorityChangeWithNotification(selectedClientId, 'low')} sx={styles.menuItem}>
          <PersonIcon fontSize="small" sx={{ mr: 1, color: 'warning.main' }} />
          Set as Low Priority
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

      {/* RENDER: Client Profile Modal */}
     <Dialog open={openProfile} onClose={handleCloseProfile} fullWidth maxWidth="md">
  <DialogTitle>
    {selectedClient?.name}
    {selectedClient?.priority && (
      <Chip
        label={formatPriorityText(selectedClient.priority)}
        sx={{ ml: 2 }}
      />
    )}
  </DialogTitle>

  <DialogContent dividers>
    {loadingProfile ? (
      <Typography>Loading client data...</Typography>
    ) : profileData ? (
      <>
        <Box mb={2}>
          <Typography variant="h6">Overview</Typography>
          <Typography>Email: {profileData.email}</Typography>
          <Typography>Contact: {profileData.contact}</Typography>
        </Box>

        <Box mb={2}>
          <Typography variant="h6">Projects</Typography>
          {profileData.projects?.length > 0 ? (
            profileData.projects.map((proj) => (
              <Typography key={proj.id}>• {proj.name}</Typography>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              No projects found
            </Typography>
          )}
        </Box>

        <Box mb={2}>
          <Typography variant="h6">Recent Activity</Typography>
          {profileData.activity?.length > 0 ? (
            profileData.activity.map((a, i) => (
              <Typography key={i}>{a}</Typography>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              No activity found
            </Typography>
          )}
        </Box>
      </>
    ) : (
      <Typography>No data found for this client.</Typography>
    )}
  </DialogContent>

  <DialogActions>
    <Button onClick={handleCloseProfile}>Close</Button>
  </DialogActions>
</Dialog>



    </Box>
  );
}