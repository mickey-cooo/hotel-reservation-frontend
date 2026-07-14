export const theme = {
  colors: {
    light: {
      background: '#F8FAFC',
      foreground: '#0F172A',
      primary: '#0F172A',
      secondary: '#C5A059',    // brand gold
      tertiary: '#F8FAFC',
      neutral: '#64748B',
      neutralLight: '#94A3B8',
      darkSurface: '#1E293B',
      border: '#E2E8F0',
      borderLight: '#CBD5E1',
      textBody: '#334155',
      slate100: '#F1F5F9',
    },
    dark: {
      background: '#0F172A',
      foreground: '#F8FAFC',
      primary: '#F8FAFC',
      secondary: '#C5A059',    // brand gold
      tertiary: '#1E293B',
      neutral: '#94A3B8',
      neutralLight: '#64748B',
      darkSurface: '#334155',
      border: '#1E293B',
      borderLight: '#334155',
      textBody: '#94A3B8',
      slate100: '#1E293B',
    },
  },
} as const;

export type AppTheme = typeof theme;
export type ColorMode = keyof AppTheme['colors'];
export type ThemeColors = AppTheme['colors'][ColorMode];

const c = theme.colors.light;

export const themeColorVars = `
  :root {
    --color-bg: ${c.background};
    --color-fg: ${c.foreground};
    --color-gold: ${c.secondary};
    --color-neutral: ${c.neutral};
    --color-neutral-light: ${c.neutralLight};
    --color-dark-surface: ${c.darkSurface};
    --color-border: ${c.border};
    --color-border-light: ${c.borderLight};
    --color-text-body: ${c.textBody};
    --color-slate-100: ${c.slate100};
  }
`;
