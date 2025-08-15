'use client';

import React from 'react';
import Link from 'next/link';
import {
  Box, Typography, Grid, Card,
  CardContent, Stack, Avatar, List,
  ListItem, ListItemText, Button,
  Drawer, ListItemButton, Paper,
  Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow,
  Select, FormControl, MenuItem
} from '@mui/material';

import {
  Lock as LockIcon,
  Save as SaveIcon
} from '@mui/icons-material';

import usePermissions from './usePermissions/page';
import { useAdminStore, adminMenu } from '../common/adminStore';
import * as globalStyles from '../common/styles';
import * as styles      from './styles';
import {
  permissionLevels  // export this array from service or define locally
} from './permissionsService/page';

export default function PermissionSettingsPage() {
  const {
    roles, selectedRole, setSelected,
    loading, error,
    handlePermissionChange, handleSave
  } = usePermissions();

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
                item.name === 'Permissions'
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
          <LockIcon sx={globalStyles.pageHeaderIcon} />
          <Typography variant="h4" sx={globalStyles.pageHeaderText}>
            Permissions
          </Typography>
        </Box>

        {error && (
          <Typography color="error.main" sx={{ mb: 2 }}>
            {error.message}
          </Typography>
        )}

        {/* Permissions Table */}
        <Card sx={styles.permissionsCard}>
          <CardContent>
            <TableContainer component={Paper} sx={styles.tableContainer}>
              <Table stickyHeader>
                <TableHead sx={styles.tableHead}>
                  <TableRow>
                    <TableCell sx={styles.tableHeaderCell}>Role</TableCell>
                    {['Projects','Clients','Team','Settings'].map((col) => (
                      <TableCell key={col} sx={styles.tableHeaderCell}>
                        {col}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {roles.map((role) => (
                    <TableRow
                      key={role.name}
                      hover
                      selected={selectedRole === role.name}
                      onClick={() => setSelected(role.name)}
                      sx={styles.tableRow}
                    >
                      <TableCell sx={styles.tableCell}>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          sx={styles.roleIconStack}
                        >
                          {role.icon}
                          <Typography>{role.name}</Typography>
                        </Stack>
                      </TableCell>

                      {['Projects','Clients','Team','Settings'].map((cat) => {
                        const level = role.permissions[cat];
                        const permission = permissionLevels.find(p => p.value === level);

                        return (
                          <TableCell key={cat} sx={styles.tableCell}>
                            <FormControl fullWidth size="small">
                              <Select
                                value={level}
                                onChange={(e) =>
                                  handlePermissionChange(role.name, cat, e.target.value)
                                }
                                sx={styles.roleSelect(permission.color)}
                                renderValue={(sel) => (
                                  <Stack direction="row" alignItems="center" spacing={1}>
                                    <Box sx={styles.permissionChip(permission.color)}>
                                      {permission.icon}
                                    </Box>
                                    <Typography color={`${permission.color}.main`}>
                                      {sel}
                                    </Typography>
                                  </Stack>
                                )}
                              >
                                {permissionLevels.map((opt) => (
                                  <MenuItem
                                    key={opt.value}
                                    value={opt.value}
                                    sx={styles.permissionMenuItem(opt.color)}
                                  >
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                      <Box sx={styles.permissionChip(opt.color)}>
                                        {opt.icon}
                                      </Box>
                                      <Typography>{opt.label}</Typography>
                                    </Stack>
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Selected Role Summary */}
        {selectedRole && (
          <Grid container spacing={2} sx={{ mt: 4 }}>
            {Object.entries(
              roles.find((r) => r.name === selectedRole).permissions
            ).map(([category, level]) => {
              const permission = permissionLevels.find((p) => p.value === level);
              return (
                <Grid item xs={12} sm={6} md={3} key={category}>
                  <Card sx={styles.summaryCard}>
                    <CardContent sx={styles.summaryCardContent}>
                      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                        <Avatar sx={styles.summaryIconAvatar(permission.color)}>
                          {permission.icon}
                        </Avatar>
                        <Typography color={`${permission.color}.main`} fontWeight="bold">
                          {permission.label}
                        </Typography>
                      </Stack>
                      <Typography variant="body2">
                        {level === 'Full' && 'Can create, edit, delete, and view all content.'}
                        {level === 'Edit' && 'Can edit and view existing content.'}
                        {level === 'View' && 'Can view content only.'}
                        {level === 'None' && 'No access to this section.'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}

        {/* Save Button */}
        <Box sx={styles.saveButtonBox}>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            disabled={loading}
            sx={styles.saveButton}
          >
            {loading ? 'Saving…' : 'Save Permissions'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
