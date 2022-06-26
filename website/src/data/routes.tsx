import { Navigate } from 'solid-app-router';
import { lazy } from 'solid-js';
import { DefaultLayout } from '../layouts/DefaultLayout';
import View from '../views/components/View';
import Home from '../views/site/Home';
import NotFound from '../views/site/NotFound';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const MdxButton = lazy(() => import(`../docs/components/Button.mdx`));

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
            component: () => <MdxButton />,
          },
        ],
      },
      { path: '/*', component: () => <NotFound /> },
    ],
  },
];
