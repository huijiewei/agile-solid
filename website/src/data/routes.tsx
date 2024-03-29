import { Navigate } from '@solidjs/router';
import { DefaultLayout } from '../layouts/DefaultLayout';
import View from '../views/components/View';
import Home from '../views/site/Home';
import NotFound from '../views/site/NotFound';

export const routes = [
  {
    path: '/',
    component: () => <DefaultLayout />,
    children: [
      { path: '/', component: () => <Navigate href={'home'} /> },
      { path: '/home', component: () => <Home /> },
      {
        path: '/components/:component',
        component: () => <View />,
      },
      { path: '/*', component: () => <NotFound /> },
    ],
  },
];
