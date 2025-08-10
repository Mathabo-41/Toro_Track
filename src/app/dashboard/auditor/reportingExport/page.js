'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Drawer,
  ListItemButton,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import {
  AccountCircle as AccountCircleIcon
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
  userProfileStyles,
  userInfoStyles,
  auditorTextStyles,
  reportingExportContainerStyles,
  reportingExportTitle,
  reportingExportSubtitle,
  reportingExportSection,
  reportingExportSectionTitle,
  reportingExportSectionDescription,
  reportingExportButton,
  reportingExportFormControl,
  reportingExportMenuItem,
  reportingExportSelect,
} from '../styles';

const auditTrailMenu = [
  { name: 'Audit Trail', path: '/dashboard/auditor/audit-trail' },
  { name: 'License Configuration Tracking', path: '/dashboard/auditor/licenseConfig' },
  { name: 'Asset Status Documentation', path: '/dashboard/auditor/assetStatusDoc' },
  { name: 'Reporting & Export', path: '/dashboard/auditor/reportingExport' },
  { name: 'Compliance & Alerting', path: '/dashboard/auditor/complianceAlerting' },
  { name: 'Settings', path: '/dashboard/auditor/settings' }
];

export default function ReportingExportPage() {
  const [search, setSearch] = useState("");
  const currentPath = '/dashboard/auditor/reportingExport';

  return (
    <Box sx={fullScreenContainerStyles}>
      {/* Sidebar Navigation */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={drawerStyles}
      >
        <Box sx={drawerHeaderStyles}>
          <Typography variant="h6">
            Auditor Portal
          </Typography>
        </Box>
        <List>
          {auditTrailMenu.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={Link}
                href={item.path}
                selected={item.path === currentPath}
                sx={listItemButtonStyles(item.name, currentPath)}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
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
              onChange={(e) => setSearch(e.target.value)}
              sx={searchFieldStyles}
            />
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

        {/* Reporting & Export Content */}
        <Box sx={reportingExportContainerStyles}>
          <Grid container maxWidth="md" sx={{ margin: '0 auto' }}>
            {/* Main Header */}
            <Grid item xs={12}>
              <Typography variant="h4" sx={reportingExportTitle}>
                Reporting & Export
              </Typography>
              <Typography variant="subtitle1" sx={reportingExportSubtitle}>
                Provides flexible, exportable views for internal reviews and external compliance checks.
              </Typography>
            </Grid>

            {/* Section 1 */}
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
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="To Date"
                      type="date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField label="Client" placeholder="Select client" fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth sx={reportingExportFormControl}>
                      <InputLabel id="asset-type-label">Asset Type</InputLabel>
                      <Select labelId="asset-type-label" label="Asset Type" value="" sx={reportingExportSelect}>
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="type1">Type 1</MenuItem>
                        <MenuItem value="type2">Type 2</MenuItem>
                        <MenuItem value="type3">Type 3</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={reportingExportButton.contained}>
                      <Typography>Export PDF</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={reportingExportButton.outlined}>
                      <Typography>Export CSV</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            {/* Section 2 */}
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
                      <Select labelId="schedule-frequency-label" label="Frequency" value="" sx={reportingExportSelect}>
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
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={reportingExportButton.contained}>
                      <Typography>Set Schedule</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            {/* Section 3 */}
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
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={reportingExportButton.contained}>
                      <Typography>Generate Snapshot</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}