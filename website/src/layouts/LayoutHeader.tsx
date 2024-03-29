import { Tooltip, VisuallyHidden } from '@agile-solid/components';
import { Github, Menu, Close } from '@agile-solid/icons';
import { Show } from 'solid-js';
import LogoImage from '../assets/images/logo.svg';
import { ThemeSwitcher } from '../components/theme-switcher/ThemeSwicher';
import { useLayoutContext } from './LayoutProvider';

export const LayoutHeader = () => {
  const { showAside, setShowAside } = useLayoutContext();

  return (
    <header
      class={
        'sticky h-16 top-0 z-30 w-full border-b border-gray-200 bg-opacity-70 bg-white dark:bg-gray-900 py-3 backdrop-blur'
      }
    >
      <div class={'mx-auto flex max-w-7xl items-center justify-between px-3 tablet:px-5'}>
        <button
          onClick={() => setShowAside((prev) => !prev)}
          class={'block tablet:hidden p-2 text-gray-500 appearance-none select-none hover:text-gray-700'}
          type={'button'}
        >
          <Show when={showAside()} fallback={<Menu class={'h-5 w-5'} />}>
            <Close class={'h-5 w-5'} />
          </Show>
        </button>
        <div class={'flex flex-row items-center'}>
          <img
            width={'36'}
            height={'36'}
            class={'inline-block align-middle mt-[1px] -mb-[1px]'}
            alt={'Agile UI'}
            src={LogoImage}
          />
          <span class={'ml-1.5 inline-block align-middle text-[1.5rem] font-bold'}>Agile Solid</span>
          <span
            class={
              'ml-3 hidden tablet:inline-block rounded-sm bg-gray-100 px-1.5 py-0.5 align-middle text-xs font-bold text-orange-700'
            }
          >
            ALPHA
          </span>
        </div>
        <div class={'flex flex-row items-center gap-2'}>
          <ThemeSwitcher />
          <Tooltip placement={'bottom'} content={'Github 上的 Agile UI'}>
            <a
              class={'block border-gray-300 rounded p-1 border text-gray-500 select-none hover:text-gray-700'}
              rel="noreferrer"
              href="https://github.com/huijiewei/agile-solid"
              target="_blank"
            >
              <VisuallyHidden>Github 上的 Agile UI</VisuallyHidden>
              <Github class={'h-5 w-5'} />
            </a>
          </Tooltip>
        </div>
      </div>
    </header>
  );
};
