import { Navigate } from 'solid-app-router';
import { lazy } from 'solid-js';
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
        path: '/components',
        component: () => <View />,
        children: [
          {
            path: '/button',
            component: lazy(() => import('../docs/components/Button.mdx')),
          },
          { path: '/*', component: () => lazy(() => import('../views/components/NotFound')) },
        ],
      },
      { path: '/*', component: () => <NotFound /> },
    ],
  },
];
