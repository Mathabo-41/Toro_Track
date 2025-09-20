// This file handles all data-related tasks for this feature, 
// such as fetching and sending information to our database.

import {
  AdminPanelSettings as AdminIcon,
  Groups as TeamIcon,
  Person as PersonIcon,
  CheckCircle as FullIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
  Block as NoneIcon
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

// Permission level configurations
export const permissionLevelsData = [
  { value: 'Full', label: 'Full Access', icon: <FullIcon />, color: '#4caf50' },
  { value: 'Edit', label: 'Edit Access', icon: <EditIcon />, color: '#2196f3' },
  { value: 'View', label: 'View Access', icon: <ViewIcon />, color: '#9e9e9e' },
  { value: 'None', label: 'No Access', icon: <NoneIcon />, color: '#f44336' }
];

// Default role configurations with initial permissions
export const defaultRolesData = [
  { 
    name: 'Admin', 
    icon: <AdminIcon sx={{ color: '#f4c10f' }} />,
    permissions: {
      Projects: 'Full',
      Clients: 'Full',
      Team: 'Full',
      Settings: 'Full'
    }
  },
  { 
    name: 'Project Manager', 
    icon: <PersonIcon sx={{ color: '#2196f3' }} />,
    permissions: {
      Projects: 'Full',
      Clients: 'Edit',
      Team: 'Edit',
      Settings: 'View'
    }
  },
  { 
    name: 'Team Lead', 
    icon: <TeamIcon sx={{ color: '#4caf50' }} />,
    permissions: {
      Projects: 'Edit',
      Clients: 'View',
      Team: 'Edit',
      Settings: 'None'
    }
  },
  { 
    name: 'Member', 
    icon: <PersonIcon sx={{ color: '#9e9e9e' }} />,
    permissions: {
      Projects: 'View',
      Clients: 'View',
      Team: 'View',
      Settings: 'None'
    }
  },
  { 
    name: 'Client', 
    icon: <PersonIcon sx={{ color: '#ff9800' }} />,
    permissions: {
      Projects: 'View',
      Clients: 'None',
      Team: 'None',
      Settings: 'None'
    }
  }
];