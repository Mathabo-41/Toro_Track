// This file handles user invites, role assigning, and team management.
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createSupabaseClient } from '@/lib/supabase/client';
import {
  Box, Typography, Grid, Card, CardContent, Avatar,
  Stack, List, ListItem, ListItemText, Button,
  Drawer, ListItemButton, TextField, Chip,
  IconButton, Menu, MenuItem, Paper, Table, TableBody, Tooltip,
  TableCell, TableContainer, TableHead, TableRow, DialogActions, Dialog, DialogTitle, DialogContent, DialogContentText,
  Select, FormControl, InputAdornment, Snackbar, Alert,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DashboardIcon from '@mui/icons-material/Dashboard';
import {
  Security as SecurityIcon,
  People as PeopleIcon,
  Groups as TeamsIcon,
  MoreVert as MoreVertIcon,
  Email as EmailIcon,
  Assignment as AssignmentIcon,
  GroupAdd as GroupAddIcon,
  Logout as LogoutIcon,
  Delete as DeleteIcon,
  WarningAmber as WarningAmberIcon
} from '@mui/icons-material';

import { styles } from './styles';
import { useUsers } from './useUsers/page';
import { adminMenuData } from './usersService/page';

export default function TeamsAndUsers() {
  const supabase = createSupabaseClient();
  const {
    inviteEmail, setInviteEmail, users,
    anchorEl, isMenuOpen, handleInviteUser,
    handleMenuOpen, handleMenuClose, handleAssignTask,
    handleRemoveUser, isConfirmDialogOpen,
    handleCloseConfirmDialog, handleConfirmRemove
  } = useUsers();

  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [openInviteSuccess, setOpenInviteSuccess] = useState(false);
  const [invitedEmail, setInvitedEmail] = useState('');
  const [openInviteDialog, setOpenInviteDialog] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Client');

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
  
  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedPassword(password);
    return password;
  };
  
  const handleOpenInviteDialog = () => {
    setGeneratedPassword(generatePassword());
    setOpenInviteDialog(true);
  };

  const handleCloseInviteDialog = () => {
    setOpenInviteDialog(false);
    setCopied(false);
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(generatedPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendInvite = () => {
    setInvitedEmail(inviteEmail);
    handleInviteUser(selectedRole, generatedPassword);
    setOpenInviteDialog(false);
    setInviteEmail('');
    setOpenInviteSuccess(true);
  };

  return (
    <Box sx={styles.mainContainer}>
      <Drawer variant="permanent" anchor="left" sx={styles.sidebarDrawer}>
        <Box sx={{ ...styles.sidebarHeader, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Link href="/dashboard/admin/overview" passHref><IconButton sx={{ color: 'green' }}><DashboardIcon /></IconButton></Link>
          <Typography variant="h5">Admin Portal</Typography>
        </Box>
        <List>
          {adminMenuData.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton component={Link} href={item.path} sx={styles.sidebarListItemButton(item.name)}>
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

      <Box component="main" sx={styles.mainContent}>
        <Box sx={styles.pageHeader}>
          <Typography variant="h4" sx={styles.pageTitle}><TeamsIcon sx={styles.headerIcon} />Teams & Users</Typography>
          <Typography variant="body1" sx={styles.pageSubtitle}>Manage your team members and assign tasks</Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={12}>
            <Card sx={styles.inviteCard}>
              <CardContent>
                <Typography variant="h6" sx={styles.inviteCardHeader}>Invite New User</Typography>
                <Stack direction="row" spacing={2}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Email address"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    InputProps={{ style: { color: '#525252' }, startAdornment: (<InputAdornment position="start"><EmailIcon sx={styles.emailIcon} /></InputAdornment>), sx: styles.emailInput, }}
                  />
                  <FormControl sx={{ minWidth: 180 }}>
                    <Select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} sx={styles.selectInput} startAdornment={<InputAdornment position="start"><SecurityIcon fontSize="small" /></InputAdornment>}>
                      <MenuItem value="Admin">Admin</MenuItem>
                      <MenuItem value="Auditor">Auditor</MenuItem>
                      <MenuItem value="Client">Client</MenuItem>
                    </Select>
                  </FormControl>
                  <Button variant="contained" startIcon={<GroupAddIcon />} onClick={handleOpenInviteDialog} sx={styles.inviteButton} disabled={!inviteEmail}>Invite</Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Card sx={styles.usersCard}>
          <CardContent>
            <Typography variant="h6" sx={styles.usersCardHeader}>Team Members</Typography>
            <TableContainer component={Paper} sx={styles.tableContainer}>
              <Table>
                <TableHead>
                  <TableRow sx={styles.tableHeaderRow}>
                    <TableCell sx={styles.tableHeaderCell}>Name</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Email</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Role</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Team</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Tasks</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} sx={styles.tableBodyRow}>
                      <TableCell sx={styles.tableBodyCell}><Stack direction="row" alignItems="center" spacing={1.5}><Avatar sx={{ width: 32, height: 32, bgcolor: '#f3722c' }}>{user.name ? user.name.charAt(0) : '?'}</Avatar><Typography>{user.name || 'Invited User'}</Typography></Stack></TableCell>
                      <TableCell sx={styles.tableBodyCell}>{user.email}</TableCell>
                      <TableCell sx={styles.tableBodyCell}><Chip label={user.role} size="small" color={user.role === 'Admin' ? 'primary' : user.role === 'Auditor' ? 'secondary' : 'default'} sx={{ fontWeight: 600 }} /></TableCell>
                      <TableCell sx={styles.tableBodyCell}>{user.team || '-'}</TableCell>
                      <TableCell sx={styles.tableBodyCell}><Chip label="Active" size="small" color="success" variant="outlined" /></TableCell>
                      <TableCell><Tooltip title="More actions"><IconButton onClick={(e) => handleMenuOpen(e, user.id)} sx={styles.menuIconButton}><MoreVertIcon /></IconButton></Tooltip></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>

      <Dialog open={openInviteDialog} onClose={handleCloseInviteDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><GroupAddIcon color="primary" /><span>User Invitation Details</span></DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3}>
            <Box><Typography variant="subtitle2" color="text.secondary">Email</Typography><Typography>{inviteEmail}</Typography></Box>
            <Box><Typography variant="subtitle2" color="text.secondary">Assigned Role</Typography><Typography textTransform="capitalize">{selectedRole}</Typography></Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>Temporary Password</Typography>
              <Paper variant="outlined" sx={{ p: 1.5, position: 'relative' }}>
                <Typography fontFamily="monospace" fontSize={16}>{generatedPassword}</Typography>
                <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'}><IconButton onClick={handleCopyPassword} sx={{ position: 'absolute', right: 8, top: 8, color: copied ? 'success.main' : 'inherit' }}>{copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}</IconButton></Tooltip>
              </Paper>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>This password will be required for the user's first login</Typography>
            </Box>
            <Box><Typography variant="subtitle2" color="text.secondary">Instructions</Typography><Typography variant="body2">Share these credentials securely with the {selectedRole.toLowerCase()}. They will be prompted to change their password upon first login.</Typography></Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseInviteDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSendInvite} startIcon={<EmailIcon />}>Send Invitation</Button>
        </DialogActions>
      </Dialog>
      
      {/* This is the new dialog for confirming user deletion */}
      <Dialog
        open={isConfirmDialogOpen}
        onClose={handleCloseConfirmDialog}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningAmberIcon sx={{ color: '#f44336' }} />
          Confirm User Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to permanently remove this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog}>Cancel</Button>
          <Button onClick={handleConfirmRemove} sx={{ color: '#f44336' }} autoFocus>
            Delete User
          </Button>
        </DialogActions>
      </Dialog>

      <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }} PaperProps={{ sx: styles.actionMenu }}>
        <MenuItem onClick={handleAssignTask} sx={styles.actionMenuItem}>
          <AssignmentIcon sx={styles.actionMenuIcon('#f3722c')} /> Assign Task
        </MenuItem>
        <MenuItem onClick={handleRemoveUser} sx={styles.actionMenuItem}>
          <DeleteIcon sx={styles.actionMenuIcon('#f44336')} /> Remove User
        </MenuItem>
      </Menu>

      <Snackbar open={openInviteSuccess} autoHideDuration={3000} onClose={() => setOpenInviteSuccess(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" sx={{ width: '100%', fontWeight: 'bold', fontSize: '1.2rem' }}>Invitation has been sent to {invitedEmail}</Alert>
      </Snackbar>
    </Box>
  );
}