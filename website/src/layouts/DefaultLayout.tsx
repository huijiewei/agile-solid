import { Outlet } from '@solidjs/router';
import { Suspense } from 'solid-js';
import { LazyLoading } from '../components/lazy-loading/LazyLoading';
import { LayoutAside } from './LayoutAside';
import { LayoutFooter } from './LayoutFooter';
import { LayoutHeader } from './LayoutHeader';
import { LayoutProvider } from './LayoutProvider';

export const DefaultLayout = () => {
  return (
    <LayoutProvider>
      <LayoutHeader />
      <div class={'text-gray-800 mx-auto max-w-7xl'}>
        <LayoutAside />
        <div class={'tablet:pl-52'}>
          <main class={'mx-auto h-full p-5'}>
            <Suspense fallback={<LazyLoading class={'h-96'} />}>
              <Outlet />
            </Suspense>
          </main>
          <LayoutFooter />
        </div>
      </div>
    </LayoutProvider>
  );
};
