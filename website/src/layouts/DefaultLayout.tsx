import { Outlet } from 'solid-app-router';
import { tw } from 'twind';
import { LayoutAside } from './LayoutAside';
import { LayoutFooter } from './LayoutFooter';
import { LayoutHeader } from './LayoutHeader';

export const DefaultLayout = () => {
  return (
    <>
      <LayoutHeader />
      <div class={tw('text-slate-900 mx-auto max-w-7xl')}>
        <LayoutAside />
        <div class={'tablet:pl-52'}>
          <main class={'mx-auto h-full p-5'}>
            <Outlet />
          </main>
          <LayoutFooter />
        </div>
      </div>
    </>
  );
};
