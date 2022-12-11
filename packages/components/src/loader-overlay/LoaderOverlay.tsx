import { isFunction } from '@agile-solid/utils';
import { children, createComponent, createEffect, createMemo, JSX, mergeProps, splitProps } from 'solid-js';
import { cx } from '@twind/core';
import { Animation } from '../animation/Animation';
import { Loader } from '../loader/Loader';
import { Overlay } from '../overlay/Overlay';
import type { PrimitiveComponentProps } from '../utils/component';
import type { Color } from '../utils/types';

export type LoaderOverlayProps = {
  /**
   * 动画过渡
   * @default 300
   */
  duration?: number;

  /**
   * 圆角效果
   * @default false
   */
  radius?: number | string | boolean;

  /**
   * 透明度
   * @default 75
   */
  opacity?: number;

  /**
   * 颜色
   * @default 'white'
   */
  color?: Color;

  /**
   * 模糊效果
   * @default 0
   */
  blur?: number;

  /**
   * 是否可见
   */
  visible: boolean;
};

export const LoaderOverlay = (props: PrimitiveComponentProps<'div', LoaderOverlayProps>) => {
  const defaultProps = {
    opacity: 75,
    color: 'white' as Color,
    children: <Loader size={'xl'} color={'blue'} />,
  };

  const propsWithDefault = mergeProps(defaultProps, props);

  const [local, rest] = splitProps(propsWithDefault, [
    'duration',
    'visible',
    'radius',
    'opacity',
    'color',
    'blur',
    'children',
    'class',
  ]);

  const getChildren = children(() => local.children);

  createEffect(() => {
    const child = getChildren() as Element;
    child.classList.add('z-50');
  });

  return (
    <Animation
      duration={local.duration}
      show={local.visible}
      class={cx('absolute inset-0 z-30 flex items-center justify-center overflow-hidden', local.class)}
      {...rest}
    >
      {local.children}
      <Overlay radius={local.radius} inverse={true} opacity={local.opacity} color={local.color} blur={local.blur} />
    </Animation>
  );
};
