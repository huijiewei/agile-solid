import { ComponentProps, Show } from 'solid-js';
import { useLiveContext } from './LiveProvider';

export const LiveError = (props: Omit<ComponentProps<'div'>, 'children'>) => {
  const context = useLiveContext();

  return (
    <Show when={context?.error()}>
      <div {...props}>{context?.error()}</div>
    </Show>
  );
};
