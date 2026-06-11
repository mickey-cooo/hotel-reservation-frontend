'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme as appTheme } from './theme';

const muiTheme = createTheme({
  palette: {
    primary: {
      main: appTheme.colors.light.primary,
    },
    secondary: {
      main: appTheme.colors.light.secondary,
    },
    background: {
      default: appTheme.colors.light.background,
    },
    text: {
      primary: appTheme.colors.light.foreground,
      secondary: appTheme.colors.light.neutral,
    },
  },
  typography: {
    fontFamily: 'inherit',
  },
  shape: {
    borderRadius: 8,
  },
});

interface MuiThemeRegistryProps {
  children: React.ReactNode;
}

export default function MuiThemeRegistry({ children }: MuiThemeRegistryProps) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
