import { createEventListener } from '@agile-solid/hooks';
import { useRoutes } from '@solidjs/router';
import { routes } from './data/routes';

const App = () => {
  const splash = document.getElementById('appSplash');

  createEventListener(
    'animationend',
    () => {
      splash?.remove();
    },
    splash
  );

  const Routes = useRoutes(routes);

  return <Routes />;
};

export default App;
