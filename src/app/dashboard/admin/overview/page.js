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

/**
 * Admin Dashboard Overview Screen
 */

// Sidebar navigation items for admin panel
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
  // Metrics data for dashboard cards
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

  // Recent activity list
  const activities = [
    { action: 'User completed project milestone', time: '2 hours ago' },
    { action: 'New client onboarded', time: '5 hours ago' },
    { action: 'Project deadline updated', time: '1 day ago' },
    { action: 'Team member added', time: '2 days ago' },
    { action: 'System update completed', time: '3 days ago' }
  ];

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh', 
      backgroundColor: '#000000' //  black background
    }}>
      {/* === SIDEBAR NAVIGATION === */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#000000', // Pure black
            borderRight: '1px solid #222', // Subtle border
           color: '#f4c10f' // Gold text
          }
        }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid #222' }}>
          <Typography variant="h6" >
            
            👑 Admin Panel
          </Typography>
        </Box>
        <List>
          {adminMenu.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton 
                component={Link} 
                href={item.path}
                sx={{ 
                  color: '#fff',
                  backgroundColor: item.name === 'Dashboard Overview' ? '#1a1a1a' : 'transparent',
                  '&:hover': {
                    backgroundColor: '#1a1a1a' // Darker background on hover
                  }
                }}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* === MAIN CONTENT === */}
      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: 3,
        backgroundColor: '#000000' // Pure black background
      }}>
        {/* Page Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ 
            color: '#fff',
            fontWeight: 500
          }}>
            Dashboard Overview
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Welcome back! Here's what's happening with your business today.
          </Typography>
        </Box>

        {/* Metrics Summary Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {metrics.map((metric, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ 
                backgroundColor: '#0a0a0a', // Dark card background
                height: '100%',
                border: '1px solid #222',
                '&:hover': {
                  boxShadow: '0px 4px 20px rgba(244, 193, 15, 0.1)'
                }
              }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    {/* Icon in Avatar */}
                    <Avatar sx={{ 
                      bgcolor: 'rgba(244, 193, 15, 0.1)', 
                      width: 56, 
                      height: 56,
                      border: '1px solid rgba(244, 193, 15, 0.3)'
                    }}>
                      {metric.icon}
                    </Avatar>
                    {/* Metric Info */}
                    <Box>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        {metric.title}
                      </Typography>
                      <Stack direction="row" alignItems="baseline" spacing={1}>
                        <Typography variant="h4" component="div" sx={{ color: '#fff' }}>
                          {metric.value}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ 
                            color: metric.trend === 'up' ? '#4caf50' : '#f44336',
                            display: 'flex', 
                            alignItems: 'center'
                          }}
                        >
                          {metric.trend === 'up' ? 
                            <TrendUpIcon fontSize="small" /> : 
                            <TrendDownIcon fontSize="small" />}
                          {metric.change}
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
            <Card sx={{ 
              backgroundColor: '#0a0a0a',
              border: '1px solid #222'
            }}>
              <CardContent>
                <Typography variant="h6" sx={{ 
                  color: '#fff',
                  mb: 2,
                  fontWeight: 500
                }}>
                  Recent Activity
                </Typography>
                <List sx={{ maxHeight: 360, overflow: 'auto' }}>
                  {activities.map((activity, index) => (
                    <div key={index}>
                      <ListItem alignItems="flex-start" sx={{ color: '#fff' }}>
                        <ListItemText
                          primary={
                            <Typography sx={{ color: '#fff' }}>
                              {activity.action}
                            </Typography>
                          }
                          secondary={
                            <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                              {activity.time}
                            </Typography>
                          }
                        />
                      </ListItem>
                      {index < activities.length - 1 && 
                        <Divider variant="inset" component="li" sx={{ backgroundColor: '#333' }} />}
                    </div>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Quick Action Buttons */}
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              backgroundColor: '#0a0a0a',
              border: '1px solid #222'
            }}>
              <CardContent>
                <Typography variant="h6" sx={{ 
                  color: '#fff',
                  mb: 2,
                  fontWeight: 500
                }}>
                  Quick Actions
                </Typography>
                <Stack spacing={2}>
                  <Button 
                    variant="contained" 
                    fullWidth 
                    startIcon={<PeopleIcon />}
                    sx={{
                      backgroundColor: '#f4c10f',
                      color: '#000',
                      '&:hover': {
                        backgroundColor: '#d1a20b'
                      }
                    }}
                  >
                    Add New Client
                  </Button>
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    startIcon={<ProjectsIcon />}
                    sx={{
                      color: '#f4c10f',
                      borderColor: '#f4c10f',
                      '&:hover': {
                        borderColor: '#d1a20b'
                      }
                    }}
                  >
                    Create Project
                  </Button>
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    startIcon={<GroupsIcon />}
                    sx={{
                      color: '#f4c10f',
                      borderColor: '#f4c10f',
                      '&:hover': {
                        borderColor: '#d1a20b'
                      }
                    }}
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