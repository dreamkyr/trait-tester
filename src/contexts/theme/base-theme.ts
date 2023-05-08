import { ThemeOptions } from '@mui/material';

export const baseTheme: ThemeOptions = {
  // palette: {
  //   primary: {
  //     main: '#0297d0',
  //     light: '#5ec8ff',
  //     dark: '#00699f',
  //     contrastText: 'white',
  //   },
  //   info: {
  //     main: '#cca615',
  //   },
  //   error: {
  //     main: '#fb3034',
  //   },
  // },
  components: {
    MuiListItemText: {
      styleOverrides: {
        root: {
          marginTop: 0,
          marginBottom: 0,
        },
        multiline: {
          marginTop: 0,
          marginBottom: 0,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
          minWidth: 'auto',
          marginRight: 16,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
};
