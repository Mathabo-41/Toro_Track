'use client';

import React, { useEffect } from 'react';
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
  Button
} from '@mui/material';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { AccountCircle as AccountCircleIcon } from '@mui/icons-material';

import { useAuditorStore } from '../common/auditorStore';
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
  auditorTextStyles
} from '../common/styles';

import { settingsContainerStyles, saveButton } from './styles';
import { useSettings } from './useSettings';

export default function SettingsPage() {
  const { auditTrailMenu, currentPath, setCurrentPath } = useAuditorStore();
  const methods = useForm();
  const { reset, handleSubmit, control } = methods;
  const { data, isLoading, isError } = useSettings();

  // Highlight sidebar
  useEffect(() => {
    setCurrentPath('/dashboard/auditor/settings');
  }, [setCurrentPath]);

  // When settings load, populate form
  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  const onSubmit = (formData) => {
    console.log('Settings saved:', formData);
    // call API to persist…
  };

  return (
    <Box sx={fullScreenContainerStyles}>
      {/* Sidebar */}
      <Drawer variant="permanent" anchor="left" sx={drawerStyles}>
        <Box sx={drawerHeaderStyles}>
          <Typography variant="h5">Auditor Portal</Typography>
        </Box>
        <List>
          {auditTrailMenu.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={Link}
                href={item.path}
                selected={item.path === currentPath}
                sx={listItemButtonStyles(item.path, currentPath)}
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

        <Box sx={settingsContainerStyles}>
          {isLoading && <Typography>Loading settings…</Typography>}
          {isError && (
            <Typography color="error">Failed to load settings</Typography>
          )}
          {!isLoading && !isError && (
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={4}>
                  {/* Audit Trail */}
                  <Stack spacing={2}>
                    <Typography variant="h6">
                      Audit Trail & Event Capture
                    </Typography>

                    <Controller
                      name="audit.retentionPeriod"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Event Retention (days)"
                          type="number"
                          fullWidth
                        />
                      )}
                    />

                    <Controller
                      name="audit.immutableMode"
                      control={control}
                      render={({ field }) => (
                        <FormControlLabel
                          control={
                            <Checkbox {...field} checked={field.value} />
                          }
                          label="Enable Immutable Mode"
                        />
                      )}
                    />

                    <Controller
                      name="audit.autoCapture.login"
                      control={control}
                      render={({ field }) => (
                        <FormControlLabel
                          control={
                            <Checkbox {...field} checked={field.value} />
                          }
                          label="Auto-capture Logins"
                        />
                      )}
                    />

                    <Controller
                      name="audit.timezone"
                      control={control}
                      render={({ field }) => (
                        <TextField {...field} select label="Timezone" fullWidth>
                          {['UTC', 'Local'].map((tz) => (
                            <MenuItem key={tz} value={tz}>
                              {tz}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                  </Stack>

                  {/* Delivery Logs */}
                  <Stack spacing={2}>
                    <Typography variant="h6">Delivery Logs</Typography>

                    <Controller
                      name="delivery.detailLevel"
                      control={control}
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
                      render={({ field }) => (
                        <FormControlLabel
                          control={
                            <Checkbox {...field} checked={field.value} />
                          }
                          label="Allow Manual Overrides"
                        />
                      )}
                    />
                  </Stack>

                  {/* License Tracking */}
                  <Stack spacing={2}>
                    <Typography variant="h6">License Tracking</Typography>

                    <Controller
                      name="license.alertThresholds"
                      control={control}
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
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Usage Warning (%)"
                          type="number"
                          fullWidth
                        />
                      )}
                    />
                  </Stack>

                  {/* Asset Status */}
                  <Stack spacing={2}>
                    <Typography variant="h6">
                      Asset Status & Documentation
                    </Typography>

                    <Controller
                      name="asset.defaultStatuses"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Default Statuses"
                          helperText="Comma-separated"
                          fullWidth
                        />
                      )}
                    />

                    <Controller
                      name="asset.enableSignatureCapture"
                      control={control}
                      render={({ field }) => (
                        <FormControlLabel
                          control={
                            <Checkbox {...field} checked={field.value} />
                          }
                          label="Enable Signature Capture"
                        />
                      )}
                    />
                  </Stack>

                  {/* Reporting & Export */}
                  <Stack spacing={2}>
                    <Typography variant="h6">
                      Reporting & Export
                    </Typography>

                    <Controller
                      name="report.formats"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Report Formats"
                          helperText="Comma-separated"
                          fullWidth
                        />
                      )}
                    />

                    <Controller
                      name="report.schedule"
                      control={control}
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

                  {/* Compliance & Alerting */}
                  <Stack spacing={2}>
                    <Typography variant="h6">
                      Compliance & Alerting
                    </Typography>

                    <Controller
                      name="compliance.checklists"
                      control={control}
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
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Alert Channels"
                          helperText="Comma-separated"
                          fullWidth
                        />
                      )}
                    />
                  </Stack>

                  {/* Access Control */}
                  <Stack spacing={2}>
                    <Typography variant="h6">Access Control</Typography>

                    <Controller
                      name="access.readOnlyMode"
                      control={control}
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

                  {/* Submit */}
                  <Button type="submit" variant="contained" sx={saveButton}>
                    Save Settings
                  </Button>
                </Stack>
              </form>
            </FormProvider>
          )}
        </Box>
      </Box>
    </Box>
  );
}
