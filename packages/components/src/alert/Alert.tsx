import { cx } from '@twind/core';
import type { ScaleColor, Variant } from '../utils/types';
import { createContext, mergeProps, splitProps, useContext } from 'solid-js';
import type { PrimitiveComponentProps } from '../utils/component';
import { createStore } from 'solid-js/store';

export type AlertProps = {
  /**
   * 颜色
   * @default 'blue'
   */
  color?: ScaleColor;

  /**
   * 形式
   * @default 'light'
   */
  variant?: Variant;
};

const AlertContext = createContext<AlertProps>();

const useAlert = () => {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error('[Agile]: `useAlert` must be used within an `<Alert />` component');
  }

  return context;
};

const alertVariants = (color: ScaleColor) => {
  return {
    solid: `text-white border-transparent bg-${color}-500`,
    outline: `border-${color}-500 text-${color}-500 bg-white`,
    light: `border-transparent bg-${color}-100 text-${color}-500`,
  };
};

export const Alert = (props: PrimitiveComponentProps<'div', AlertProps>) => {
  const defaultProps = {
    color: 'blue' as ScaleColor,
    variant: 'light' as Variant,
  };

  const propsWithDefault = mergeProps(defaultProps, props);

  const [local, rest] = splitProps(propsWithDefault, ['class', 'children', 'color', 'variant']);

  const [state] = createStore<AlertProps>({
    get color() {
      return local.color;
    },
    get variant() {
      return local.variant;
    },
  });

  return (
    <AlertContext.Provider value={state}>
      <div
        role="alert"
        class={cx(
          'relative flex items-center gap-2 overflow-hidden rounded border p-3',
          alertVariants(local.color)[local.variant],
          local.class
        )}
        {...rest}
      >
        {local.children}
      </div>
    </AlertContext.Provider>
  );
};

export const AlertTitle = (props: PrimitiveComponentProps<'div'>) => {
  const [local, rest] = splitProps(props, ['class']);

  return <div class={cx('', local.class)} {...rest} />;
};

export const AlertDescription = (props: PrimitiveComponentProps<'div'>) => {
  const { variant } = useAlert();
  const [local, rest] = splitProps(props, ['class']);

  return <div class={cx(variant != 'solid' && 'text-black', local.class)} {...rest} />;
};

export const AlertIcon = (props: PrimitiveComponentProps<'span'>) => {
  const [local, rest] = splitProps(props, ['class']);

  return <span class={cx(`shrink-0`, local.class)} {...rest} />;
};
