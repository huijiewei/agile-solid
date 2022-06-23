import { useLocalStorage, useMediaQuery } from '@agile-solid/hooks';
import { createContext, createEffect, useContext } from 'solid-js';
import type { ParentProps, Accessor, Setter } from 'solid-js';

export type ThemeContextValue = {
  darkMode: Accessor<boolean>;
  setDarkMode: Setter<boolean>;
};

const ThemeContext = createContext<ThemeContextValue>();

export const useDarkMode = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useDarkMode must be used within a ThemeProvider');
  }

  return {
    darkMode: context.darkMode,
    setDarkMode: context.setDarkMode,
  };
};

export const ThemeProvider = (props: ParentProps) => {
  const osDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [darkMode, setDarkMode] = useLocalStorage<boolean>('ag:dark-mode', osDarkMode);

  createEffect(() => {
    if (darkMode()) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });

  return <ThemeContext.Provider value={{ darkMode, setDarkMode }}>{props.children}</ThemeContext.Provider>;
};
