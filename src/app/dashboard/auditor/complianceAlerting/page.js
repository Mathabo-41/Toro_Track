/* The file that combines the logic with the styles and displays it as a screen. 
Rendering takes place here to make the screen respond fast when it is being clicked*/
'use client';

import React from 'react';
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
  TextField,
  Grid
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
} from './styles';
import { useCompliance } from './useCompliance/page';

// Import global styles for layout and navigation
import * as globalStyles from '../common/styles';
import { useAuditorStore } from '../common/auditorStore';
import { auditorMenu } from '../common/auditorStore';

export default function CompliancePage() {
  const {
    auditTrailMenu,
    filteredFeatures,
    search,
    handleSearchChange,
    currentPath,
  } = useCompliance();

  return (
      <Box sx={globalStyles.rootBox}>
      {/* --- Sidebar Navigation --- */}
            <Drawer
             variant="permanent"
                anchor="left"
                sx={{ '& .MuiDrawer-paper': globalStyles.drawerPaper }}
              >
             <Box sx={globalStyles.drawerHeader}>
                <Typography variant="h5">Admin Portal</Typography>
             </Box>
                {auditorMenu.map((item) => (
                  <ListItem key={item.path} disablePadding>
                   <ListItemButton
                      component={Link}
                      href={item.path}
                      sx={globalStyles.listItemButton}
                   >
                  <ListItemText primary={item.name} />
                   </ListItemButton>
                  </ListItem>
          ))}       
      </Drawer>

      {/* Region: Main Content */}
      <Box component="main" sx={mainContentBoxStyles}>
        {/* Region: Header */}
        <Box sx={headerBoxStyles}>
          <Typography variant="h4" sx={pageTitleStyles}>
            Compliance & Alerting
          </Typography>
          <Box sx={headerRightSectionStyles}>
            <TextField
              variant="outlined"
              placeholder="Search compliance features"
              value={search}
              onChange={handleSearchChange}
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

        {/* Region: Compliance Content */}
        <Container maxWidth="md" sx={complianceContainerStyles}>
          <Paper elevation={3} sx={compliancePaperStyles}>
            <Grid container spacing={2}>
              {filteredFeatures.map((feature) => (
                <Grid item xs={12} sm={6} md={4} key={feature.title}>
                  <Box sx={complianceListItemStyles}>
                    <CheckCircleOutlineIcon color="primary" />
                    <Box>
                      <Typography variant="h6" sx={complianceFeatureTitleStyles}>{feature.title}</Typography>
                      <Typography variant="body1" sx={complianceFeatureDescriptionStyles}>
                        {feature.description}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}