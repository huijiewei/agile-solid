import { createEffect, mergeProps, splitProps } from 'solid-js';
import { cx } from 'twind';
import type { PrimitiveComponentProps } from '../utils/component';
import type { ScaleColor, Size } from '../utils/types';
import { VisuallyHidden } from '../visually-hidden/VisuallyHidden';

export type LoaderProps = {
  /**
   * 大小
   * @default 'md'
   */
  size?: Size;

  /**
   * 提示文本
   * @default '加载中…'
   */
  label?: string;

  /**
   * 颜色
   */

  color?: ScaleColor;
};

const loaderSizes = {
  xs: 'h-3 w-3 border-2',
  sm: 'h-4 w-4 border-2',
  md: 'h-5 w-5 border-2',
  lg: 'h-6 w-6 border-[3px]',
  xl: 'h-7 w-7 border-[3px]',
};

export const Loader = (props: PrimitiveComponentProps<'span', LoaderProps>) => {
  const defaultProps = {
    size: 'md',
    label: '加载中...',
  };

  const propsWithDefault = mergeProps(defaultProps, props);

  const [local, rest] = splitProps(propsWithDefault, ['label', 'size', 'color', 'class', 'children']);

  return (
    <span
      class={cx(
        'inline-block animate-spin rounded-full',
        loaderSizes[local.size as Size],
        local.color
          ? `border-t-${local.color}-700 border-r-${local.color}-700 border-b-${local.color}-200 border-l-${local.color}-200`
          : 'border-t-current border-r-current border-b-transparent border-l-transparent',
        local.class
      )}
      {...rest}
    >
      <VisuallyHidden>{local.label || '加载中...'}</VisuallyHidden>
    </span>
  );
};
