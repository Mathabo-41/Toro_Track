// ./auditor/complianceAlerting/CompliAlertContent.js
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createSupabaseClient } from '@/lib/supabase/client';
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
  const supabase = createSupabaseClient();
  const {
    search,
    handleSearchChange,
    filteredAlerts,
    securityChecks,
    handleExport,
    isLoading,
    isError
  } = useCompliance();

  const router = useRouter();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  /*
  Fetches the current user data from Supabase auth.
  */
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    };
    fetchUser();
  }, []);

  /*
  Handles user logout and redirects to the login page.
  */
  const handleLogout = () => {
    setOpenSnackbar(true);
    setTimeout(async () => {
      await supabase.auth.signOut();
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
            Compliance & Alerting
          </Typography>
          <Box sx={headerRightSectionStyles}>
            <TextField
              variant="outlined"
              placeholder="Search by client, alert, etc."
              value={search}
              onChange={handleSearchChange}
              sx={searchFieldStyles}
            />
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

        <Grid container spacing={4}>
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