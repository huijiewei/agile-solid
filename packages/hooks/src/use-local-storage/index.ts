import { isFunction } from '@agile-solid/utils';
import type { Accessor, Setter } from 'solid-js';
import { createEffect, createSignal } from 'solid-js';
import { useEventListener } from '../use-event-listener';

export const useLocalStorage = <T>(key: string, initialValue: (() => T) | T): [Accessor<T>, Setter<T>] => {
  const getStoredValue = () => {
    try {
      const item = localStorage.getItem(key);

      if (item) {
        return JSON.parse(item);
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    }

    return isFunction(initialValue) ? initialValue() : initialValue;
  };

  const [state, setState] = createSignal<T>(getStoredValue());

  createEffect(() => {
    const item = state();

    if (item != undefined) {
      try {
        window.localStorage.setItem(key, JSON.stringify(item));
      } catch (error) {
        console.warn(`Error writing localStorage key "${key}":`, error);
      }
    } else {
      try {
        window.localStorage.removeItem(key);
      } catch (error) {
        console.warn(`Error removing localStorage key "${key}":`, error);
      }
    }
  });

  useEventListener('storage', (e: StorageEvent) => {
    setState(e.newValue ? JSON.parse(e.newValue) : undefined);
  });

  return [state, setState];
};
