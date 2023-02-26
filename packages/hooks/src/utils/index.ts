import type { MaybeAccessor, MaybeAccessorValue } from './types';
import { getOwner, onCleanup } from 'solid-js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const unAccessor = <T extends MaybeAccessor<any>>(v: T): MaybeAccessorValue<T> => {
  return typeof v === 'function' && !v.length ? v() : v;
};

export const tryOnCleanup: typeof onCleanup = (fn) => (getOwner() ? onCleanup(fn) : fn);

export const mergeRefs = <T extends Element>(...refs: (T | ((el: T) => void) | undefined)[]): ((el: T) => void) => {
  return (el: T) =>
    refs.forEach((ref) => {
      (ref as ((el: T) => void) | undefined)?.(el);
    });
};
