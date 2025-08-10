// page.js
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
  Paper,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TextField
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
  tablePaperStyles,
  tableCellHeaderStyles,
  tableCellBodyStyles
} from '../styles';

const auditTrailMenu = [
  { name: 'Audit Trail', path: '/dashboard/auditor/audit-trail' },
  { name: 'License Configuration Tracking', path: '/dashboard/auditor/licenseConfig' },
  { name: 'Asset Status Documentation', path: '/dashboard/auditor/assetStatusDoc' },
  { name: 'Reporting & Export', path: '/dashboard/auditor/reportingExport' },
  { name: 'Compliance & Alerting', path: '/dashboard/auditor/complianceAlerting' },
  { name: 'Settings', path: '/dashboard/auditor/settings' }
];

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
  const currentPath = '/dashboard/client/details';

  const filteredRows = rows.filter((r) =>
    r.orderId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={fullScreenContainerStyles}>
      {/* Sidebar Navigation */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={drawerStyles}
      >
        <Box sx={drawerHeaderStyles}>
          <Typography variant="h5" >
            Auditor Portal
          </Typography>
        </Box>
        <List>
          {auditTrailMenu.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={Link}
                href={item.path}
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
            Audit Trail & Logging
          </Typography>
          <Box sx={headerRightSectionStyles}>
            <TextField
              variant="outlined"
              placeholder="Search Order ID"
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

        {/* Audit trail table */}
        <Box component={Paper} sx={tablePaperStyles}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={tableCellHeaderStyles}>Order ID</TableCell>
                <TableCell sx={tableCellHeaderStyles}>Order Sign-Off</TableCell>
                <TableCell sx={tableCellHeaderStyles}>Timestamp</TableCell>
                <TableCell sx={tableCellHeaderStyles}>Delivery Status</TableCell>
                <TableCell sx={tableCellHeaderStyles}>Order Receiver</TableCell>
                <TableCell sx={tableCellHeaderStyles}>Asset Type</TableCell>
                <TableCell sx={tableCellHeaderStyles}>Serial Number</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredRows.map((r) => (
                <TableRow key={r.orderId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell sx={tableCellBodyStyles}>{r.orderId}</TableCell>
                  <TableCell sx={tableCellBodyStyles}>{r.signOff}</TableCell>
                  <TableCell sx={tableCellBodyStyles}>{r.timestamp}</TableCell>
                  <TableCell sx={tableCellBodyStyles}>{r.status}</TableCell>
                  <TableCell sx={tableCellBodyStyles}>{r.receiver}</TableCell>
                  <TableCell sx={tableCellBodyStyles}>{r.type}</TableCell>
                  <TableCell sx={tableCellBodyStyles}>{r.serial}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
}