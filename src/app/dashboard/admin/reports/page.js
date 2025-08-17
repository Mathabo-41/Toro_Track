/* The file that combines the logic with the styles and displays it as a screen. 
Rendering takes place here to make the screen respond fast when it is being clicked*/
'use client';

import React from 'react';
import Link from 'next/link';
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
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Star as StarIcon, 
  TrendingDown as TrendingDownIcon
} from '@mui/icons-material';

// Import local files
import { styles } from './styles';
import { useReports } from './useReports/page';

// Main Component
// ------------------------------------------------
export default function PerformanceReports() {
  // Region: Hooks and State
  // ------------------------------------------------
  const { reports, activities, menu, handleExport } = useReports();

  // Region: Render
  // ------------------------------------------------
  return (
    <Box sx={styles.mainContainer}>
      {/* Sidebar Navigation */}
      <Drawer variant="permanent" anchor="left" sx={styles.sidebarDrawer}>
        <Box sx={styles.sidebarHeader}>
          <Typography variant="h5" sx={{ color: '#fefae0' }}>
            Admin Panel
          </Typography>
        </Box>
        <List>
          {menu.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={Link}
                href={item.path}
                sx={styles.sidebarListItemButton(item.name)}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={styles.mainContent}>
        {/* Page Header */}
        <Box sx={styles.pageHeader}>
          <Typography variant="h4" sx={styles.pageTitle}>
            <ReportsIcon sx={styles.headerIcon} />
            Performance Reports
          </Typography>
          <Typography variant="body1" sx={styles.pageSubtitle}>
            Analytics and insights for your CRM system
          </Typography>
        </Box>

        {/* Key Metrics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {Object.entries(reports).map(([key, metric], index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={styles.metricCard}>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between">
                    <Box>
                      <Typography variant="body2" sx={{ color: '#525252' }}>
                        {metric.title}
                      </Typography>
                      <Typography variant="h4" sx={styles.metricValue}>
                        {metric.value}
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        {metric.trend === 'up' ? (
                          <TrendingUpIcon sx={styles.trendIcon('up')} fontSize="small" />
                        ) : (
                          <TrendingDownIcon sx={styles.trendIcon('down')} fontSize="small" />
                        )}
                        <Typography variant="body2" sx={styles.trendIcon(metric.trend)}>
                          {metric.change}
                        </Typography>
                      </Stack>
                    </Box>
                    <Avatar sx={styles.metricAvatar}>
                      {metric.icon}
                    </Avatar>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Report Visualization Section */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Card sx={styles.chartCard}>
              <CardContent>
                <Typography variant="h6" sx={styles.chartTitle}>
                  <PeopleIcon sx={styles.headerIcon} />
                  Client Acquisition Trend
                </Typography>
                <Box sx={styles.dummyChartBox}>
                  <BarChartIcon sx={{ fontSize: 60, mb: 1 }} />
                  <Typography>Client Acquisition Chart</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={styles.chartCard}>
              <CardContent>
                <Typography variant="h6" sx={styles.chartTitle}>
                  <StarIcon sx={styles.headerIcon} />
                  Revenue Breakdown
                </Typography>
                <Box sx={styles.dummyChartBox}>
                  <PieChartIcon sx={{ fontSize: 60, mb: 1 }} />
                  <Typography>Revenue Breakdown Chart</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Recent Activities */}
        <Card sx={styles.activityCard}>
          <CardContent>
            <Typography variant="h6" sx={styles.chartTitle}>
              <TimelineIcon sx={styles.headerIcon} />
              Recent Client Activities
            </Typography>
            <TableContainer component={Paper} sx={styles.activityTableContainer}>
              <Table>
                <TableHead>
                  <TableRow sx={styles.activityTableHead}>
                    <TableCell sx={styles.activityTableHeaderCell}>Client</TableCell>
                    <TableCell sx={styles.activityTableHeaderCell}>Activity</TableCell>
                    <TableCell sx={styles.activityTableHeaderCell}>Date</TableCell>
                    <TableCell sx={styles.activityTableHeaderCell}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {activities.map((row, index) => (
                    <TableRow
                      key={index}
                      hover
                      sx={styles.activityTableRow}
                    >
                      <TableCell sx={styles.activityTableCell}>{row.client}</TableCell>
                      <TableCell sx={styles.activityTableCell}>{row.activity}</TableCell>
                      <TableCell sx={styles.activityTableCell}>{row.date}</TableCell>
                      <TableCell>
                        <Chip
                          label={row.status.replace('-', ' ')}
                          sx={styles.statusChip(row.status)}
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
        <Card sx={styles.exportCard}>
          <CardContent>
            <Typography variant="h6" sx={styles.chartTitle}>
              <DownloadIcon sx={styles.headerIcon} />
              Export Reports
            </Typography>
            <Stack direction="row" spacing={2}>
              {['CSV', 'Excel', 'PDF'].map((format) => (
                <Button
                  key={format}
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={() => handleExport(format)}
                  sx={styles.exportButton}
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