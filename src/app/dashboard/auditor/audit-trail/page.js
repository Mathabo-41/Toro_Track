"use client";

import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Box,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
  AuditTrailContainer,
  AuditTrailTableContainer,
  AuditTrailHeaderCell,
  AuditTrailCell,
  AuditTrailSerialCell,
  ComplianceTitleBar,
  ComplianceTitleText,
  ComplianceSearchInput,
} from "../styles";

const rows = [
  {
    orderId: "#ORD8864",
    signOff: "Themba Ngozo (Asset Manager)",
    timestamp: "2023-10-01 10:00",
    status: "Delivered",
    receiver: "Dean Edwards",
    type: "Hardware",
    serial: "SN123456",
  },
  {
    orderId: "#ORD4931",
    signOff: "Musa Mokoena (Storage Manager)",
    timestamp: "2023-10-02 11:00",
    status: "Delivered",
    receiver: "Mandla Zulu",
    type: "Hardware",
    serial: "SN123457",
  },
  {
    orderId: "#ORD2211",
    signOff: "Themba Ngozo (Asset Manager)",
    timestamp: "2023-10-03 12:00",
    status: "In transit",
    receiver: "Pieter Cole",
    type: "Hardware",
    serial: "SN123458",
  },
  {
    orderId: "#ORD7700",
    signOff: "Themba Ngozo (Asset Manager)",
    timestamp: "2023-10-04 13:00",
    status: "Processing",
    receiver: "Lesedi Mofokeng",
    type: "Software",
    serial: "SN123459",
  },
  {
    orderId: "#ORD3231",
    signOff: "Musa Mokoena (Storage Manager)",
    timestamp: "2023-10-05 14:00",
    status: "Processing",
    receiver: "Mthuthuzi Langa",
    type: "Software",
    serial: "SN123460",
  },
];

export default function AuditTrailPage() {
  const [search, setSearch] = useState("");

  const filteredRows = rows.filter((r) =>
    r.orderId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AuditTrailContainer>
      {/* Title Bar  */}
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
            <ComplianceTitleText>Audit Trail & Logging</ComplianceTitleText>
          </Grid>

          <Grid item xs={12} sm>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <ComplianceSearchInput
                type="text"
                placeholder="Search Order ID"
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

      {/* Audit trail table */}
      <AuditTrailTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <AuditTrailHeaderCell>Order ID</AuditTrailHeaderCell>
              <AuditTrailHeaderCell>Order Sign-Off</AuditTrailHeaderCell>
              <AuditTrailHeaderCell>Timestamp</AuditTrailHeaderCell>
              <AuditTrailHeaderCell>Delivery Status</AuditTrailHeaderCell>
              <AuditTrailHeaderCell>Order Receiver</AuditTrailHeaderCell>
              <AuditTrailHeaderCell>Asset Type</AuditTrailHeaderCell>
              <AuditTrailHeaderCell>Serial Number</AuditTrailHeaderCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredRows.map((r) => (
              <TableRow key={r.orderId}>
                <AuditTrailCell>{r.orderId}</AuditTrailCell>
                <AuditTrailCell>{r.signOff}</AuditTrailCell>
                <AuditTrailCell>{r.timestamp}</AuditTrailCell>
                <AuditTrailCell>{r.status}</AuditTrailCell>
                <AuditTrailCell>{r.receiver}</AuditTrailCell>
                <AuditTrailCell>{r.type}</AuditTrailCell>
                <AuditTrailSerialCell>{r.serial}</AuditTrailSerialCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </AuditTrailTableContainer>
    </AuditTrailContainer>
  );
}
