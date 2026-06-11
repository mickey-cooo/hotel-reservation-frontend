export const theme = {
  colors: {
    light: {
      background: '#F8FAFC',
      foreground: '#0F172A',
      primary: '#0F172A',
      secondary: '#C5A059',
      tertiary: '#F8FAFC',
      neutral: '#64748B',
    },
    dark: {
      background: '#0F172A',
      foreground: '#F8FAFC',
      primary: '#F8FAFC',
      secondary: '#C5A059',
      tertiary: '#1E293B',
      neutral: '#94A3B8',
    },
  },
} as const;

export type AppTheme = typeof theme;
export type ColorMode = keyof AppTheme['colors'];
export type ThemeColors = AppTheme['colors'][ColorMode];
