// ./auditor/settings/SettingsContent.js
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createSupabaseClient } from '@/lib/supabase/client';
import {
  Box, Typography, List, ListItem, ListItemText, Drawer,
  ListItemButton, Stack, TextField, MenuItem, FormControlLabel,
  Checkbox, Button, IconButton, useTheme, useMediaQuery, Tooltip, AppBar, Toolbar
} from '@mui/material';
import { FormProvider, Controller } from 'react-hook-form';
import { Logout as LogoutIcon, Menu as MenuIcon } from '@mui/icons-material';
import {
  mainContentBoxStyles, headerBoxStyles, pageTitleStyles,
  headerRightSectionStyles, searchFieldStyles, saveButton,
  settingsContainerStyles,
} from './styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Snackbar, Alert } from '@mui/material';

import LoadingScreen from '../common/LoadingScreen';

import { useSettings } from './useSettings/useSettings';
import * as globalStyles from '../common/styles';
import { auditorMenu } from '../common/auditorStore';

const drawerWidth = 260; // Define drawer width

export default function SettingsContent() {
  const supabase = createSupabaseClient();
  const {
    search, handleSearchChange, methods,
    handleSubmit, onSubmit, isLoading, isSubmitting,
  } = useSettings();

  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  // state for snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Responsive drawer state
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        setCurrentUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [supabase.auth]);

  /*
    Logout with Snackbar effect
  */
  const handleLogout = async () => {
    setOpenSnackbar(true);
    setTimeout(async () => {
      try {
        await supabase.auth.signOut();
        router.push('/login');
      } catch (error) {
        console.error("Error during logout:", error);
      }
    }, 1500);
  };

  // If the component is fetching internal data, display the consistent, styled loading screen.
  if (isLoading) {
    return <LoadingScreen message="Loading settings configuration..." />;
  }

  // Reusable Sidebar Content
  const drawerContent = (
    <>
      <Box sx={{ p: 1, borderBottom: '2px solid #6b705c', display: 'flex', alignItems: 'center', gap: 1 }}>
        <Tooltip title="Go to Audit Trail" arrow>
          <Link href="/dashboard/auditor/audit-trail" passHref>
            <IconButton sx={{ color: 'green' }} aria-label="Go to Dashboard">
              <DashboardIcon />
            </IconButton>
          </Link>
        </Tooltip>
        <Typography variant="h5" sx={{ color: '#fefae0' }}>Auditor Portal</Typography>
      </Box>
      <List>
        {auditorMenu.map((item) => (
          <ListItem key={item.path} disablePadding>
            <Tooltip title={item.name} arrow placement="right">
              <ListItemButton
                component={Link}
                href={item.path}
                sx={globalStyles.listItemButton}
                onClick={isMobile ? handleDrawerToggle : undefined}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </Tooltip>
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
        <Tooltip title="Logout from auditor portal" arrow>
          <Button onClick={handleLogout} fullWidth variant="outlined" startIcon={<LogoutIcon />} sx={{ color: '#fefae0', borderColor: '#fefae0', '&:hover': { background: '#6b705c' } }}>
            Logout
          </Button>
        </Tooltip>
      </Box>
    </>
  );

  return (
    <Box sx={globalStyles.rootBox}>
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        anchor="left"
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            ...globalStyles.drawerPaper,
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {drawerContent}
      </Drawer>

      <Box
        component="main"
        sx={{
          ...mainContentBoxStyles,
          ml: { xs: 0, md: `${drawerWidth}px` },
          width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
          p: { xs: 2, md: 3 }, // Add responsive padding
          p: 0
        }}
      >
        {/* --- ADD THIS APP BAR --- */}
        <AppBar
          position="static"
          sx={{
            display: { xs: 'flex', md: 'none' }, 
            backgroundColor: '#283618',
            paddingTop: 'env(safe-area-inset-top)' 
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ color: '#fefae0' }}>
              Auditor Settings
            </Typography>
          </Toolbar>
        </AppBar>

        {/* --- Header--- */}
        <Box
          sx={{
            ...headerBoxStyles,
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            gap: 2,
            display: { xs: 'none', md: 'flex' }, // HIDE ON MOBILE
            p: 3 // ADD PADDING
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Typography
              variant="h4"
              sx={{
                ...pageTitleStyles,
                fontSize: { xs: '1.75rem', md: '2.125rem' },
              }}
            >
              Auditor Settings
            </Typography>
          </Box>
          <Box
            sx={{
              ...headerRightSectionStyles,
              width: { xs: '100%', md: 'auto' },
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Search settings"
              value={search ?? ''}
              onChange={handleSearchChange}
              sx={{
                ...searchFieldStyles,
                width: '100%' // Make search full-width
              }}
            />
          </Box>
        </Box>
        
        <Box sx={{ p: { xs: 2, md: 3 }, pt: { md: 0 } }}>
        <Box sx={settingsContainerStyles}>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <Stack spacing={2}>
                  <Typography variant="h6">Audit Trail & Event Capture</Typography>
                  <Controller name="audit.retentionPeriod" control={methods.control} render={({ field }) => (<TextField {...field} value={field.value ?? ''} label="Event Retention (days)" type="number" fullWidth />)} />
                  <Controller name="audit.immutableMode" control={methods.control} render={({ field }) => (<FormControlLabel control={<Checkbox {...field} checked={!!field.value} />} label="Enable Immutable Mode" />)} />
                  <Controller name="audit.autoCapture.login" control={methods.control} render={({ field }) => (<FormControlLabel control={<Checkbox {...field} checked={!!field.value} />} label="Auto-capture Logins" />)} />
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

      {/* Snackbar for logout */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1500}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%', fontWeight: 'bold', fontSize: '1.2rem' }}>
          Logging out...
        </Alert>
      </Snackbar>
    </Box>
  );
}