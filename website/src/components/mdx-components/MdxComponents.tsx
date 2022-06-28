import { children, splitProps } from 'solid-js';
import type { ComponentProps } from 'solid-js';
import * as AgileUI from '@agile-solid/components';
import * as AgileIcon from '@agile-solid/icons';
import { Dynamic } from 'solid-js/web';
import { cx } from 'twind';

export const components = {
  h1: (props: ComponentProps<'h1'>) => <h1 class={'text-xl font-bold'} {...props} />,
  h2: (props: ComponentProps<'h2'>) => {
    const [local, rest] = splitProps(props, ['children', 'class']);
    return (
      <h2 class={cx('text-lg font-bold', local.class)} {...rest}>
        {local.children}
        <a aria-hidden={true} href={`#${props.id}`}>
          #
        </a>
      </h2>
    );
  },
  h3: (props: ComponentProps<'h3'>) => <h3 class={'text-lg font-bold'} {...props} />,
  h4: (props: ComponentProps<'h4'>) => <h4 class={'text-lg font-bold'} {...props} />,
  h5: (props: ComponentProps<'h5'>) => <h5 class={'text-base font-bold'} {...props} />,
  code: (props: ComponentProps<'code'>) => {
    return <Dynamic component={'pre'} {...props} />;
  },
  pre: (props: ComponentProps<'pre'>) => {
    const [local, rest] = splitProps(props, ['children']);

    const code = children(() => local.children);

    return <Dynamic component={code} {...rest} />;
  },
  ...AgileUI,
  ...AgileIcon,
};
