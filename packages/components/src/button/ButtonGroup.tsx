import { createContext, mergeProps, splitProps, useContext } from 'solid-js';
import { cx } from 'twind';
import type { PrimitiveComponentProps } from '../utils/component';
import type { ScaleColor, Size } from '../utils/types';

export type ButtonBaseProps = {
  /**
   * 形式
   * @default 'solid'
   */
  variant?: 'solid' | 'outline' | 'light' | 'subtle' | 'link';

  /**
   * 颜色
   * @default 'blue'
   */
  color?: ScaleColor;

  /**
   * 大小
   * @default 'md'
   */
  size?: Size;

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
};

export type ButtonGroupProps = ButtonBaseProps & {
  vertical?: boolean;
};

const ButtonGroupContext = createContext<ButtonGroupProps>();

export const useButtonGroup = () => useContext(ButtonGroupContext);

export const ButtonGroup = (props: PrimitiveComponentProps<'div', ButtonGroupProps>) => {
  const defaultProps: ButtonGroupProps = {
    size: 'md',
    color: 'blue',
    variant: 'solid',
    vertical: false,
  };

  const propsWithDefault = mergeProps(defaultProps, props);

  const [local, rest] = splitProps(propsWithDefault, ['size', 'color', 'variant', 'vertical', 'children', 'class']);

  return (
    <div role={'group'} class={cx('inline-flex', local.vertical ? 'flex-col' : 'flex-row', local.class)} {...rest}>
      <ButtonGroupContext.Provider
        value={{ size: local.size, color: local.color, variant: local.variant, vertical: local.vertical }}
      >
        {local.children}
      </ButtonGroupContext.Provider>
    </div>
  );
};
