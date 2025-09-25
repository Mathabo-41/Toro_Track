// ./auditor/reportingExport/RepoExportContent.js
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import {
  Box, Typography, Grid, List,
  ListItem, ListItemText, Drawer,
  ListItemButton, TextField, MenuItem,
  FormControl, InputLabel, Select,
  Button, IconButton
} from '@mui/material';

// Dashboard icon import
import DashboardIcon from '@mui/icons-material/Dashboard';

// Snackbar
import { Snackbar, Alert } from '@mui/material';

import {
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useReportExport } from './useReportExport/page';
import {
  mainContentBoxStyles,
  headerBoxStyles,
  pageTitleStyles,
  headerRightSectionStyles,
  searchFieldStyles,
  reportingExportContainerStyles,
  reportingExportTitle,
  reportingExportSubtitle,
  reportingExportSection,
  reportingExportSectionTitle,
  reportingExportSectionDescription,
  reportingExportButton,
  reportingExportFormControl,
  reportingExportSelect,
} from './styles';

// Import global styles for layout and navigation
import * as globalStyles from '../common/styles';
import { auditorMenu } from '../common/auditorStore';

export default function RepoExportContent() {
  const {
    search,
    fromDate,
    toDate,
    client,
    assetType,
    scheduleFrequency,
    sendTo,
    cutOffDate,
    handleSearchChange,
    handleExportPdf,
    handleExportCsv,
    handleSetSchedule,
    handleGenerateSnapshot,
    setFromDate,
    setToDate,
    setClient,
    setAssetType,
    setScheduleFrequency,
    setSendTo,
    setCutOffDate,
    reportOptionsQuery,
    exportPdfMutation,
    exportCsvMutation,
    setScheduleMutation,
    generateSnapshotMutation,
  } = useReportExport();

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
  Handles user logout, shows a confirmation, signs the user out, and redirects to login.
  */
  const handleLogout = () => {
    setOpenSnackbar(true);
    setTimeout(async () => {
      await supabase.auth.signOut();
      router.push('/login');
    }, 1500);
  };

  const { data: reportOptions, isLoading: isLoadingOptions } = reportOptionsQuery;
  const isExportingPdf = exportPdfMutation.isPending;
  const isExportingCsv = exportCsvMutation.isPending;
  const isSettingSchedule = setScheduleMutation.isPending;
  const isGeneratingSnapshot = generateSnapshotMutation.isPending;

  return (
    <Box sx={globalStyles.rootBox}>
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
          <Typography variant="h5" sx={{ color: '#fefae0' }}>
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
              >
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
            Reporting & Export
          </Typography>
          <Box sx={headerRightSectionStyles}>
            <TextField
              variant="outlined"
              placeholder="Search reports or exports"
              value={search}
              onChange={handleSearchChange}
              sx={searchFieldStyles}
            />
          </Box>
        </Box>

        <Box sx={reportingExportContainerStyles}>
          <Grid container maxWidth="md" sx={{ margin: '0 auto' }}>
            <Grid item xs={12}>
              <Typography variant="h4" sx={reportingExportTitle}>
                Reporting & Export
              </Typography>
              <Typography variant="subtitle1" sx={reportingExportSubtitle}>
                Provides flexible, exportable views for internal reviews and external compliance checks.
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Box sx={reportingExportSection}>
                <Typography variant="h6" sx={reportingExportSectionTitle}>
                  Customizable PDF/CSV Reports
                </Typography>
                <Typography variant="body1" sx={reportingExportSectionDescription}>
                  Pre-built templates for delivery logs, license statuses, and audit summaries, with filters by date, client, or asset type.
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="From Date"
                      type="date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="To Date"
                      type="date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth sx={reportingExportFormControl}>
                      <InputLabel>Client</InputLabel>
                      <Select label="Client" value={client} onChange={(e) => setClient(e.target.value)} sx={reportingExportSelect}>
                        <MenuItem value="">All</MenuItem>
                        {isLoadingOptions ? (
                          <MenuItem disabled>Loading...</MenuItem>
                        ) : (
                          reportOptions?.clients.map((c) => (
                            <MenuItem key={c.id} value={c.name}>
                              {c.name}
                            </MenuItem>
                          ))
                        )}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth sx={reportingExportFormControl}>
                      <InputLabel id="asset-type-label">Asset Type</InputLabel>
                      <Select labelId="asset-type-label" label="Asset Type" value={assetType} onChange={(e) => setAssetType(e.target.value)} sx={reportingExportSelect}>
                        <MenuItem value="">All</MenuItem>
                        {isLoadingOptions ? (
                          <MenuItem disabled>Loading...</MenuItem>
                        ) : (
                          reportOptions?.assetTypes.map((type) => (
                            <MenuItem key={type.id} value={type.name}>
                              {type.name}
                            </MenuItem>
                          ))
                        )}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box onClick={handleExportPdf} sx={reportingExportButton.contained}>
                      <Typography>{isExportingPdf ? 'Exporting...' : 'Export PDF'}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box onClick={handleExportCsv} sx={reportingExportButton.contained}>
                      <Typography>{isExportingCsv ? 'Exporting...' : 'Export CSV'}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={reportingExportSection}>
                <Typography variant="h6" sx={reportingExportSectionTitle}>
                  Scheduled Report Delivery
                </Typography>
                <Typography variant="body1" sx={reportingExportSectionDescription}>
                  Automate sending of monthly or quarterly audit packs to designated stakeholders via email or SharePoint.
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth sx={reportingExportFormControl}>
                      <InputLabel id="schedule-frequency-label">Frequency</InputLabel>
                      <Select labelId="schedule-frequency-label" label="Frequency" value={scheduleFrequency} onChange={(e) => setScheduleFrequency(e.target.value)} sx={reportingExportSelect}>
                        <MenuItem value="monthly">Monthly</MenuItem>
                        <MenuItem value="quarterly">Quarterly</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Send To (Email or SharePoint)"
                      placeholder="email@example.com"
                      fullWidth
                      value={sendTo}
                      onChange={(e) => setSendTo(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box onClick={handleSetSchedule} sx={reportingExportButton.contained}>
                      <Typography>{isSettingSchedule ? 'Setting...' : 'Set Schedule'}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={reportingExportSection}>
                <Typography variant="h6" sx={reportingExportSectionTitle}>
                  On-Demand Audit Snapshots
                </Typography>
                <Typography variant="body1" sx={reportingExportSectionDescription}>
                  Generate instant snapshots of the entire asset register for any cut-off date.
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Cut-Off Date"
                      type="date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={cutOffDate}
                      onChange={(e) => setCutOffDate(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box onClick={handleGenerateSnapshot} sx={reportingExportButton.contained}>
                      <Typography>{isGeneratingSnapshot ? 'Generating...' : 'Generate Snapshot'}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1500}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success"
          sx={{
            width: '100%',
            fontWeight: 'bold',
            fontSize: '1.2rem'
          }}>
          Logging out...
        </Alert>
      </Snackbar>
    </Box>
  );
}