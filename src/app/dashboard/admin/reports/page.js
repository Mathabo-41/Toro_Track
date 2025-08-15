// features/admin/PerformanceReports/page.js
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Grid,
  Card,
  CardContent,
  Stack,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  IconButton
} from '@mui/material';
import {
  Assessment as ReportsIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  Timeline as TimelineIcon,
  People as PeopleIcon,
  Work as WorkIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Download as DownloadIcon
} from '@mui/icons-material';

import * as common from '../common/styles';
import * as styles from './styles';
import { useReports } from './useReports/page';

const adminMenu = [
  { name: 'Dashboard Overview', path: '/dashboard/admin/overview' },
  { name: 'Client Profiles', path: '/dashboard/admin/profiles' },
  { name: 'Projects', path: '/dashboard/admin/projects' },
  { name: 'Teams & Users', path: '/dashboard/admin/users' },
  { name: 'Permissions', path: '/dashboard/admin/permissions' },
  { name: 'Performance Reports', path: '/dashboard/admin/reports' },
  { name: 'Settings', path: '/dashboard/admin/settings' }
];

export default function PerformanceReportsPage() {
  const {
    metrics,
    metricsLoading,
    metricsError,
    activities,
    activitiesLoading,
    activitiesError,
    exportReport,
    exporting
  } = useReports();

  return (
    <Box sx={common.rootBox}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{ width: 240, '& .MuiDrawer-paper': common.drawerPaper }}
      >
        <Box sx={common.drawerHeader}>
          <Typography variant="h5">Admin Panel</Typography>
        </Box>
        <List>
          {adminMenu.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                component={Link}
                href={item.path}
                sx={
                  item.name === 'Performance Reports'
                    ? common.activeListItemButton
                    : common.listItemButton
                }
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main */}
      <Box component="main" sx={styles.reportsMainContentBox}>
        {/* Header */}
        <Box sx={common.pageHeader}>
          <Typography variant="h4" sx={styles.reportsPageHeaderText}>
            <ReportsIcon sx={styles.reportsPageHeaderIcon} />
            Performance Reports
          </Typography>
          <Typography variant="body1" sx={common.pageHeaderText}>
            Analytics and insights for your CRM system
          </Typography>
        </Box>

        {/* Metrics */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {!metricsLoading &&
            !metricsError &&
            Object.entries(metrics).map(([key, metric]) => (
              <Grid item xs={12} sm={6} md={4} key={key}>
                <Card sx={styles.reportsMetricCard}>
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between">
                      <Box>
                        <Typography
                          variant="body2"
                          sx={styles.reportsMetricTitle}
                        >
                          {metric.title}
                        </Typography>
                        <Typography
                          variant="h4"
                          sx={styles.reportsMetricValue}
                        >
                          {metric.value}
                        </Typography>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={0.5}
                          sx={styles.reportsTrend}
                        >
                          {metric.trend === 'up' ? (
                            <TrendingUpIcon
                              sx={styles.reportsTrendIconUp}
                              fontSize="small"
                            />
                          ) : (
                            <TrendingDownIcon
                              sx={styles.reportsTrendIconDown}
                              fontSize="small"
                            />
                          )}
                          <Typography
                            variant="body2"
                            sx={styles.reportsTrendText(metric.trend)}
                          >
                            {metric.change}
                          </Typography>
                        </Stack>
                      </Box>
                      <Avatar sx={styles.reportsMetricAvatar}>
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

        {/* Charts */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Card sx={styles.reportsChartCard}>
              <CardContent>
                <Typography
                  variant="h6"
                  sx={styles.reportsChartTitle}
                >
                  <PeopleIcon sx={styles.reportsPageHeaderIcon} />
                  Client Acquisition Trend
                </Typography>
                <Box sx={styles.reportsChartBox}>
                  <BarChartIcon sx={{ fontSize: 60 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={styles.reportsChartCard}>
              <CardContent>
                <Typography
                  variant="h6"
                  sx={styles.reportsChartTitle}
                >
                  <StarIcon sx={styles.reportsPageHeaderIcon} />
                  Revenue Breakdown
                </Typography>
                <Box sx={styles.reportsChartBox}>
                  <PieChartIcon sx={{ fontSize: 60 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Recent Activities */}
        <Card sx={styles.reportsRecentActivitiesCard}>
          <CardContent>
            <Typography
              variant="h6"
              sx={styles.reportsChartTitle}
            >
              <TimelineIcon sx={styles.reportsPageHeaderIcon} />
              Recent Client Activities
            </Typography>
            <TableContainer
              component={Paper}
              sx={styles.reportsTableContainer}
            >
              <Table stickyHeader>
                <TableHead sx={styles.reportsTableHeader}>
                  <TableRow>
                    {['Client', 'Activity', 'Date', 'Status'].map((h) => (
                      <TableCell
                        key={h}
                        sx={styles.reportsTableHeaderCell}
                      >
                        {h}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!activitiesLoading &&
                    !activitiesError &&
                    activities.map((row, i) => (
                      <TableRow
                        key={i}
                        hover
                        sx={styles.reportsTableRow}
                      >
                        <TableCell sx={styles.reportsTableCell}>
                          {row.client}
                        </TableCell>
                        <TableCell sx={styles.reportsTableCell}>
                          {row.activity}
                        </TableCell>
                        <TableCell sx={styles.reportsTableCell}>
                          {row.date}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={row.status}
                            sx={styles.reportsStatusChip(row.status)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Export Section */}
        <Card sx={styles.reportsExportCard}>
          <CardContent>
            <Typography
              variant="h6"
              sx={styles.reportsChartTitle}
            >
              <DownloadIcon sx={styles.reportsPageHeaderIcon} />
              Export Reports
            </Typography>
            <Stack direction="row" spacing={2}>
              {['csv', 'xlsx', 'pdf'].map((fmt) => (
                <Button
                  key={fmt}
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  sx={styles.reportsExportButton}
                  onClick={() => exportReport(fmt)}
                  disabled={exporting}
                >
                  Download {fmt.toUpperCase()}
                </Button>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
