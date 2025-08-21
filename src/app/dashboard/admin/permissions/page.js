/* The file that combines the logic with the styles and displays it as a screen. 
Rendering takes place here to make the screen respond fast when it is being clicked*/
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography, Grid, Card, CardContent, Stack, Avatar,List, ListItem,
  ListItemText,  Button,  Drawer,  ListItemButton, Paper,  Table,
  TableBody, TableCell, TableContainer,  TableHead,  TableRow,IconButton,
  Select,  FormControl, MenuItem} from '@mui/material';
import { Lock as LockIcon, Save as SaveIcon,
} from '@mui/icons-material';

//dashboard icon import 
import DashboardIcon from '@mui/icons-material/Dashboard';

//snack bar 
import { Snackbar, Alert } from '@mui/material';

// Import local files
import { styles } from './styles';
import { usePermissions } from './usePermissions/page';
import { adminMenuData } from './permissionsService/page';


// Main Component
// ------------------------------------------------
export default function PermissionSettings() {
  // Region: Hooks and State
  // ------------------------------------------------
  const {
    roles,
    selectedRole,
    setSelectedRole,
    permissionLevels,
    handlePermissionChange,
    handleSave,
  } = usePermissions();

  // State for sidebar and user profile
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [activeCategory, setActiveCategory] = React.useState('');

 //router for redirection/navigation
      const router = useRouter();
   
      //snack-bar state 
      const [openSnackbar, setOpenSnackbar] = React.useState(false);
 
   // Function to handle the logout action  with snackbar and redirect to the login page
   const handleLogout = () => {
     setOpenSnackbar(true);//shows feedback for snackbar
     setTimeout(()=> {
        router.push('/login');
     }, 1500); //snackbar will redirect after 1.5 seconds.
    
   };

  // Region: Render
  // ------------------------------------------------
  return (
    <Box sx={styles.mainContainer}>
      {/* Region: Sidebar Navigation */}
      <Drawer variant="permanent" anchor="left" sx={styles.sidebarDrawer}>
        {/* Sidebar Header */}
         <Box sx={{ 
    p: 1,
    borderBottom: '2px solid #6b705c',
    display: 'flex', 
    alignItems: 'center', 
    gap: 1 
  }}>
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
          {adminMenuData.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={Link}
                href={item.path}
                sx={styles.sidebarListItemButton(item.name)}
                onClick={() => setActiveCategory(item.name)}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* Region: User Profile Section */}
        <Box sx={{
          padding: '1rem',
          borderTop: '2px solid #6b705c',
          marginTop: 'auto', // Pushes the section to the bottom
        }}>
          {/* User Profile Container */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '1rem',
            overflow: 'hidden',
            gap: '0.75rem'
          }}>
            {/* Profile Picture */}
            <Box sx={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              overflow: 'hidden',
              position: 'relative',
              flexShrink: 0,
              border: '2px solid #f3722c' // Orange accent border
            }}>
              <Image
                src="/toroLogo.jpg" // Path to user profile image
                alt="User Profile"
                fill
                style={{ objectFit: 'cover' }}
              />
            </Box>

            {/* User Details (shown when sidebar is open) */}
            {sidebarOpen && (
              <Box sx={{ minWidth: 0 }}>
                {/* User Name */}
                <Typography sx={{ 
                  fontWeight: '600', 
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: '#fefae0' // Light text color
                }}>
                  John Doe
                </Typography>
                
                {/* User Email (dynamic based on active category) */}
                <Typography sx={{ 
                  fontSize: '0.8rem', 
                  opacity: 0.8, 
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: 'rgba(254, 250, 224, 0.7)' // Semi-transparent text
                }}>
                  {activeCategory ? `${activeCategory.replace(/([A-Z])/g, ' $1').trim()}@toro.com` : 'user@toro.com'}
                </Typography>
              </Box>
            )}
          </Box>

          {/* Logout Button */}
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
                background: '#6b705c' // Darker background on hover
              }
            }}
          >
            {sidebarOpen ? 'Logout' : '→'} {/* Shows arrow when sidebar is collapsed */}
          </Button>
        </Box>
      </Drawer>

      {/* Region: Main Content Area */}
      <Box component="main" sx={styles.mainContent}>
        {/* Page Header Section */}
        <Box sx={styles.pageHeader}>
          <Typography variant="h4" sx={styles.pageTitle}>
            <LockIcon sx={styles.headerIcon} />
            Permissions
          </Typography>
          <Typography variant="body1" sx={styles.pageSubtitle}>
            Manage role-based access control for your organization
          </Typography>
        </Box>

        {/* Permissions Table Section */}
        <Card sx={styles.permissionsCard}>
          <CardContent>
            <Typography variant="h6" sx={styles.permissionsCardHeader}>
              Role Permissions
            </Typography>
            
            {/* Permissions Table */}
            <TableContainer component={Paper} sx={styles.tableContainer}>
              <Table>
                {/* Table Header */}
                <TableHead sx={styles.tableHead}>
                  <TableRow>
                    <TableCell sx={styles.tableHeaderCell}>Role</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Projects</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Clients</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Team</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Settings</TableCell>
                  </TableRow>
                </TableHead>
                
                {/* Table Body */}
                <TableBody>
                  {roles.map((role) => (
                    <TableRow
                      key={role.name}
                      hover
                      selected={selectedRole === role.name}
                      onClick={() => setSelectedRole(role.name)}
                      sx={styles.tableRow(selectedRole === role.name)}
                    >
                      {/* Role Name Cell */}
                      <TableCell sx={styles.tableCell}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          {role.icon}
                          <Typography>{role.name}</Typography>
                        </Stack>
                      </TableCell>
                      
                      {/* Permission Level Cells */}
                      {['Projects', 'Clients', 'Team', 'Settings'].map((category) => {
                        const level = role.permissions[category];
                        const permission = permissionLevels.find(p => p.value === level);
                        return (
                          <TableCell key={category} sx={styles.tableCell}>
                            <FormControl fullWidth size="small">
                              <Select
                                value={level}
                                onChange={(e) => handlePermissionChange(role.name, category, e.target.value)}
                                sx={styles.selectInput(permission.color)}
                                renderValue={(selected) => (
                                  <Stack direction="row" alignItems="center" spacing={1}>
                                    <Box sx={{ color: permission.color }}>
                                      {permission.icon}
                                    </Box>
                                    <Typography sx={{ color: permission.color }}>
                                      {selected}
                                    </Typography>
                                  </Stack>
                                )}
                              >
                                {permissionLevels.map((level) => (
                                  <MenuItem
                                    key={level.value}
                                    value={level.value}
                                    sx={styles.selectMenuItem(level)}
                                  >
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                      <Box sx={{ color: level.color }}>
                                        {level.icon}
                                      </Box>
                                      <Typography sx={{ color: '#283618' }}>{level.label}</Typography>
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

        {/* Selected Role Details Section */}
        {selectedRole && (
          <Card sx={styles.summaryCard}>
            <CardContent>
              <Typography variant="h6" sx={styles.summaryCardHeader}>
                {selectedRole} Permissions Summary
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(roles.find(r => r.name === selectedRole).permissions).map(([category, level]) => {
                  const permission = permissionLevels.find(p => p.value === level);
                  return (
                    <Grid item xs={12} sm={6} md={3} key={category}>
                      <Card sx={styles.summaryCard}>
                        <CardContent>
                          <Typography variant="subtitle1" sx={styles.summaryCardTitle}>
                            {category}
                          </Typography>
                          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                            <Avatar sx={styles.permissionIconAvatar(permission.color)}>
                              {permission.icon}
                            </Avatar>
                            <Typography sx={styles.permissionText(permission.color)}>
                              {permission.label}
                            </Typography>
                          </Stack>
                          <Typography variant="body2" sx={{ color: '#525252' }}>
                            {level === 'Full' && 'Can create, edit, delete, and view all content'}
                            {level === 'Edit' && 'Can edit and view existing content'}
                            {level === 'View' && 'Can view content only'}
                            {level === 'None' && 'No access to this section'}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </CardContent>
          </Card>
        )}

        {/* Save Button Section */}
        <Box sx={styles.saveButtonContainer}>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            sx={styles.saveButton}
          >
            Save Permissions
          </Button>
        </Box>
      </Box>
      {/* Snackbar with message when the user logs out of the system /their portal */}
      
            <Snackbar
              open={openSnackbar}
              autoHideDuration={1500}
              onClose={() => setOpenSnackbar(false)}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Alert severity="success" 
              //we use SUCCESS instead of INFO so that we can have the power to switch colours
              sx={{ width: '100%', 
                fontWeight: 'bold',
                fontSize: '1.2rem'
              }}>
                Logging out...
              </Alert>
            </Snackbar>

    </Box>
  );
}