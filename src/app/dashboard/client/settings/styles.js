// Contains the inline styles and sx overrides for the settings screen
export const clientSettingsStyles = {
    // Main content styles
    mainContent: {
        flexGrow: 1,
        p: 3,
        backgroundColor: '#fefaf0',
        color: '#525252',
        marginLeft: 30
    },
    // Header styles
    headerIcon: {
        mr: 1,
        verticalAlign: 'middle',
        color: '#f3722c' // Orange accent
    },
    headerText: {
        fontWeight: 500,
        color: '#525252',
    },
    headerSubtext: {
        color: '#525252'
    },
    // Tabs styles
    tabs: {
        '& .MuiTabs-indicator': {
            backgroundColor: '#f3722c' // Orange indicator
        },
        mb: 3
    },
    tab: {
        color: '#283618',
    },
    // Card styles
    card: {
        backgroundColor: '#ccd5ae',
        border: '2px solid #606c38',
    },
    // Profile tab styles
    profileSectionHeader: {
        color: '#283618',
        mb: 3
    },
    profileEditButtons: {
        backgroundColor: '#283618',
        color: '#fefaf0',
        '&:hover': {
            backgroundColor: '#606c38',
            borderColor: '#283618',
        },
    },
    profileCancelButton: {
        color: '#606c38',
        borderColor: '#606c38',
        '&:hover': {
            borderColor: '#283618',
            backgroundColor: '#283618',
            color: '#fefaf0',
        }
    },
    profileAvatarContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mb: 3
    },
    profileAvatar: {
        width: 120,
        height: 120,
        mb: 2,
        border: '2px solid #f3722c'
    },
    profileChangePhotoButton: {
        color: '#f3722c',
        borderColor: '#f3722c',
        '&:hover': {
            borderColor: '#e65c19'
        }
    },
    profileTextField: (editMode) => ({
        '& .MuiInputLabel-root': { color: '#525252' },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#a3a699',
            },
        },
        '& .MuiInputBase-input': {
            color: '#283618',
            opacity: editMode ? 1 : 0.7
        }
    }),
    // Security tab styles
    securityHeader: {
        color: '#283618',
        mb: 3
    },
    securitySubheader: {
        color: '#283618',
        mb: 2
    },
    securityPasswordButton: {
        mt: 3,
        backgroundColor: '#f3722c',
        color: '#fefae0',
        '&:hover': {
            backgroundColor: '#e65c19'
        }
    },
    securityPaper: {
        p: 2,
        mb: 3,
        backgroundColor: '#a3a699',
        border: '1px solid #6b705c'
    },
    securityLabel: {
        color: '#283618'
    },
    securityHelperText: {
        color: 'rgba(40, 54, 24, 0.7)',
        mt: 1
    },
    securityLogoutButton: {
        mt: 1,
        color: '#d32f2f',
        borderColor: '#d32f2f',
        '&:hover': {
            borderColor: '#b71c1c'
        }
    },
    // Notifications & Preferences tabs styles
    notificationSwitch: {
        '& .MuiSwitch-switchBase.Mui-checked': {
            color: '#f3722c'
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: '#f3722c'
        }
    },
    saveButton: {
        mt: 3,
        backgroundColor: '#f3722c',
        color: '#fefae0',
        '&:hover': {
            backgroundColor: '#e65c19'
        }
    },
    preferencesLanguageInput: {
        '& .MuiInputLabel-root': { color: '#525252' },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#6b705c',
            },
        },
        '& .MuiInputBase-input': { color: '#283618' },
        '& .MuiSvgIcon-root': { color: '#6b705c' }
    },
    // Logout button styles
    logoutButton: {
        mt: 3,
        textAlign: 'right',
        color: '#d32f2f',
        borderColor: '#d32f2f',
        '&:hover': {
            borderColor: '#b71c1c'
        }
    }
};