// We connect Supabase in this file to fetch the data for the project overview feature.
import { supabase } from '@/lib/supabaseClient';

export async function fetchMetrics() {
  // replace with real query
  return [
    // dummy until real fetch
    { title: 'Total Clients',     value: '248', change: '+12%', icon: 'PeopleIcon', trend: 'up' },
    {title: 'Active Projects', value: '56', change: '+5', icon: <ProjectsIcon color="secondary" fontSize="large" />, trend: 'up'},
    {title: 'This Week Activity', value: '428', change: '18%', icon: <ActivityIcon color="info" fontSize="large" />, trend: 'up'}
  ];
}

export async function fetchActivities() {
  // replace with real query
  return [
    { action: 'User completed milestone', time: '2 hours ago' },
    /* … */
  ];
}
