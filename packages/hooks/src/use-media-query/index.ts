import { isBrowser } from '@agile-solid/utils';
import { createSignal, onCleanup } from 'solid-js';

export const useMediaQuery = (query: string) => {
  if (!isBrowser()) {
    return () => false;
  }

  const media = window.matchMedia(query);

  const [matches, setMatches] = createSignal(media.matches);

  const handleChange = () => {
    setMatches(media.matches);
  };

  media.addEventListener('change', handleChange);

  onCleanup(() => {
    media.removeEventListener('change', handleChange);
  });

  return matches;
};
