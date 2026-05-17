import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#c41e3a',
        light: '#e63946',
        dark: '#a0152e',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#c9a94e',
        light: '#d4a373',
        dark: '#a8882e',
        contrastText: '#0a0a0a',
      },
      background: {
        default: '#0a0a0a',
        paper: '#12121a',
      },
      text: {
        primary: '#e5e5e5',
        secondary: '#9e9eae',
      },
      divider: 'rgba(201, 169, 78, 0.15)',
    },
    typography: {
      fontFamily: '"Inter", "system-ui", "-apple-system", "sans-serif"',
      h1: {
        fontWeight: 800,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontWeight: 700,
        letterSpacing: '-0.01em',
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.7,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.6,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 8,
            padding: '8px 20px',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            backgroundColor: '#12121a',
            border: '1px solid rgba(201, 169, 78, 0.1)',
            borderRadius: 16,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 500,
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            paddingLeft: '24px',
            paddingRight: '24px',
          },
        },
      },
    },
  }),
);

export default theme;
