// features/admin/SystemSettings/styles.js

// Header
export const settingsPageHeaderText = (theme) => ({
  display: 'flex',
  alignItems: 'center',
  mb: 1,
  color: theme.palette.text.primary
});

export const settingsPageHeaderIcon = (theme) => ({
  mr: 1,
  color: theme.palette.primary.main
});

// Category Card
export const categoryCard = (theme) => ({
  backgroundColor: theme.palette.background.default,
  height: '100%',
  border: `1px solid ${theme.palette.text.secondary}`,
  '&:hover': {
    borderColor: theme.palette.coral.main,
    boxShadow: `0 0 15px ${theme.palette.highlight.main}`
  }
});

// Avatar for each category
export const summaryIconAvatar = (color) => (theme) => ({
  bgcolor: theme.palette[color].main
});

// Status Chip
export const statusChipStyle = (status) => (theme) => {
  switch (status) {
    case 'active':
      return {
        backgroundColor: theme.palette.info.background,
        color: theme.palette.info.light,
        border: `1px solid ${theme.palette.info.border}`,
        fontWeight: 'bold',
        textTransform: 'capitalize'
      };
    case 'pending':
      return {
        backgroundColor: theme.palette.warning.background,
        color: theme.palette.warning.light,
        border: `1px solid ${theme.palette.warning.light}`,
        fontWeight: 'bold',
        textTransform: 'capitalize'
      };
    case 'inactive':
      return {
        backgroundColor: theme.palette.grey[100],
        color: theme.palette.grey[600],
        border: `1px solid ${theme.palette.grey[300]}`,
        fontWeight: 'bold',
        textTransform: 'capitalize'
      };
    default:
      return {};
  }
};

// Configure Button
export const configureButton = (theme) => ({
  color: theme.palette.text.primary,
  borderColor: theme.palette.text.secondary,
  '&:hover': {
    backgroundColor: theme.palette.background.darker,
    borderColor: theme.palette.text.primary
  }
});

// System Maintenance Card
export const maintenanceCard = (theme) => ({
  p: 2,
  border: `1px solid ${theme.palette.divider}`,
  mb: 2
});

// Backup Database Button
export const backupButton = (theme) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark
  }
});

// Clear Cache Button
export const clearCacheButton = (theme) => ({
  color: theme.palette.text.primary,
  borderColor: theme.palette.text.secondary,
  '&:hover': {
    backgroundColor: theme.palette.background.darker,
    borderColor: theme.palette.text.primary
  }
});

// Reset Settings Button
export const resetButton = (theme) => ({
  color: theme.palette.error.main,
  borderColor: theme.palette.error.main,
  '&:hover': {
    backgroundColor: theme.palette.error.light + '20',
    borderColor: theme.palette.error.light
  }
});

// Purge Data Button
export const purgeButton = (theme) => ({
  backgroundColor: theme.palette.error.main,
  color: theme.palette.secondary.main,
  '&:hover': {
    backgroundColor: theme.palette.error.light
  }
});
