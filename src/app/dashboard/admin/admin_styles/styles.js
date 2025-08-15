import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#283618',
    },
    secondary: {
      main: '#fefae0',
    },
    text: {
      primary: '#283618',
      secondary: '#525252',
      tertiary: '#fefae0',
      disabled: '#bdbdbd',
    },
    background: {
      default: '#fefae0',
      darker: '#e0e0d1',
    },
    divider: {
      main: '#6b705c',
    },
    error: {
      main: '#b71c1c',
      light: '#f44336'
    },
    success: {
      main: '#4caf50',
      background: 'rgba(46, 125, 50, 0.2)',
      light: '#81c784',
      border: '#2e7d32',
    },
    info: {
      main: '#6b705c',
      background: 'rgba(2, 136, 209, 0.2)',
      light: '#4fc3f7',
      border: '#0288d1',
      action: '#2196f3'
    },
    highlight: {
      main: 'rgba(244, 193, 15, 0.1)',
    },
    border: {
        main: '#302222ff',
        dark: '#444'
    },
    warning: {
      main: '#f4c10f',
      light: '#ff9800',
      background: 'rgba(244, 193, 15, 0.2)',
      border: '#f3722c'
    },
    coral: {
      main: '#f3722c'
    },
    default: {
      main: '#9e9e9e',
      background: 'rgba(97, 97, 97, 0.2)',
      border: '#616161'
    },
    lightDialog: {
      background: '#fefae0',
      text: '#283618',
      divider: '#6b705c'
    }
  },
});

/*Overview*/

export const rootBox = ({ palette }) => ({
  display: 'flex',
  minHeight: '100vh',
  minWidth: '90vw',
  backgroundColor: palette.background.default,
});

export const drawerPaper = ({ palette }) => ({
  width: 240,
  boxSizing: 'border-box',
  backgroundColor: palette.primary.main,
  borderRight: `1px solid ${palette.border.main}`,
  color: palette.secondary.main,
});

export const drawerHeader = ({ palette }) => ({
  p: 2,
  borderBottom: `2px solid ${palette.divider.main}`,
  fontWeight: 'bold',
  color: palette.secondary.main,
});

export const listItemButton = ({ palette }) => ({
  color: palette.secondary.main,
  '&:hover': {
    backgroundColor: palette.divider.main,
  },
});

export const mainContentBox = ({ palette }) => ({
  flexGrow: 1,
  p: 3,
  width: '100%',
  backgroundColor: palette.background.default,
});

export const pageHeader = {
  mb: 4,
};

export const pageHeaderText = ({ palette }) => ({
  color: palette.text.secondary,
  fontWeight: 500,
});

export const summaryCard = ({ palette }) => ({
  backgroundColor: palette.background.default,
  height: '100%',
  border: `1px solid ${palette.border.main}`,
  '&:hover': {
    boxShadow: `0px 4px 20px ${palette.highlight.main}`,
  },
});

export const avatarBox = ({ palette }) => ({
  bgcolor: palette.highlight.main,
  width: 56,
  height: 56,
  border: `1px solid ${palette.divider.main}`,
});

export const metricValue = ({ palette }) => ({
  color: palette.error.main,
});

export const upTrend = ({ palette }) => ({
  color: palette.success.main,
  display: 'flex',
  alignItems: 'center',
});

export const downTrend = ({ palette }) => ({
  color: palette.error.light,
  display: 'flex',
  alignItems: 'center',
});

export const activityCard = ({ palette }) => ({
  backgroundColor: palette.background.default,
  border: `2px solid ${palette.divider.main}`,
});

export const quickActionsCard = ({ palette }) => ({
  backgroundColor: palette.primary.main,
  border: `1px solid ${palette.text.secondary}`,
});

export const quickActionsTitle = ({ palette }) => ({
  color: palette.text.tertiary,
  mb: 2,
  fontWeight: 500,
});

export const quickActionButton = ({ palette }) => ({
  backgroundColor: palette.primary.main,
  borderColor: palette.secondary.main,
  color: palette.secondary.main,
  '&:hover': {
    backgroundColor: palette.highlight.main,
    borderColor: palette.secondary.main,
  },
});

/*Permissions*/

export const activeListItemButton = ({ palette }) => ({
  color: palette.secondary.main,
  backgroundColor: palette.divider.main,
  '&:hover': {
    backgroundColor: palette.divider.main,
  },
});

export const permissionsCard = ({ palette }) => ({
  backgroundColor: palette.background.default,
  mb: 3,
  border: `1px solid ${palette.text.secondary}`,
});

export const tableContainer = ({ palette }) => ({
  backgroundColor: 'transparent',
  border: `2px solid ${palette.text.secondary}`,
});

export const tableHead = ({ palette }) => ({
  backgroundColor: palette.primary.main,
});

export const tableHeaderCell = ({ palette }) => ({
  color: palette.secondary.main,
  fontWeight: 'bold',
});

export const tableRow = ({ palette }) => ({
  '&:hover': {
    backgroundColor: '#e0e0d1',
  },
  cursor: 'pointer',
  '&.Mui-selected, &.Mui-selected:hover': {
    backgroundColor: '#e0e0d1',
  },
});

export const tableCell = ({ palette }) => ({
  color: palette.text.primary,
});

export const roleIconStack = {
  display: 'flex',
  alignItems: 'center',
  spacing: 1,
};

export const roleSelect = (color) => ({ palette }) => ({
  color: palette[color].main,
  backgroundColor: palette.background.default,
  border: `1px solid ${palette.text.secondary}`,
  '& .MuiSvgIcon-root': {
    color: palette.text.primary,
  },
});

export const permissionMenuItem = (color) => ({ palette }) => ({
  color: palette[color].main,
  backgroundColor: palette.background.default,
  '&:hover': {
    backgroundColor: palette.divider.main,
    color: palette.text.tertiary,
  },
});

export const permissionChip = (color) => ({ palette }) => ({
  color: palette[color].main,
});

export const summaryCardContent = ({ palette }) => ({
  backgroundColor: palette.background.default,
  border: `1px solid ${palette.text.secondary}`,
  height: '100%',
});

export const summaryIconAvatar = (color) => ({ palette }) => ({
  backgroundColor: `${palette[color].main}20`,
  color: palette[color].main,
  width: 32,
  height: 32,
});

export const saveButtonBox = {
  display: 'flex',
  justifyContent: 'flex-end',
};

export const saveButton = ({ palette }) => ({
  backgroundColor: palette.primary.main,
  color: palette.secondary.main,
  fontWeight: 500,
  '&:hover': {
    backgroundColor: palette.divider.main,
  },
});

/* Projects */

export const projectsPageHeaderIcon = ({ palette }) => ({
  mr: 1,
  verticalAlign: 'middle',
  color: palette.coral.main,
});

export const searchField = ({ palette }) => ({
  color: palette.text.secondary,
  backgroundColor: palette.background.default,
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: palette.text.secondary },
  },
});

export const newProjectButton = ({ palette }) => ({
  backgroundColor: palette.primary.main,
  color: palette.secondary.main,
  fontWeight: 500,
  '&:hover': {
    backgroundColor: palette.divider.main,
    borderColor: palette.secondary.main
  },
  whiteSpace: 'nowrap'
});

export const projectsCard = ({ palette }) => ({
  backgroundColor: palette.background.default,
  mb: 3,
  border: `1px solid ${palette.text.secondary}`,
});

export const projectsCardContent = ({ palette }) => ({
  p: 2,
});

export const projectsTableContainer = ({ palette }) => ({
  backgroundColor: 'transparent',
  border: `2px solid ${palette.text.secondary}`,
});

export const projectsTableHeader = ({ palette }) => ({
  // This is a stylistic change to reflect the dark sidebar
  backgroundColor: palette.primary.main,
});

export const projectsTableHeaderCell = ({ palette }) => ({
  color: palette.secondary.main,
  fontWeight: 'bold',
});

export const projectsTableRow = ({ palette }) => ({
  '&:hover': {
    backgroundColor: palette.background.darker,
  },
});

export const projectsTableCell = ({ palette }) => ({
  color: palette.text.secondary,
});

export const projectIcon = ({ palette }) => ({
  color: palette.coral.main,
});

export const statusChip = (status, isMenuItem = false) => ({ palette }) => {
  switch (status) {
    case 'completed':
      return {
        backgroundColor: palette.success.background,
        color: palette.success.light,
        border: `1px solid ${palette.success.border}`,
        fontWeight: 'bold',
        mr: isMenuItem ? 1 : 0
      };
    case 'active':
      return {
        backgroundColor: palette.info.background,
        color: palette.info.light,
        border: `1px solid ${palette.info.border}`,
        fontWeight: 'bold',
        mr: isMenuItem ? 1 : 0
      };
    case 'pending':
      return {
        backgroundColor: palette.highlight.main,
        color: palette.coral.main,
        border: `1px solid ${palette.coral.main}`,
        fontWeight: 'bold',
        mr: isMenuItem ? 1 : 0
      };
    default:
      return {};
  }
};

export const timelineIcon = ({ palette }) => ({
  color: palette.coral.main,
});

export const progressStack = {
  display: 'flex',
  alignItems: 'center',
  spacing: 1,
};

export const progressIcon = (progress) => ({ palette }) => {
  if (progress > 50) {
    return { color: palette.warning.light };
  } else {
    return { color: palette.error.light };
  }
};

export const teamAvatar = ({ palette }) => ({
  width: 32,
  height: 32,
  fontSize: '0.8rem',
  bgcolor: palette.divider.main,
  color: palette.secondary.main,
  border: `1px solid ${palette.border.dark}`,
});

export const actionIconButton = ({ palette }) => ({
  color: palette.text.secondary,
});

export const statsCard = ({ palette }) => ({
  backgroundColor: palette.background.default,
  border: `1px solid ${palette.text.secondary}`,
  height: '100%',
});

export const statsValue = (color) => ({ palette }) => ({
  color: color.includes('.') ? palette[color.split('.')[0]][color.split('.')[1]] : palette[color].main,
  fontWeight: 500,
});

export const statsAvatar = (bgColor, borderColor) => ({ palette }) => ({
  bgcolor: bgColor.includes('.') ? palette[bgColor.split('.')[0]][bgColor.split('.')[1]] : palette[bgColor].main,
  width: 56,
  height: 56,
  border: `1px solid ${borderColor.includes('.') ? palette[borderColor.split('.')[0]][borderColor.split('.')[1]] : palette[borderColor].main}`,
});

export const createProjectDialogPaper = ({ palette }) => ({
  backgroundColor: palette.background.default,
  color: palette.text.primary,
  border: `2px solid ${palette.text.primary}`,
});

export const createProjectDialogTitle = ({ palette }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: `1px solid ${palette.divider.main}`,
  backgroundColor: palette.background.default,
  color: palette.text.primary,
});

export const dialogCloseButton = ({ palette }) => ({
  color: palette.text.primary
});

export const createProjectDialogContent = ({ palette }) => ({
  py: 3,
  backgroundColor: palette.background.default
});

export const dialogTextField = ({ palette }) => ({
  '& .MuiInputBase-input': { color: palette.text.primary },
  '& .MuiInputLabel-root': { color: palette.divider.main },
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: palette.divider.main },
    '&:hover fieldset': { borderColor: palette.text.primary },
    '&.Mui-focused fieldset': { borderColor: palette.text.primary },
  }
});

export const dialogFormControl = {
  // Styles for FormControl if needed
};

export const dialogInputLabel = ({ palette }) => ({
  color: palette.divider.main
});

export const dialogSelect = ({ palette }) => ({
  color: palette.text.primary,
  '& .MuiSvgIcon-root': {
    color: palette.text.primary,
  },
});

export const dialogSelectMenuItem = ({ palette }) => ({
  '&:hover': {
    backgroundColor: palette.divider.main
  },
});

export const dialogActions = ({ palette }) => ({
  borderTop: `1px solid ${palette.divider.main}`,
  px: 3,
  py: 2,
  backgroundColor: palette.background.default,
});

export const dialogCancelButton = ({ palette }) => ({
  color: palette.divider.main,
  '&:hover': {
    backgroundColor: palette.divider.main,
    color: palette.secondary.main
  },
});

export const createProjectButton = ({ palette }) => ({
  backgroundColor: palette.primary.main,
  color: palette.secondary.main,
  '&:hover': { backgroundColor: palette.divider.main },
  '&:disabled': { backgroundColor: palette.text.disabled, color: palette.background.darker },
});

export const menuPaper = ({ palette }) => ({
  backgroundColor: palette.background.default,
  color: palette.text.primary,
  border: `2px solid ${palette.text.primary}`,
  minWidth: '200px'
});

export const menuItem = ({ palette }) => ({
  '&:hover': {
    backgroundColor: palette.divider.main,
    color: palette.secondary.main,
  },
});

export const menuDivider = {
  backgroundColor: '#333'
};

/*Performance Reports*/

export const reportsPageHeaderIcon = ({ palette }) => ({
  mr: 1,
  verticalAlign: 'middle',
  color: palette.coral.main,
});

export const reportsMainContentBox = ({ palette }) => ({
  flexGrow: 1,
  p: 3,
  backgroundColor: palette.background.default
});

export const reportsPageHeaderText = ({ palette }) => ({
  color: palette.text.secondary,
  fontWeight: 500
});

export const reportsMetricCard = ({ palette }) => ({
  backgroundColor: palette.background.default,
  height: '100%',
  border: `1px solid ${palette.text.secondary}`,
  '&:hover': {
    borderColor: palette.coral.main
  }
});

export const reportsMetricTitle = ({ palette }) => ({
  color: palette.text.secondary,
});

export const reportsMetricValue = ({ palette }) => ({
  color: palette.text.primary,
  my: 1,
  fontWeight: 500
});

export const reportsTrend = {
  display: 'flex',
  alignItems: 'center',
  spacing: 0.5
};

export const reportsTrendIconUp = ({ palette }) => ({
  color: palette.success.main
});

export const reportsTrendIconDown = ({ palette }) => ({
  color: palette.error.light
});

export const reportsTrendText = (trend) => ({ palette }) => ({
  color: trend === 'up' ? palette.success.main : palette.error.light
});

export const reportsMetricAvatar = ({ palette }) => ({
  bgcolor: palette.background.darker,
  width: 56,
  height: 56,
  border: `1px solid ${palette.divider.main}`
});

export const reportsChartCard = ({ palette }) => ({
  backgroundColor: palette.background.default,
  height: '100%',
  border: `1px solid ${palette.text.secondary}`
});

export const reportsChartTitle = ({ palette }) => ({
  color: palette.text.secondary,
  mb: 2,
  fontWeight: 500
});

export const reportsChartBox = ({ palette }) => ({
  height: '300px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: palette.divider.main,
  border: `1px dashed ${palette.divider.main}`,
  borderRadius: '4px',
  backgroundColor: palette.background.darker
});

export const reportsRecentActivitiesCard = ({ palette }) => ({
  backgroundColor: palette.background.default,
  mb: 3,
  border: `1px solid ${palette.text.secondary}`
});

export const reportsTableContainer = ({ palette }) => ({
  backgroundColor: 'transparent',
  border: `1px solid ${palette.text.secondary}`
});

export const reportsTableHeader = ({ palette }) => ({
  backgroundColor: palette.primary.main
});

export const reportsTableHeaderCell = ({ palette }) => ({
  color: palette.secondary.main,
  fontWeight: 'bold'
});

export const reportsTableRow = ({ palette }) => ({
  '&:hover': {
    backgroundColor: palette.background.darker
  }
});

export const reportsTableCell = ({ palette }) => ({
  color: palette.text.primary
});

export const reportsStatusChip = (status) => ({ palette }) => {
  let bgcolor, color, bordercolor;
  switch(status) {
    case 'completed':
      bgcolor = 'rgba(46, 125, 50, 0.2)';
      color = '#2e7d32';
      bordercolor = '1px solid #2e7d32';
      break;
    case 'pending':
      bgcolor = 'rgba(97, 97, 97, 0.2)';
      color = '#616161';
      bordercolor = '1px solid #616161';
      break;
    case 'in-progress':
      bgcolor = 'rgba(2, 136, 209, 0.2)';
      color = '#0288d1';
      bordercolor = '1px solid #0288d1';
      break;
    default:
      return {};
  }
  return {
    backgroundColor: bgcolor,
    color: color,
    border: bordercolor,
    textTransform: 'capitalize'
  };
};

export const reportsExportCard = ({ palette }) => ({
  backgroundColor: palette.background.default,
  border: `1px solid ${palette.text.secondary}`
});

export const reportsExportButton = ({ palette }) => ({
  color: palette.text.primary,
  borderColor: palette.text.primary,
  '&:hover': {
    backgroundColor: palette.background.darker,
    borderColor: palette.text.primary
  }
});

/* Teams & Users */

export const usersPageHeaderIcon = ({ palette }) => ({
  mr: 1,
  verticalAlign: 'middle',
  color: palette.coral.main,
});

export const usersCard = ({ palette }) => ({
  backgroundColor: palette.background.default,
  mb: 3,
  border: `1px solid ${palette.text.secondary}`,
});

export const usersTableContainer = ({ palette }) => ({
  backgroundColor: 'transparent',
  border: `2px solid ${palette.text.secondary}`,
});

export const usersTableHeader = ({ palette }) => ({
  backgroundColor: palette.primary.main,
});

export const usersTableHeaderCell = ({ palette }) => ({
  color: palette.secondary.main,
  fontWeight: 'bold',
});

export const usersTableRow = ({ palette }) => ({
  '&:hover': {
    backgroundColor: palette.background.darker,
  },
});

export const usersTableCell = ({ palette }) => ({
  color: palette.text.primary,
});

export const userAvatar = ({ palette }) => ({
  width: 40,
  height: 40,
  bgcolor: palette.divider.main,
  color: palette.secondary.main,
});

export const roleChip = (role) => ({ palette }) => {
  let bgcolor, color, bordercolor;
  switch (role) {
    case 'Admin':
      bgcolor = palette.warning.background;
      color = palette.warning.light;
      bordercolor = `1px solid ${palette.warning.main}`;
      break;
    case 'Project Manager':
      bgcolor = palette.info.background;
      color = palette.info.light;
      bordercolor = `1px solid ${palette.info.main}`;
      break;
    case 'Team Lead':
      bgcolor = palette.success.background;
      color = palette.success.light;
      bordercolor = `1px solid ${palette.success.main}`;
      break;
    case 'Member':
      bgcolor = palette.default.background;
      color = palette.default.main;
      bordercolor = `1px solid ${palette.default.main}`;
      break;
    default:
      return {};
  }
  return {
    backgroundColor: bgcolor,
    color: color,
    border: bordercolor,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    pl: 1
  };
};

export const teamStatsCard = ({ palette }) => ({
  backgroundColor: palette.background.default,
  height: '100%',
  border: `1px solid ${palette.text.secondary}`,
});

export const teamStatsValue = (color) => ({ palette }) => ({
  color: color.includes('.') ? palette[color.split('.')[0]][color.split('.')[1]] : palette[color].main,
  fontWeight: 500,
});

export const teamStatsAvatar = (bgColor, borderColor) => ({ palette }) => ({
  bgcolor: bgColor.includes('.') ? palette[bgColor.split('.')[0]][bgColor.split('.')[1]] : palette[bgColor].main,
  width: 56,
  height: 56,
  border: `1px solid ${borderColor.includes('.') ? palette[borderColor.split('.')[0]][borderColor.split('.')[1]] : palette[borderColor].main}`,
});

export const addUserButton = ({ palette }) => ({
  backgroundColor: palette.primary.main,
  color: palette.secondary.main,
  fontWeight: 500,
  '&:hover': {
    backgroundColor: palette.divider.main,
    borderColor: palette.secondary.main
  },
  whiteSpace: 'nowrap'
});

/* Settings */

export const settingsListItemButton = ({ palette }) => ({
  color: palette.secondary.main,
  backgroundColor: palette.divider.main,
  '&:hover': {
    backgroundColor: palette.divider.main,
  },
});

export const settingsPageHeaderIcon = ({ palette }) => ({
  mr: 1,
  verticalAlign: 'middle',
  color: palette.coral.main,
});

export const settingsMainContentBox = ({ palette }) => ({
  flexGrow: 1,
  p: 3,
  backgroundColor: palette.background.default
});

export const settingsPageHeaderText = ({ palette }) => ({
  color: palette.text.secondary,
  fontWeight: 500
});

export const settingsSubheaderText = ({ palette }) => ({
  color: palette.text.secondary
});

export const settingsCard = ({ palette }) => ({
  backgroundColor: palette.background.default,
  height: '100%',
  border: `1px solid ${palette.text.secondary}`,
  '&:hover': {
    borderColor: palette.coral.main,
    boxShadow: `0 0 15px ${palette.coral.main}30`
  }
});

export const settingsCardAvatar = ({ palette }) => ({
  bgcolor: palette.background.darker,
  width: 48,
  height: 48,
  border: `1px solid ${palette.divider.main}`
});

export const settingsCardAvatarIcon = ({ palette }) => ({
  color: palette.text.secondary,
});

export const settingsCardTitle = ({ palette }) => ({
  color: palette.text.primary,
  fontWeight: 500
});

export const settingsStatusChip = (status) => ({ palette }) => {
  let bgcolor, color, bordercolor;
  switch (status) {
    case 'active':
      bgcolor = 'transparent';
      color = palette.success.main;
      bordercolor = `1px solid ${palette.success.main}`;
      break;
    case 'pending':
      bgcolor = 'transparent';
      color = palette.warning.light;
      bordercolor = `1px solid ${palette.warning.light}`;
      break;
    case 'inactive':
      bgcolor = 'transparent';
      color = palette.error.light;
      bordercolor = `1px solid ${palette.error.light}`;
      break;
    default:
      return {};
  }
  return {
    backgroundColor: bgcolor,
    color: color,
    border: bordercolor,
    textTransform: 'capitalize'
  };
};

export const settingsCardDescription = ({ palette }) => ({
  color: palette.text.secondary
});

export const settingsCardButton = ({ palette }) => ({
  color: palette.primary.main,
  borderColor: palette.primary.main,
  '&:hover': {
    backgroundColor: palette.background.darker,
    borderColor: palette.primary.main
  }
});

export const settingsMaintenanceCard = ({ palette }) => ({
  backgroundColor: palette.background.default,
  border: `1px solid ${palette.text.secondary}`
});

export const settingsMaintenanceTitle = ({ palette }) => ({
  color: palette.text.secondary,
  fontWeight: 500
});

export const settingsMaintenanceButton = ({ palette }) => ({
  backgroundColor: palette.primary.main,
  color: palette.secondary.main,
  fontWeight: 600,
  '&:hover': {
    backgroundColor: palette.divider.main
  }
});

export const settingsClearCacheButton = ({ palette }) => ({
  color: palette.primary.main,
  borderColor: palette.primary.main,
  '&:hover': {
    backgroundColor: palette.background.darker,
    borderColor: palette.primary.main
  }
});

export const settingsDangerousCard = ({ palette }) => ({
  backgroundColor: palette.background.default,
  border: `1px solid ${palette.error.light}`
});

export const settingsDangerousTitle = ({ palette }) => ({
  color: palette.error.light,
  fontWeight: 500
});

export const settingsDangerousResetButton = ({ palette }) => ({
  color: palette.error.light,
  borderColor: palette.error.light,
  '&:hover': {
    backgroundColor: 'rgba(244, 67, 54, 0.15)',
    borderColor: palette.error.main
  }
});

export const settingsDangerousPurgeButton = ({ palette }) => ({
  backgroundColor: palette.error.light,
  '&:hover': {
    backgroundColor: palette.error.main
  }
});