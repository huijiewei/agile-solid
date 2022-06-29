import { mergeProps, splitProps } from 'solid-js';
import { cx } from 'twind';
import type { PrimitiveComponentProps } from '../utils/component';
import type { Size } from '../utils/types';

export type InputProps = {
  /**
   * 大小
   * @default 'md'
   */
  size?: Size;

  invalid?: boolean;

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;

  /**
   * 是否必填
   * @default false
   */
  required?: boolean;

  /**
   * 是否只读
   * @default false
   */
  readOnly?: boolean;

  /**
   * 是否全宽度
   * @default false
   */
  fullWidth?: boolean;
};

const inputSizes = {
  xs: 'h-6 leading-6 px-2 text-sm',
  sm: 'h-7 leading-7 px-2',
  md: 'h-8 leading-8 px-3',
  lg: 'h-9 leading-9 px-3',
  xl: 'h-10 leading-10 px-3 text-lg',
};

/**
 * 输入框
 */
export const Input = (props: PrimitiveComponentProps<'input', InputProps>) => {
  const defaultProps = {
    size: 'md' as Size,
  };

  const propsWithDefault = mergeProps(defaultProps, props);

  const [local, rest] = splitProps(propsWithDefault, [
    'size',
    'invalid',
    'disabled',
    'required',
    'readOnly',
    'fullWidth',
    'class',
  ]);

  return (
    <input
      class={cx(
        'border border-slate-300 rounded outline-none appearance-none resize-none text-left leading-none',
        'bg-white dark:bg-slate-900',
        'focus:border-blue-500',
        'transition-[border-color]',
        local.fullWidth ? 'w-full' : '',
        inputSizes[local.size],
        local.disabled && 'opacity-60 cursor-not-allowed',
        local.class
      )}
      aria-invalid={local.invalid}
      aria-readonly={local.readOnly}
      aria-required={local.required}
      required={local.required}
      disabled={local.disabled}
      readOnly={local.readOnly}
      {...rest}
    />
  );
};
