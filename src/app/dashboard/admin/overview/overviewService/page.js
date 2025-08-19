// This file handles all data-related tasks for this feature, 
// such as fetching and sending information to our database.
import { supabase } from '@/lib/supabaseClient';
import {
  People as PeopleIcon,
  Assignment as ProjectsIcon,
  Groups as TeamsIcon,
  Timeline as ActivityIcon,
  TrendingUp as TrendUpIcon,
  TrendingDown as TrendDownIcon
} from '@mui/icons-material';

// Hardcode
export async function fetchMetrics() {
  return [
    { title: 'Total Clients', value: '248', change: '+12%', icon: <PeopleIcon color="primary" fontSize="large" />, trend: 'up' },
    { title: 'Active Projects', value: '56', change: '+5', icon: <ProjectsIcon color="secondary" fontSize="large" />, trend: 'up' },
    { title: 'Team Members', value: '34', change: '+3', icon: <TeamsIcon color="success" fontSize="large" />, trend: 'up' },
    { title: 'This Week Activity', value: '428', change: '18%', icon: <ActivityIcon color="info" fontSize="large" />, trend: 'up' }
  ];
}

export async function fetchActivities() {
  return [
    { action: 'User completed project milestone', time: '2 hours ago' },
    { action: 'New client onboarded', time: '5 hours ago' },
    { action: 'Project deadline updated', time: '1 day ago' },
    { action: 'Team member added', time: '2 days ago' },
    { action: 'System update completed', time: '3 days ago' }
  ];
}