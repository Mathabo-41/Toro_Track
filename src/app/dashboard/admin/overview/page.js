'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  Groups as GroupsIcon
} from '@mui/icons-material';

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

  // Function to handle the logout action
  const handleLogout = () => {
    // Add  logout logic here
    console.log('User logged out');
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh', 
      minWidth:'90vw',
      backgroundColor: '#fefae0'
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
            backgroundColor: '#283618',
            borderRight: '1px solid #222',
            color: '#fefae0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }
        }}
      >
        <Box>
          <Box sx={{ p: 2, borderBottom: '2px solid #6b705c', fontWeight: 'bold', color: '#fefae0'}}>
            <Typography variant="h5">
              Admin Portal
            </Typography>
          </Box>
          <List>
            {adminMenu.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton 
                  component={Link} 
                  href={item.path}
                  sx={{ 
                    color: '#fefae0',
                    '&:hover': {
                      backgroundColor: '#6b705c' 
                    }
                  }}
                >
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* User Profile Section  */}
        <Box sx={{ 
          borderTop: '2px solid #6b705c',
          padding: '1rem',
          marginTop: 'auto',
          backgroundColor: 'rgba(0, 0, 0, 0.1)'
        }}>
          {/* User profile picture and details */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '1rem',
            overflow: 'hidden',
            gap: '0.75rem'
          }}>
            <Box sx={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              overflow: 'hidden',
              position: 'relative',
              flexShrink: 0,
              border: '2px solid #f3722c'
            }}>
              <Image
                src="/toroLogo.jpg"
                alt="User Profile"
                fill
                style={{ objectFit: 'cover' }}
              />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ 
                fontWeight: '600', 
                margin: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                color: '#fefae0'
              }}>
                John Doe
              </Typography>
              <Typography sx={{ 
                fontSize: '0.8rem', 
                opacity: 0.8, 
                margin: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                color: 'rgba(254, 250, 224, 0.7)'
              }}>
                admin@toro.com
              </Typography>
            </Box>
          </Box>
          {/* Logout button */}
          <Button 
            onClick={handleLogout}
            fullWidth
            sx={{
              padding: '0.75rem',
              background: 'transparent',
              border: '1px solid #fefae0',
              borderRadius: '8px',
              color: '#fefae0',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: '600',
              '&:hover': {
                background: '#6b705c'
              }
            }}
          >
            Logout
          </Button>
        </Box>
      </Drawer>

      {/* === MAIN CONTENT === */}
      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: 3,
        width: '100%',
        backgroundColor: '#fefae0'
      }}>
        {/* Page Header */}
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4
        }}>
          <Box>
            <Typography variant="h4" sx={{ 
              color: '#525252',
              fontWeight: 500
            }}>
              Dashboard Overview
            </Typography>
            <Typography variant="body1" sx={{ color: '#525252' }}>
              Welcome back! Here's what's happening with your business today.
            </Typography>
          </Box>
        </Box>

        {/* Metrics Summary Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {metrics.map((metric, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ 
                backgroundColor: '#fefae0',
                height: '100%',
                border: '1px solid #302222ff',
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
                      border: '1px solid #6b705c'
                    }}>
                      {metric.icon}
                    </Avatar>
                    {/* Metric Info */}
                    <Box>
                      <Typography variant="body2" sx={{ color: '#525252' }}>
                        {metric.title}
                      </Typography>
                      <Stack direction="row" alignItems="baseline" spacing={1}>
                        <Typography variant="h4" component="div" sx={{ color: '#b71c1c' }}>
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
              backgroundColor: '#fefae0',
              border: '2px solid #6b705c'
            }}>
              <CardContent>
                <Typography variant="h6" sx={{ 
                  color: '#525252',
                  mb: 2,
                  fontWeight: 700
                }}>
                  Recent Activity
                </Typography>
                <List sx={{ maxHeight: 360, overflow: 'auto' }}>
                  {activities.map((activity, index) => (
                    <div key={index}>
                      <ListItem alignItems="flex-start" sx={{ color: '#525252' }}>
                        <ListItemText
                          primary={
                            <Typography sx={{ color: '#525252' }}>
                              {activity.action}
                            </Typography>
                          }
                          secondary={
                            <Typography sx={{ color: '#283618' }}>
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
              backgroundColor: '#283618',
              border: '1px solid #525252'
            }}>
              <CardContent>
                <Typography variant="h6" sx={{ 
                  color: '#fefae0',
                  mb: 2,
                  fontWeight: 500
                }}>
                  Quick Actions
                </Typography>
                <Stack spacing={2}>
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    startIcon={<PeopleIcon />}
                    sx={{
                      backgroundColor: '#283618',
                      borderColor: '#fefae0',
                      color: '#fefae0',
                      '&:hover': {
                        backgroundColor: 'rgba(244, 193, 15, 0.1)',
                        borderColor: '#fefae0'
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
                      color: '#fefae0',
                      borderColor: '#fefae0',
                      '&:hover': {
                        backgroundColor: 'rgba(244, 193, 15, 0.1)',
                        borderColor: '#fefae0'
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
                      color: '#fefae0',
                      borderColor: '#fefae0',
                      '&:hover': {
                       backgroundColor: 'rgba(244, 193, 15, 0.1)',
                       borderColor: '#fefae0'
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