import { useEventListener } from '@agile-solid/hooks';
import { useRoutes } from 'solid-app-router';
import { routes } from './data/routes';

const App = () => {
  const splash = document.getElementById('index-splash');

  useEventListener(
    'animationend',
    () => {
      splash?.remove();
    },
    { target: splash }
  );

  const Routes = useRoutes(routes);

  return <Routes />;
};

export default App;
