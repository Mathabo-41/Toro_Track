// The main React component: drawer, search, table, create/edit dialog.
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Stack,
  TextField,
  InputAdornment,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Person as ProfileIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';

import {
  rootBox,
  drawerPaper,
  drawerHeader,
  listItemButton,
  activeListItemButton,
  mainContentBox,
  pageHeader,
  pageHeaderText,
  pageHeaderIcon
} from '../common/styles';
import * as styles from './styles';
import { useProfiles } from './useProfiles/page';

const adminMenu = [
  { name: 'Dashboard Overview', path: '/dashboard/admin/overview' },
  { name: 'Client Profiles',      path: '/dashboard/admin/profiles' },
  { name: 'Projects',             path: '/dashboard/admin/projects' },
  { name: 'Teams & Users',        path: '/dashboard/admin/users' },
  { name: 'Permissions',          path: '/dashboard/admin/permissions' },
  { name: 'Performance Reports',  path: '/dashboard/admin/reports' },
  { name: 'Settings',             path: '/dashboard/admin/settings' }
];

export default function ProfilesPage() {
  const { profiles, isLoading, error, createProfile, updateProfile, deleteProfile } = useProfiles();

  const [searchTerm, setSearchTerm] = useState('');
  const [openDlg, setOpenDlg] = useState(false);
  const [editing, setEditing] = useState(null);

  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues: { name: '', email: '', role: 'user' }
  });

  // Filter in‐memory
  const filtered = profiles.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onSubmit = data => {
    if (editing) {
      updateProfile({ id: editing.id, ...data });
    } else {
      createProfile(data);
    }
    reset();
    setEditing(null);
    setOpenDlg(false);
  };

  const startEdit = profile => {
    setEditing(profile);
    reset({ name: profile.name, email: profile.email, role: profile.role });
    setOpenDlg(true);
  };

  return (
    <Box sx={rootBox}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{ width: 240, '& .MuiDrawer-paper': drawerPaper }}
      >
        <Box sx={drawerHeader}>
          <Typography variant="h6">Admin Portal</Typography>
        </Box>
        <List>
          {adminMenu.map(item => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                component={Link}
                href={item.path}
                sx={
                  item.path.endsWith('/profiles')
                    ? activeListItemButton
                    : listItemButton
                }
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main */}
      <Box component="main" sx={mainContentBox}>
        <Box sx={pageHeader}>
          <Typography variant="h4" sx={pageHeaderText}>
            <ProfileIcon sx={pageHeaderIcon} />
            Client Profiles
          </Typography>
          <Stack direction="row" spacing={2} sx={{ width: { xs: '100%', sm: 'auto' } }}>
            <TextField
              size="small"
              placeholder="Search profiles…"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
              sx={{ width: 300 }}
            />
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => {
                reset();
                setEditing(null);
                setOpenDlg(true);
              }}
            >
              New Profile
            </Button>
          </Stack>
        </Box>

        <Card sx={styles.profilesCard}>
          <CardContent>
            <TableContainer component={Paper} sx={styles.profilesTableContainer}>
              <Table stickyHeader>
                <TableHead sx={styles.profilesTableHeader}>
                  <TableRow>
                    <TableCell sx={styles.profilesTableCell}>Name</TableCell>
                    <TableCell sx={styles.profilesTableCell}>Email</TableCell>
                    <TableCell sx={styles.profilesTableCell}>Role</TableCell>
                    <TableCell sx={styles.profilesTableCell}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoading && (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        Loading…
                      </TableCell>
                    </TableRow>
                  )}
                  {error && (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        Error loading profiles
                      </TableCell>
                    </TableRow>
                  )}
                  {filtered.map(profile => (
                    <TableRow key={profile.id} sx={styles.profilesTableRow}>
                      <TableCell sx={styles.profilesTableCell}>{profile.name}</TableCell>
                      <TableCell sx={styles.profilesTableCell}>{profile.email}</TableCell>
                      <TableCell sx={styles.profilesTableCell}>{profile.role}</TableCell>
                      <TableCell sx={styles.profilesTableCell}>
                        <IconButton
                          size="small"
                          sx={styles.actionIconButton}
                          onClick={() => startEdit(profile)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          sx={styles.actionIconButton}
                          onClick={() => deleteProfile(profile.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {!isLoading && filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No profiles found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>

      {/* Create / Edit Dialog */}
      <Dialog
        open={openDlg}
        onClose={() => setOpenDlg(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: styles.dialogPaper }}
      >
        <DialogTitle sx={styles.dialogTitle}>
          <Typography variant="h6">
            {editing ? 'Edit Profile' : 'Create Profile'}
          </Typography>
          <IconButton onClick={() => setOpenDlg(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={styles.dialogContent}>
          <form id="profile-form" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  fullWidth
                  sx={styles.dialogTextField}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              rules={{ required: true, pattern: /\S+@\S+\.\S+/ }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  fullWidth
                  sx={styles.dialogTextField}
                />
              )}
            />
            <FormControl fullWidth sx={styles.dialogSelect}>
              <InputLabel>Role</InputLabel>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="Role">
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </form>
        </DialogContent>

        <DialogActions sx={styles.dialogActions}>
          <Button
            onClick={() => setOpenDlg(false)}
            sx={styles.dialogCancelButton}
          >
            Cancel
          </Button>
          <Button
            form="profile-form"
            type="submit"
            variant="contained"
            disabled={!formState.isValid}
            sx={styles.createProfileButton}
          >
            {editing ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
