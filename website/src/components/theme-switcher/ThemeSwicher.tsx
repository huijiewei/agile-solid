import { Tooltip, useThemeContext } from '@agile-solid/components';
import { Moon, Sun } from '@agile-solid/icons';

export const ThemeSwitcher = () => {
  const { darkMode, setDarkMode } = useThemeContext();

  return (
    <Tooltip placement={'bottom'} content={darkMode() ? '进入亮色模式' : '进入暗色模式'}>
      <button
        aria-label={darkMode() ? '黑暗模式' : '亮色模式'}
        onClick={() => setDarkMode((prev) => !prev)}
        class={'block border-slate-300 rounded select-none p-1 border text-slate-500 hover:text-slate-700'}
      >
        {darkMode() ? <Sun class={'h-5 w-5'} /> : <Moon class={'h-5 w-5'} />}
      </button>
    </Tooltip>
  );
};
