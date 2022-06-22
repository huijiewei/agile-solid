import { splitProps } from 'solid-js';
import type { JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { tx } from 'twind';
import type { PrimitiveComponentProps, ValidConstructor } from '../utils/component';
import { useButtonGroup } from './ButtonGroup';
import type { ButtonBaseProps } from './ButtonGroup';
import { ButtonLoader } from './ButtonLoader';

export type ButtonProps<T extends ValidConstructor = 'button'> = ButtonBaseProps & {
  as?: T;
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

export const Button = (props: PrimitiveComponentProps<'button', ButtonProps>) => {
  const [local, rest] = splitProps(props, [
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
    'as',
  ]);

  const group = useButtonGroup();

  return (
    <Dynamic
      component={local.as || 'button'}
      type={local.type}
      class={tx(
        'inline-flex select-none appearance-none items-center justify-center whitespace-nowrap border align-middle duration-300 transition-colors',
        group
          ? `first:(${group.vertical ? 'rounded-tl rounded-tr' : 'rounded-tl rounded-bl'}) last:(${
              group.vertical ? 'rounded-bl rounded-br' : 'rounded-tr rounded-br'
            })`
          : 'rounded',
        local.fullWidth ? 'w-full' : 'w-auto',
        (local.disabled || local.loading) && 'cursor-not-allowed opacity-60',
        buttonSizes[local.size || 'md'],
        buttonVariants(
          local.color || 'blue',
          local.disabled || local.loading || false,
          local.active || false,
          group && { vertical: group.vertical || false }
        )[local.variant || 'solid'],
        local.class
      )}
      disabled={local.disabled || local.loading}
      {...rest}
    >
      {local.loading && local.loaderPlacement != 'end' && (
        <ButtonLoader size={local.size || 'md'} label={local.loadingText} placement="start">
          {local.loader}
        </ButtonLoader>
      )}
      {local.loading ? local.loadingText || <span class={'opacity-0'}>{local.children}</span> : local.children}
      {local.loading && local.loaderPlacement == 'end' && (
        <ButtonLoader size={local.size || 'md'} label={local.loadingText} placement="end">
          {local.loader}
        </ButtonLoader>
      )}
    </Dynamic>
  );
};
