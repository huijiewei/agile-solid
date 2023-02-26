// @refresh reload
import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';
import { useRegisterSW } from 'virtual:pwa-register/solid';

import App from './App';
import { setup } from './twind';
import { AgileProvider } from '@agile-solid/components';

setup();

useRegisterSW();

render(
  () => (
    <AgileProvider>
      <Router>
        <App />
      </Router>
    </AgileProvider>
  ),
  document.getElementById('app') as HTMLElement
);
