/* The file that combines the logic with the styles and displays it as a screen. 
Rendering takes place here to make the screen respond fast when it is being clicked*/
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Box, Typography,  List,  ListItem,
  ListItemText,  Drawer,  ListItemButton,
  Paper, TextField,  Button
} from '@mui/material';
import { 
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';

//snack bar 
import { Snackbar, Alert } from '@mui/material';

import useAssetStatusDoc from './useAssetStaDoc/page';
// Import global styles for layout and navigation
import * as globalStyles from '../common/styles';
import { useAuditorStore } from '../common/auditorStore';
import { auditorMenu } from '../common/auditorStore';

// Component for the sidebar
const Sidebar = ({ currentPath, handleLogout }) => {
  const { selectedMenu, setSelectedMenu } = useAuditorStore();
  const [sidebarOpen] = React.useState(true);

  
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{ '& .MuiDrawer-paper': globalStyles.drawerPaper }}
    >
      <Box sx={globalStyles.drawerHeader}>
        <Typography variant="h5">Auditor Portal</Typography>
      </Box>
      <List>
        {auditorMenu.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              component={Link}
              href={item.path}
              sx={globalStyles.listItemButton}
              onClick={() => setSelectedMenu(item.path)}
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
  );
};

// Component for the header
const Header = () => {
  return (
    <Box sx={globalStyles.pageHeader}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4" sx={globalStyles.pageHeaderText}>
          Asset Status & Documentation
        </Typography>
        <Typography variant="subtitle1" sx={globalStyles.pageHeaderText}>
          Gives auditors a clear view of each asset's lifecycle and associated paperwork.
        </Typography>
      </Box>
    </Box>
  );
};

// Component for a section with a list
const DataSection = ({ title, data, primaryKey, secondaryKey }) => (
  <Paper elevation={2} sx={globalStyles.assetStatusPaper}>
    <Typography variant="h6" sx={globalStyles.pageHeaderText}>
      {title}
    </Typography>
    <List>
      {data.map((item, idx) => (
        <ListItem key={idx} divider>
          <ListItemText
            primary={item[primaryKey]}
            secondary={secondaryKey ? `Current Status: ${item[secondaryKey]}` : null}
          />
        </ListItem>
      ))}
    </List>
  </Paper>
);

// Main page component
export default function AssetStatusDocumentation() {
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

  const {
    state,
    handlers,
    data
  } = useAssetStatusDoc();

  return (
    <Box sx={globalStyles.rootBox}>
      {/* Sidebar Navigation */}
      <Sidebar currentPath={state.currentPath}
      handleLogout={handleLogout}
       auditorMenu={data.auditorMenu} />

      {/* Main Content */}
      <Box component="main" sx={globalStyles.mainContentBox}>
        {/* Header */}
        <Header />

        {/* Content Section */}
        <Box sx={globalStyles.assetStatusPaper}>
          <DataSection
            title="Status Dashboard"
            data={state.filteredStatusData}
            primaryKey="asset"
            secondaryKey="status"
          />
          <DataSection
            title="Document Attachment Support"
            data={state.filteredDocumentsData.map(doc => ({ primaryKey: doc }))}
            primaryKey="primaryKey"
          />
          <DataSection
            title="Digital Signature Capture"
            data={state.filteredSignatures.map(sig => ({
              primaryKey: `${sig.client} - ${sig.date}`,
              secondaryKey: sig.status
            }))}
            primaryKey="primaryKey"
            secondaryKey="secondaryKey"
          />
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