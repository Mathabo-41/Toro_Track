'use client';

import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
  Grid,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';
import {
  Assessment as ReportsIcon,
  Download as DownloadIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  Timeline as TimelineIcon,
  People as PeopleIcon,
  Work as WorkIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon
} from '@mui/icons-material';
import Link from 'next/link';

/**
 * Admin Performance Reports Screen
 * Displays analytics and performance metrics for the CRM system
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

// Sample report data for a CRM system
const reportData = {
  clientAcquisition: {
    title: 'Client Acquisition',
    value: '24',
    change: '+5 from last quarter',
    trend: 'up'
  },
  projectCompletion: {
    title: 'Project Completion Rate',
    value: '82%',
    change: '+7% from last quarter',
    trend: 'up'
  },
  clientRetention: {
    title: 'Client Retention',
    value: '91%',
    change: '+3% from last quarter',
    trend: 'up'
  },
  revenueGrowth: {
    title: 'Revenue Growth',
    value: '18%',
    change: '+4% from last quarter',
    trend: 'up'
  },
  satisfactionScores: {
    title: 'Satisfaction Scores',
    value: '4.7/5',
    change: '+0.2 from last quarter',
    trend: 'up'
  },
  teamPerformance: {
    title: 'Team Performance',
    value: '88%',
    change: '+5% from last quarter',
    trend: 'up'
  }
};

export default function PerformanceReports() {
  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh', 
      backgroundColor: '#000000', // Pure black background
      color: 'rgba(255, 255, 255, 0.92)' // High contrast text
    }}>
      {/* Sidebar Navigation - Pure black with subtle border */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#000000',
            borderRight: '1px solid #222', // Subtle dark border
            color: '#fff'
          }
        }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid #222' }}>
          <Typography variant="h6" sx={{ color: '#fff' }}>
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
                  backgroundColor: item.name === 'Performance Reports' ? '#1a1a1a' : 'transparent',
                  '&:hover': {
                    backgroundColor: '#1a1a1a'
                  }
                }}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content - Pure black background */}
      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: 3,
        backgroundColor: '#000000'
      }}>
        {/* Page Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ 
            color: '#fff',
            fontWeight: 500
          }}>
            <ReportsIcon sx={{ 
              mr: 1, 
              verticalAlign: 'middle',
              color: '#f4c10f' // Gold accent
            }} />
            Performance Reports
          </Typography>
          <Typography variant="body1" sx={{ 
            color: 'rgba(255, 255, 255, 0.8)' // Slightly muted white
          }}>
            Analytics and insights for your CRM system
          </Typography>
        </Box>

        {/* Key Metrics Cards - Dark gray cards for contrast */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {Object.entries(reportData).map(([key, metric], index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ 
                backgroundColor: '#0a0a0a', // Very dark gray
                height: '100%',
                border: '1px solid #222', // Subtle border
                '&:hover': {
                  borderColor: '#f4c10f' // Gold border on hover
                }
              }}>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between">
                    <Box>
                      <Typography variant="body2" sx={{ 
                        color: 'rgba(255, 255, 255, 0.7)' 
                      }}>
                        {metric.title}
                      </Typography>
                      <Typography variant="h4" sx={{ 
                        color: '#fff', 
                        my: 1,
                        fontWeight: 500
                      }}>
                        {metric.value}
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        {metric.trend === 'up' ? (
                          <TrendingUpIcon color="success" fontSize="small" />
                        ) : (
                          <TrendingDownIcon color="error" fontSize="small" />
                        )}
                        <Typography variant="body2" sx={{ 
                          color: metric.trend === 'up' ? '#4caf50' : '#f44336'
                        }}>
                          {metric.change}
                        </Typography>
                      </Stack>
                    </Box>
                    <Avatar sx={{ 
                      bgcolor: 'rgba(244, 193, 15, 0.1)', // Gold tint
                      width: 56,
                      height: 56,
                      border: '1px solid rgba(244, 193, 15, 0.3)' // Gold border
                    }}>
                      {key.includes('Client') && <PeopleIcon color="primary" />}
                      {key.includes('Project') && <WorkIcon color="secondary" />}
                      {key.includes('Revenue') && <StarIcon color="success" />}
                      {key.includes('Satisfaction') && <StarIcon color="warning" />}
                      {key.includes('Performance') && <BarChartIcon color="info" />}
                    </Avatar>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Report Visualization Section */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Client Acquisition Chart */}
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              backgroundColor: '#0a0a0a',
              height: '100%',
              border: '1px solid #222'
            }}>
              <CardContent>
                <Typography variant="h6" sx={{ 
                  color: '#fff', 
                  mb: 2,
                  fontWeight: 500
                }}>
                  <PeopleIcon sx={{ 
                    mr: 1, 
                    verticalAlign: 'middle',
                    color: '#f4c10f'
                  }} />
                  Client Acquisition Trend
                </Typography>
                <Box sx={{ 
                  height: '300px', 
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'rgba(255, 255, 255, 0.5)',
                  border: '1px dashed rgba(255, 255, 255, 0.2)',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(30, 30, 30, 0.3)' // Slightly lighter than card
                }}>
                  <BarChartIcon sx={{ fontSize: 60, mb: 1 }} />
                  <Typography>Client Acquisition Chart</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Revenue Breakdown Chart */}
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              backgroundColor: '#0a0a0a',
              height: '100%',
              border: '1px solid #222'
            }}>
              <CardContent>
                <Typography variant="h6" sx={{ 
                  color: '#fff', 
                  mb: 2,
                  fontWeight: 500
                }}>
                  <StarIcon sx={{ 
                    mr: 1, 
                    verticalAlign: 'middle',
                    color: '#f4c10f'
                  }} />
                  Revenue Breakdown
                </Typography>
                <Box sx={{ 
                  height: '300px', 
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'rgba(255, 255, 255, 0.5)',
                  border: '1px dashed rgba(255, 255, 255, 0.2)',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(30, 30, 30, 0.3)'
                }}>
                  <PieChartIcon sx={{ fontSize: 60, mb: 1 }} />
                  <Typography>Revenue Breakdown Chart</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Recent Activities */}
        <Card sx={{ 
          backgroundColor: '#0a0a0a',
          mb: 3,
          border: '1px solid #222'
        }}>
          <CardContent>
            <Typography variant="h6" sx={{ 
              color: '#fff', 
              mb: 2,
              fontWeight: 500
            }}>
              <TimelineIcon sx={{ 
                mr: 1, 
                verticalAlign: 'middle',
                color: '#f4c10f'
              }} />
              Recent Client Activities
            </Typography>
            <TableContainer component={Paper} sx={{ 
              backgroundColor: 'transparent',
              border: '1px solid #222'
            }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#fff' }}>Client</TableCell>
                    <TableCell sx={{ color: '#fff' }}>Activity</TableCell>
                    <TableCell sx={{ color: '#fff' }}>Date</TableCell>
                    <TableCell sx={{ color: '#fff' }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { client: 'Acme Corp', activity: 'Project milestone completed', date: '2023-11-15', status: 'completed' },
                    { client: 'Law Firm Inc', activity: 'New feature request', date: '2023-11-14', status: 'pending' },
                    { client: 'Toro Informatics', activity: 'Quarterly review meeting', date: '2023-11-12', status: 'completed' },
                    { client: 'Umbrella Corp', activity: 'Contract renewal', date: '2023-11-10', status: 'in-progress' },
                    { client: 'Wayne Enterprises', activity: 'Initial consultation', date: '2023-11-08', status: 'completed' }
                  ].map((row, index) => (
                    <TableRow 
                      key={index} 
                      hover 
                      sx={{ 
                        '&:hover': { 
                          backgroundColor: '#1a1a1a' 
                        }
                      }}
                    >
                      <TableCell sx={{ color: '#fff' }}>{row.client}</TableCell>
                      <TableCell sx={{ color: '#fff' }}>{row.activity}</TableCell>
                      <TableCell sx={{ color: '#fff' }}>{row.date}</TableCell>
                      <TableCell>
                        <Chip
                          label={row.status.replace('-', ' ')}
                          sx={{
                            backgroundColor: 
                              row.status === 'completed' ? 'rgba(46, 125, 50, 0.2)' :
                              row.status === 'pending' ? 'rgba(97, 97, 97, 0.2)' : 'rgba(2, 136, 209, 0.2)',
                            color: 
                              row.status === 'completed' ? '#81c784' :
                              row.status === 'pending' ? '#bdbdbd' : '#4fc3f7',
                            border: 
                              row.status === 'completed' ? '1px solid #2e7d32' :
                              row.status === 'pending' ? '1px solid #616161' : '1px solid #0288d1',
                            textTransform: 'capitalize'
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Data Export Section */}
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
              <DownloadIcon sx={{ 
                mr: 1, 
                verticalAlign: 'middle',
                color: '#f4c10f'
              }} />
              Export Reports
            </Typography>
            <Stack direction="row" spacing={2}>
              {['CSV', 'Excel', 'PDF'].map((format) => (
                <Button
                  key={format}
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  sx={{
                    color: '#f4c10f',
                    borderColor: '#f4c10f',
                    '&:hover': {
                      backgroundColor: 'rgba(244, 193, 15, 0.1)',
                      borderColor: '#ffd700'
                    }
                  }}
                >
                  Download {format}
                </Button>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}