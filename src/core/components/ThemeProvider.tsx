import { Theme } from "../models/theme.enum";
import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme,
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: Theme.SYSTEM,
  setTheme: () => null
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = Theme.SYSTEM,
  storageKey = 'vite-ui-theme',
  ...props
}) => {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem(storageKey) as Theme || defaultTheme))

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(Theme.LIGHT, Theme.DARK);

    if (theme === Theme.SYSTEM) {
      const systmeTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches ? Theme.DARK : Theme.LIGHT;

      root.classList.add(systmeTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    }
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext<ThemeProviderState>(ThemeProviderContext);

  return context;
}

export default ThemeProvider;
