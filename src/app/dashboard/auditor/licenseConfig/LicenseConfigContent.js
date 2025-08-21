// ./auditor/licenseConfig/LicenseConfigContent.js
'use client';

// libraries and components.
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import {
  Grid, MenuItem, Button,  Select,
  Box,  Typography, Paper, IconButton,
  Dialog, DialogTitle, DialogContent,
  DialogActions,  Tooltip, Chip,
  List, ListItem, ListItemText,
  Drawer,  ListItemButton,  Card,
} from '@mui/material';
import {
  Add as AddIcon,
  Download as DownloadIcon,
  Close as CloseIcon,
  WarningAmber as WarningAmberIcon,
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';

//dashboard icon import 
import DashboardIcon from '@mui/icons-material/Dashboard';

//snack bar 
import { Snackbar, Alert } from '@mui/material';

// Dynamic imports for SSR-incompatible components.
const ResponsiveContainer = dynamic(
  () => import('recharts').then((recharts) => recharts.ResponsiveContainer),
  { ssr: false }
);
const BarChart = dynamic(
  () => import('recharts').then((recharts) => recharts.BarChart),
  { ssr: false }
);
const Bar = dynamic(() => import('recharts').then((recharts) => recharts.Bar), {
  ssr: false,
});
const XAxis = dynamic(
  () => import('recharts').then((recharts) => recharts.XAxis),
  { ssr: false }
);
const YAxis = dynamic(
  () => import('recharts').then((recharts) => recharts.YAxis),
  { ssr: false }
);
const RechartsTooltip = dynamic(
  () => import('recharts').then((recharts) => recharts.Tooltip),
  { ssr: false }
);
const Legend = dynamic(
  () => import('recharts').then((recharts) => recharts.Legend),
  { ssr: false }
);
const LabelList = dynamic(
  () => import('recharts').then((recharts) => recharts.LabelList),
  { ssr: false }
);
const DataGrid = dynamic(
  () => import('@mui/x-data-grid').then((datagrid) => datagrid.DataGrid),
  { ssr: false }
);

// Local styles and hooks.
import {
  fullScreenContainerStyles,
  drawerStyles,
  drawerHeaderStyles,
  listItemButtonStyles,
  mainContentBoxStyles,
  headerBoxStyles,
  pageTitleStyles,
  headerRightSectionStyles,
  perClientLicenseRegisterStyles,
  expiryRenewalAlertsStyles,
  licenseUsageEntitlementDashboardStyles,
  licenseTotalsBoxStyles,
  overUsageAlertStyles,
} from './styles';

import {useAuditorStore, auditorMenu } from '../common/auditorStore';

// Import global styles for layout and navigation
import * as globalStyles from '../common/styles';

import {
  useLicenseConfig,
  RenewalCard,
  PerClientLicenseRegister,
} from './useLicenseConfig/page';

// Region: License Config Page
export default function LicenseConfigContent() {
  const {
    isClient,
    client,
    handleClientChange,
    licenseData,
    totals,
    sidebarMenu,
    currentPath,
  } = useLicenseConfig();
  const { selectedMenu, setSelectedMenu, searchQuery, setSearchQuery } = useAuditorStore();

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
      {/* Sidebar */}
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
                // Add the prefetching logic here
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
            License & Configuration Tracking
          </Typography>
          <Box sx={headerRightSectionStyles}>
            <Select
              value={client}
              onChange={handleClientChange}
              size="small"
              sx={{
                minWidth: 120,
                backgroundColor: '#283618',
                borderColor: '#fefae0',
                color: '#fefae0',
                '&:hover': {
                  backgroundColor: '#6b705c',
                  borderColor: '#fefae0',
                },
              }}
            >
              <MenuItem value="all">All Clients</MenuItem>
              <MenuItem value="clientA">Client A</MenuItem>
              <MenuItem value="clientB">Client B</MenuItem>
            </Select>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<AddIcon />}
              sx={{
                backgroundColor: '#283618',
                borderColor: '#fefae0',
                color: '#fefae0',
                '&:hover': {
                  backgroundColor: '#6b705c',
                  borderColor: '#fefae0',
                },
              }}
            >
              Add License
            </Button>
          </Box>
        </Box>
        {/* End Region: Header */}

        {/* Region: Main Content Grid */}
        <Grid
          container
          spacing={6}
          sx={{ mt: 4, px: 2, alignItems: 'stretch' }}
        >
          {/* Region: Top Sections */}
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={perClientLicenseRegisterStyles}>
              <Typography variant="h4" gutterBottom>
                Per-Client License Register:
              </Typography>
              {isClient && <PerClientLicenseRegister clientName="Client ABC" />}
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={expiryRenewalAlertsStyles}>
              <Typography variant="h4" gutterBottom>
                License Expiry & Renewal:
              </Typography>
              <RenewalCard />
            </Paper>
          </Grid>
          {/* End Region: Top Sections */}

          {/* Region: Bottom Section */}
          <Grid item xs={12} sx={{ mt: 4, color: '#525252' }}>
            <Paper elevation={1} sx={licenseUsageEntitlementDashboardStyles}>
              <Typography
                variant="h4"
                gutterBottom
                textAlign={'center'}
                sx={{
                  color: '#525252',
                  fontWeight: 300,
                }}
              >
                License Usage:
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={licenseData}
                  margin={{ top: 16, right: 16, left: 0, bottom: 40 }}
                >
                  <XAxis dataKey="software" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend verticalAlign="bottom" height={36} />
                  <Bar dataKey="assigned" fill="#1976d2" name="Assigned">
                    <LabelList dataKey="assigned" position="top" />
                  </Bar>
                  <Bar
                    dataKey="purchased"
                    fill="rgba(25, 118, 210, 0.3)"
                    stroke="#1976d2"
                    name="Purchased"
                  >
                    <LabelList dataKey="purchased" position="top" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <Box sx={licenseTotalsBoxStyles}>
                <Typography variant="body1">
                  <strong>Total Assigned:</strong> {totals.assigned}
                </Typography>
                <Typography variant="body1">
                  <strong>Total Purchased:</strong> {totals.purchased}
                </Typography>
                {totals.assigned > totals.purchased && (
                  <Box sx={overUsageAlertStyles}>
                    <WarningAmberIcon />
                    <Typography variant="body1" color="#d32f2f">
                      Over Usage
                    </Typography>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>
          {/* End Region: Bottom Section */}
        </Grid>
        {/* End Region: Main Content Grid */}
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
      {/* End Region: Main Content */}
    </Box>
  );
}