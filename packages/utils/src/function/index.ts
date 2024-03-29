// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (value: unknown): value is Function => {
  return typeof value === 'function';
};

export type MaybeFunction<T, Args extends unknown[] = []> = T | ((...args: Args) => T);

export const runIfFn = <T, U>(valueOrFn: T | ((...fnArgs: U[]) => T), ...args: U[]): T => {
  return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Noop = (...a: any[]) => void;

export const noop = (() => void 0) as Noop;
