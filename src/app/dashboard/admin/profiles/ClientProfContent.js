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
  Star as PremiumIcon, Logout as LogoutIcon, FilterList as FilterIcon
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
  const supabase = createSupabaseClient(); // Initialize the client here
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [selectedClient, setSelectedClient] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);
  
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const handleOpenProfile = (client) => {
    setSelectedClient(client);
    loadClientProfile(client.id);
    setOpenProfile(true);
  };

  const handleCloseProfile = () => {
    setSelectedClient(null);
    setOpenProfile(false);
  };

  const formatPriorityText = (priority) => {
    switch ((priority || '').toLowerCase()) {
      case 'high': return 'High Priority';
      case 'medium': return 'Medium Priority';
      case 'low': return 'Low Priority';
      default: return priority || 'Not Set';
    }
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

  return (
    <Box sx={globalStyles.rootBox}>
      <Drawer variant="permanent" anchor="left" sx={{ '& .MuiDrawer-paper': globalStyles.drawerPaper }}>
        <Box sx={{ p: 1, borderBottom: '2px solid #6b705c', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Link href="/dashboard" passHref><IconButton sx={{ color: 'green' }}><DashboardIcon /></IconButton></Link>
          <Typography variant="h5" sx={{ color: '#fefae0'}}>Admin Portal</Typography>
        </Box>
        <List>
          {adminMenu.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={Link} href={item.path}
                sx={item.name === 'Client Profiles' ? globalStyles.activeListItemButton : globalStyles.listItemButton}
                selected={selectedMenu === item.path} onClick={() => setSelectedMenu(item.path)}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: 'auto', p: 2, borderTop: '2px solid #6b705c' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1.5 }}>
                <Image src="/toroLogo.jpg" alt="User Profile" width={40} height={40} style={{ borderRadius: '50%', border: '2px solid #f3722c' }} />
                <Box sx={{ minWidth: 0 }}>
                    <Typography noWrap sx={{ fontWeight: '600', color: '#fefae0' }}>{currentUser?.email}</Typography>
                    <Typography variant="caption" noWrap sx={{ color: 'rgba(254, 250, 224, 0.7)' }}>Admin</Typography>
                </Box>
            </Box>
            <Button onClick={handleLogout} fullWidth variant="outlined" startIcon={<LogoutIcon />} sx={{ color: '#fefae0', borderColor: '#fefae0', '&:hover': { background: '#6b705c' } }}>
                Logout
            </Button>
        </Box>
      </Drawer>

      <Box component="main" sx={globalStyles.mainContentBox}>
        <Box sx={globalStyles.pageHeader}>
          <PeopleIcon sx={globalStyles.pageHeaderIcon} />
          <Typography variant="h4" sx={globalStyles.pageHeaderText}>Client Profiles</Typography>
          <Stack direction="row" sx={{ ml: 'auto', gap: 2, alignItems: 'center' }}>
            <TextField size="small" placeholder="Search clients..." value={searchTerm} onChange={handleSearchChange} InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>), sx: styles.searchField }}/>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Priority</InputLabel>
              <Select value={priorityFilter} onChange={handlePriorityFilterChange} label="Priority" startAdornment={<InputAdornment position="start"><FilterIcon fontSize="small" /></InputAdornment>}>
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>
            <Button variant="outlined" onClick={handleAddClient} startIcon={<AddIcon />} sx={styles.addClientButton}>Add Client</Button>
          </Stack>
        </Box>

        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          Showing {filteredClients.length} of {clients.length} clients
          {searchTerm && ` matching "${searchTerm}"`}
          {priorityFilter !== 'all' && ` with priority "${formatPriorityText(priorityFilter)}"`}
        </Typography>

        {error && (<Typography color="error.main" sx={{ mb: 2 }}>{error.message}</Typography>)}

        <Card sx={styles.clientCard}>
          <CardContent>
            <TableContainer component={Paper} sx={styles.tableContainer}>
              <Table stickyHeader>
                <TableHead sx={styles.tableHeader}><TableRow><TableCell sx={styles.tableHeaderCell}>Client</TableCell><TableCell sx={styles.tableHeaderCell}>Contact</TableCell><TableCell sx={styles.tableHeaderCell}>Projects</TableCell><TableCell sx={styles.tableHeaderCell}>Priority</TableCell><TableCell sx={styles.tableHeaderCell}>Actions</TableCell></TableRow></TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow><TableCell colSpan={5} align="center" sx={{ py: 3 }}><Typography>Loading clients...</Typography></TableCell></TableRow>
                  ) : filteredClients.length === 0 ? (
                    <TableRow><TableCell colSpan={5} align="center" sx={{ py: 3 }}><Typography color="text.secondary">{searchTerm || priorityFilter !== 'all' ? 'No clients match criteria' : 'No clients found'}</Typography></TableCell></TableRow>
                  ) : (
                    filteredClients.map((client) => (
                      <TableRow key={client.id} hover sx={styles.tableRow}>
                        <TableCell sx={styles.clientTableCell}><Stack direction="row" alignItems="center" spacing={2}><Avatar src={client.logo} sx={styles.clientLogoAvatar}><PersonIcon /></Avatar><Box><Typography variant="body1" fontWeight="medium">{client.name}</Typography>{client.email && (<Typography variant="body2" color="text.secondary">{client.email}</Typography>)}</Box></Stack></TableCell>
                        <TableCell sx={styles.clientTableCell}><Stack direction="row" alignItems="center" spacing={1}><EmailIcon sx={styles.contactIcon} /><Typography>{client.contact}</Typography></Stack></TableCell>
                        <TableCell sx={styles.clientTableCell}><Stack direction="row" alignItems="center" spacing={1}><WorkIcon sx={styles.projectsIcon} /><Typography>{client.projects}</Typography></Stack></TableCell>
                        <TableCell><Chip icon={client.priority === 'high' ? <PremiumIcon /> : <PersonIcon />} label={formatPriorityText(client.priority)} sx={styles.statusChip(client.priority)} /></TableCell>
                        <TableCell><IconButton onClick={(e) => handleMenuOpen(e, client.id)} sx={styles.actionButton}><MoreVertIcon /></IconButton></TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} PaperProps={{ sx: styles.menuPaper }}>
        <MenuItem onClick={() => { const clientData = clients.find(c => c.id === selectedClientId); if (clientData) { handleOpenProfile(clientData); } handleMenuClose(); }}><PersonIcon sx={{ mr: 1 }} /> View Profile</MenuItem>
        <MenuItem onClick={handleDeleteWithNotification} sx={styles.menuItem}><DeleteIcon fontSize="small" sx={{ mr: 1, color: 'error.main' }} />Delete Client</MenuItem>
        <Divider sx={styles.menuDivider} />
        <MenuItem onClick={() => handlePriorityChangeWithNotification(selectedClientId, 'high')} sx={styles.menuItem}><PremiumIcon fontSize="small" sx={{ mr: 1, color: 'success.main' }} />Set High Priority</MenuItem>
        <MenuItem onClick={() => handlePriorityChangeWithNotification(selectedClientId, 'medium')} sx={styles.menuItem}><PersonIcon fontSize="small" sx={{ mr: 1, color: 'info.main' }} />Set Medium Priority</MenuItem>
        <MenuItem onClick={() => handlePriorityChangeWithNotification(selectedClientId, 'low')} sx={styles.menuItem}><PersonIcon fontSize="small" sx={{ mr: 1, color: 'warning.main' }} />Set Low Priority</MenuItem>
      </Menu>
      
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity={snackbarSeverity} sx={{ width: '100%', fontWeight: 'bold', fontSize: '1rem' }}>{snackbarMessage}</Alert>
      </Snackbar>
    </Box>
  );
}