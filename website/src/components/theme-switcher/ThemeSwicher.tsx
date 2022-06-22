import { useLocalStorage, useMediaQuery } from '@agile-solid/hooks';
import { Moon, Sun } from '@agile-solid/icons';
import { createEffect } from 'solid-js';

export const ThemeSwitcher = () => {
  const osDark = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useLocalStorage('ag:dark-mode', osDark());

  createEffect(() => {
    if (darkMode()) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });

  return (
    <button
      aria-label={darkMode() ? '黑暗模式' : '亮色模式'}
      onClick={() => setDarkMode((prev) => !prev)}
      class={'block border-slate-300 rounded select-none p-1 border text-slate-500 hover:text-slate-700'}
    >
      {darkMode() ? <Sun class={'h-5 w-5'} /> : <Moon class={'h-5 w-5'} />}
    </button>
  );
};
