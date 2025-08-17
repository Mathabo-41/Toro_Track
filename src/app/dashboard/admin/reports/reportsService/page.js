// This file handles all data-related tasks for this feature, such as fetching and sending information to our database.

import {
  People as PeopleIcon,
  Work as WorkIcon,
  Star as StarIcon,
  BarChart as BarChartIcon
} from '@mui/icons-material';

// Static data for the sidebar navigation menu
export const adminMenuData = [
  { name: 'Dashboard Overview', path: '/dashboard/admin/overview' },
  { name: 'Client Profiles', path: '/dashboard/admin/profiles' },
  { name: 'Projects', path: '/dashboard/admin/projects' },
  { name: 'Teams & Users', path: '/dashboard/admin/users' },
  { name: 'Permissions', path: '/dashboard/admin/permissions' },
  { name: 'Performance Reports', path: '/dashboard/admin/reports' },
  { name: 'Settings', path: '/dashboard/admin/settings' }
];

// Sample report data for key metrics
export const reportMetricsData = {
  clientAcquisition: {
    title: 'Client Acquisition',
    value: '24',
    change: '+5 from last quarter',
    trend: 'up',
    icon: <PeopleIcon />
  },
  projectCompletion: {
    title: 'Project Completion Rate',
    value: '82%',
    change: '+7% from last quarter',
    trend: 'up',
    icon: <WorkIcon />
  },
  clientRetention: {
    title: 'Client Retention',
    value: '91%',
    change: '+3% from last quarter',
    trend: 'up',
    icon: <PeopleIcon />
  },
  revenueGrowth: {
    title: 'Revenue Growth',
    value: '18%',
    change: '+4% from last quarter',
    trend: 'up',
    icon: <StarIcon />
  },
  satisfactionScores: {
    title: 'Satisfaction Scores',
    value: '4.7/5',
    change: '+0.2 from last quarter',
    trend: 'up',
    icon: <StarIcon />
  },
  teamPerformance: {
    title: 'Team Performance',
    value: '88%',
    change: '+5% from last quarter',
    trend: 'up',
    icon: <BarChartIcon />
  }
};

// Sample recent client activity data
export const recentActivitiesData = [
  { client: 'Acme Corp', activity: 'Project milestone completed', date: '2023-11-15', status: 'completed' },
  { client: 'Law Firm Inc', activity: 'New feature request', date: '2023-11-14', status: 'pending' },
  { client: 'Toro Informatics', activity: 'Quarterly review meeting', date: '2023-11-12', status: 'completed' },
  { client: 'Umbrella Corp', activity: 'Contract renewal', date: '2023-11-10', status: 'in-progress' },
  { client: 'Wayne Enterprises', activity: 'Initial consultation', date: '2023-11-08', status: 'completed' }
];