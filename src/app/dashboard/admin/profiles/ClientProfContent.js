// This file handles the main content of the Client Profiles Page.
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { createSupabaseClient } from '@/lib/supabase/client';
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Avatar, Chip, Stack, Divider, IconButton,
  TextField, InputAdornment, Drawer, List, ListItem, ListItemButton,
  ListItemText, Card, CardContent, Grid, Menu, MenuItem, FormControl,
  InputLabel, Select, Snackbar, Alert, Dialog,
  DialogTitle, DialogActions, DialogContent
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import {
  Add as AddIcon, Search as SearchIcon, MoreVert as MoreVertIcon, Person as PersonIcon,
  Email as EmailIcon, Work as WorkIcon, People as PeopleIcon, Delete as DeleteIcon,
  Star as PremiumIcon, Logout as LogoutIcon, FilterList as FilterIcon,
  Phone as PhoneIcon, Business as BusinessIcon, CalendarToday as CalendarIcon,
  Badge as BadgeIcon
} from '@mui/icons-material';

import useProfiles from './useProfiles/page';
import { useAdminStore, adminMenu } from '../common/adminStore';
import * as globalStyles from '../common/styles';
import * as styles from './styles';

export default function ClientProfContent() {
  const {
    clients, loading, error, anchorEl, selectedClientId,
    handleMenuOpen, handleMenuClose, handleDelete, handleStatusChange,
    profileData, loadingProfile, loadClientProfile
  } = useProfiles();

  const { selectedMenu, setSelectedMenu } = useAdminStore();
  const router = useRouter();
  const supabase = createSupabaseClient();
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isLogoutSnackbar, setIsLogoutSnackbar] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);
  const [clientProjects, setClientProjects] = useState([]);
  
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    };
    fetchUser();
  }, [supabase]);

  const handleLogout = async () => {
    // Show green logout snackbar
    setSnackbarMessage('Logging out...');
    setSnackbarSeverity('success');
    setIsLogoutSnackbar(true);
    setOpenSnackbar(true);
    
    setTimeout(async () => {
      await supabase.auth.signOut();
      router.push('/login');
    }, 1500);
  };

  const handleOpenProfile = async (client) => {
    setSelectedClient(client);
    
    // Load client profile data
    if (loadClientProfile) {
      loadClientProfile(client.id);
    }
    
    // Fetch client projects from database
    try {
      const { data: projects, error } = await supabase
        .from('projects')
        .select('*')
        .eq('client_id', client.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
        setClientProjects([]);
      } else {
        setClientProjects(projects || []);
      }
    } catch (err) {
      console.error('Error fetching client projects:', err);
      setClientProjects([]);
    }
    
    setOpenProfile(true);
  };

  const handleCloseProfile = () => {
    setSelectedClient(null);
    setOpenProfile(false);
    setClientProjects([]);
  };

  const formatPriorityText = (priority) => {
    switch ((priority || '').toLowerCase()) {
      case 'high': return 'High Priority';
      case 'medium': return 'Medium Priority';
      case 'low': return 'Low Priority';
      default: return priority || 'Not Set';
    }
  };

  const getPriorityColor = (priority) => {
    switch ((priority || '').toLowerCase()) {
      case 'high': return '#f44336';
      case 'medium': return '#ff9800';
      case 'low': return '#4caf50';
      default: return '#9e9e9e';
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setIsLogoutSnackbar(false);
    setOpenSnackbar(true);
  };

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

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handlePriorityFilterChange = (e) => setPriorityFilter(e.target.value);

  const handleDeleteWithNotification = () => {
    handleDelete();
    showSnackbar('Client deleted successfully!');
    handleMenuClose();
  };

  const handlePriorityChangeWithNotification = (clientId, priority) => {
    handleStatusChange(clientId, priority);
    showSnackbar(`Client status changed to ${formatPriorityText(priority)}`, 'info');
    handleMenuClose();
  };

  const handleAddClient = () => {
    showSnackbar('Redirecting to invite client page...', 'info');
    setTimeout(() => {
      router.push('/dashboard/admin/users');
    }, 1000);
  };

  // Safely get projects count - handle both numbers and objects
  const getProjectsCount = (projects) => {
    if (typeof projects === 'number') return projects;
    if (typeof projects === 'string') return parseInt(projects, 10) || 0;
    if (Array.isArray(projects)) return projects.length;
    if (projects && typeof projects === 'object') {
      return projects.count || projects.total || projects.length || 0;
    }
    return 0;
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Invalid Date';
    }
  };

  return (
    <Box sx={globalStyles.rootBox}>
      <Drawer variant="permanent" anchor="left" sx={{ '& .MuiDrawer-paper': globalStyles.drawerPaper }}>
        <Box sx={{ p: 1, borderBottom: '2px solid #6b705c', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Link href="/dashboard/admin/overview" passHref>
            <IconButton sx={{ color: 'green' }}>
              <DashboardIcon />
            </IconButton>
          </Link>
          <Typography variant="h5" sx={{ color: '#fefae0'}}>Admin Portal</Typography>
        </Box>
        
        <List>
          {adminMenu.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={Link} 
                href={item.path}
                sx={item.name === 'Client Profiles' ? globalStyles.activeListItemButton : globalStyles.listItemButton}
                selected={selectedMenu === item.path} 
                onClick={() => setSelectedMenu(item.path)}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: 'auto', p: 2, borderTop: '2px solid #6b705c' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1.5 }}>
            <Image 
              src="/toroLogo.jpg" 
              alt="User Profile" 
              width={40} 
              height={40} 
              style={{ borderRadius: '50%', border: '2px solid #f3722c' }} 
            />
            <Box sx={{ minWidth: 0 }}>
              <Typography noWrap sx={{ fontWeight: '600', color: '#fefae0' }}>
                {currentUser?.email}
              </Typography>
              <Typography variant="caption" noWrap sx={{ color: 'rgba(254, 250, 224, 0.7)' }}>
                Admin
              </Typography>
            </Box>
          </Box>
          <Button 
            onClick={handleLogout} 
            fullWidth 
            variant="outlined" 
            startIcon={<LogoutIcon />} 
            sx={{ color: '#fefae0', borderColor: '#fefae0', '&:hover': { background: '#6b705c' } }}
          >
            Logout
          </Button>
        </Box>
      </Drawer>

      <Box component="main" sx={globalStyles.mainContentBox}>
        <Box sx={globalStyles.pageHeader}>
          <PeopleIcon sx={globalStyles.pageHeaderIcon} />
          <Typography variant="h4" sx={globalStyles.pageHeaderText}>
            Client Profiles
          </Typography>
          <Stack direction="row" sx={{ ml: 'auto', gap: 2, alignItems: 'center' }}>
            <TextField 
              size="small" 
              placeholder="Search clients..." 
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
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>
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

        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          Showing {filteredClients.length} of {clients.length} clients
          {searchTerm && ` matching "${searchTerm}"`}
          {priorityFilter !== 'all' && ` with priority "${formatPriorityText(priorityFilter)}"`}
        </Typography>

        {error && (
          <Typography color="error.main" sx={{ mb: 2 }}>
            {error.message}
          </Typography>
        )}

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
                          {searchTerm || priorityFilter !== 'all' ? 'No clients match criteria' : 'No clients found'}
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
                            <Typography>{getProjectsCount(client.projects)}</Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            icon={client.priority === 'high' ? <PremiumIcon /> : <PersonIcon />} 
                            label={formatPriorityText(client.priority)} 
                            sx={{
                              ...styles.statusChip(client.priority),
                              backgroundColor: getPriorityColor(client.priority),
                              color: 'white',
                              '& .MuiChip-icon': { color: 'white' }
                            }} 
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
      </Box>

      {/* Client Profile Dialog */}
      <Dialog
        open={openProfile}
        onClose={handleCloseProfile}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: 'linear-gradient(145deg, #fefae0 0%, #faedcd 100%)',
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            background: 'linear-gradient(45deg, #6b705c 30%, #8a9175 90%)',
            color: '#fefae0',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            py: 3
          }}
        >
          <PersonIcon />
          Client Profile: {selectedClient?.name}
        </DialogTitle>
        
        <DialogContent sx={{ py: 4, px: 3 }}>
          {loadingProfile ? (
            <Typography>Loading profile details...</Typography>
          ) : (
            <Grid container spacing={4}>
              {/* Client Information */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ mb: 3, color: '#283618', borderBottom: '2px solid #6b705c', pb: 1 }}>
                  Client Information
                </Typography>
                <Stack spacing={3}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <BusinessIcon fontSize="small" /> Company Name
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {profileData?.company || 'Not available'}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <PersonIcon fontSize="small" /> Full Name
                    </Typography>
                    <Typography variant="body1">
                        {profileData?.full_name || selectedClient?.name || 'Not available'}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <EmailIcon fontSize="small" /> Email Address
                    </Typography>
                    <Typography variant="body1">
                      {profileData?.email || selectedClient?.email || 'No email provided'}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <PhoneIcon fontSize="small" /> Contact Information
                    </Typography>
                    <Typography variant="body1">
                      {profileData?.phone_number || selectedClient?.contact || 'Not available'}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <BadgeIcon fontSize="small" /> Position
                    </Typography>
                    <Typography variant="body1">
                        {profileData?.position || 'Not available'}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <PremiumIcon fontSize="small" /> Priority Level
                    </Typography>
                    <Chip 
                      label={formatPriorityText(selectedClient?.priority)} 
                      sx={{
                        backgroundColor: getPriorityColor(selectedClient?.priority),
                        color: 'white',
                        fontWeight: 'bold'
                      }}
                    />
                  </Box>
                </Stack>
              </Grid>

              {/* Projects & Statistics */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ mb: 3, color: '#283618', borderBottom: '2px solid #6b705c', pb: 1 }}>
                  Projects & Statistics
                </Typography>
                <Stack spacing={3}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <WorkIcon fontSize="small" /> Total Projects
                    </Typography>
                    <Typography variant="h4" color="primary" fontWeight="bold">
                      {getProjectsCount(selectedClient?.projects)}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <CalendarIcon fontSize="small" /> Active Projects
                    </Typography>
                    <Typography variant="body1">
                      {clientProjects.filter(project => project.status === 'active').length} active
                    </Typography>
                  </Box>
                  
                  {clientProjects.length > 0 && (
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                        Recent Projects:
                      </Typography>
                      <Stack spacing={1}>
                        {clientProjects.slice(0, 3).map(project => (
                          <Chip
                            key={project.id}
                            label={project.name}
                            size="small"
                            variant="outlined"
                            sx={{ borderColor: '#6b705c', color: '#283618' }}
                          />
                        ))}
                        {clientProjects.length > 3 && (
                          <Typography variant="caption" color="text.secondary">
                            +{clientProjects.length - 3} more projects
                          </Typography>
                        )}
                      </Stack>
                    </Box>
                  )}
                </Stack>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        
        <DialogActions sx={{ px: 3, pb: 3, gap: 2 }}>
          <Button 
            onClick={handleCloseProfile}
            sx={{
              borderColor: '#6b705c',
              color: '#6b705c',
              '&:hover': {
                backgroundColor: '#6b705c',
                color: '#fefae0'
              }
            }}
          >
            Close
          </Button>
          <Button 
            variant="contained"
            onClick={() => {
              // Add functionality to edit client
              showSnackbar('Edit client functionality coming soon!', 'info');
            }}
            sx={{
              backgroundColor: '#f3722c',
              '&:hover': {
                backgroundColor: '#e55a1e'
              }
            }}
          >
            Edit Client
          </Button>
        </DialogActions>
      </Dialog>

      <Menu 
        anchorEl={anchorEl} 
        open={Boolean(anchorEl)} 
        onClose={handleMenuClose} 
        PaperProps={{ sx: styles.menuPaper }}
      >
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
        <MenuItem 
          onClick={handleDeleteWithNotification} 
          sx={styles.menuItem}
        >
          <DeleteIcon fontSize="small" sx={{ mr: 1, color: 'error.main' }} />
          Delete Client
        </MenuItem>
        <Divider sx={styles.menuDivider} />
        <MenuItem 
          onClick={() => handlePriorityChangeWithNotification(selectedClientId, 'high')} 
          sx={styles.menuItem}
        >
          <PremiumIcon fontSize="small" sx={{ mr: 1, color: 'success.main' }} />
          Set High Priority
        </MenuItem>
        <MenuItem 
          onClick={() => handlePriorityChangeWithNotification(selectedClientId, 'medium')} 
          sx={styles.menuItem}
        >
          <PersonIcon fontSize="small" sx={{ mr: 1, color: 'info.main' }} />
          Set Medium Priority
        </MenuItem>
        <MenuItem 
          onClick={() => handlePriorityChangeWithNotification(selectedClientId, 'low')} 
          sx={styles.menuItem}
        >
          <PersonIcon fontSize="small" sx={{ mr: 1, color: 'warning.main' }} />
          Set Low Priority
        </MenuItem>
      </Menu>
      
      {/* Snackbar Notifications */}
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={1500} 
        onClose={() => setOpenSnackbar(false)} 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          severity={snackbarSeverity} 
          sx={{ 
            width: '100%', 
            fontWeight: 'bold', 
            fontSize: '1.2rem',
            ...(isLogoutSnackbar && {
               backgroundColor: '#5caa93ff',
            color: 'black',
              '& .MuiAlert-icon': {
                color: 'white'
              }
            })
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}