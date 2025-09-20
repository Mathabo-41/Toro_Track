// This file handles all data-related tasks for this feature, such as fetching and sending information to our database.

import {
  Notifications as NotificationsIcon,
  Palette as PaletteIcon,
  Security as SecurityIcon,
  Link as LinkIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

// Static data for the sidebar navigation menu
export const adminMenuData = [
  { name: 'Dashboard Overview', path: '/dashboard/admin/overview' },
  { name: 'Client Profiles', path: '/dashboard/admin/profiles' },
  { name: 'Projects', path: '/dashboard/admin/projects' },
  { name: 'Teams & Users', path: '/dashboard/admin/users' },
  { name: 'Performance Reports', path: '/dashboard/admin/reports' },
  { name: 'Settings', path: '/dashboard/admin/settings' }
];

// Sample data for settings categories
export const settingsCategoriesData = [
  {
    name: 'Notifications',
    description: 'Configure email and in-app notifications',
    icon: <NotificationsIcon color="primary" />,
    status: 'active'
  },
  {
    name: 'Theme',
    description: 'Change color scheme and appearance',
    icon: <PaletteIcon color="secondary" />,
    status: 'active'
  },
  {
    name: 'Security',
    description: 'Password policies and authentication',
    icon: <SecurityIcon color="success" />,
    status: 'active'
  },
  {
    name: 'Integrations',
    description: 'Connect with other tools',
    icon: <LinkIcon color="warning" />,
    status: 'pending'
  },
  {
    name: 'Data Management',
    description: 'Backup and restore system data',
    icon: <SettingsIcon color="info" />,
    status: 'active'
  },
  {
    name: 'API Configuration',
    description: 'Manage API keys and endpoints',
    icon: <SettingsIcon color="error" />,
    status: 'inactive'
  }
];