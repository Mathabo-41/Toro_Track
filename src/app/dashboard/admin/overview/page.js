/* The file that combines the logic with the styles and displays it as a screen. 
Rendering takes place here to make the screen respond fast when it is being clicked*/
'use client';

import React from 'react';
import Link from 'next/link';
import {
  Box, Typography, Grid, Card, CardContent,
  Stack, Avatar, List, ListItem, ListItemText,
  Divider, Button, Drawer, ListItemButton
} from '@mui/material';
import {
  People as PeopleIcon,
  Assignment as ProjectsIcon,
  Groups as TeamsIcon,
  Timeline as ActivityIcon,
  TrendingUp as TrendUpIcon,
  TrendingDown as TrendDownIcon
} from '@mui/icons-material';

import useOverview from './useOverview/page';
import { useAdminStore, adminMenu } from '../common/adminStore';
import * as globalStyles from '../common/styles';
import * as styles      from './styles';

export default function AdminOverviewPage() {
  const { metrics, activities } = useOverview();
  const { selectedMenu, setSelectedMenu } = useAdminStore();

  return (
    <Box sx={globalStyles.rootBox}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{ '& .MuiDrawer-paper': globalStyles.drawerPaper }}
      >
        <Box sx={globalStyles.drawerHeader}>
          <Typography variant="h5">Admin Portal</Typography>
        </Box>
        {adminMenu.map((item) => (
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

      {/* Main Content */}
      <Box component="main" sx={globalStyles.mainContentBox}>
        <Box sx={globalStyles.pageHeader}>
          <Typography variant="h4" sx={globalStyles.pageHeaderText}>
            Dashboard Overview
          </Typography>
          <Typography variant="body1" sx={globalStyles.pageHeaderText}>
            Welcome back! Here’s what’s happening today.
          </Typography>
        </Box>

        {/* Metrics */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {metrics.map(({ title, value, change, icon, trend }, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Card sx={styles.summaryCard}>
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={styles.avatarBox}>{icon}</Avatar>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {title}
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="baseline">
                        <Typography variant="h4" sx={styles.metricValue}>{value}</Typography>
                        <Typography sx={trend === 'up' ? styles.upTrend : styles.downTrend}>
                          {trend === 'up' ? <TrendUpIcon fontSize="small" /> : <TrendDownIcon fontSize="small" />}
                          {change}
                        </Typography>
                      </Stack>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Activity + Quick Actions */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={styles.activityCard}>
              <CardContent>
                <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2, fontWeight: 700 }}>
                  Recent Activity
                </Typography>
                <List>
                  {activities.map(({ action, time }, i) => (
                    <React.Fragment key={i}>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={<Typography color="text.secondary">{action}</Typography>}
                          secondary={<Typography color="text.primary">{time}</Typography>}
                        />
                      </ListItem>
                      {i < activities.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={styles.quickActionsCard}>
              <CardContent>
                <Typography variant="h6" sx={styles.quickActionsTitle}>
                  Quick Actions
                </Typography>
                <Stack spacing={2}>
                  <Button variant="outlined" fullWidth startIcon={<PeopleIcon />} sx={styles.quickActionButton}>
                    Add New Client
                  </Button>
                  <Button variant="outlined" fullWidth startIcon={<ProjectsIcon />} sx={styles.quickActionButton}>
                    Create Project
                  </Button>
                  <Button variant="outlined" fullWidth startIcon={<TeamsIcon />} sx={styles.quickActionButton}>
                    Invite Team Member
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
