import { cx } from '@twind/core';
import type { PrimitiveComponentProps } from '../utils/component';
import type { Size } from '../utils/types';
import { splitProps } from 'solid-js';
import { Spinner } from '../spinner/Spinner';

export type ButtonSpinnerProps = {
  size: Size;
  label?: string;
  placement?: 'start' | 'end';
};

const SpinnerSizes: Record<string, Size> = {
  xs: 'xs',
  sm: 'sm',
  md: 'sm',
  lg: 'md',
  xl: 'lg',
};

export const ButtonSpinner = (props: PrimitiveComponentProps<'span', ButtonSpinnerProps>) => {
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
      {local.children || <Spinner size={SpinnerSizes[local.size]} />}
    </span>
  );
};
