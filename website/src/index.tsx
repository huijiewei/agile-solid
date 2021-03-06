// @refresh reload
import { ThemeProvider } from '@agile-solid/components';
import { render } from 'solid-js/web';
import { Router } from 'solid-app-router';
import { setup } from 'twind';
import { useRegisterSW } from 'virtual:pwa-register/solid';

import App from './App';
import twindConfig from './twind.config';

setup(twindConfig);

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
