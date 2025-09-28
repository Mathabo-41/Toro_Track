// This is the main component for the License & Configuration Tracking screen.
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { createSupabaseClient } from '@/lib/supabase/client';
import {
  Grid, MenuItem, Button, Select, Box, Typography, Paper, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, Tooltip, Chip, List,
  ListItem, ListItemText, Drawer, ListItemButton, Card, TextField, FormControl, InputLabel
} from '@mui/material';
import {
  Add as AddIcon, Download as DownloadIcon, Close as CloseIcon, WarningAmber as WarningAmberIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Snackbar, Alert } from '@mui/material';

const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });
const BarChart = dynamic(() => import('recharts').then(mod => mod.BarChart), { ssr: false });
const Bar = dynamic(() => import('recharts').then(mod => mod.Bar), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
const RechartsTooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
const Legend = dynamic(() => import('recharts').then(mod => mod.Legend), { ssr: false });
const LabelList = dynamic(() => import('recharts').then(mod => mod.LabelList), { ssr: false });
const DataGrid = dynamic(() => import('@mui/x-data-grid').then((datagrid) => datagrid.DataGrid), { ssr: false });

import { mainContentBoxStyles, headerBoxStyles, pageTitleStyles, headerRightSectionStyles, perClientLicenseRegisterStyles, expiryRenewalAlertsStyles, licenseUsageEntitlementDashboardStyles, licenseTotalsBoxStyles, overUsageAlertStyles } from './styles';
import { auditorMenu } from '../common/auditorStore';
import * as globalStyles from '../common/styles';
import * as LicenseConfigHook from './useLicenseConfig/page';

/*
* This component shows upcoming license renewals.
*/
function RenewalCard() {
  const supabase = createSupabaseClient();
  const { renewalData, loading } = LicenseConfigHook.useLicenseConfig();
  
  if (loading) {
    return (
      <Card sx={{ p: 2, height: '100%', backgroundColor: '#fefae0' }}>
        <Typography>Loading renewals...</Typography>
      </Card>
    );
  }

  if (!renewalData || renewalData.length === 0) {
    return (
      <Card sx={{ p: 2, height: '100%', backgroundColor: '#fefae0' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Upcoming Renewals</Typography>
        <Typography>No upcoming renewals.</Typography>
      </Card>
    );
  }

  return (
    <Card sx={{ p: 2, height: '100%', backgroundColor: '#fefae0', color: '#525252', border: '1px solid #6b705c' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Upcoming Renewals</Typography>
      {renewalData.map((group) => {
        const keysToShow = group.keys || [];
        const showKeys = keysToShow.slice(0, 3);
        const remaining = keysToShow.length - showKeys.length;

        return (
          <Box key={group.label} sx={{ mb: 2 }}>
            <Chip label={group.label} color={group.color} variant="outlined" sx={{ mb: 1 }} />
            <List dense disablePadding>
              {showKeys.map((key, idx) => (
                <ListItem key={idx} sx={{ px: 1.5, py: 0.5, cursor: 'pointer', color: 'primary.main', '&:hover': { textDecoration: 'underline' } }} onClick={() => console.log(`Filter by key: ${key}`)}>
                  • {key}
                </ListItem>
              ))}
              {remaining > 0 && (
                <ListItem sx={{ px: 1.5, py: 0.5, cursor: 'pointer', color: 'text.secondary', fontStyle: 'italic' }} onClick={() => console.log(`View all ${group.label} renewals`)}>
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

/*
* This component renders the license register data grid.
*/
function PerClientLicenseRegister({ clientName = 'All Clients' }) {
  const [selected, setSelected] = React.useState(null);
  const { licenseRows, loading } = LicenseConfigHook.useLicenseConfig();

  const handleRowClick = (params) => setSelected(params.row);
  const handleClose = () => setSelected(null);
  
  const exportCsv = () => {
    const headers = ['License Name,License Key,Status'];
    const rows = licenseRows.map(r => `${r.licenseName},${r.licenseKey},${r.status}`);
    const csv = headers.concat(rows).join('\n');
    const uri = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    const link = document.createElement('a');
    link.href = uri;
    link.download = `${clientName}_licenses.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    { field: 'licenseName', headerName: 'License Name', flex: 1, sortable: true },
    { field: 'licenseKey', headerName: 'License Key', flex: 1, sortable: true },
    { field: 'status', headerName: 'Status', flex: 1, sortable: true },
  ];

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#fefae0', color: '#525252' }}>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle1">Showing {licenseRows.length} licenses for {clientName}</Typography>
        <Tooltip title="Export CSV">
          <IconButton onClick={exportCsv} size="small" color="primary"><DownloadIcon /></IconButton>
        </Tooltip>
      </Box>
      <Box sx={{ flexGrow: 1, width: '100%', minHeight: 0 }}>
        <DataGrid
          rows={licenseRows}
          columns={columns}
          loading={loading}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          pagination
          sortingOrder={['asc', 'desc']}
          onRowClick={handleRowClick}
          sx={{ backgroundColor: '#fefae0', border: '1px solid #6b705c', '& .MuiDataGrid-columnHeader': { backgroundColor: '#ccd5ae', color: '#283618', fontWeight: 'bold' }, '& .MuiDataGrid-columnHeaderTitle': { color: '#283618', fontWeight: 'bold' } }}
        />
      </Box>
      <Dialog open={!!selected} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ backgroundColor: '#fefae0', border: '1px solid #6b705c' }}>
          License Details
          <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ backgroundColor: '#fefae0' }}>
          {selected && (
            <>
              <Typography><strong>License Name:</strong> {selected.licenseName}</Typography>
              <Typography><strong>License Key:</strong> {selected.licenseKey}</Typography>
              <Typography><strong>Status:</strong> {selected.status}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#fefae0' }}>
          <Button onClick={handleClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}


export default function LicenseConfigContent() {
  const {
    client,
    clients,
    handleClientChange,
    licenseData,
    totals,
    isDialogOpen,
    handleOpenDialog,
    handleCloseDialog,
    newLicense,
    handleNewLicenseChange,
    handleSaveLicense,
  } = LicenseConfigHook.useLicenseConfig();
  
  const [sidebarOpen] = React.useState(true);
  const router = useRouter();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  /*
  This effect fetches the current authenticated user's data when the component first loads.
  */
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    setOpenSnackbar(true);
    setTimeout(() => {
      router.push('/login');
    }, 1500);
  };

  return (
    <Box sx={globalStyles.rootBox}>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{ '& .MuiDrawer-paper': globalStyles.drawerPaper }}
      >
        <Box sx={{ p: 1, borderBottom: '2px solid #6b705c', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Link href="/dashboard" passHref>
            <IconButton sx={{ color: 'green' }} aria-label="Go to Dashboard">
              <DashboardIcon />
            </IconButton>
          </Link>
          <Typography variant="h5" sx={{ color: '#fefae0' }}>Auditor Portal</Typography>
        </Box>
        <List>
          {auditorMenu.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton component={Link} href={item.path} sx={globalStyles.listItemButton} onMouseEnter={() => router.prefetch(item.path)}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ mt: 'auto', p: 2, borderTop: '2px solid #6b705c' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1.5 }}>
                <Image src="/toroLogo.jpg" alt="User Profile" width={40} height={40} style={{ borderRadius: '50%', border: '2px solid #f3722c' }} />
                <Box sx={{ minWidth: 0 }}>
                    <Typography noWrap sx={{ fontWeight: '600', color: '#fefae0' }}>{currentUser?.email}</Typography>
                    <Typography variant="caption" noWrap sx={{ color: 'rgba(254, 250, 224, 0.7)' }}>Auditor</Typography>
                </Box>
            </Box>
            <Button onClick={handleLogout} fullWidth variant="outlined" startIcon={<LogoutIcon />} sx={{ color: '#fefae0', borderColor: '#fefae0', '&:hover': { background: '#6b705c' } }}>
                Logout
            </Button>
        </Box>
      </Drawer>

      <Box component="main" sx={mainContentBoxStyles}>
        <Box sx={headerBoxStyles}>
          <Typography variant="h4" sx={pageTitleStyles}>
            License & Configuration Tracking
          </Typography>
          <Box sx={headerRightSectionStyles}>
            <Select
              value={client}
              onChange={handleClientChange}
              size="small"
              displayEmpty
              sx={{ minWidth: 150, backgroundColor: '#283618', color: '#fefae0', '& .MuiSvgIcon-root': { color: '#fefae0' } }}
            >
              <MenuItem value="all">All Clients</MenuItem>
              {clients.map((c) => (
                <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
              ))}
            </Select>
            <Tooltip title={client === 'all' ? 'Please select a client first' : 'Add a new license'}>
              <span>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={handleOpenDialog}
                  disabled={client === 'all'}
                  sx={{ backgroundColor: '#283618', borderColor: '#fefae0', color: '#fefae0', '&:hover': { backgroundColor: '#6b705c' } }}
                >
                  Add License
                </Button>
              </span>
            </Tooltip>
          </Box>
        </Box>

        <Grid container spacing={6} sx={{ mt: 4, px: 2, alignItems: 'stretch' }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={perClientLicenseRegisterStyles}>
              <Typography variant="h4" gutterBottom>Per-Client License Register:</Typography>
              <PerClientLicenseRegister clientName={clients.find(c => c.id === client)?.name || 'All Clients'} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={expiryRenewalAlertsStyles}>
              <Typography variant="h4" gutterBottom>License Expiry & Renewal:</Typography>
              <RenewalCard />
            </Paper>
          </Grid>
          <Grid item xs={12} sx={{ mt: 4 }}>
            <Paper elevation={1} sx={licenseUsageEntitlementDashboardStyles}>
              <Typography variant="h4" gutterBottom textAlign={'center'} sx={{ color: '#525252', fontWeight: 300 }}>
                License Usage:
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={licenseData} margin={{ top: 16, right: 16, left: 0, bottom: 40 }}>
                  <XAxis dataKey="software" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend verticalAlign="bottom" height={36} />
                  <Bar dataKey="assigned" fill="#1976d2" name="Assigned"><LabelList dataKey="assigned" position="top" /></Bar>
                  <Bar dataKey="purchased" fill="rgba(25, 118, 210, 0.3)" stroke="#1976d2" name="Purchased"><LabelList dataKey="purchased" position="top" /></Bar>
                </BarChart>
              </ResponsiveContainer>
              <Box sx={licenseTotalsBoxStyles}>
                <Typography variant="body1"><strong>Total Assigned:</strong> {totals.assigned}</Typography>
                <Typography variant="body1"><strong>Total Purchased:</strong> {totals.purchased}</Typography>
                {totals.assigned > totals.purchased && (
                  <Box sx={overUsageAlertStyles}>
                    <WarningAmberIcon /><Typography variant="body1" color="#d32f2f">Over Usage</Typography>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Add New License</DialogTitle>
        <DialogContent>
          <TextField 
            name="licenseName" 
            label="License Name" 
            value={newLicense.licenseName} 
            onChange={handleNewLicenseChange} 
            fullWidth 
            margin="normal" 
            required 
          />
          <TextField 
            name="licenseKey" 
            label="License Key" 
            value={newLicense.licenseKey} 
            onChange={handleNewLicenseChange} 
            fullWidth 
            margin="normal" 
            required 
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Status</InputLabel>
            <Select name="status" value={newLicense.status} label="Status" onChange={handleNewLicenseChange}>
              <MenuItem value="new">New</MenuItem>
              <MenuItem value="in_use">In Use</MenuItem>
              <MenuItem value="expired">Expired</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveLicense} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
      
      <Snackbar open={openSnackbar} autoHideDuration={1500} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" sx={{ width: '100%', fontWeight: 'bold', fontSize: '1.2rem' }}>
          Logging out...
        </Alert>
      </Snackbar>
    </Box>
  );
}