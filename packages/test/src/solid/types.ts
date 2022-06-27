import type { BoundFunction, prettyFormat, queries, Queries } from '@testing-library/dom';
import type { JSX } from 'solid-js';

export type Ref = {
  container: HTMLElement;
  dispose: () => void;
};

export type Ui = () => JSX.Element;

export type RenderOptions<Q extends Queries = typeof queries> = {
  container?: HTMLElement;
  baseElement?: HTMLElement;
  queries?: Q;
  hydrate?: boolean;
};

export type RenderResult<Q extends Queries = typeof queries> = {
  container: HTMLElement;
  baseElement: HTMLElement;
  debug: (
    baseElement?: HTMLElement | HTMLElement[],
    maxLength?: number,
    options?: prettyFormat.OptionsReceived
  ) => void;
  unmount: () => void;
} & { [P in keyof Q]: BoundFunction<Q[P]> };
