import { createTheme } from '@mui/material/styles';

const gold = {
  main: '#C9A962',
  light: '#E8D5A3',
  dark: '#9A7B3C',
  contrastText: '#0A0A0A',
};

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: gold,
    secondary: {
      main: '#2A2A2A',
      light: '#3D3D3D',
      dark: '#1A1A1A',
    },
    background: {
      default: '#0A0A0A',
      paper: '#141414',
    },
    text: {
      primary: '#F5F5F0',
      secondary: '#8A8A85',
    },
    divider: 'rgba(255, 255, 255, 0.06)',
    action: {
      hover: 'rgba(201, 169, 98, 0.08)',
      selected: 'rgba(201, 169, 98, 0.12)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 400,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 400,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 400,
    },
    h4: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 400,
    },
    h5: {
      fontWeight: 500,
      letterSpacing: '0.02em',
    },
    h6: {
      fontWeight: 500,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      fontSize: '0.75rem',
    },
    subtitle1: {
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      fontSize: '0.7rem',
      color: '#8A8A85',
    },
    body1: {
      lineHeight: 1.7,
    },
    button: {
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      fontWeight: 500,
      fontSize: '0.75rem',
    },
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#2A2A2A #0A0A0A',
          '&::-webkit-scrollbar': { width: 6 },
          '&::-webkit-scrollbar-track': { background: '#0A0A0A' },
          '&::-webkit-scrollbar-thumb': { background: '#2A2A2A' },
        },
        a: {
          textDecoration: 'none',
          color: 'inherit',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          padding: '12px 32px',
          transition: 'all 0.3s ease',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: gold.light,
          },
        },
        outlined: {
          borderColor: 'rgba(201, 169, 98, 0.4)',
          '&:hover': {
            borderColor: gold.main,
            backgroundColor: 'rgba(201, 169, 98, 0.06)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          transition: 'border-color 0.3s ease',
          '&:hover': {
            borderColor: 'rgba(201, 169, 98, 0.2)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.1)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(201, 169, 98, 0.3)',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(10, 10, 10, 0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          boxShadow: 'none',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'color 0.3s ease',
        },
      },
    },
  },
});
