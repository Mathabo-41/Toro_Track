// features/admin/TeamsUsers/page.js
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Grid,
  Card,
  CardContent,
  Stack,
  Avatar,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import {
  Groups as TeamIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  AdminPanelSettings as AdminIcon,
  Work as ProjectIcon
} from '@mui/icons-material';

import * as common from '../common/styles';
import * as styles from './styles';
import useUsers from './useUsers/page.js';

const adminMenu = [
  { name: 'Dashboard Overview', path: '/dashboard/admin/overview' },
  { name: 'Client Profiles', path: '/dashboard/admin/profiles' },
  { name: 'Projects', path: '/dashboard/admin/projects' },
  { name: 'Teams & Users', path: '/dashboard/admin/users' },
  { name: 'Permissions', path: '/dashboard/admin/permissions' },
  { name: 'Performance Reports', path: '/dashboard/admin/reports' },
  { name: 'Settings', path: '/dashboard/admin/settings' }
];

const teamRoles = [
  { value: 'Admin', label: 'Admin', icon: <AdminIcon color="warning" /> },
  { value: 'Project Manager', label: 'Project Manager', icon: <ProjectIcon color="info" /> },
  { value: 'Team Lead', label: 'Team Lead', icon: <TeamIcon color="success" /> },
  { value: 'Member', label: 'Member', icon: <PersonIcon color="disabled" /> }
];

export default function TeamsUsersPage() {
  const theme = useTheme();
  const {
    users = [],
    isLoading,
    error,
    createUser,
    creating,
    updateUser,
    updating,
    deleteUser,
    deleting
  } = useUsers();

  const [searchTerm, setSearchTerm] = useState('');
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', role: 'Member' });

  const filtered = users.filter(u =>
    [u.name, u.email, u.role].some(f =>
      (f || '').toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const openMenu = (e, id) => {
    setMenuAnchor(e.currentTarget);
    setSelectedId(id);
  };
  const closeMenu = () => {
    setMenuAnchor(null);
    setSelectedId(null);
  };
  const handleDelete = () => {
    deleteUser(selectedId);
    closeMenu();
  };
  const handleRoleChange = (role) => {
    updateUser({ id: selectedId, role });
    closeMenu();
  };
  const handleDialogChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  const handleAddUser = () => {
    createUser(form);
    setForm({ name: '', email: '', role: 'Member' });
    setOpenDialog(false);
  };

  if (isLoading) {
    return (
      <Box sx={common.mainContentBox}>
        <Typography variant='h5' color='blue-gray'>
          Loading...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={common.mainContentBox}>
        <Typography variant='h5' color='red'>
          Error loading users: {error.message}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={common.rootBox}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{ '& .MuiDrawer-paper': common.drawerPaper }}
      >
        <Box sx={common.drawerHeader}>
          <Typography variant="h5">Admin Portal</Typography>
        </Box>
        <List>
          {adminMenu.map(item => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                component={Link}
                href={item.path}
                sx={
                  item.name === 'Teams & Users'
                    ? common.activeListItemButton
                    : common.listItemButton
                }
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={common.mainContentBox}>
        {/* Header & Search */}
        <Box sx={common.pageHeader}>
          <Typography variant="h4" sx={styles.usersPageHeaderText}>
            <TeamIcon sx={styles.usersPageHeaderIcon} />
            Teams & Users
          </Typography>
          <Stack direction="row" spacing={2} sx={{ width: 600, maxWidth: '100%' }}>
            <TextField
              size="small"
              placeholder="Search users..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                )
              }}
              sx={styles.searchField}
            />
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
              sx={styles.addUserButton}
            >
              Add User
            </Button>
          </Stack>
        </Box>

        {/* Users Table */}
        <Card sx={styles.usersCard}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              All Users ({filtered?.length || 0})
            </Typography>
            <TableContainer component={Paper} sx={styles.usersTableContainer}>
              <Table stickyHeader>
                <TableHead sx={styles.usersTableHeader}>
                  <TableRow>
                    {['User', 'Email', 'Role', 'Actions'].map(h => (
                      <TableCell key={h} sx={styles.usersTableHeaderCell}>
                        {h}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filtered.map(u => (
                    <TableRow key={u.id} hover sx={styles.usersTableRow}>
                      <TableCell sx={styles.usersTableCell}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Avatar src={u.avatar} sx={styles.userAvatar}>
                            <PersonIcon />
                          </Avatar>
                          <Typography>{u.name}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell sx={styles.usersTableCell}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <EmailIcon color="action" fontSize="small" />
                          <Typography>{u.email}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Chip label={u.role} size="small" sx={styles.roleChip(u.role)} />
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={e => openMenu(e, u.id)}>
                          <MoreVertIcon color="action" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Team Statistics */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={styles.teamStatsCard}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2">Total Users</Typography>
                    <Typography variant="h4" sx={styles.teamStatsValue('coral')}>
                      {users.length}
                    </Typography>
                  </Box>
                  <Avatar sx={styles.teamStatsAvatar('highlight', 'coral')}>
                    <PersonIcon />
                  </Avatar>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          {/* Add other stats cards (Team Leads, PMs, Admins) */}
        </Grid>
      </Box>

      {/* Add User Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: styles.createUserDialogPaper }}
      >
        <DialogTitle sx={styles.createUserDialogTitle}>
          Add New User
          <IconButton onClick={() => setOpenDialog(false)} sx={styles.dialogCloseButton}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={styles.createUserDialogContent}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleDialogChange}
            sx={styles.dialogTextField}
          />
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            value={form.email}
            onChange={handleDialogChange}
            sx={styles.dialogTextField}
          />
          <FormControl fullWidth sx={styles.dialogFormControl}>
            <InputLabel sx={styles.dialogInputLabel}>Role</InputLabel>
            <Select
              name="role"
              value={form.role}
              onChange={handleDialogChange}
              sx={styles.dialogSelect}
            >
              {teamRoles.map(r => (
                <MenuItem key={r.value} value={r.value} sx={styles.dialogSelectMenuItem}>
                  {r.icon}
                  {r.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={styles.dialogActions}>
          <Button onClick={() => setOpenDialog(false)} sx={styles.dialogCancelButton}>
            Cancel
          </Button>
          <Button
            onClick={handleAddUser}
            disabled={!form.name || !form.email}
            variant="contained"
            sx={styles.createUserButton}
          >
            Add User
          </Button>
        </DialogActions>
      </Dialog>

      {/* Action Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={closeMenu}
        PaperProps={{ sx: styles.menuPaper }}
      >
        <MenuItem onClick={closeMenu} sx={styles.menuItem}>
          <EditIcon fontSize="small" sx={{ color: 'info.main', mr: 1 }} />
          Edit User
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={styles.menuItem}>
          <DeleteIcon fontSize="small" sx={{ color: 'error.main', mr: 1 }} />
          Delete User
        </MenuItem>
        <Divider sx={styles.menuDivider} />
        {teamRoles.map(r => (
          <MenuItem
            key={r.value}
            onClick={() => handleRoleChange(r.value)}
            sx={styles.menuItem}
          >
            <Chip label={r.label} size="small" sx={styles.roleChip(r.value)} />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}