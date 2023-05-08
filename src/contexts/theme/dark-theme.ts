import { ThemeOptions } from '@mui/material';

import { baseTheme } from './base-theme';

export const darkTheme: ThemeOptions = {
  ...baseTheme,
  palette: {
    mode: 'dark',
  },
};
