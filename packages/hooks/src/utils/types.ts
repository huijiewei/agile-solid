import type { Accessor } from 'solid-js';

export type MaybeAccessor<T> = T | Accessor<T>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MaybeAccessorValue<T extends MaybeAccessor<any>> = T extends () => any ? ReturnType<T> : T;
