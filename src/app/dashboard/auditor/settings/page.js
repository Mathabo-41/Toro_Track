/* The file that combines the logic with the styles and displays it as a screen. 
Rendering takes place here to make the screen respond fast when it is being clicked*/
'use client';

import React from 'react';
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
import { FormProvider, Controller } from 'react-hook-form';
import {
  AccountCircle as AccountCircleIcon,
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
  saveButton,
  settingsContainerStyles,
} from './styles';
import { useSettings } from './useSettings/page';

// Import global styles for layout and navigation
import * as globalStyles from '../common/styles';
import { auditorMenu } from '../common/auditorStore';

export default function SettingsPage() {
  const {
    search,
    handleSearchChange,
    methods,
    handleSubmit,
    onSubmit,
    isLoading,
    isSubmitting,
  } = useSettings();

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
    </Box>
  );
}
