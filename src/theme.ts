import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#c8a96e',
        light: '#dcc48e',
        dark: '#a8884e',
        contrastText: '#0a0a0a',
      },
      secondary: {
        main: '#8ba8c0',     // 灰蓝（低饱和）
        light: '#a8c4d8',    // 亮灰蓝
        dark: '#7090a8',     // 暗灰蓝
      },
      info: {
        main: '#8ba8c0',     // 灰蓝强调
      },
      background: {
        default: '#0a0a0a',
        paper: 'rgba(200, 169, 110, 0.04)',
      },
      text: {
        primary: '#e8e0d0',
        secondary: '#a09888',
      },
      divider: 'rgba(200, 169, 110, 0.08)',
    },
    typography: {
      fontFamily: '"Inter", "system-ui", "-apple-system", "sans-serif"',
      h1: { fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1 },
      h2: { fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2 },
      h3: { fontWeight: 600, lineHeight: 1.3 },
      h4: { fontWeight: 600, lineHeight: 1.4 },
      body1: { fontSize: '1rem', lineHeight: 1.7 },
      body2: { fontSize: '0.875rem', lineHeight: 1.6 },
    },
    shape: { borderRadius: 10 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 8,
            padding: '10px 24px',
            fontFamily: '"SF Mono", "Fira Code", monospace',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            backgroundColor: 'rgba(200, 169, 110, 0.03)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(200, 169, 110, 0.06)',
            borderRadius: 14,
            boxShadow: 'none',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 500,
            fontFamily: '"SF Mono", "Fira Code", monospace',
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: { paddingLeft: '24px', paddingRight: '24px' },
        },
      },
    },
  }),
);

export default theme;
