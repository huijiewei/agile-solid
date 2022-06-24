import { useEventListener } from '@agile-solid/hooks';
import { Navigate, Route, Routes } from 'solid-app-router';
import { DefaultLayout } from './layouts/DefaultLayout';
import Home from './views/site/Home';
import NotFound from './views/site/NotFound';

const App = () => {
  const splash = document.getElementById('index-splash');

  useEventListener(
    'animationend',
    () => {
      splash?.remove();
    },
    { target: splash }
  );

  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Navigate href={'home'} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
