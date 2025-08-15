'use client';

import React from 'react';
import Link from 'next/link';
import {
  Box, Typography, Button, Table,
  TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Avatar,
  Chip, Stack, Divider, IconButton,
  TextField, InputAdornment, Drawer,
  List, ListItem, ListItemButton,
  ListItemText, Card, CardContent,
  Grid, Menu, MenuItem
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
  Star as PremiumIcon
} from '@mui/icons-material';

import useProfiles from './useProfiles/page';
import { useAdminStore, adminMenu } from '../common/adminStore';
import * as globalStyles from '../common/styles';
import * as styles      from './styles';

export default function ClientProfilesPage() {
  const {
    clients, loading, error,
    anchorEl, selectedClientId,
    handleMenuOpen, handleMenuClose,
    handleDelete, handleStatusChange
  } = useProfiles();

  const { selectedMenu, setSelectedMenu } = useAdminStore();

  return (
    <Box sx={globalStyles.rootBox}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{ '& .MuiDrawer-paper': globalStyles.drawerPaper }}
      >
        <Box sx={globalStyles.drawerHeader}>
          <Typography variant="h5">Admin Portal</Typography>
        </Box>
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
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={globalStyles.mainContentBox}>
        <Box sx={globalStyles.pageHeader}>
          <PeopleIcon sx={globalStyles.pageHeaderIcon} />
          <Typography variant="h4" sx={globalStyles.pageHeaderText}>
            Client Profiles
          </Typography>
          <Stack direction="row" sx={{ ml: 'auto' }}>
            <TextField
              size="small"
              placeholder="Search clients…"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: styles.searchField
              }}
            />
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              sx={styles.addClientButton}
            >
              Add Client
            </Button>
          </Stack>
        </Box>

        {error && (
          <Typography color="error.main" sx={{ mb: 2 }}>
            {error.message}
          </Typography>
        )}

        {/* Clients Table */}
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
                  {clients.map((c) => (
                    <TableRow key={c.id} hover sx={styles.tableRow}>
                      <TableCell sx={styles.clientTableCell}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar src={c.logo} sx={styles.clientLogoAvatar}>
                            <PersonIcon />
                          </Avatar>
                          <Typography>{c.name}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell sx={styles.clientTableCell}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <EmailIcon sx={styles.contactIcon} />
                          <Typography>{c.contact}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell sx={styles.clientTableCell}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <WorkIcon sx={styles.projectsIcon} />
                          <Typography>{c.projects}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={
                            c.status === 'premium'
                              ? <PremiumIcon color="success" />
                              : <PersonIcon color="info" />
                          }
                          label={c.status}
                          sx={styles.statusChip(c.status)}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={(e) => handleMenuOpen(e, c.id)}
                          sx={styles.actionButton}
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

        {/* Stats Cards */}
        <Grid container spacing={3}>
          {[
            { label: 'Total Clients',   value: clients.length,                   icon: <PeopleIcon />,        color: 'primary' },
            { label: 'Active Clients',  value: clients.filter(c => c.status==='active').length,   icon: <PeopleIcon color="info" />,    color: 'info'    },
            { label: 'Premium Clients', value: clients.filter(c => c.status==='premium').length, icon: <PremiumIcon color="success" />, color: 'success' }
          ].map(({ label, value, icon, color }) => (
            <Grid item xs={12} sm={6} md={4} key={label}>
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

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{ sx: styles.menuPaper }}
      >
        <MenuItem onClick={handleMenuClose} sx={styles.menuItem}>
          Edit Client
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={styles.menuItem}>
          <DeleteIcon fontSize="small" sx={{ mr: 1, color: 'error.main' }} />
          Delete Client
        </MenuItem>
        <Divider sx={styles.menuDivider} />
        <MenuItem onClick={() => handleStatusChange(selectedClientId, 'premium')} sx={styles.menuItem}>
          Premium
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange(selectedClientId, 'active')} sx={styles.menuItem}>
          Active
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange(selectedClientId, 'inactive')} sx={styles.menuItem}>
          Inactive
        </MenuItem>
      </Menu>
    </Box>
  );
}
