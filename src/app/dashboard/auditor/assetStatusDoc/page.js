/* The file that combines the logic with the styles and displays it as a screen. 
Rendering takes place here to make the screen respond fast when it is being clicked*/
'use client';

import React from 'react';
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
} from '@mui/material';
import { AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import useAssetStatusDoc from './useAssetStaDoc/page';
// Import global styles for layout and navigation
import * as globalStyles from '../common/styles';
import { useAuditorStore } from '../common/auditorStore';
import { auditorMenu } from '../common/auditorStore';

// Component for the sidebar
const Sidebar = ({ currentPath }) => {
  const { selectedMenu, setSelectedMenu } = useAuditorStore();
  
  return (
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
            onClick={() => setSelectedMenu(item.path)}
          >
            <ListItemText primary={item.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </Drawer>
  );
};

// Component for the header
const Header = () => {
  return (
    <Box sx={globalStyles.pageHeader}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4" sx={globalStyles.pageHeaderText}>
          Asset Status & Documentation
        </Typography>
        <Typography variant="subtitle1" sx={globalStyles.pageHeaderText}>
          Gives auditors a clear view of each asset’s lifecycle and associated paperwork.
        </Typography>
      </Box>
    </Box>
  );
};

// Component for a section with a list
const DataSection = ({ title, data, primaryKey, secondaryKey }) => (
  <Paper elevation={2} sx={globalStyles.assetStatusPaper}>
    <Typography variant="h6" sx={globalStyles.pageHeaderText}>
      {title}
    </Typography>
    <List>
      {data.map((item, idx) => (
        <ListItem key={idx} divider>
          <ListItemText
            primary={item[primaryKey]}
            secondary={secondaryKey ? `Current Status: ${item[secondaryKey]}` : null}
          />
        </ListItem>
      ))}
    </List>
  </Paper>
);

// Main page component
export default function AssetStatusDocumentation() {
  const {
    state,
    handlers,
    data
  } = useAssetStatusDoc();

  return (
    <Box sx={globalStyles.rootBox}>
      {/* Sidebar Navigation */}
      <Sidebar currentPath={state.currentPath} auditorMenu={data.auditorMenu} />

      {/* Main Content */}
      <Box component="main" sx={globalStyles.mainContentBox}>
        {/* Header */}
        <Header />

        {/* Content Section */}
        <Box sx={globalStyles.assetStatusPaper}>
          <DataSection
            title="Status Dashboard"
            data={state.filteredStatusData}
            primaryKey="asset"
            secondaryKey="status"
          />
          <DataSection
            title="Document Attachment Support"
            data={state.filteredDocumentsData.map(doc => ({ primaryKey: doc }))}
            primaryKey="primaryKey"
          />
          <DataSection
            title="Digital Signature Capture"
            data={state.filteredSignatures.map(sig => ({
              primaryKey: `${sig.client} - ${sig.date}`,
              secondaryKey: sig.status
            }))}
            primaryKey="primaryKey"
            secondaryKey="secondaryKey"
          />
        </Box>
      </Box>
    </Box>
  );
}