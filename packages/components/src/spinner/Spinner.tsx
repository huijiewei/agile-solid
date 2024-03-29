import { cx } from '@twind/core';
import type { ScaleColor, Size } from '../utils/types';
import { VisuallyHidden } from '../visually-hidden/VisuallyHidden';
import { mergeProps, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { createPolymorphicComponent } from '../utils/component';

export type SpinnerProps = {
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
   * @default 'blue'
   */
  color?: ScaleColor;
};

const SpinnerSizes = {
  xs: 'h-3 w-3 border-2',
  sm: 'h-4 w-4 border-2',
  md: 'h-5 w-5 border-2',
  lg: 'h-6 w-6 border-[3px]',
  xl: 'h-7 w-7 border-[3px]',
};

/**
 * 加载器
 */
export const Spinner = createPolymorphicComponent((props) => {
  const defaultProps = {
    as: 'span',
    size: 'md',
    color: 'blue',
    label: '加载中...',
  };

  const propsWithDefault = mergeProps(defaultProps, props);

  const [local, rest] = splitProps(propsWithDefault, ['as', 'label', 'size', 'color', 'class', 'children']);

  return (
    <Dynamic
      component={local.as}
      class={cx(
        'inline-block animate-spin rounded-full',
        SpinnerSizes[local.size as Size],
        local.color
          ? `border-t-${local.color}-700 border-r-${local.color}-700 border-b-${local.color}-200 border-l-${local.color}-200`
          : 'border-t-current border-r-current border-b-transparent border-l-transparent',
        local.class
      )}
      {...rest}
    >
      <VisuallyHidden>{local.label || '加载中...'}</VisuallyHidden>
    </Dynamic>
  );
});
