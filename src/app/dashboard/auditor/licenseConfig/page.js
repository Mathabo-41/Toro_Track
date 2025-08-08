"use client";

import React, { useState, useEffect } from "react";
import {
  Grid,
  MenuItem,
  Button,
  Select,
  Box,
  Typography,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Chip,
  List,
  ListItem,
  Card,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

import { DataGrid } from "@mui/x-data-grid";

import { styled } from "@mui/material/styles";

export const ComplianceTitleBar = styled(Box)(({ theme }) => ({
  backgroundColor: "#FF6B00",
  color: "#000",
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  fontFamily: "monospace",
  position: "sticky",
  top: 0,
  zIndex: 1100,
}));

export const ComplianceTitleText = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  fontWeight: 600,
  fontFamily: "monospace",
  color: "#000",
  whiteSpace: "nowrap",
}));

export const ComplianceSearchInput = styled("input")(({ theme }) => ({
  fontFamily: "monospace",
  padding: "8px 12px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  fontSize: "0.9rem",
  width: "500px",
}));

// Example license data for chart
const licenseData = [
  { software: "Photoshop", assigned: 80, purchased: 100 },
  { software: "AutoCAD", assigned: 60, purchased: 50 },
  { software: "Office 365", assigned: 120, purchased: 120 },
];

const totals = licenseData.reduce(
  (acc, cur) => ({
    assigned: acc.assigned + cur.assigned,
    purchased: acc.purchased + cur.purchased,
  }),
  { assigned: 0, purchased: 0 }
);

// Example license data for Per-Client License Register
const licenseRows = [
  { id: 1, licenseName: "Photoshop", licenseKey: "ABC123", status: "Active" },
  { id: 2, licenseName: "AutoCAD", licenseKey: "DEF456", status: "Expired" },
  { id: 3, licenseName: "Office 365", licenseKey: "GHI789", status: "Active" },
];

const columns = [
  { field: "licenseName", headerName: "License Name", flex: 1, sortable: true },
  { field: "licenseKey", headerName: "License Key", flex: 1, sortable: true },
  { field: "status", headerName: "Status", flex: 1, sortable: true },
];

// RenewalCard Component
function RenewalCard() {
  const chipGroups = [
    {
      label: "30 days",
      color: "warning",
      keys: ["XYZ123", "ABC456", "JKL789", "MNO000"],
    },
    {
      label: "60 days",
      color: "error",
      keys: ["UVW000"],
    },
    {
      label: "90 days",
      color: "default",
      keys: ["LMN888", "DEF333"],
    },
  ];

  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Upcoming Renewals
      </Typography>

      {chipGroups.map((group) => {
        const showKeys = group.keys.slice(0, 3);
        const remaining = group.keys.length - showKeys.length;

        return (
          <Box key={group.label} sx={{ mb: 2 }}>
            <Chip
              label={group.label}
              color={group.color}
              variant="outlined"
              sx={{ mb: 1 }}
            />
            <List dense disablePadding>
              {showKeys.map((key, idx) => (
                <ListItem
                  key={idx}
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    cursor: "pointer",
                    color: "primary.main",
                    "&:hover": { textDecoration: "underline" },
                  }}
                  onClick={() => console.log(`Filter by key: ${key}`)}
                >
                  • {key}
                </ListItem>
              ))}
              {remaining > 0 && (
                <ListItem
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    cursor: "pointer",
                    color: "text.secondary",
                    fontStyle: "italic",
                  }}
                  onClick={() =>
                    console.log(`View all ${group.label} renewals`)
                  }
                >
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

function PerClientLicenseRegister({ clientName = "Client ABC" }) {
  const [selectedLicense, setSelectedLicense] = useState(null);

  const handleRowClick = (params) => {
    setSelectedLicense(params.row);
  };

  const handleClose = () => setSelectedLicense(null);

  const handleExportCsv = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["License Name,License Key,Status"]
        .concat(
          licenseRows.map((r) => `${r.licenseName},${r.licenseKey},${r.status}`)
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${clientName}_licenses.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Paper elevation={1} sx={{ p: 2 }}>
      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle1">
          Showing {licenseRows.length} licenses for {clientName}
        </Typography>

        <Tooltip title="Export CSV">
          <IconButton onClick={handleExportCsv} size="small" color="primary">
            <DownloadIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={licenseRows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          pagination
          sortingOrder={["asc", "desc"]}
          onRowClick={handleRowClick}
        />
      </Box>

      <Dialog open={!!selectedLicense} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          License Details
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          {selectedLicense && (
            <>
              <Typography>
                <strong>License Name:</strong> {selectedLicense.licenseName}
              </Typography>
              <Typography>
                <strong>License Key:</strong> {selectedLicense.licenseKey}
              </Typography>
              <Typography>
                <strong>Status:</strong> {selectedLicense.status}
              </Typography>
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [client, setClient] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleClientChange = (event) => {
    setClient(event.target.value);
  };

  return (
    <Box sx={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      {/* Title Bar */}
      <ComplianceTitleBar>
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
            <ComplianceTitleText>License & Configuration Tracking</ComplianceTitleText>
          </Grid>

          <Grid item xs={12} sm>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <ComplianceSearchInput
                type="text"
                placeholder="Search compliance features"
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
      </ComplianceTitleBar>

      {/* Buttons below Title Bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 2,
          p: 2,
          borderBottom: "1px solid #ddd",
        }}
      >
        {/* All Clients Dropdown */}
        <Select
          value={client}
          onChange={handleClientChange}
          size="small"
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="all">All Clients</MenuItem>
          <MenuItem value="clientA">Client A</MenuItem>
          <MenuItem value="clientB">Client B</MenuItem>
        </Select>

        {/* Add License Button */}
        <Button variant="contained" color="primary">
          Add License
        </Button>
      </Box>

      {/* Main content */}
      <Grid container spacing={2} sx={{ mt: 4, px: 2 }}>
        {/* 1. Per-Client License Register Section */}
        <Grid item xs={12} md={8}>
          <Paper elevation={1} sx={{ p: 2, border: "1px solid #ddd", mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Per-Client License Register
            </Typography>

            {isClient && <PerClientLicenseRegister clientName="Client ABC" />}
          </Paper>
        </Grid>

        {/* 2. Expiry & Renewal Alerts Section */}
        <Grid item xs={12} md={4}>
          <Paper elevation={1} sx={{ p: 2, border: "1px solid #ddd", mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Expiry & Renewal Alerts
            </Typography>

            <RenewalCard />
          </Paper>
        </Grid>

        {/* 3. Usage vs. Entitlement Dashboard Section */}
        <Grid item xs={12}>
          <Paper elevation={1} sx={{ p: 2, border: "1px solid #ddd", mb: 2 }}>
            <Typography variant="h6" gutterBottom textAlign={"center"}>
              License Usage Entitlement Dashboard
            </Typography>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={licenseData}
                margin={{ top: 16, right: 16, left: 0, bottom: 40 }}
              >
                <XAxis dataKey="software" />
                <YAxis />
                <RechartsTooltip />
                <Legend verticalAlign="bottom" height={36} />
                <Bar dataKey="assigned" fill="#1976d2" name="Assigned">
                  <LabelList dataKey="assigned" position="top" />
                </Bar>
                <Bar
                  dataKey="purchased"
                  fill="rgba(25, 118, 210, 0.3)"
                  stroke="#1976d2"
                  name="Purchased"
                >
                  <LabelList dataKey="purchased" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
                px: 1,
              }}
            >
              <Typography variant="body1">
                <strong>Total Assigned:</strong> {totals.assigned}
              </Typography>
              <Typography variant="body1">
                <strong>Total Purchased:</strong> {totals.purchased}
              </Typography>
              {totals.assigned > totals.purchased && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    color: "#d32f2f",
                  }}
                >
                  <WarningAmberIcon />
                  <Typography variant="body1" color="#d32f2f">
                    Over Usage
                  </Typography>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
