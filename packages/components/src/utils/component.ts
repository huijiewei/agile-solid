import type { Merge } from '@agile-solid/utils';
import type { JSX, Component, ComponentProps } from 'solid-js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ElementType<Props = any> = keyof JSX.IntrinsicElements | Component<Props>;

export type PolymorphicComponentProps<
  Type extends ElementType = ElementType,
  Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }
> = Merge<ComponentProps<Type>, Props & { as?: Type }>;

export type PrimitiveComponentProps<
  Type extends ElementType,
  Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }
> = Merge<ComponentProps<Type>, Props>;
