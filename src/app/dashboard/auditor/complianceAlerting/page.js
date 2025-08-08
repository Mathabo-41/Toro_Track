'use client';

import React, { useState } from 'react';
import {
  Container,
  List,
  ListItemIcon,
  Grid,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import {
  ComplianceContainer,
  ComplianceTitle,
  ComplianceSubtitle,
  CompliancePaper,
  ComplianceFeatureTitle,
  ComplianceFeatureDescription,
  ComplianceListItem,
  ComplianceTitleBar,
  ComplianceTitleText,
  ComplianceSearchInput,
} from '../styles'; 

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

  return (
    <ComplianceContainer>
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
            <ComplianceTitleText>Compliance & Alerting</ComplianceTitleText>
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

      {/* Main Content */}
      <Container maxWidth="md">
        <ComplianceTitle>Compliance & Alerting</ComplianceTitle>
        <ComplianceSubtitle>
          Keeps the company aligned with internal policies and external regulations.
        </ComplianceSubtitle>

        <CompliancePaper elevation={3}>
          <List>
            {features.map((feature, index) => (
              <ComplianceListItem key={index}>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color="primary" />
                </ListItemIcon>
                <div>
                  <ComplianceFeatureTitle>{feature.title}</ComplianceFeatureTitle>
                  <ComplianceFeatureDescription>
                    {feature.description}
                  </ComplianceFeatureDescription>
                </div>
              </ComplianceListItem>
            ))}
          </List>
        </CompliancePaper>
      </Container>
    </ComplianceContainer>
  );
}
