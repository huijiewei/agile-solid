import { tx } from 'twind';
import { LayoutNavMenu } from './LayoutNavMenu';

export const LayoutAside = () => {
  return (
    <aside
      class={tx(
        'hidden',
        'tablet:block',
        'fixed bottom-0 top-[3.8125rem] z-20 w-52 overscroll-contain border-r border-r-slate-200 overflow-y-auto',
        '&::-webkit-scrollbar:(w-[9px] h-[9px]) &::-webkit-scrollbar-thumb:(border-([3px] solid transparent) bg-clip-padding bg-gray-300 rounded-[5px])'
      )}
    >
      <LayoutNavMenu />
    </aside>
  );
};
