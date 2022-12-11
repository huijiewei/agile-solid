import { splitProps } from 'solid-js';
import { cx } from '@twind/core';
import { Loader } from '../loader/Loader';
import type { PrimitiveComponentProps } from '../utils/component';
import type { Size } from '../utils/types';

export type ButtonLoaderProps = {
  size: Size;
  label?: string;
  placement?: 'start' | 'end';
};

const loaderSizes: Record<string, Size> = {
  xs: 'xs',
  sm: 'sm',
  md: 'sm',
  lg: 'md',
  xl: 'lg',
};

export const ButtonLoader = (props: PrimitiveComponentProps<'span', ButtonLoaderProps>) => {
  const [local, rest] = splitProps(props, ['class', 'label', 'size', 'placement', 'children']);

  return (
    <span
      class={cx(
        'flex items-center',
        local.label ? 'relative' : 'absolute',
        local.placement == 'start' ? local.label && 'mr-2' : local.label && 'ml-2',
        local.class
      )}
      {...rest}
    >
      {local.children || <Loader size={loaderSizes[local.size]} />}
    </span>
  );
};
