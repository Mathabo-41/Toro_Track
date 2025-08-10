'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
} from '@mui/material';
import { useForm, FormProvider, Controller } from 'react-hook-form';
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
  settingsContainerStyles,
} from '../styles';

const auditTrailMenu = [
  { name: 'Audit Trail', path: '/dashboard/auditor/audit-trail' },
  { name: 'License Configuration Tracking', path: '/dashboard/auditor/licenseConfig' },
  { name: 'Asset Status Documentation', path: '/dashboard/auditor/assetStatusDoc' },
  { name: 'Reporting & Export', path: '/dashboard/auditor/reportingExport' },
  { name: 'Compliance & Alerting', path: '/dashboard/auditor/complianceAlerting' },
  { name: 'Settings', path: '/dashboard/auditor/settings' }
];

export default function SettingsPage() {
  const methods = useForm();
  const { handleSubmit, control } = methods;
  const [search, setSearch] = useState('');
  const currentPath = '/dashboard/auditor/settings';

  const onSubmit = (data) => {
    console.log('Settings saved:', data);
  };

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
            Auditor Settings
          </Typography>
          <Box sx={headerRightSectionStyles}>
            <TextField
              variant="outlined"
              placeholder="Search settings"
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

        {/* Settings Form */}
        <Box sx={settingsContainerStyles}>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                {/* ───── Audit Trail & Event Capture ───── */}
                <Stack spacing={2}>
                  <Typography variant="h6">Audit Trail & Event Capture</Typography>

                  <Controller
                    name="audit.retentionPeriod"
                    control={control}
                    defaultValue="90"
                    render={({ field }) => (
                      <TextField {...field} label="Event Retention (days)" type="number" fullWidth />
                    )}
                  />

                  <Controller
                    name="audit.immutableMode"
                    control={control}
                    defaultValue={true}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Checkbox {...field} checked={field.value} />}
                        label="Enable Immutable Mode"
                      />
                    )}
                  />

                  <Controller
                    name="audit.autoCapture.login"
                    control={control}
                    defaultValue={true}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Checkbox {...field} checked={field.value} />}
                        label="Auto-capture Logins"
                      />
                    )}
                  />

                  <Controller
                    name="audit.timezone"
                    control={control}
                    defaultValue="UTC"
                    render={({ field }) => (
                      <TextField {...field} select label="Timezone" fullWidth>
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
                    control={control}
                    defaultValue="full"
                    render={({ field }) => (
                      <TextField {...field} select label="Log Detail Level" fullWidth>
                        <MenuItem value="basic">Basic</MenuItem>
                        <MenuItem value="full">Full</MenuItem>
                      </TextField>
                    )}
                  />

                  <Controller
                    name="delivery.allowManualOverride"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Checkbox {...field} checked={field.value} />}
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
                    control={control}
                    defaultValue={['30', '60', '90']}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Alert Thresholds (days)"
                        helperText="Comma-separated (e.g. 30,60,90)"
                        fullWidth
                      />
                    )}
                  />

                  <Controller
                    name="license.usageWarningLevel"
                    control={control}
                    defaultValue="90"
                    render={({ field }) => (
                      <TextField {...field} label="Usage Warning (%)" type="number" fullWidth />
                    )}
                  />
                </Stack>

                {/* ───── Asset Status ───── */}
                <Stack spacing={2}>
                  <Typography variant="h6">Asset Status & Documentation</Typography>

                  <Controller
                    name="asset.defaultStatuses"
                    control={control}
                    defaultValue="In transit,Deployed"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Default Statuses"
                        helperText="Comma-separated (e.g. In transit,Deployed)"
                        fullWidth
                      />
                    )}
                  />

                  <Controller
                    name="asset.enableSignatureCapture"
                    control={control}
                    defaultValue={true}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Checkbox {...field} checked={field.value} />}
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
                    control={control}
                    defaultValue="PDF,CSV"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Report Formats"
                        helperText="Comma-separated (e.g. PDF,CSV)"
                        fullWidth
                      />
                    )}
                  />

                  <Controller
                    name="report.schedule"
                    control={control}
                    defaultValue="Monthly"
                    render={({ field }) => (
                      <TextField {...field} select label="Report Schedule" fullWidth>
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
                    control={control}
                    defaultValue="Software audit,Hardware disposal"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Checklist Templates"
                        helperText="Comma-separated"
                        fullWidth
                      />
                    )}
                  />

                  <Controller
                    name="compliance.alertChannels"
                    control={control}
                    defaultValue="Email"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Alert Channels"
                        helperText="Comma-separated (e.g. Email,Slack)"
                        fullWidth
                      />
                    )}
                  />
                </Stack>

                {/* ───── Access Control ───── */}
                <Stack spacing={2}>
                  <Typography variant="h6">Access Control</Typography>

                  <Controller
                    name="access.readOnlyMode"
                    control={control}
                    defaultValue={true}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Checkbox {...field} checked={field.value} />}
                        label="Enable Read-Only Mode"
                      />
                    )}
                  />

                  <Controller
                    name="access.customRoles"
                    control={control}
                    defaultValue="Junior Auditor,Senior Auditor"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Custom Roles"
                        helperText="Comma-separated"
                        fullWidth
                      />
                    )}
                  />
                </Stack>

                {/* ───── Submit Button ───── */}
                <Button variant="contained" type="submit">
                  Save Settings
                </Button>
              </Stack>
            </form>
          </FormProvider>
        </Box>
      </Box>
    </Box>
  );
}