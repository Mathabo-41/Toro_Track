// ./auditor/complianceAlerting/CompliAlertContent.js
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Box,  Typography,Container,
  List,  ListItem,  ListItemText,
  Drawer,  ListItemButton,  Paper,
    TextField, Grid, Button
} from '@mui/material';
import {
  AccountCircle as AccountCircleIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';

//snack bar 
import { Snackbar, Alert } from '@mui/material';

import {
  fullScreenContainerStyles,
  drawerStyles,
  drawerHeaderStyles,
  listItemButtonStyles,
  mainContentBoxStyles,
  headerBoxStyles,
  pageTitleStyles,
  headerRightSectionStyles,
  searchFieldStyles,
  complianceContainerStyles,
  complianceTitleStyles,
  complianceSubtitleStyles,
  compliancePaperStyles,
  complianceFeatureTitleStyles,
  complianceFeatureDescriptionStyles,
  complianceListItemStyles,
} from './styles';
import { useCompliance } from './useCompliance/page';

// Import global styles for layout and navigation
import * as globalStyles from '../common/styles';
import { useAuditorStore, auditorMenu } from '../common/auditorStore';

export default function CompliAlertContent() {
  const {
    auditTrailMenu,
    filteredFeatures,
    search,
    handleSearchChange,
    currentPath,
  } = useCompliance();

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
    
  return (
    <Box sx={globalStyles.rootBox}>
      {/* --- Sidebar Navigation --- */}
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
                onMouseEnter={() => router.prefetch(item.path)}
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

      {/* Region: Main Content */}
      <Box component="main" sx={mainContentBoxStyles}>
        {/* Region: Header */}
        <Box sx={headerBoxStyles}>
          <Typography variant="h4" sx={pageTitleStyles}>
            Compliance & Alerting
          </Typography>
          <Box sx={headerRightSectionStyles}>
            <TextField
              variant="outlined"
              placeholder="Search compliance features"
              value={search}
              onChange={handleSearchChange}
              sx={searchFieldStyles}
            />
          </Box>
        </Box>

        {/* Region: Compliance Content */}
        <Container maxWidth="md" sx={complianceContainerStyles}>
          <Paper elevation={3} sx={compliancePaperStyles}>
            <Grid container spacing={2}>
              {filteredFeatures.map((feature) => (
                <Grid item xs={12} sm={6} md={4} key={feature.title}>
                  <Box sx={complianceListItemStyles}>
                    <CheckCircleOutlineIcon color="primary" />
                    <Box>
                      <Typography variant="h6" sx={complianceFeatureTitleStyles}>{feature.title}</Typography>
                      <Typography variant="body1" sx={complianceFeatureDescriptionStyles}>
                        {feature.description}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Container>
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