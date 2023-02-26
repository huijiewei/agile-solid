import type { Merge } from '@agile-solid/utils';
import type { JSX, Component, ComponentProps } from 'solid-js';

export type DOMElements = keyof JSX.IntrinsicElements;

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/ban-types
export type ElementType<Props = any> = DOMElements | Component<Props> | (string & {});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type As<Props = any> = ElementType<Props>;

// eslint-disable-next-line @typescript-eslint/ban-types
export type PolymorphicProps<Type extends As = As, Props = {}> = Merge<
  ComponentProps<Type>,
  Props & { as?: Type | As }
>;

// eslint-disable-next-line @typescript-eslint/ban-types
export type PrimitiveComponentProps<Type extends ElementType = ElementType, Props = {}> = Merge<
  ComponentProps<Type>,
  Props
>;

// eslint-disable-next-line @typescript-eslint/ban-types
export type PolymorphicComponent<DefaultType extends As, Props = {}> = {
  <Type extends As>(props: PolymorphicProps<Type, Props> & { as: Type }): JSX.Element;
  (props: PolymorphicProps<DefaultType, Props>): JSX.Element;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export function createPolymorphicComponent<DefaultType extends As, Props = {}>(
  component: Component<PolymorphicProps<DefaultType, Props>>
) {
  return component as unknown as PolymorphicComponent<DefaultType, Props>;
}
