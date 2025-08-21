// ./auditor/settings/SettingsContent.js
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Drawer,
  ListItemButton,
  Stack,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
  IconButton
} from '@mui/material';
import { FormProvider, Controller } from 'react-hook-form';
import {
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
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
  saveButton,
  settingsContainerStyles,
} from './styles';
//dashboard icon import 
import DashboardIcon from '@mui/icons-material/Dashboard';

//snack bar 
import { Snackbar, Alert } from '@mui/material';

import { useSettings } from './useSettings/page';

// Import global styles for layout and navigation
import * as globalStyles from '../common/styles';
import { auditorMenu } from '../common/auditorStore';

export default function SettingsContent() {
  const {
    search,
    handleSearchChange,
    methods,
    handleSubmit,
    onSubmit,
    isLoading,
    isSubmitting,
  } = useSettings();

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
   

  if (isLoading) {
    return <Typography>Loading settings...</Typography>;
  }

  return (
    <Box sx={globalStyles.rootBox}>
      {/* Region: Sidebar Navigation */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{ '& .MuiDrawer-paper': globalStyles.drawerPaper }}
      >
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
      Auditor Portal
    </Typography>
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
            Auditor Settings
          </Typography>
          <Box sx={headerRightSectionStyles}>
            <TextField
              variant="outlined"
              placeholder="Search settings"
              value={search ?? ''}
              onChange={handleSearchChange}
              sx={searchFieldStyles}
            />
          </Box>
        </Box>

        {/* Region: Settings Form */}
        <Box sx={settingsContainerStyles}>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                {/* ───── Audit Trail & Event Capture ───── */}
                <Stack spacing={2}>
                  <Typography variant="h6">Audit Trail & Event Capture</Typography>
                  <Controller
                    name="audit.retentionPeriod"
                    control={methods.control}
                    render={({ field }) => (
                      <TextField {...field} value={field.value ?? ''} label="Event Retention (days)" type="number" fullWidth />
                    )}
                  />
                  <Controller
                    name="audit.immutableMode"
                    control={methods.control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Checkbox {...field} checked={!!field.value} />}
                        label="Enable Immutable Mode"
                      />
                    )}
                  />
                  <Controller
                    name="audit.autoCapture.login"
                    control={methods.control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Checkbox {...field} checked={!!field.value} />}
                        label="Auto-capture Logins"
                      />
                    )}
                  />
                  <Controller
                    name="audit.timezone"
                    control={methods.control}
                    render={({ field }) => (
                      <TextField {...field} value={field.value ?? ''} select label="Timezone" fullWidth>
                        {["UTC", "Local"].map((tz) => (
                          <MenuItem key={tz} value={tz}>
                            {tz}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Stack>

                {/* ───── Delivery Logs ───── */}
                <Stack spacing={2}>
                  <Typography variant="h6">Delivery Logs</Typography>
                  <Controller
                    name="delivery.detailLevel"
                    control={methods.control}
                    render={({ field }) => (
                      <TextField {...field} value={field.value ?? ''} select label="Log Detail Level" fullWidth>
                        <MenuItem value="basic">Basic</MenuItem>
                        <MenuItem value="full">Full</MenuItem>
                      </TextField>
                    )}
                  />
                  <Controller
                    name="delivery.allowManualOverride"
                    control={methods.control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Checkbox {...field} checked={!!field.value} />}
                        label="Allow Manual Overrides"
                      />
                    )}
                  />
                </Stack>

                {/* ───── License Tracking ───── */}
                <Stack spacing={2}>
                  <Typography variant="h6">License Tracking</Typography>
                  <Controller
                    name="license.alertThresholds"
                    control={methods.control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        value={field.value ?? ''}
                        label="Alert Thresholds (days)"
                        helperText="Comma-separated (e.g. 30,60,90)"
                        fullWidth
                      />
                    )}
                  />
                  <Controller
                    name="license.usageWarningLevel"
                    control={methods.control}
                    render={({ field }) => (
                      <TextField {...field} value={field.value ?? ''} label="Usage Warning (%)" type="number" fullWidth />
                    )}
                  />
                </Stack>

                {/* ───── Asset Status ───── */}
                <Stack spacing={2}>
                  <Typography variant="h6">Asset Status & Documentation</Typography>
                  <Controller
                    name="asset.defaultStatuses"
                    control={methods.control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        value={field.value ?? ''}
                        label="Default Statuses"
                        helperText="Comma-separated (e.g. In transit,Deployed)"
                        fullWidth
                      />
                    )}
                  />
                  <Controller
                    name="asset.enableSignatureCapture"
                    control={methods.control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Checkbox {...field} checked={!!field.value} />}
                        label="Enable Signature Capture"
                      />
                    )}
                  />
                </Stack>

                {/* ───── Reporting ───── */}
                <Stack spacing={2}>
                  <Typography variant="h6">Reporting & Export</Typography>
                  <Controller
                    name="report.formats"
                    control={methods.control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        value={field.value ?? ''}
                        label="Report Formats"
                        helperText="Comma-separated (e.g. PDF,CSV)"
                        fullWidth
                      />
                    )}
                  />
                  <Controller
                    name="report.schedule"
                    control={methods.control}
                    render={({ field }) => (
                      <TextField {...field} value={field.value ?? ''} select label="Report Schedule" fullWidth>
                        {['Daily', 'Weekly', 'Monthly'].map((freq) => (
                          <MenuItem key={freq} value={freq}>
                            {freq}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Stack>

                {/* ───── Compliance ───── */}
                <Stack spacing={2}>
                  <Typography variant="h6">Compliance & Alerting</Typography>
                  <Controller
                    name="compliance.checklists"
                    control={methods.control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        value={field.value ?? ''}
                        label="Checklist Templates"
                        helperText="Comma-separated"
                        fullWidth
                      />
                    )}
                  />
                  <Controller
                    name="compliance.alertChannels"
                    control={methods.control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        value={field.value ?? ''}
                        label="Alert Channels"
                        helperText="Comma-separated (e.g. Email,Slack)"
                        fullWidth
                      />
                    )}
                  />
                </Stack>

                {/* ───── Submit Button ───── */}
                <Button variant="contained" type="submit" sx={saveButton} disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save Settings'}
                </Button>
              </Stack>
            </form>
          </FormProvider>
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