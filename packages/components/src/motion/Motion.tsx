import type { MotionPreset } from './MotionPresets';
import { MotionPresets } from './MotionPresets';
import { splitProps, untrack, useContext } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import type { MotionEventHandlers, MotionOptions } from './types';
import { createStyles } from '@motionone/dom';
import { combineStyle } from '../utils/style';
import { MotionContext, MotionPresenceContext } from './MotionContext';
import type { PrimitiveComponentProps } from '../utils/component';
import { mergeRefs } from '@agile-solid/hooks';
import { createMotionOneState } from './primitives';

export type MotionComponentProps = {
  /**
   * 预设动画
   * @default 'fade'
   */
  motionPreset?: MotionPreset;

  /**
   * 动画属性 @see https://www.framer.com/docs/component/#props
   */
  motionProps?: MotionOptions;
};

export const getMotionProps = (
  motionPreset: MotionPreset,
  motionProps: MotionOptions | undefined
): MotionOptions | undefined => {
  return { ...MotionPresets[motionPreset], ...motionProps };
};

export type MotionProps = PrimitiveComponentProps<'div', MotionEventHandlers & MotionOptions>;

export const Motion = (
  props: MotionProps & {
    tag?: string;
  }
) => {
  const [options, local, rest] = splitProps(
    props,
    ['initial', 'animate', 'inView', 'inViewOptions', 'hover', 'press', 'variants', 'transition', 'exit'],
    [
      'tag',
      'ref',
      'style',
      'onMotionStart',
      'onMotionComplete',
      'onHoverStart',
      'onHoverEnd',
      'onPressStart',
      'onPressEnd',
      'onViewEnter',
      'onViewLeave',
    ]
  );

  const state = createMotionOneState(
    () => root,
    () => ({ ...options }),
    useContext(MotionPresenceContext),
    useContext(MotionContext)
  );

  const style = createStyles(state.getTarget());

  let root!: Element;

  return (
    <MotionContext.Provider value={state}>
      <Dynamic
        component={untrack(() => local.tag || 'div')}
        ref={mergeRefs((el) => (root = el), local.ref)}
        style={local.style ? combineStyle(local.style, style) : style}
        on:motionstart={local.onMotionStart}
        on:motioncomplete={local.onMotionComplete}
        on:hoverstart={local.onHoverStart}
        on:hoverend={local.onHoverEnd}
        on:pressstart={local.onPressStart}
        on:pressend={local.onPressEnd}
        on:viewenter={local.onViewEnter}
        on:viewleave={local.onViewLeave}
        {...rest}
      />
    </MotionContext.Provider>
  );
};
