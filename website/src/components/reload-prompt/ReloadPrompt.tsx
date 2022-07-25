import { Button } from '@agile-solid/components';
import { Animation } from '@agile-solid/components';
import { Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import { useRegisterSW } from 'virtual:pwa-register/solid';

export const ReloadPrompt = () => {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered() {
      console.log(`SW Registered success`);
    },
    onRegisterError(error) {
      console.error('SW registration error', error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    <Portal>
      <Animation
        role={'alert'}
        transition={'transition-transform'}
        enter={'translate-x-0'}
        exit={'translate-x-full'}
        duration={3000}
        show={offlineReady() || needRefresh()}
        class={'z-50 fixed right-0 bottom-0 m-5 p-3 text-sm rounded shadow bg-lime-50 border border-lime-300'}
      >
        <div class={'mb-3'}>
          <Show fallback={<span>新内容可用，单击重新加载按钮进行更新。</span>} when={offlineReady()}>
            <span>应用程序已准备好离线工作</span>
          </Show>
        </div>
        <div class={'flex flex-row gap-2'}>
          <Show when={needRefresh()}>
            <Button size={'xs'} color={'orange'} variant={'outline'} onClick={() => updateServiceWorker(true)}>
              重新加载
            </Button>
          </Show>
          <Button size={'xs'} color={'lime'} variant={'outline'} onClick={() => close()}>
            关闭
          </Button>
        </div>
      </Animation>
    </Portal>
  );
};
