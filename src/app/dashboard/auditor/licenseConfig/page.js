'use client';

import React, { useState, useEffect } from 'react';
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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import {
  Add as AddIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Work as WorkIcon,
  People as PeopleIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Star as PremiumIcon
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
  userProfileStyles,
  userInfoStyles,
  auditorTextStyles,
  perClientLicenseRegisterStyles,
  expiryRenewalAlertsStyles,
  licenseUsageEntitlementDashboardStyles,
  licenseUsageChartContainerStyles,
  licenseTotalsBoxStyles,
  overUsageAlertStyles,
} from '../styles';

// Dynamically import recharts components with ssr: false
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

// Dynamically import DataGrid with ssr: false
const DataGrid = dynamic(
  () => import('@mui/x-data-grid').then((datagrid) => datagrid.DataGrid),
  { ssr: false }
);

// Example license data for chart
const licenseData = [
  { software: 'Photoshop', assigned: 80, purchased: 100 },
  { software: 'AutoCAD', assigned: 60, purchased: 50 },
  { software: 'Office 365', assigned: 120, purchased: 120 },
];

const totals = licenseData.reduce(
  (acc, cur) => ({
    assigned: acc.assigned + cur.assigned,
    purchased: acc.purchased + cur.purchased,
  }),
  { assigned: 0, purchased: 0 }
);

// Example license data for Per-Client License Register
const licenseRows = [
  { id: 1, licenseName: 'Photoshop', licenseKey: 'ABC123', status: 'Active' },
  { id: 2, licenseName: 'AutoCAD', licenseKey: 'DEF456', status: 'Expired' },
  { id: 3, licenseName: 'Office 365', licenseKey: 'GHI789', status: 'Active' },
  { id: 4, licenseName: 'Adobe', licenseKey: 'JKL000', status: 'Active' },
  { id: 5, licenseName: 'Visual Studio', licenseKey: 'MNO111', status: 'Active' },
];

const columns = [
  { field: 'licenseName', headerName: 'License Name', flex: 1, sortable: true },
  { field: 'licenseKey', headerName: 'License Key', flex: 1, sortable: true },
  { field: 'status', headerName: 'Status', flex: 1, sortable: true },
];

const sidebarMenu = [
  { name: 'Audit Trail', path: '/dashboard/auditor/audit-trail' },
  { name: 'License Configuration Tracking', path: '/dashboard/auditor/licenseConfig' },
  { name: 'Asset Status Documentation', path: '/dashboard/auditor/assetStatusDoc' },
  { name: 'Reporting & Export', path: '/dashboard/auditor/reportingExport' },
  { name: 'Compliance & Alerting', path: '/dashboard/auditor/complianceAlerting' },
  { name: 'Settings', path: '/dashboard/auditor/settings' },
];

// RenewalCard Component
function RenewalCard() {
  const chipGroups = [
    {
      label: '30 days',
      color: 'warning',
      keys: ['XYZ123', 'ABC456', 'JKL789', 'MNO000'],
    },
    {
      label: '60 days',
      color: 'error',
      keys: ['UVW000'],
    },
    {
      label: '90 days',
      color: 'default',
      keys: ['LMN888', 'DEF333'],
    },
  ];

  return (
    <Card sx={{ p: 2, height: '100%', backgroundColor: '#fefae0' , color: '#525252', border: '1px solid #6b705c'}}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Upcoming Renewals
      </Typography>

      {chipGroups.map((group) => {
        const showKeys = group.keys.slice(0, 3);
        const remaining = group.keys.length - showKeys.length;

        return (
          <Box key={group.label} sx={{ mb: 2 }}>
            <Chip
              label={group.label}
              color={group.color}
              variant="outlined"
              sx={{ mb: 1 }}
            />
            <List dense disablePadding>
              {showKeys.map((key, idx) => (
                <ListItem
                  key={idx}
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    cursor: 'pointer',
                    color: 'primary.main',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                  onClick={() => console.log(`Filter by key: ${key}`)}
                >
                  • {key}
                </ListItem>
              ))}
              {remaining > 0 && (
                <ListItem
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    cursor: 'pointer',
                    color: 'text.secondary',
                    fontStyle: 'italic',
                  }}
                  onClick={() =>
                    console.log(`View all ${group.label} renewals`)
                  }
                >
                  + {remaining} more
                </ListItem>
              )}
            </List>
          </Box>
        );
      })}
    </Card>
  );
}

function PerClientLicenseRegister({ clientName = 'Client ABC' }) {
  const [selectedLicense, setSelectedLicense] = useState(null);

  const handleRowClick = (params) => {
    setSelectedLicense(params.row);
  };

  const handleClose = () => setSelectedLicense(null);

  const handleExportCsv = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['License Name,License Key,Status']
        .concat(
          licenseRows.map((r) => `${r.licenseName},${r.licenseKey},${r.status}`)
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${clientName}_licenses.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#fefae0', color: '#525252' }}>
      <Box
        sx={{
          mb: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="subtitle1">
          Showing {licenseRows.length} licenses for {clientName}
        </Typography>

        <Tooltip title="Export CSV">
          <IconButton onClick={handleExportCsv} size="small" color="primary">
            <DownloadIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ flexGrow: 1, width: '100%', minHeight: 0 }}>
        <DataGrid
          rows={licenseRows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          pagination
          sortingOrder={['asc', 'desc']}
          onRowClick={handleRowClick}
          sx={{ backgroundColor: '#fefae0',border: '1px solid #6b705c' }}
        />
      </Box>

      <Dialog open={!!selectedLicense} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ backgroundColor: '#fefae0',border: '1px solid #6b705c' }}>
          License Details
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon/>
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ backgroundColor: '#fefae0' }}>
          {selectedLicense && (
            <>
              <Typography>
                <strong>License Name:</strong> {selectedLicense.licenseName}
              </Typography>
              <Typography>
                <strong>License Key:</strong> {selectedLicense.licenseKey}
              </Typography>
              <Typography>
                <strong>Status:</strong> {selectedLicense.status}
              </Typography>
            </>
          )}
        </DialogContent>

        <DialogActions sx={{ backgroundColor: '#fefae0' }}>
          <Button onClick={handleClose} color="primary" >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [client, setClient] = useState('all');
  const [search, setSearch] = useState('');
  const currentPath = '/dashboard/auditor/licenseConfig';

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleClientChange = (event) => {
    setClient(event.target.value);
  };

  return (
    <Box sx={fullScreenContainerStyles}>
      {/* Sidebar Navigation */}
      <Drawer variant="permanent" anchor="left" sx={drawerStyles}>
        <Box sx={drawerHeaderStyles}>
          <Typography variant="h5">Auditor Portal</Typography>
        </Box>
        <List>
          {sidebarMenu.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={Link}
                href={item.path}
                sx={listItemButtonStyles(item.path === currentPath)}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={mainContentBoxStyles}>
        {/* Header */}
        <Box sx={headerBoxStyles}>
          <Typography variant="h4" sx={pageTitleStyles}>
            License & Configuration Tracking
          </Typography>
          <Box sx={headerRightSectionStyles}>
            <Select
              value={client}
              onChange={handleClientChange}
              size="small"
              sx={{ minWidth: 140 , backgroundColor: '#283618',
              borderColor: '#fefae0',
              color: '#fefae0',
             '&:hover': {
              backgroundColor: '#6b705c',
              borderColor: '#fefae0'
              }}}
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
              borderColor: '#fefae0'
              }
            }}
            >
              Add License
            </Button>                  
            <Box sx={userProfileStyles}>
              <Box sx={userInfoStyles}>
                <Typography variant="body2">Sipho Ellen</Typography>
                <Typography variant="caption" sx={auditorTextStyles}>
                  Auditor
                </Typography>
              </Box>
              <AccountCircleIcon sx={{ fontSize: 32 }} />
            </Box>
          </Box>
        </Box>

        {/* Main content grid */}
        <Grid container spacing={6} sx={{ mt: 4, px: 2, alignItems: 'stretch' }}>
          {/* Top sections */}
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ ml:6, p: 2, height: '100%', width: '500px', overflow: 'auto', color: '#525252', backgroundColor: '#fefae0', border: '2px solid #6b705c' }}>
              <Typography variant="h4" gutterBottom>
                Per-Client License Register:
              </Typography>
              {isClient && <PerClientLicenseRegister clientName="Client ABC" />}
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ ml:2, p: 2, height: '100%', width: '500px', overflow: 'auto', color: '#525252', backgroundColor: '#fefae0',border: '2px solid #6b705c' }}>
              <Typography variant="h4" gutterBottom>
                License Expiry & Renewal:
              </Typography>
              <RenewalCard />
            </Paper>
          </Grid>

          {/* Bottom section (full width) */}
          <Grid item xs={12} sx={{ mt: 4,  color: '#525252' }}>
            <Paper elevation={1} sx={{ ml:6, p: 2, height: '100%', width: '1100px', backgroundColor: '#fefae0',border: '2px solid #6b705c' }}>
              <Typography variant="h4" gutterBottom textAlign={'center'} sx={{ 
                  color: '#525252',
                  fontWeight: 300
                }}>
                License Usage:
              </Typography>
              <ResponsiveContainer width="100%" height={400} >
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
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: 2,
                  px: 1,
                }}
              >
                <Typography variant="body1">
                  <strong>Total Assigned:</strong> {totals.assigned}
                </Typography>
                <Typography variant="body1">
                  <strong>Total Purchased:</strong> {totals.purchased}
                </Typography>
                {totals.assigned > totals.purchased && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      color: '#d32f2f',
                    }}
                  >
                    <WarningAmberIcon />
                    <Typography variant="body1" color="#d32f2f">
                      Over Usage
                    </Typography>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}