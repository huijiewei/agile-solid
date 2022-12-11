import { mergeProps, Show, splitProps } from 'solid-js';
import type { JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { cx } from '@twind/core';
import type { PolymorphicComponentProps } from '../utils/component';
import { useButtonGroup } from './ButtonGroup';
import type { ButtonBaseProps } from './ButtonGroup';
import { ButtonLoader } from './ButtonLoader';

export type ButtonProps = ButtonBaseProps & {
  /**
   * 类型
   * @default 'button'
   */
  type?: 'submit' | 'reset' | 'button';

  /**
   * 是否激活
   * @default false
   */
  active?: boolean;

  /**
   * 是否加载中
   * @default false
   */
  loading?: boolean;

  /**
   * 加载文本
   */
  loadingText?: string;

  /**
   * 是否全宽度
   * @default false
   */
  fullWidth?: boolean;

  /**
   * 加载器
   */
  loader?: JSX.Element;

  /**
   * 加载器位置
   * @default 'start'
   */
  loaderPlacement?: 'start' | 'end';
};

const buttonSizes = {
  xs: 'h-6 px-2 text-sm',
  sm: 'h-7 px-2',
  md: 'h-8 px-3',
  lg: 'h-9 px-5',
  xl: 'h-10 px-5 text-lg',
};

const buttonVariants = (color: string, disabled: boolean, active: boolean, group?: { vertical: boolean }) => {
  return {
    solid: [
      `text-white dark:text-black border-transparent`,
      active ? `bg-${color}-800` : `bg-${color}-600`,
      !disabled && !active && `hover:bg-${color}-700 active:bg-${color}-800`,
      group && `not-last-child:(border-${group.vertical ? 'b' : 'r'}-current)`,
    ],
    outline: [
      `border-current text-${color}-600`,
      active ? `bg-${color}-100` : `bg-white dark:bg-black`,
      !disabled && !active && `hover:bg-${color}-50 active:bg-${color}-100`,
      group && `not-first-child:(-m${group.vertical ? 't' : 'l'}-[1px])`,
    ],
    light: [
      `border-transparent text-${color}-700`,
      active ? `bg-${color}-200` : `bg-${color}-50`,
      !disabled && !active && `hover:bg-${color}-100 active:bg-${color}-200`,
      group && `not-last-child:(border-${group.vertical ? 'b' : 'r'}-${color}-100)`,
    ],
    subtle: [
      `border-transparent text-${color}-700`,
      active ? `bg-${color}-200` : ``,
      !disabled && !active && `hover:bg-${color}-100 active:bg-${color}-200`,
    ],
    link: [
      `border-transparent underline underline-offset-2`,
      active ? `text-${color}-900` : `text-${color}-600`,
      !disabled && !active && ` hover:text-${color}-900 active:text-${color}-900`,
    ],
  };
};

export const Button = (props: PolymorphicComponentProps<'button', ButtonProps>) => {
  const group = useButtonGroup();

  const defaultProps = {
    as: 'button',
    size: group?.size || 'md',
    color: group?.color || 'blue',
    variant: group?.variant || 'solid',
    active: false,
    disabled: group?.disabled || false,
    loading: false,
    fullWidth: false,
    loaderPlacement: 'start',
  };

  const propsWithDefault = mergeProps(defaultProps, props);

  const [local, rest] = splitProps(propsWithDefault, [
    'as',
    'type',
    'size',
    'color',
    'variant',
    'disabled',
    'active',
    'fullWidth',
    'children',
    'class',
    'loading',
    'loadingText',
    'loader',
    'loaderPlacement',
  ]);

  return (
    <Dynamic
      component={local.as}
      type={local.type}
      class={cx(
        'inline-flex select-none appearance-none items-center justify-center whitespace-nowrap border align-middle duration-300 transition-colors',
        group
          ? `first:(${group.vertical ? 'rounded-tl rounded-tr' : 'rounded-tl rounded-bl'}) last:(${
              group.vertical ? 'rounded-bl rounded-br' : 'rounded-tr rounded-br'
            })`
          : 'rounded',
        local.fullWidth ? 'w-full' : 'w-auto',
        (local.disabled || local.loading) && 'cursor-not-allowed opacity-60',
        buttonSizes[local.size],
        buttonVariants(
          local.color,
          local.disabled || local.loading,
          local.active,
          group && { vertical: group.vertical || false }
        )[local.variant],
        local.class
      )}
      disabled={local.disabled || local.loading}
      {...rest}
    >
      <Show when={local.loading && local.loaderPlacement == 'start'}>
        <ButtonLoader size={local.size} label={local.loadingText} placement="start">
          {local.loader}
        </ButtonLoader>
      </Show>
      <Show when={local.loading} fallback={local.children}>
        <Show fallback={<span class={'opacity-0'}>{local.children}</span>} when={local.loadingText}>
          {local.loadingText}
        </Show>
      </Show>
      <Show when={local.loading && local.loaderPlacement == 'end'}>
        <ButtonLoader size={local.size} label={local.loadingText} placement="end">
          {local.loader}
        </ButtonLoader>
      </Show>
    </Dynamic>
  );
};
