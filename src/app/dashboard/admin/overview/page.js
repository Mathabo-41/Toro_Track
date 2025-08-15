'use client';

import React from 'react';
import Link from 'next/link';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Drawer,
  ListItemButton
} from '@mui/material';
import {
  People as PeopleIcon,
  Assignment as ProjectsIcon,
  Groups as TeamsIcon,
  Timeline as ActivityIcon,
  TrendingUp as TrendUpIcon,
  TrendingDown as TrendDownIcon,
  Groups as GroupsIcon,
  AdminPanelSettings as AdminIcon
} from '@mui/icons-material';

import {
  rootBox,
  drawerPaper,
  drawerHeader,
  listItemButton,
  mainContentBox,
  pageHeader,
  pageHeaderText,
  summaryCard,
  avatarBox,
  metricValue,
  upTrend,
  downTrend,
  activityCard,
  quickActionsCard,
  quickActionsTitle,
  quickActionButton
} from '../admin_styles/styles.js'; 

/**
 * Admin Dashboard Overview Screen
 */

const adminMenu = [
  { name: 'Dashboard Overview', path: '/dashboard/admin/overview' },
  { name: 'Client Profiles', path: '/dashboard/admin/profiles' },
  { name: 'Projects', path: '/dashboard/admin/projects' },
  { name: 'Teams & Users', path: '/dashboard/admin/users' },
  { name: 'Permissions', path: '/dashboard/admin/permissions' },
  { name: 'Performance Reports', path: '/dashboard/admin/reports' },
  { name: 'Settings', path: '/dashboard/admin/settings' }
];

export default function AdminOverview() {
  const metrics = [
    {
      title: 'Total Clients',
      value: '248',
      change: '+12%',
      icon: <PeopleIcon color="primary" fontSize="large" />,
      trend: 'up'
    },
    {
      title: 'Active Projects',
      value: '56',
      change: '+5',
      icon: <ProjectsIcon color="secondary" fontSize="large" />,
      trend: 'up'
    },
    {
      title: 'Team Members',
      value: '34',
      change: '+3',
      icon: <TeamsIcon color="success" fontSize="large" />,
      trend: 'up'
    },
    {
      title: 'This Week Activity',
      value: '428',
      change: '18%',
      icon: <ActivityIcon color="info" fontSize="large" />,
      trend: 'up'
    }
  ];

  const activities = [
    { action: 'User completed project milestone', time: '2 hours ago' },
    { action: 'New client onboarded', time: '5 hours ago' },
    { action: 'Project deadline updated', time: '1 day ago' },
    { action: 'Team member added', time: '2 days ago' },
    { action: 'System update completed', time: '3 days ago' }
  ];

  return (
    <Box sx={rootBox}>
      {/* === SIDEBAR NAVIGATION === */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': drawerPaper
        }}
      >
        <Box sx={drawerHeader}>
          <Typography variant="h5">Admin Portal</Typography>
        </Box>
        <List>
          {adminMenu.map(({ name, path }, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton component={Link} href={path} sx={listItemButton}>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* === MAIN CONTENT === */}
      <Box component="main" sx={mainContentBox}>
        {/* Page Header */}
        <Box sx={pageHeader}>
          <Typography variant="h4" sx={pageHeaderText}>
            Dashboard Overview
          </Typography>
          <Typography variant="body1" sx={pageHeaderText}>
            Welcome back! Here's what's happening with your business today.
          </Typography>
        </Box>

        {/* Metrics Summary Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {metrics.map(({ title, value, change, icon, trend }, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={summaryCard}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={avatarBox}>
                      {icon}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {title}
                      </Typography>
                      <Stack direction="row" alignItems="baseline" spacing={1}>
                        <Typography variant="h4" component="div" sx={metricValue}>
                          {value}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={trend === 'up' ? upTrend : downTrend}
                        >
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
          {/* Recent Activity Feed */}
          <Grid item xs={12} md={8}>
            <Card sx={activityCard}>
              <CardContent>
                <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2, fontWeight: 700 }}>
                  Recent Activity
                </Typography>
                <List sx={{ maxHeight: 360, overflow: 'auto' }}>
                  {activities.map(({ action, time }, index) => (
                    <div key={index}>
                      <ListItem alignItems="flex-start" sx={{ color: 'text.secondary' }}>
                        <ListItemText
                          primary={
                            <Typography color="text.secondary">
                              {action}
                            </Typography>
                          }
                          secondary={
                            <Typography color="text.primary">
                              {time}
                            </Typography>
                          }
                        />
                      </ListItem>
                      {index < activities.length - 1 && <Divider variant="inset" component="li" />}
                    </div>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Quick Action Buttons */}
          <Grid item xs={12} md={4}>
            <Card sx={quickActionsCard}>
              <CardContent>
                <Typography variant="h6" sx={quickActionsTitle}>
                  Quick Actions
                </Typography>
                <Stack spacing={2}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<PeopleIcon />}
                    sx={quickActionButton}
                  >
                    Add New Client
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<ProjectsIcon />}
                    sx={quickActionButton}
                  >
                    Create Project
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<GroupsIcon />}
                    sx={quickActionButton}
                  >
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