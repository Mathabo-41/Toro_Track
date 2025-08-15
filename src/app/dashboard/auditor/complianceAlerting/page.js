'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Box,
  Typography,
  List,
  ListItem,
  Drawer,
  ListItemButton,
  ListItemText,
  Paper,
  TextField,
  Container
} from '@mui/material'
import {
  AccountCircle as AccountCircleIcon,
  CheckCircleOutline as CheckCircleOutlineIcon
} from '@mui/icons-material'

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
  auditorTextStyles,
  complianceContainerStyles,
  complianceTitleStyles,
  complianceSubtitleStyles,
  compliancePaperStyles,
  complianceListItemStyles,
  complianceFeatureTitleStyles,
  complianceFeatureDescriptionStyles
} from './styles'
import { useCompliance } from './useCompliance'

export default function ComplianceAlertingPage() {
  const {
    currentPath,
    auditTrailMenu,
    setCurrentPath
  } = useAuditorStore()
  const [search, setSearch] = useState('')

  // Mark this route active in the sidebar
  useEffect(() => {
    setCurrentPath('/dashboard/auditor/complianceAlerting')
  }, [setCurrentPath])

  const { data: features = [], isLoading, isError } = useCompliance()

  const filtered = features.filter(f =>
    f.title.toLowerCase().includes(search.toLowerCase()) ||
    f.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Box sx={fullScreenContainerStyles}>
      {/* Sidebar */}
      <Drawer variant="permanent" anchor="left" sx={drawerStyles}>
        <Box sx={drawerHeaderStyles}>
          <Typography variant="h5">Auditor Portal</Typography>
        </Box>
        <List>
          {auditTrailMenu.map(item => (
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
              onChange={e => setSearch(e.target.value)}
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

        <Container maxWidth="md" sx={complianceContainerStyles}>
          <Typography variant="h4" sx={complianceTitleStyles}>
            Compliance & Alerting
          </Typography>
          <Typography variant="subtitle1" sx={complianceSubtitleStyles}>
            Keeps the company aligned with internal policies and external regulations.
          </Typography>

          <Paper elevation={3} sx={compliancePaperStyles}>
            <List>
              {isLoading && (
                <Typography align="center">Loading features…</Typography>
              )}
              {isError && (
                <Typography color="error" align="center">
                  Failed to load features
                </Typography>
              )}
              {!isLoading && !isError &&
                filtered.map((feature, idx) => (
                  <ListItem key={idx} sx={complianceListItemStyles}>
                    <CheckCircleOutlineIcon />
                    <div>
                      <Typography variant="h6" sx={complianceFeatureTitleStyles}>
                        {feature.title}
                      </Typography>
                      <Typography sx={complianceFeatureDescriptionStyles}>
                        {feature.description}
                      </Typography>
                    </div>
                  </ListItem>
                ))
              }
            </List>
          </Paper>
        </Container>
      </Box>
    </Box>
  )
}
