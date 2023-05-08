import React, { createContext, useContext, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';

import { useThemeOptions } from './useThemeOptions';

type ThemeContextType = {
  toggleColorMode: () => void;
};

const defaultThemeContextValue = {
  toggleColorMode: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultThemeContextValue);

interface ThemeContextProviderProps {
  children?: any;
}

export const ThemeContextProvider = ({
  children = null,
}: ThemeContextProviderProps) => {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const options = useThemeOptions(mode);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        const newMode = mode === 'dark' ? 'light' : 'dark';
        setMode(newMode);
      },
    }),
    [mode]
  );

  const theme = createTheme(options);

  return (
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
