import { isFunction } from '@agile-solid/utils';
import type { Accessor, Setter } from 'solid-js';
import { createEffect, createSignal, onCleanup } from 'solid-js';

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

  createEffect(() => {
    const handleChange = (e: StorageEvent) => {
      setState(e.newValue ? JSON.parse(e.newValue) : undefined);
    };

    window.addEventListener('storage', handleChange);

    onCleanup(() => {
      window.removeEventListener('storage', handleChange);
    });
  });

  return [state, setState];
};
