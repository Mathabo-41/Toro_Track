// ./auditor/complianceAlerting/CompliAlertContent.js
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Box, Typography, Container, List, ListItem, ListItemText, Drawer,
  ListItemButton, Paper, TextField, Button, IconButton, Grid,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip
} from '@mui/material';

// Import icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Logout as LogoutIcon, FileDownload as FileDownloadIcon } from '@mui/icons-material';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BackupIcon from '@mui/icons-material/Backup';

// Snackbar
import { Snackbar, Alert } from '@mui/material';

// Import styles
import {
  mainContentBoxStyles, headerBoxStyles, pageTitleStyles, headerRightSectionStyles,
  searchFieldStyles, compliancePaperStyles, complianceFeatureTitleStyles,
  exportButtonStyles, activeAlertsTableContainerStyles, tableHeaderCellStyles,
  getSeverityChipColor, securityComplianceSectionStyles, securityListItemStyles
} from './styles';
import { useCompliance } from './useCompliance/page';

// Import global styles for layout and navigation
import * as globalStyles from '../common/styles';
import { useAuditorStore, auditorMenu } from '../common/auditorStore';

export default function CompliAlertContent() {
  const {
    search,
    handleSearchChange,
    filteredAlerts,
    securityChecks,
    handleExport,
    isLoading,
    isError
  } = useCompliance();

  // State for sidebar
  const [sidebarOpen] = React.useState(true);
  const router = useRouter();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleLogout = () => {
    setOpenSnackbar(true);
    setTimeout(() => {
      router.push('/login');
    }, 1500);
  };

  const securityIcons = {
    'Firewall & VPN Audits': <VpnKeyIcon color="success" />,
    'Access Control': <AdminPanelSettingsIcon color="warning" />,
    'Backup Integrity': <BackupIcon color="info" />,
  };

  return (
    <Box sx={globalStyles.rootBox}>
      {/* --- Sidebar Navigation (unchanged) --- */}
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
              <ListItemButton component={Link} href={item.path} sx={globalStyles.listItemButton}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ padding: '1rem', borderTop: '2px solid #6b705c', marginTop: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', overflow: 'hidden', gap: '0.75rem' }}>
            <Box sx={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', position: 'relative', flexShrink: 0, border: '2px solid #f3722c' }}>
              <Image src="/toroLogo.jpg" alt="User Profile" fill style={{ objectFit: 'cover' }} />
            </Box>
            {sidebarOpen && (
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#fefae0' }}>
                  John Doe
                </Typography>
                <Typography sx={{ fontSize: '0.8rem', opacity: 0.8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'rgba(254, 250, 224, 0.7)' }}>
                  user@toro.com
                </Typography>
              </Box>
            )}
          </Box>
          <Button onClick={handleLogout} fullWidth sx={{ padding: '0.75rem', background: 'transparent', border: '1px solid #fefae0', borderRadius: '8px', color: '#fefae0', cursor: 'pointer', transition: 'all 0.3s ease', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', '&:hover': { background: '#6b705c' } }}>
            {sidebarOpen ? 'Logout' : <LogoutIcon />}
          </Button>
        </Box>
      </Drawer>

      {/* --- Main Content --- */}
      <Box component="main" sx={mainContentBoxStyles}>
        {/* --- Header --- */}
        <Box sx={headerBoxStyles}>
          <Typography variant="h4" sx={pageTitleStyles}>
            Compliance & Alerting
          </Typography>
          <Box sx={headerRightSectionStyles}>
            {/* MODIFIED: Search bar now filters the live alerts table */}
            <TextField
              variant="outlined"
              placeholder="Search by client, alert, etc."
              value={search}
              onChange={handleSearchChange}
              sx={searchFieldStyles}
            />
            {/* NEW: Export Button */}
            <Button
              variant="contained"
              startIcon={<FileDownloadIcon />}
              onClick={handleExport}
              sx={exportButtonStyles}
            >
              Export Report
            </Button>
          </Box>
        </Box>

        {/* --- Main Content Area --- */}
        <Grid container spacing={4}>
          {/* NEW: Actionable "Active Alerts" Table */}
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ ...complianceFeatureTitleStyles, mb: 2 }}>
              Active Alerts
            </Typography>
            <TableContainer component={Paper} sx={activeAlertsTableContainerStyles}>
              <Table aria-label="active alerts table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={tableHeaderCellStyles}>Severity</TableCell>
                    <TableCell sx={tableHeaderCellStyles}>Client Name</TableCell>
                    <TableCell sx={tableHeaderCellStyles}>Alert Details</TableCell>
                    <TableCell sx={tableHeaderCellStyles}>Timestamp</TableCell>
                    <TableCell sx={tableHeaderCellStyles}>Status</TableCell>
                    <TableCell sx={tableHeaderCellStyles}>Assigned To</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoading && <TableRow><TableCell colSpan={6}>Loading alerts...</TableCell></TableRow>}
                  {isError && <TableRow><TableCell colSpan={6} sx={{color: 'red'}}>Error fetching alerts.</TableCell></TableRow>}
                  {filteredAlerts.map((alert) => (
                    <TableRow key={alert.id} hover>
                      <TableCell>
                        <Chip label={alert.severity} color={getSeverityChipColor(alert.severity)} size="small" />
                      </TableCell>
                      <TableCell>{alert.client}</TableCell>
                      <TableCell>{alert.details}</TableCell>
                      <TableCell>{alert.timestamp}</TableCell>
                      <TableCell>{alert.status}</TableCell>
                      <TableCell>{alert.assignedTo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* NEW: Security & Data Compliance Section */}
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ ...complianceFeatureTitleStyles, mb: 2 }}>
              Security & Data Compliance
            </Typography>
            <Paper sx={securityComplianceSectionStyles}>
              <Grid container spacing={2}>
                {securityChecks.map((check) => (
                  <Grid item xs={12} md={4} key={check.title}>
                    <Box sx={securityListItemStyles}>
                      {securityIcons[check.title]}
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#283618' }}>{check.title}</Typography>
                        <Typography variant="body2" sx={{ color: '#606c38' }}>{check.details}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* --- Snackbar (unchanged) --- */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1500}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%', fontWeight: 'bold', fontSize: '1.2rem' }}>
          Logging out...
        </Alert>
      </Snackbar>
    </Box>
  );
}