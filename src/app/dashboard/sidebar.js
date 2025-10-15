// This file is the shared sidebar component for the admin dashboard.
'use client';

import { useState, useMemo, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
    Box, Drawer, List, ListItem, ListItemButton, 
    ListItemText, Typography, Button, Avatar 
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { getCurrentUserProfile } from '@/lib/userService';
import * as globalStyles from './styles';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const userProfile = await getCurrentUserProfile();
      setProfile(userProfile);
    };
    fetchProfile();
  }, []);

  const adminMenu = [
    { name: 'Dashboard Overview', path: '/dashboard/admin/overview' },
    { name: 'Projects', path: '/dashboard/admin/projects' },
    { name: 'Performance Reports', path: '/dashboard/admin/reports' },
    { name: 'Invite Users', path: '/dashboard/admin/users' },
    { name: 'Settings', path: '/dashboard/admin/settings' }
  ];

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <Drawer variant="permanent" anchor="left" sx={globalStyles.drawer}>
      <Box sx={globalStyles.drawerHeader}>
        <Avatar src="/toroLogo.jpg" variant="rounded" />
        <Typography variant="h5" sx={globalStyles.logoText}>
          Toro Track
        </Typography>
      </Box>

      <List sx={{ p: '1rem' }}>
        {adminMenu.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              component={Link}
              href={item.path}
              selected={pathname === item.path}
              sx={pathname === item.path ? globalStyles.activeListItemButton : globalStyles.listItemButton}
              onMouseEnter={() => router.prefetch(item.path)}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={globalStyles.sidebarFooter}>
        <Box sx={globalStyles.profileBox}>
          <Avatar src="/toroLogo.jpg" sx={{ border: '2px solid #f3722c' }} />
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={globalStyles.profileText}>
              {profile ? profile.full_name : 'Loading...'}
            </Typography>
            <Typography sx={globalStyles.profileEmailText}>
              {profile ? profile.email : '...'}
            </Typography>
          </Box>
        </Box>
        <Button 
          onClick={handleLogout}
          fullWidth
          variant="outlined"
          startIcon={<LogoutIcon />}
          sx={globalStyles.logoutButton}
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
}