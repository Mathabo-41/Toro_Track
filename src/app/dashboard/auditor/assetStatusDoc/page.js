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
  Paper,
  TextField,
  colors
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
  assetStatusContainer,
  assetStatusTitle,
  assetStatusSubtitle,
  assetStatusPaper,
  assetStatusSectionTitle
} from '../styles';

const auditTrailMenu = [
  { name: 'Audit Trail', path: '/dashboard/auditor/audit-trail' },
  { name: 'License Configuration Tracking', path: '/dashboard/auditor/licenseConfig' },
  { name: 'Asset Status Documentation', path: '/dashboard/auditor/assetStatusDoc' },
  { name: 'Reporting & Export', path: '/dashboard/auditor/reportingExport' },
  { name: 'Compliance & Alerting', path: '/dashboard/auditor/complianceAlerting' },
  { name: 'Settings', path: '/dashboard/auditor/settings' }
];

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
  const currentPath = '/dashboard/auditor/assetStatusDoc';

  const filteredStatusData = statusData.filter(item =>
    item.asset.toLowerCase().includes(search.toLowerCase()) ||
    item.status.toLowerCase().includes(search.toLowerCase())
  );

  const filteredDocumentsData = documentsData.filter(doc =>
    doc.toLowerCase().includes(search.toLowerCase())
  );

  const filteredSignatures = digitalSignatures.filter(sig =>
    sig.client.toLowerCase().includes(search.toLowerCase()) ||
    sig.status.toLowerCase().includes(search.toLowerCase())
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
          <Typography variant="h5">
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
            Asset Status & Documentation
          </Typography>
          <Box sx={headerRightSectionStyles}>
            <TextField
              variant="outlined"
              placeholder="Search assets or documents"
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

        {/* Content Section */}
        <Box sx={{assetStatusContainer, backgroundColor: '#fefae0', p: 2}}>
          <Typography variant="h4" sx={assetStatusTitle}>
            Asset Status & Documentation
          </Typography>
          <Typography variant="subtitle1" sx={assetStatusSubtitle}>
            Gives auditors a clear view of each asset’s lifecycle and associated
            paperwork.
          </Typography>

          <Paper elevation={2} sx={assetStatusPaper}>
            <Typography variant="h6" sx={assetStatusSectionTitle}>
              Status Dashboard
            </Typography>
            <List>
              {filteredStatusData.map(({ id, asset, status }) => (
                <ListItem key={id} divider>
                  <ListItemText
                    primary={asset}
                    secondary={`Current Status: ${status}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>

          <Paper elevation={2} sx={assetStatusPaper}>
            <Typography variant="h6" sx={assetStatusSectionTitle}>
              Document Attachment Support
            </Typography>
            <List>
              {filteredDocumentsData.map((doc, idx) => (
                <ListItem key={idx} divider>
                  <ListItemText primary={doc} />
                </ListItem>
              ))}
            </List>
          </Paper>

          <Paper elevation={2} sx={assetStatusPaper}>
            <Typography variant="h6" sx={assetStatusSectionTitle}>
              Digital Signature Capture
            </Typography>
            <List>
              {filteredSignatures.map(({ client, date, status }, idx) => (
                <ListItem key={idx} divider>
                  <ListItemText
                    primary={`${client} - ${date}`}
                    secondary={`Signature Status: ${status}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}