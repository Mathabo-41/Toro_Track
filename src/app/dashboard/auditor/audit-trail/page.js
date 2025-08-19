/* The file that combines the logic with the styles and displays it as a screen. 
Rendering takes place here to make the screen respond fast when it is being clicked*/
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Box, Typography, Grid,
  List,  ListItem,  ListItemText,
  Drawer,  ListItemButton, Paper,
  Table, TableBody, TableHead,
  TableRow, TableCell, TextField,
  Button
} from '@mui/material';
import {
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';

//snack bar 
import { Snackbar, Alert } from '@mui/material';

// Import global styles for layout and navigation
import * as commonStyles from '../common/styles';

// Import local styles for page-specific components
import {
  headerBoxStyles,
  pageTitleStyles,
  headerRightSectionStyles,
  searchFieldStyles,
  tablePaperStyles,
  tableCellHeaderStyles,
  tableCellBodyStyles
} from './styles';

// Import hooks and data from the service file.
import useAuditTrail from './useAudit-Trail/page';

export default function AuditTrailPage() {
  // Use the custom hook to manage all state and handlers.
  const {
    auditTrailMenu,
    filteredRows,
    search,
    handleSearchChange,
    currentPath
  } = useAuditTrail();

   //router for redirection/navigation
       // const router = useRouter();
    
  // State for sidebar
  const [sidebarOpen] = React.useState(true);


    
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
     

  // #region Rendered UI
  return (
    <Box sx={commonStyles.rootBox}>
      {/* Sidebar Navigation */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{ '& .MuiDrawer-paper': commonStyles.drawerPaper }}
      >
        <Box sx={commonStyles.drawerHeader}>
          <Typography variant="h5">Auditor Portal</Typography>
        </Box>
        <List>
          {auditTrailMenu.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={Link}
                href={item.path}
                sx={commonStyles.listItemButton}
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
          marginTop: 'auto'
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
              border: '2px solid #f3722c'
            }}>
              <Image
                src="/toroLogo.jpg"
                alt="User Profile"
                fill
                style={{ objectFit: 'cover' }}
              />
            </Box>

            {/* User Details  */}
            {sidebarOpen && (
              <Box sx={{ minWidth: 0 }}>
                {/* User Name */}
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
                
                {/* User Email */}
                <Typography sx={{ 
                  fontSize: '0.8rem', 
                  opacity: 0.8, 
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: 'rgba(254, 250, 224, 0.7)'
                }}>
                  user@toro.com
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
                background: '#6b705c'
              }
            }}
          >
            {sidebarOpen ? 'Logout' : <LogoutIcon />}
          </Button>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={commonStyles.mainContentBox}>
        {/* Page Header and Controls */}
        <Box sx={headerBoxStyles}>
          <Typography variant="h4" sx={pageTitleStyles}>
            Audit Trail & Logging
          </Typography>
          <Box sx={headerRightSectionStyles}>
            <TextField
              variant="outlined"
              placeholder="Search Order ID"
              value={search}
              onChange={handleSearchChange}
              sx={searchFieldStyles}
            />
          </Box>
        </Box>

        {/* Audit trail table */}
        <Box component={Paper} sx={tablePaperStyles}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={tableCellHeaderStyles}>Order ID</TableCell>
                <TableCell sx={tableCellHeaderStyles}>Order Sign-Off</TableCell>
                <TableCell sx={tableCellHeaderStyles}>Timestamp</TableCell>
                <TableCell sx={tableCellHeaderStyles}>Delivery Status</TableCell>
                <TableCell sx={tableCellHeaderStyles}>Order Receiver</TableCell>
                <TableCell sx={tableCellHeaderStyles}>Asset Type</TableCell>
                <TableCell sx={tableCellHeaderStyles}>Serial Number</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredRows.map((r) => (
                <TableRow key={r.orderId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell sx={tableCellBodyStyles}>{r.orderId}</TableCell>
                  <TableCell sx={tableCellBodyStyles}>{r.signOff}</TableCell>
                  <TableCell sx={tableCellBodyStyles}>{r.timestamp}</TableCell>
                  <TableCell sx={tableCellBodyStyles}>{r.status}</TableCell>
                  <TableCell sx={tableCellBodyStyles}>{r.receiver}</TableCell>
                  <TableCell sx={tableCellBodyStyles}>{r.type}</TableCell>
                  <TableCell sx={tableCellBodyStyles}>{r.serial}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
  // #endregion
}