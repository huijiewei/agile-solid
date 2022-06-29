import * as AgileUI from '@agile-solid/components';
import * as AgileIcon from '@agile-solid/icons';
import { splitProps } from 'solid-js';
import { MdxCode, MdxPre } from '../components/mdx-components/MdxCode';
import type { Props } from '../components/mdx-components/types';

export const components = {
  h1: (props: Props) => <h1 class={'text-xl font-bold'} {...props} />,
  h2: (props: Props) => {
    const [local, rest] = splitProps(props, ['children', 'className']);
    return (
      <h2 class={`text-lg font-bold ${local.className}`} {...rest}>
        {local.children}
        <a aria-hidden={true} href={`#${props.id}`}>
          #
        </a>
      </h2>
    );
  },
  h3: (props: Props) => {
    const [local, rest] = splitProps(props, ['children', 'className']);
    return (
      <h3 class={`text-lg font-bold ${local.className}`} {...rest}>
        {local.children}
        <a aria-hidden={true} href={`#${props.id}`}>
          #
        </a>
      </h3>
    );
  },
  h4: (props: Props) => {
    const [local, rest] = splitProps(props, ['children', 'className']);
    return (
      <h4 class={`text-lg font-bold ${local.className}`} {...rest}>
        {local.children}
        <a aria-hidden={true} href={`#${props.id}`}>
          #
        </a>
      </h4>
    );
  },
  h5: (props: Props) => {
    return <h5 class={'text-base font-bold'} {...props} />;
  },
  code: (props: Props) => <MdxCode {...props} />,
  pre: (props: Props) => <MdxPre {...props} />,
  ...AgileUI,
  ...AgileIcon,
};
