import { createEffect, createRenderEffect } from 'solid-js';
import { isBrowser, isFunction } from '@agile-solid/utils';
import type { MaybeAccessor } from '../utils/types';
import { tryOnCleanup, unAccessor } from '../utils';

export const createInterval = (fn: VoidFunction, delay: MaybeAccessor<number | null>) => {
  const delayValue = unAccessor(delay);

  if (!isBrowser() || delayValue == null) {
    return;
  }

  const register = () => {
    const intervalId = setInterval(fn, delayValue);

    tryOnCleanup(() => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    });
  };

  if (isFunction(delay)) {
    createEffect(register);
  } else {
    createRenderEffect(register);
  }
};

export const createTimeout = (fn: VoidFunction, delay: MaybeAccessor<number | null>) => {
  const delayValue = unAccessor(delay);

  if (!isBrowser() || delayValue == null) {
    return;
  }

  const register = () => {
    const timeoutId = setTimeout(fn, delayValue);

    tryOnCleanup(() => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    });
  };

  if (isFunction(delay)) {
    createEffect(register);
  } else {
    createRenderEffect(register);
  }
};
