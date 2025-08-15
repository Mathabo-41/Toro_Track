'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Drawer,
  ListItemButton,
  Paper,
  TextField
} from '@mui/material'
import { AccountCircle as AccountCircleIcon } from '@mui/icons-material'
import { useAuditorStore } from '../common/auditorStore'
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
  auditorTextStyles
} from '../common/styles'
import {
  assetStatusContainer,
  assetStatusTitle,
  assetStatusSubtitle,
  assetStatusPaper,
  assetStatusSectionTitle
} from './styles'
import {
  useAssetStatus,
  useDocuments,
  useDigitalSignatures
} from './useAssetStaDoc'

export default function AssetStatusPage() {
  const {
    currentPath,
    auditTrailMenu,
    searchQuery,
    setSearchQuery,
    setCurrentPath
  } = useAuditorStore()

  // Ensure sidebar highlights correct item
  useEffect(() => {
    setCurrentPath('/dashboard/auditor/assetStatusDoc')
  }, [setCurrentPath])

  // Fetch data
  const { data: statusData = [] } = useAssetStatus()
  const { data: documentsData = [] } = useDocuments()
  const { data: signaturesData = [] } = useDigitalSignatures()

  // Apply client-side filtering
  const filter = (text) => text.toLowerCase().includes(searchQuery.toLowerCase())
  const filteredStatus = statusData.filter(({ asset, status }) =>
    filter(asset) || filter(status)
  )
  const filteredDocs = documentsData.filter((name) =>
    filter(name)
  )
  const filteredSigs = signaturesData.filter(
    ({ client, status }) => filter(client) || filter(status)
  )

  return (
    <Box sx={fullScreenContainerStyles}>
      <Drawer variant="permanent" anchor="left" sx={drawerStyles}>
        <Box sx={drawerHeaderStyles}>
          <Typography variant="h5">Auditor Portal</Typography>
        </Box>
        <List>
          {auditTrailMenu.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={Link}
                href={item.path}
                selected={item.path === currentPath}
                sx={listItemButtonStyles(item.path, currentPath)}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={mainContentBoxStyles}>
        <Box sx={headerBoxStyles}>
          <Typography variant="h4" sx={pageTitleStyles}>
            Asset Status & Documentation
          </Typography>
          <Box sx={headerRightSectionStyles}>
            <TextField
              variant="outlined"
              placeholder="Search assets or documents"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

        <Box sx={assetStatusContainer}>
          <Typography variant="h4" sx={assetStatusTitle}>
            Asset Status & Documentation
          </Typography>
          <Typography variant="subtitle1" sx={assetStatusSubtitle}>
            Gives auditors a clear view of each asset’s lifecycle and associated paperwork.
          </Typography>

          <Paper elevation={2} sx={assetStatusPaper}>
            <Typography variant="h6" sx={assetStatusSectionTitle}>
              Status Dashboard
            </Typography>
            <List>
              {filteredStatus.map(({ id, asset, status }) => (
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
              {filteredDocs.map((doc, idx) => (
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
              {filteredSigs.map(({ client, date, status }, idx) => (
                <ListItem key={idx} divider>
                  <ListItemText
                    primary={`${client} – ${date}`}
                    secondary={`Signature Status: ${status}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </Box>
    </Box>
  )
}
