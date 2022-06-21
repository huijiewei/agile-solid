import { createEffect, createSignal, onCleanup } from 'solid-js';

export const useMediaQuery = (query: string) => {
  if (typeof window === 'undefined') {
    return () => false;
  }

  const media = window.matchMedia(query);

  const [state, setState] = createSignal(media.matches);

  createEffect(() => {
    const handleChange = () => {
      setState(media.matches);
    };

    media.addEventListener('change', handleChange);

    onCleanup(() => {
      media.removeEventListener('change', handleChange);
    });
  });

  return state;
};