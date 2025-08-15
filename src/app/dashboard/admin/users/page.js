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
  Card,
  CardContent,
  Stack,
  Avatar,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Grid,
  Menu,
  Divider,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  ListItemIcon,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Groups as TeamIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
  AdminPanelSettings as AdminIcon,
  Work as ProjectIcon
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
  searchField,
  menuPaper,
  menuItem,
  menuDivider,
  usersPageHeaderIcon,
  usersCard,
  usersTableContainer,
  usersTableHeader,
  usersTableHeaderCell,
  usersTableRow,
  usersTableCell,
  userAvatar,
  roleChip,
  teamStatsCard,
  teamStatsValue,
  teamStatsAvatar,
  addUserButton,
  dialogTextField,
  dialogFormControl,
  dialogInputLabel,
  dialogSelect,
  dialogSelectMenuItem,
  createProjectDialogPaper,
  createProjectDialogTitle,
  dialogCloseButton,
  createProjectDialogContent,
  dialogActions,
  dialogCancelButton,
  createProjectButton,
  activeListItemButton
} from '../styles';

/**
 * Team & Users Management Screen
 * Manages user accounts and roles within the CRM system
 */

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
  { value: 'Admin', label: 'Admin', icon: <AdminIcon /> },
  { value: 'Project Manager', label: 'Project Manager', icon: <ProjectIcon /> },
  { value: 'Team Lead', label: 'Team Lead', icon: <TeamIcon /> },
  { value: 'Member', label: 'Member', icon: <PersonIcon /> }
];

export default function TeamsUsers() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Admin',
      avatar: '/placeholder.jpg'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Project Manager',
      avatar: '/placeholder.jpg'
    },
    {
      id: 3,
      name: 'Michael Johnson',
      email: 'michael.j@example.com',
      role: 'Team Lead',
      avatar: '/placeholder.jpg'
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.d@example.com',
      role: 'Member',
      avatar: '/placeholder.jpg'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Member'
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.role.toLowerCase().includes(searchLower)
    );
  });

  const handleMenuOpen = (event, userId) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(userId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleDeleteUser = () => {
    setUsers(users.filter(user => user.id !== selectedUser));
    handleMenuClose();
  };

  const handleRoleChange = (userId, newRole) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, role: newRole } : user
    ));
    handleMenuClose();
  };

  const handleAddUser = () => {
    const user = {
      id: users.length + 1,
      ...newUser,
      avatar: '/placeholder.jpg'
    };
    setUsers([...users, user]);
    setNewUser({
      name: '',
      email: '',
      role: 'Member'
    });
    setOpenAddUserDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Box sx={rootBox}>
      {/* Sidebar Navigation */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': drawerPaper
        }}
      >
        <Box sx={drawerHeader}>
          <Typography variant="h5">
            Admin Portal
          </Typography>
        </Box>
        <List>
          {adminMenu.map(({ name, path }, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={Link}
                href={path}
                sx={name === 'Teams & Users' ? activeListItemButton : listItemButton}
              >
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={mainContentBox}>
        <Box sx={pageHeader}>
          <Typography variant="h4" sx={pageHeaderText}>
            <TeamIcon sx={usersPageHeaderIcon} />
            Teams & Users
          </Typography>
          <Stack direction="row" spacing={2} sx={{ width: { xs: '100%', sm: 'auto' } }}>
            <TextField
              size="small"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
                sx: searchField
              }}
              sx={{ flexGrow: { xs: 1, sm: 0 } }}
            />
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => setOpenAddUserDialog(true)}
              sx={addUserButton}
            >
              Add User
            </Button>
          </Stack>
        </Box>

        {/* Users Table */}
        <Card sx={usersCard}>
          <CardContent>
            <Typography variant="h6" sx={pageHeaderText}>
              All Users ({filteredUsers.length})
            </Typography>
            <TableContainer component={Paper} sx={usersTableContainer}>
              <Table>
                <TableHead sx={usersTableHeader}>
                  <TableRow>
                    <TableCell sx={usersTableHeaderCell}>User</TableCell>
                    <TableCell sx={usersTableHeaderCell}>Email</TableCell>
                    <TableCell sx={usersTableHeaderCell}>Role</TableCell>
                    <TableCell sx={usersTableHeaderCell}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow
                      key={user.id}
                      hover
                      sx={usersTableRow}
                    >
                      <TableCell sx={usersTableCell}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar src={user.avatar} sx={userAvatar}>
                            <PersonIcon />
                          </Avatar>
                          <Typography>{user.name}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell sx={usersTableCell}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <EmailIcon fontSize="small" sx={{ color: 'coral.main' }} />
                          <Typography>{user.email}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.role}
                          sx={roleChip(user.role)}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          sx={{ color: 'text.secondary' }}
                          onClick={(e) => handleMenuOpen(e, user.id)}
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

        {/* Team Statistics Cards */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={teamStatsCard}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" sx={pageHeaderText}>
                      Total Users
                    </Typography>
                    <Typography variant="h4" sx={teamStatsValue('coral')}>
                      {users.length}
                    </Typography>
                  </Box>
                  <Avatar sx={teamStatsAvatar('highlight', 'coral')}>
                    <PersonIcon sx={{ color: 'coral.main' }} />
                  </Avatar>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={teamStatsCard}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" sx={pageHeaderText}>
                      Team Leads
                    </Typography>
                    <Typography variant="h4" sx={teamStatsValue('success.light')}>
                      {users.filter(u => u.role === 'Team Lead').length}
                    </Typography>
                  </Box>
                  <Avatar sx={teamStatsAvatar('success.background', 'success.main')}>
                    <TeamIcon color="success" />
                  </Avatar>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={teamStatsCard}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" sx={pageHeaderText}>
                      Project Managers
                    </Typography>
                    <Typography variant="h4" sx={teamStatsValue('info.light')}>
                      {users.filter(u => u.role === 'Project Manager').length}
                    </Typography>
                  </Box>
                  <Avatar sx={teamStatsAvatar('info.background', 'info.main')}>
                    <ProjectIcon color="info" />
                  </Avatar>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={teamStatsCard}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" sx={pageHeaderText}>
                      Admins
                    </Typography>
                    <Typography variant="h4" sx={teamStatsValue('warning.light')}>
                      {users.filter(u => u.role === 'Admin').length}
                    </Typography>
                  </Box>
                  <Avatar sx={teamStatsAvatar('warning.background', 'warning.main')}>
                    <AdminIcon color="warning" />
                  </Avatar>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Add User Dialog */}
      <Dialog
        open={openAddUserDialog}
        onClose={() => setOpenAddUserDialog(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: createProjectDialogPaper }}
      >
        <DialogTitle sx={createProjectDialogTitle}>
          <Typography variant="h6">Add New User</Typography>
          <IconButton onClick={() => setOpenAddUserDialog(false)} sx={dialogCloseButton}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={createProjectDialogContent}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
              sx={dialogTextField}
            />
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              sx={dialogTextField}
            />
            <FormControl fullWidth sx={dialogFormControl}>
              <InputLabel sx={dialogInputLabel}>Role</InputLabel>
              <Select
                name="role"
                value={newUser.role}
                onChange={handleInputChange}
                label="Role"
                sx={dialogSelect}
              >
                {teamRoles.map((role) => (
                  <MenuItem key={role.value} value={role.value} sx={dialogSelectMenuItem}>
                    <ListItemIcon>
                      {React.cloneElement(role.icon, { sx: { color: 'primary.main' } })}
                    </ListItemIcon>
                    <ListItemText primary={role.label} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions sx={dialogActions}>
          <Button
            onClick={() => setOpenAddUserDialog(false)}
            sx={dialogCancelButton}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddUser}
            disabled={!newUser.name || !newUser.email}
            variant="contained"
            sx={createProjectButton}
          >
            Add User
          </Button>
        </DialogActions>
      </Dialog>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{ sx: menuPaper }}
      >
        <MenuItem onClick={handleMenuClose} sx={menuItem}>
          <EditIcon sx={{ mr: 1, color: 'info.main' }} />
          Edit User
        </MenuItem>
        <MenuItem onClick={handleDeleteUser} sx={menuItem}>
          <DeleteIcon sx={{ mr: 1, color: 'error.light' }} />
          Delete User
        </MenuItem>
        <Divider sx={menuDivider} />
        {teamRoles.map((role) => (
          <MenuItem
            key={role.value}
            onClick={() => handleRoleChange(selectedUser, role.value)}
            sx={menuItem}
          >
            <Chip
              label={role.label}
              size="small"
              sx={roleChip(role.value)}
            />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}