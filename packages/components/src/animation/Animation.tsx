import { createEffect, createSignal, mergeProps, onCleanup, Show, splitProps } from 'solid-js';
import { tx } from 'twind';
import type { PrimitiveComponentProps } from '../utils/component';
import { Canceller, clearAnimationFrameTimeout, setAnimationFrameTimeout } from './utils';

export type AnimationBaseProps = {
  /**
   * 动画过渡
   * @default 'transition-opacity'
   */
  transition?: string;

  /**
   * 动画过渡
   * @default 300
   */
  duration?: number;

  /**
   * 进入效果
   * @default 'opacity-100'
   */
  enter?: string;

  /**
   * 离开效果
   * @default 'opacity-0'
   */
  exit?: string;
};

export type AnimationProps = AnimationBaseProps & {
  show: boolean;
};

export const Animation = (props: PrimitiveComponentProps<'div', AnimationProps>) => {
  const defaultProps = {
    enter: 'opacity-100',
    exit: 'opacity-0',
    duration: 300,
    transition: 'transition-opacity',
  };

  const propsWithDefault = mergeProps(defaultProps, props);

  const [local, rest] = splitProps(propsWithDefault, [
    'show',
    'class',
    'children',
    'enter',
    'exit',
    'duration',
    'transition',
  ]);

  const [stage, setStage] = createSignal('');
  const [shouldMount, setShouldMount] = createSignal(false);

  createEffect(() => {
    let timer: Canceller = {};

    clearAnimationFrameTimeout(timer);

    if (props.show) {
      setStage('from');
      setShouldMount(true);
      timer = setAnimationFrameTimeout(() => {
        setStage('enter');
      });
    } else {
      setStage('leave');
      timer = setAnimationFrameTimeout(() => {
        setShouldMount(false);
      }, local.duration);
    }

    onCleanup(() => {
      clearAnimationFrameTimeout(timer);
    });
  });

  return (
    <Show when={shouldMount()}>
      <div
        class={tx(
          `duration-[${local.duration}ms] ${local.transition}`,
          stage() == 'enter' ? local.enter : local.exit,
          local.class
        )}
        {...rest}
      >
        {local.children}
      </div>
    </Show>
  );
};
