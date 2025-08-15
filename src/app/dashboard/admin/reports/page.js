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

import {
  rootBox,
  drawerPaper,
  drawerHeader,
  listItemButton,
  mainContentBox,
  reportsPageHeaderIcon,
  reportsMainContentBox,
  reportsPageHeaderText,
  reportsMetricCard,
  reportsMetricTitle,
  reportsMetricValue,
  reportsTrend,
  reportsTrendIconUp,
  reportsTrendIconDown,
  reportsTrendText,
  reportsMetricAvatar,
  reportsChartCard,
  reportsChartTitle,
  reportsChartBox,
  reportsRecentActivitiesCard,
  reportsTableContainer,
  reportsTableHeader,
  reportsTableHeaderCell,
  reportsTableRow,
  reportsTableCell,
  reportsStatusChip,
  reportsExportCard,
  reportsExportButton,
  pageHeader
} from '../styles';

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
    <Box sx={rootBox}>
      {/* Sidebar Navigation - Dark olive green with light cream text */}
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
          <Typography variant="h5">
            Admin Panel
          </Typography>
        </Box>
        <List>
          {adminMenu.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton 
                component={Link} 
                href={item.path}
                sx={
                  item.name === 'Performance Reports' ? { ...listItemButton, backgroundColor: '#6b705c' } : listItemButton
                }
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content - Light cream background */}
      <Box component="main" sx={reportsMainContentBox}>
        {/* Page Header */}
        <Box sx={pageHeader}>
          <Typography variant="h4" sx={reportsPageHeaderText}>
            <ReportsIcon sx={reportsPageHeaderIcon} />
            Performance Reports
          </Typography>
          <Typography variant="body1" sx={reportsPageHeaderText}>
            Analytics and insights for your CRM system
          </Typography>
        </Box>

        {/* Key Metrics Cards - Light cream cards with dark gray borders */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {Object.entries(reportData).map(([key, metric], index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={reportsMetricCard}>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between">
                    <Box>
                      <Typography variant="body2" sx={reportsMetricTitle}>
                        {metric.title}
                      </Typography>
                      <Typography variant="h4" sx={reportsMetricValue}>
                        {metric.value}
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={0.5} sx={reportsTrend}>
                        {metric.trend === 'up' ? (
                          <TrendingUpIcon sx={reportsTrendIconUp} fontSize="small" />
                        ) : (
                          <TrendingDownIcon sx={reportsTrendIconDown} fontSize="small" />
                        )}
                        <Typography variant="body2" sx={reportsTrendText(metric.trend)}>
                          {metric.change}
                        </Typography>
                      </Stack>
                    </Box>
                    <Avatar sx={reportsMetricAvatar}>
                      {key.includes('Client') && <PeopleIcon />}
                      {key.includes('Project') && <WorkIcon />}
                      {key.includes('Revenue') && <StarIcon />}
                      {key.includes('Satisfaction') && <StarIcon />}
                      {key.includes('Performance') && <BarChartIcon />}
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
            <Card sx={reportsChartCard}>
              <CardContent>
                <Typography variant="h6" sx={reportsChartTitle}>
                  <PeopleIcon sx={reportsPageHeaderIcon} />
                  Client Acquisition Trend
                </Typography>
                <Box sx={reportsChartBox}>
                  <BarChartIcon sx={{ fontSize: 60, mb: 1 }} />
                  <Typography>Client Acquisition Chart</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Revenue Breakdown Chart */}
          <Grid item xs={12} md={6}>
            <Card sx={reportsChartCard}>
              <CardContent>
                <Typography variant="h6" sx={reportsChartTitle}>
                  <StarIcon sx={reportsPageHeaderIcon} />
                  Revenue Breakdown
                </Typography>
                <Box sx={reportsChartBox}>
                  <PieChartIcon sx={{ fontSize: 60, mb: 1 }} />
                  <Typography>Revenue Breakdown Chart</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Recent Activities */}
        <Card sx={reportsRecentActivitiesCard}>
          <CardContent>
            <Typography variant="h6" sx={reportsChartTitle}>
              <TimelineIcon sx={reportsPageHeaderIcon} />
              Recent Client Activities
            </Typography>
            <TableContainer component={Paper} sx={reportsTableContainer}>
              <Table>
                <TableHead>
                  <TableRow sx={reportsTableHeader}>
                    <TableCell sx={reportsTableHeaderCell}>Client</TableCell>
                    <TableCell sx={reportsTableHeaderCell}>Activity</TableCell>
                    <TableCell sx={reportsTableHeaderCell}>Date</TableCell>
                    <TableCell sx={reportsTableHeaderCell}>Status</TableCell>
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
                      sx={reportsTableRow}
                    >
                      <TableCell sx={reportsTableCell}>{row.client}</TableCell>
                      <TableCell sx={reportsTableCell}>{row.activity}</TableCell>
                      <TableCell sx={reportsTableCell}>{row.date}</TableCell>
                      <TableCell>
                        <Chip
                          label={row.status.replace('-', ' ')}
                          sx={reportsStatusChip(row.status)}
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
        <Card sx={reportsExportCard}>
          <CardContent>
            <Typography variant="h6" sx={reportsChartTitle}>
              <DownloadIcon sx={reportsPageHeaderIcon} />
              Export Reports
            </Typography>
            <Stack direction="row" spacing={2}>
              {['CSV', 'Excel', 'PDF'].map((format) => (
                <Button
                  key={format}
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  sx={reportsExportButton}
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