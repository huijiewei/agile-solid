// @refresh reload
import { ThemeProvider } from '@agile-solid/components';
import presetAgile from '@agile-solid/twind';
import presetAutoprefix from '@twind/preset-autoprefix';
import presetExt from '@twind/preset-ext';
import presetTailwind from '@twind/preset-tailwind';
import { render } from 'solid-js/web';
import { Router } from 'solid-app-router';
import { injectGlobal, setup } from 'twind';
import { useRegisterSW } from 'virtual:pwa-register/solid';

import App from './App';

setup({
  presets: [presetAutoprefix(), presetExt(), presetTailwind(), presetAgile()],
  rules: [
    [
      'bg-gradient-radial-dot',
      { backgroundImage: 'radial-gradient(circle, var(--tw-gradient-from) 1px, var(--tw-gradient-to) 1px)' },
    ],
  ],
  ignorelist: [/^index-splash-/],
});

injectGlobal`
body {
    @apply antialiased text-black bg-white dark:(text-white bg-slate-900) overflow-y-scroll &::-webkit-scrollbar:(w-[12px] h-[12px]) &::-webkit-scrollbar-thumb:(border-([3px] solid transparent) bg-clip-padding bg-gray-300 rounded-[5px]);
}
`;

useRegisterSW();

render(
  () => (
    <ThemeProvider>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  ),
  document.getElementById('app') as HTMLElement
);
