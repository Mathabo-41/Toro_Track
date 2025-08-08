"use client";

import React, { useState } from "react";
import {
  Typography,
  Stack,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  IconButton,
  Box,
} from "@mui/material";
import { useForm, FormProvider, Controller } from "react-hook-form";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// Styled components from styles.js
import {
  SettingsContainer,
  SettingsTitleBar,
  SettingsTitleText,
  SettingsSearch,
} from "../styles";

export default function SettingsPage() {
  const methods = useForm();
  const { handleSubmit, control } = methods;
  const [search, setSearch] = useState("");

  const onSubmit = (data) => {
    console.log("Settings saved:", data);
    
  };

  return (
    <Box sx={{ backgroundColor: "#fff",}}>
      {/* Title Bar */}
      <SettingsTitleBar>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <IconButton
              edge="start"
              aria-label="back"
              onClick={() => window.history.back()}
              sx={{ color: "#000" }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Grid>

          <Grid item>
            <Box
              component="img"
              src="/appImages/logo.png"
              alt="Logo"
              sx={{
                width: 60,
                height: 60,
                borderRadius: "4px",
                objectFit: "cover",
              }}
            />
          </Grid>

          <Grid item xs>
            <SettingsTitleText>Auditor Settings</SettingsTitleText>
          </Grid>

          <Grid item xs={12} sm>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <SettingsSearch
                type="text"
                placeholder="Search settings"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Box>
          </Grid>

          <Grid item>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "#000",
                minWidth: "140px",
              }}
            >
              <Box sx={{ textAlign: "right" }}>
                <Typography variant="body2">Sipho Ellen</Typography>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  Auditor
                </Typography>
              </Box>
              <AccountCircleIcon sx={{ fontSize: 32 }} />
            </Box>
          </Grid>
        </Grid>
      </SettingsTitleBar>

      {/* Settings Form */}
      <SettingsContainer>
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
                  defaultValue={["30", "60", "90"]}
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
                      {["Daily", "Weekly", "Monthly"].map((freq) => (
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
      </SettingsContainer>
    </Box>
  );
}
