import type { Accessor, Setter } from 'solid-js';
import { createEffect, createSignal } from 'solid-js';
import { MaybeFunction, runIfFn } from '@agile-solid/utils';
import { createEventListener } from '../create-event-listener';
export const createLocalStorage = <T>(key: string, initialValue: MaybeFunction<T>): [Accessor<T>, Setter<T>] => {
  const getStoredValue = () => {
    try {
      const item = localStorage.getItem(key);

      if (item) {
        return JSON.parse(item);
      }
    } catch (error) {
      console.warn(`[Agile]: Error reading ${key} in localStorage`);
    }

    return runIfFn(initialValue);
  };

  const [state, setState] = createSignal<T>(getStoredValue());

  createEffect(() => {
    const item = state();

    try {
      if (item != undefined) {
        localStorage.setItem(key, JSON.stringify(item));
      } else {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`[Agile]: Error writing ${key} to localStorage`);
    }
  });

  createEventListener('storage', (e: StorageEvent) => {
    if (e.key != key || e.storageArea != localStorage) {
      return;
    }

    setState(e.newValue ? JSON.parse(e.newValue) : undefined);
  });

  return [state, setState];
};
