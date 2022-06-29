import { isBoolean, isNumber } from '@agile-solid/utils';
import { mergeProps, Show, splitProps } from 'solid-js';
import { cx } from 'twind';
import type { PrimitiveComponentProps } from '../utils/component';
import type { Color } from '../utils/types';

export type OverlayProps = {
  /**
   * 透明度
   * @default 60
   */
  opacity?: number;

  /**
   * 颜色
   * @default 'black'
   */
  color?: Color;

  /**
   * 模糊效果
   * @default 0
   */
  blur?: number;

  /**
   * 圆角大小
   * @default false
   */
  radius?: number | string | boolean;

  /**
   * 反色效果
   * @default false
   */
  inverse?: boolean;
};

export const Overlay = (props: PrimitiveComponentProps<'div', OverlayProps>) => {
  const defaultProps = {
    opacity: 60,
    color: 'black',
    inverse: false,
    radius: false,
    blur: 0,
  };

  const propsWithDefault = mergeProps(defaultProps, props);

  const [local, rest] = splitProps(propsWithDefault, ['class', 'opacity', 'color', 'inverse', 'radius', 'blur']);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const overlay = (other?: Record<string, any>) => {
    return (
      <div
        class={cx(
          'absolute inset-0 z-20',
          local.color == 'white'
            ? 'bg-white dark:bg-black'
            : local.color == 'black'
            ? 'bg-black dark:bg-white'
            : local.inverse
            ? `bg-${local.color}-100`
            : `bg-${local.color}-500`,
          local.opacity > 1 ? `opacity-${local.opacity}` : `opacity-[${local.opacity}]`,
          isBoolean(local.radius) && local.radius
            ? 'rounded'
            : isNumber(local.radius)
            ? `rounded-[${local.radius}px]`
            : `rounded-${local.radius}`,
          local.class
        )}
        {...other}
      />
    );
  };

  return (
    <Show when={local.blur} fallback={overlay(rest)}>
      <div
        class={cx(
          'absolute inset-0 z-10',
          `backdrop-blur-[${blur}px]`,
          isNumber(local.radius) ? `rounded-[${local.radius}px]` : `rounded-${local.radius}`,
          local.class
        )}
        {...rest}
      >
        {overlay()}
      </div>
    </Show>
  );
};
