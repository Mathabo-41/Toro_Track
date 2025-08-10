'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Typography,
  Container,
  List,
  ListItem,
  ListItemText,
  Drawer,
  ListItemButton,
  Paper,
  TextField
} from '@mui/material';
import {
  AccountCircle as AccountCircleIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
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
  complianceContainerStyles,
  complianceTitleStyles,
  complianceSubtitleStyles,
  compliancePaperStyles,
  complianceFeatureTitleStyles,
  complianceFeatureDescriptionStyles,
  complianceListItemStyles,
} from '../styles';

const auditTrailMenu = [
  { name: 'Audit Trail', path: '/dashboard/auditor/audit-trail' },
  { name: 'License Configuration Tracking', path: '/dashboard/auditor/licenseConfig' },
  { name: 'Asset Status Documentation', path: '/dashboard/auditor/assetStatusDoc' },
  { name: 'Reporting & Export', path: '/dashboard/auditor/reportingExport' },
  { name: 'Compliance & Alerting', path: '/dashboard/auditor/complianceAlerting' },
  { name: 'Settings', path: '/dashboard/auditor/settings' }
];

const features = [
  {
    title: 'Compliance Checklist Templates',
    description:
      'Pre-define steps for software license audits, hardware disposal protocols, and data-protection reviews.',
  },
  {
    title: 'Rule-Based Alerts',
    description:
      'Trigger notifications when required documentation is missing or retention periods are about to expire.',
  },
  {
    title: 'Role-Based Access Controls',
    description:
      'Ensure auditors have read-only access to production systems, and that sensitive actions are logged and restricted.',
  },
];

export default function CompliancePage() {
  const [search, setSearch] = useState('');
  const currentPath = '/dashboard/auditor/complianceAlerting';

  const filteredFeatures = features.filter((feature) =>
    feature.title.toLowerCase().includes(search.toLowerCase()) ||
    feature.description.toLowerCase().includes(search.toLowerCase())
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
            Compliance & Alerting
          </Typography>
          <Box sx={headerRightSectionStyles}>
            <TextField
              variant="outlined"
              placeholder="Search compliance features"
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

        {/* Compliance Content */}
        <Container maxWidth="md" sx={complianceContainerStyles}>
          <Typography variant="h4" sx={complianceTitleStyles}>
            Compliance & Alerting
          </Typography>
          <Typography variant="subtitle1" sx={complianceSubtitleStyles}>
            Keeps the company aligned with internal policies and external regulations.
          </Typography>

          <Paper elevation={3} sx={compliancePaperStyles}>
            <List>
              {filteredFeatures.map((feature, index) => (
                <ListItem key={index} sx={complianceListItemStyles}>
                  <CheckCircleOutlineIcon color="primary" />
                  <div>
                    <Typography variant="h6" sx={complianceFeatureTitleStyles}>{feature.title}</Typography>
                    <Typography variant="body1" sx={complianceFeatureDescriptionStyles}>
                      {feature.description}
                    </Typography>
                  </div>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}