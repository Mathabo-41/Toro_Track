"use client";

import React, { useState } from "react";
import {
  AssetStatusContainer,
  AssetStatusPaper,
  AssetStatusTitle,
  AssetStatusSubtitle,
  AssetStatusSectionTitle,
  AuditTrailTitleBar,
  AuditTrailTitle,
  AuditTrailSearch,
} from "../styles";

import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  IconButton,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const statusData = [
  { id: 1, asset: "Laptop - Dell XPS 13", status: "Deployed" },
  { id: 2, asset: "Router - Cisco 2901", status: "In Transit" },
  { id: 3, asset: "Software - Adobe CC", status: "Under Maintenance" },
  { id: 4, asset: "Printer - HP LaserJet", status: "Retired" },
];

const documentsData = [
  "Delivery Note #12345.pdf",
  "Client Sign-off Form - Project Alpha.pdf",
  "Warranty Certificate - Dell XPS 13.pdf",
  "Disposal Form - HP Printer.pdf",
];

const digitalSignatures = [
  { client: "Acme Corp", date: "2025-07-30", status: "Accepted" },
  { client: "Globex Inc", date: "2025-07-28", status: "Pending" },
];

export default function AssetStatusDocumentation() {
  const [search, setSearch] = useState("");

  return (
    <>
      {/* Title Bar */}
      <AuditTrailTitleBar>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            edge="start"
            aria-label="back"
            onClick={() => window.history.back()}
            sx={{ color: "#000" }}
          >
            <ArrowBackIcon />
          </IconButton>

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
          <AuditTrailTitle sx={{ whiteSpace: "nowrap" }}>
            Asset Status & Documentation
          </AuditTrailTitle>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <AuditTrailSearch
              type="text"
              placeholder="Search assets or documents"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>

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
        </Box>
      </AuditTrailTitleBar>

      {/* Main Content */}
      <AssetStatusContainer>
        <AssetStatusTitle variant="h4">
          Asset Status & Documentation
        </AssetStatusTitle>
        <AssetStatusSubtitle variant="subtitle1">
          Gives auditors a clear view of each asset’s lifecycle and associated
          paperwork.
        </AssetStatusSubtitle>

        <AssetStatusPaper elevation={2}>
          <AssetStatusSectionTitle variant="h6">
            Status Dashboard
          </AssetStatusSectionTitle>
          <List>
            {statusData.map(({ id, asset, status }) => (
              <ListItem key={id} divider>
                <ListItemText
                  primary={asset}
                  secondary={`Current Status: ${status}`}
                />
              </ListItem>
            ))}
          </List>
        </AssetStatusPaper>

        <AssetStatusPaper elevation={2}>
          <AssetStatusSectionTitle variant="h6">
            Document Attachment Support
          </AssetStatusSectionTitle>
          <List>
            {documentsData.map((doc, idx) => (
              <ListItem key={idx} divider>
                <ListItemText primary={doc} />
              </ListItem>
            ))}
          </List>
        </AssetStatusPaper>

        <AssetStatusPaper elevation={2}>
          <AssetStatusSectionTitle variant="h6">
            Digital Signature Capture
          </AssetStatusSectionTitle>
          <List>
            {digitalSignatures.map(({ client, date, status }, idx) => (
              <ListItem key={idx} divider>
                <ListItemText
                  primary={`${client} - ${date}`}
                  secondary={`Signature Status: ${status}`}
                />
              </ListItem>
            ))}
          </List>
        </AssetStatusPaper>
      </AssetStatusContainer>
    </>
  );
}
