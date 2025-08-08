"use client";

import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  IconButton,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import {
  ReportingExportContainer,
  ReportingExportTitle,
  ReportingExportSubtitle,
  ReportingExportSection,
  ReportingExportSectionTitle,
  ReportingExportSectionDescription,
  ReportingExportButton,
  ReportingExportTitleBar,
  ReportingExportTitleText,
  ReportingExportSearch,
} from "../styles";

export default function ReportingExportPage() {
  const [search, setSearch] = useState("");

  return (
    <>
      {/* Title Bar */}
      <ReportingExportTitleBar>
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
            <ReportingExportTitleText>Reporting & Export</ReportingExportTitleText>
          </Grid>

          <Grid item xs={12} sm>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <ReportingExportSearch
                type="text"
                placeholder="Search reports or exports"
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
      </ReportingExportTitleBar>

      {/* Main Content */}
      <ReportingExportContainer>
        <Grid container maxWidth="md" sx={{ margin: "0 auto" , fontGridFamily: "monospace"}}>
          {/* Main Header */}
          <Grid item xs={12}>
            <ReportingExportTitle>Reporting & Export</ReportingExportTitle>
            <ReportingExportSubtitle>
              Provides flexible, exportable views for internal reviews and external compliance checks.
            </ReportingExportSubtitle>
          </Grid>

          {/* Section 1 */}
          <Grid item xs={12}>
            <ReportingExportSection>
              <ReportingExportSectionTitle>Customizable PDF/CSV Reports</ReportingExportSectionTitle>
              <ReportingExportSectionDescription>
                Pre-built templates for delivery logs, license statuses, and audit summaries, with filters by date, client, or asset type.
              </ReportingExportSectionDescription>
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
                  <FormControl fullWidth>
                    <InputLabel id="asset-type-label">Asset Type</InputLabel>
                    <Select labelId="asset-type-label" label="Asset Type" value="">
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="type1">Type 1</MenuItem>
                      <MenuItem value="type2">Type 2</MenuItem>
                      <MenuItem value="type3">Type 3</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <ReportingExportButton variant="contained" fullWidth>
                    Export PDF
                  </ReportingExportButton>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <ReportingExportButton variant="outlined" fullWidth>
                    Export CSV
                  </ReportingExportButton>
                </Grid>
              </Grid>
            </ReportingExportSection>
          </Grid>

          {/* Section 2 */}
          <Grid item xs={12}>
            <ReportingExportSection>
              <ReportingExportSectionTitle>Scheduled Report Delivery</ReportingExportSectionTitle>
              <ReportingExportSectionDescription>
                Automate sending of monthly or quarterly audit packs to designated stakeholders via email or SharePoint.
              </ReportingExportSectionDescription>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="schedule-frequency-label">Frequency</InputLabel>
                    <Select labelId="schedule-frequency-label" label="Frequency" value="">
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
                  <ReportingExportButton variant="contained" fullWidth>
                    Set Schedule
                  </ReportingExportButton>
                </Grid>
              </Grid>
            </ReportingExportSection>
          </Grid>

          {/* Section 3 */}
          <Grid item xs={12}>
            <ReportingExportSection>
              <ReportingExportSectionTitle>On-Demand Audit Snapshots</ReportingExportSectionTitle>
              <ReportingExportSectionDescription>
                Generate instant snapshots of the entire asset register for any cut-off date.
              </ReportingExportSectionDescription>
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
                  <ReportingExportButton variant="contained" fullWidth>
                    Generate Snapshot
                  </ReportingExportButton>
                </Grid>
              </Grid>
            </ReportingExportSection>
          </Grid>
        </Grid>
      </ReportingExportContainer>
    </>
  );
}
