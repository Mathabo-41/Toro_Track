/* The file that combines the logic with the styles and displays it as a screen. 
Rendering takes place here to make the screen respond fast when it is being clicked*/
'use client';

// libraries and components.
import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  Grid,
  MenuItem,
  Button,
  Select,
  Box,
  Typography,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Chip,
  List,
  ListItem,
  ListItemText,
  Drawer,
  ListItemButton,
  Card,
} from '@mui/material';
import {
  Add as AddIcon,
  Download as DownloadIcon,
  Close as CloseIcon,
  WarningAmber as WarningAmberIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';

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
  userProfileStyles,
  userInfoStyles,
  auditorTextStyles,
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
export default function LicenseConfigPage() {
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
        {auditorMenu.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              component={Link}
              href={item.path}
              sx={globalStyles.listItemButton}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
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
            <Box sx={userProfileStyles}>
            </Box>
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
      {/* End Region: Main Content */}
    </Box>
  );
}
// End Region: License Config Page