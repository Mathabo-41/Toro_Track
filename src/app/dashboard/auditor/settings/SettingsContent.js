// ./auditor/settings/SettingsContent.js
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import {
  Box, Typography, List, ListItem, ListItemText, Drawer,
  ListItemButton, Stack, TextField, MenuItem, FormControlLabel,
  Checkbox, Button, IconButton
} from '@mui/material';
import { FormProvider, Controller } from 'react-hook-form';
import { Logout as LogoutIcon } from '@mui/icons-material';
import {
  mainContentBoxStyles, headerBoxStyles, pageTitleStyles,
  headerRightSectionStyles, searchFieldStyles, saveButton,
  settingsContainerStyles,
} from './styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Snackbar, Alert } from '@mui/material';

import { useSettings } from './useSettings/page';
import * as globalStyles from '../common/styles';
import { auditorMenu } from '../common/auditorStore';

export default function SettingsContent() {
  const {
    search, handleSearchChange, methods,
    handleSubmit, onSubmit, isLoading, isSubmitting,
  } = useSettings();

  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (isLoading) {
    return <Typography>Loading settings...</Typography>;
  }

  return (
    <Box sx={globalStyles.rootBox}>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{ '& .MuiDrawer-paper': globalStyles.drawerPaper }}
      >
        <Box sx={{ p: 1, borderBottom: '2px solid #6b705c', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Link href="/dashboard" passHref>
            <IconButton sx={{ color: 'green' }}><DashboardIcon /></IconButton>
          </Link>
          <Typography variant="h5" sx={{ color: '#fefae0'}}>Auditor Portal</Typography>
        </Box>
        <List>
          {auditorMenu.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton component={Link} href={item.path} sx={globalStyles.listItemButton}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: 'auto', p: 2, borderTop: '2px solid #6b705c' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1.5 }}>
                <Image src="/toroLogo.jpg" alt="User Profile" width={40} height={40} style={{ borderRadius: '50%', border: '2px solid #f3722c' }} />
                <Box sx={{ minWidth: 0 }}>
                    <Typography noWrap sx={{ fontWeight: '600', color: '#fefae0' }}>{currentUser?.email}</Typography>
                    <Typography variant="caption" noWrap sx={{ color: 'rgba(254, 250, 224, 0.7)' }}>Auditor</Typography>
                </Box>
            </Box>
            <Button onClick={handleLogout} fullWidth variant="outlined" startIcon={<LogoutIcon />} sx={{ color: '#fefae0', borderColor: '#fefae0', '&:hover': { background: '#6b705c' } }}>
                Logout
            </Button>
        </Box>
      </Drawer>

      <Box component="main" sx={mainContentBoxStyles}>
        <Box sx={headerBoxStyles}>
          <Typography variant="h4" sx={pageTitleStyles}>Auditor Settings</Typography>
          <Box sx={headerRightSectionStyles}>
            <TextField
              variant="outlined"
              placeholder="Search settings"
              value={search ?? ''}
              onChange={handleSearchChange}
              sx={searchFieldStyles}
            />
          </Box>
        </Box>

        <Box sx={settingsContainerStyles}>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <Stack spacing={2}>
                  <Typography variant="h6">Audit Trail & Event Capture</Typography>
                  <Controller name="audit.retentionPeriod" control={methods.control} render={({ field }) => (<TextField {...field} value={field.value ?? ''} label="Event Retention (days)" type="number" fullWidth />)} />
                  <Controller name="audit.immutableMode" control={methods.control} render={({ field }) => (<FormControlLabel control={<Checkbox {...field} checked={!!field.value} />} label="Enable Immutable Mode"/>)} />
                  <Controller name="audit.autoCapture.login" control={methods.control} render={({ field }) => (<FormControlLabel control={<Checkbox {...field} checked={!!field.value} />} label="Auto-capture Logins"/>)} />
                  <Controller name="audit.timezone" control={methods.control} render={({ field }) => (<TextField {...field} value={field.value ?? ''} select label="Timezone" fullWidth>{["UTC", "Local"].map((tz) => (<MenuItem key={tz} value={tz}>{tz}</MenuItem>))}</TextField>)} />
                </Stack>
                <Button variant="contained" type="submit" sx={saveButton} disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save Settings'}
                </Button>
              </Stack>
            </form>
          </FormProvider>
        </Box>
      </Box>
    </Box>
  );
}