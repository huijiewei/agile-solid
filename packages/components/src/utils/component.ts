import type { Merge } from '@agile-solid/utils';
import type { JSX } from 'solid-js';
import type { Component } from 'solid-js/types/render/component';
import type { ComponentProps } from 'solid-js/types/render/component';

export type PrimitiveComponentProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  C extends keyof JSX.IntrinsicElements | Component<any>,
  Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }
> = Merge<ComponentProps<C>, Props>;

export type ValidElements = keyof JSX.IntrinsicElements;
export type ValidComponent<P> = (props: P) => JSX.Element;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ValidConstructor = ValidElements | ValidComponent<any>;
