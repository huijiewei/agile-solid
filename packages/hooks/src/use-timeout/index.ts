import { createEffect, onCleanup } from 'solid-js';

export const useTimeout = (callback: () => void, delay: number) => {
  if (delay < 0) {
    return;
  }

  createEffect(() => {
    const id = setTimeout(callback, delay);

    onCleanup(() => {
      clearTimeout(id);
    });
  });
};
