import { Accessor, createSignal } from 'solid-js';
import { isBrowser } from '@agile-solid/utils';
import { createEventListener } from '../create-event-listener';

export const createMediaQuery = (query: string, fallbackState = false): Accessor<boolean> => {
  if (!isBrowser()) {
    return () => fallbackState;
  }

  const mql = window.matchMedia(query);

  const [state, setState] = createSignal(mql.matches);

  createEventListener('change', () => setState(mql.matches), mql);

  return state;
};
