import { Navigate } from 'solid-app-router';
import { DefaultLayout } from '../layouts/DefaultLayout';
import Home from '../views/site/Home';
import NotFound from '../views/site/NotFound';

export const routes = [
  {
    path: '/',
    component: () => <DefaultLayout />,
    children: [
      { path: '/', component: () => <Navigate href={'home'} /> },
      { path: '/home', component: () => <Home /> },
      { path: '/*', title: '页面不存在', component: () => <NotFound /> },
    ],
  },
];
