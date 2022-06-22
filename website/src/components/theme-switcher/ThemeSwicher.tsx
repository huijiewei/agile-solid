import { useLocalStorage, useMediaQuery } from '@agile-solid/hooks';
import { Moon, Sun } from '@agile-solid/icons';
import { createEffect } from 'solid-js';

export const ThemeSwitcher = () => {
  const [darkMode, setDarkMode] = useLocalStorage('ag:dark-mode', useMediaQuery('(prefers-color-scheme: dark)'));

  createEffect(() => {
    if (darkMode()) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });

  return (
    <button
      onClick={() => setDarkMode((prev) => !prev)}
      class={'block border-slate-300 rounded select-none p-1 border text-slate-500 hover:text-slate-700'}
    >
      {darkMode() ? <Sun class={'h-5 w-5'} /> : <Moon class={'h-5 w-5'} />}
    </button>
  );
};
