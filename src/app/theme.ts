import { createTheme } from '@mui/material/styles'

/** Thème HMS — palette inspirée des usages humanitaires (OCHA / neutre institutionnel). */
export const hmsTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1B365D',
      light: '#418FDE',
      dark: '#0F2440',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#E56A54',
      light: '#F4A582',
      dark: '#C44D38',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F5F7FA',
      paper: '#ffffff',
    },
    text: {
      primary: '#1A1A2E',
      secondary: '#5C6370',
    },
    divider: '#E2E8F0',
  },
  typography: {
    fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: '1px solid #E2E8F0',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          marginInline: 8,
          marginBlock: 2,
          '&.Mui-selected': {
            backgroundColor: 'rgba(27, 54, 93, 0.08)',
            '&:hover': {
              backgroundColor: 'rgba(27, 54, 93, 0.12)',
            },
          },
        },
      },
    },
  },
})
