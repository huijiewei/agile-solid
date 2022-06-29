import { NavLink } from 'solid-app-router';
import { For } from 'solid-js';
import { cx } from 'twind';
import { menus } from '../data/menus';
import { useLayoutContext } from './LayoutProvider';

export const LayoutAside = () => {
  const { showAside, setShowAside } = useLayoutContext();
  return (
    <aside
      role={showAside() ? 'dialog' : undefined}
      class={cx(
        showAside() ? `w-full translate-x-0 bg-white dark:bg-slate-900` : 'translate-x-[-100%]',
        'tablet:(translate-x-0 w-52) transition-transform duration-300',
        'fixed bottom-0 top-16 z-30 border-r border-r-slate-200',
        'overscroll-contain overflow-y-auto overflow-x-hidden',
        '&::-webkit-scrollbar:(w-[9px] h-[9px]) &::-webkit-scrollbar-thumb:(border-([3px] solid transparent) bg-clip-padding bg-gray-300 rounded-[5px])'
      )}
    >
      <nav class={'relative'}>
        <ul class={'space-y-3 p-5'}>
          <For each={menus} fallback={<div>Loading...</div>}>
            {(menu) => (
              <li>
                <h5 class={'mb-3 font-bold'}>
                  {menu.path ? (
                    <NavLink
                      onClick={() => setShowAside(false)}
                      activeClass={'text-blue-700'}
                      inactiveClass={'hover:text-slate-500'}
                      href={menu.path}
                    >
                      {menu.label}
                    </NavLink>
                  ) : (
                    menu.label
                  )}
                </h5>
                {menu.children && (
                  <ul class={'space-y-2.5 border-l border-l-slate-200'}>
                    <For each={menu.children} fallback={<div>Loading...</div>}>
                      {(child) => (
                        <li>
                          <NavLink
                            onClick={() => setShowAside(false)}
                            activeClass={'border-l-blue-600 text-blue-700'}
                            inactiveClass={'text-slate-500 hover:border-l-slate-600 hover:text-slate-700'}
                            class={'-ml-px block border-l border-transparent pl-4 font-medium'}
                            href={child.path}
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      )}
                    </For>
                  </ul>
                )}
              </li>
            )}
          </For>
        </ul>
      </nav>
    </aside>
  );
};
