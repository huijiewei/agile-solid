import { splitProps } from 'solid-js';
import type { JSX } from 'solid-js';

export const VisuallyHidden = (props: JSX.HTMLAttributes<HTMLSpanElement>) => {
  const [local, rest] = splitProps(props, ['children']);

  return (
    <span {...rest} class={'sr-only'}>
      {local.children}
    </span>
  );
};
