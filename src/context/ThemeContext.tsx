import React, { createContext, useContext, useState, ReactNode } from 'react';

export const colors = {
  dark: {
    background: '#0a0a0f',
    surface: '#13131a',
    surfaceAlt: '#1c1c26',
    border: '#2a2a3a',
    accent: '#7c6aff',
    accentLight: '#a89aff',
    text: '#f0eeff',
    textSecondary: '#8b8aa0',
    userBubble: '#7c6aff',
    aiBubble: '#1c1c26',
    inputBg: '#13131a',
    error: '#ff6b6b',
    success: '#6bffb8',
  },
  light: {
    background: '#f5f5fa',
    surface: '#ffffff',
    surfaceAlt: '#eeeef8',
    border: '#d0d0e0',
    accent: '#7c6aff',
    accentLight: '#a89aff',
    text: '#1a1a2e',
    textSecondary: '#6b6b85',
    userBubble: '#7c6aff',
    aiBubble: '#ffffff',
    inputBg: '#ffffff',
    error: '#e53e3e',
    success: '#38a169',
  },
};

type Theme = typeof colors.dark;
type ThemeMode = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: colors.dark,
  mode: 'dark',
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>('dark');
  const theme = colors[mode];

  const toggleTheme = () => setMode(m => (m === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
