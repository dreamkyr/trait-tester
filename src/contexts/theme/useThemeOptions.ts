import { darkTheme } from './dark-theme';
import { lightTheme } from './light-theme';

export const useThemeOptions = (mode: 'light' | 'dark') => {
  return mode === 'dark' ? darkTheme : lightTheme;
};
