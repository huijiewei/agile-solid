import { isFunction } from '@agile-solid/utils';
import { autoPlacement, autoUpdate, flip, offset, shift } from '@floating-ui/dom';
import type { Placement } from '@floating-ui/dom';
import {
  children,
  createEffect,
  createMemo,
  createSignal,
  createUniqueId,
  JSXElement,
  mergeProps,
  onCleanup,
  Show,
  splitProps,
} from 'solid-js';
import { cx } from '@twind/core';
import type { PrimitiveComponentProps } from '../utils/component';
import type { ScaleColor } from '../utils/types';
import { FloatingArrow } from '../floating/FloatingArrow';
import { createFloating } from '../floating/createFloating';
import { Portal } from 'solid-js/web';
import { mergeRefs } from '@agile-solid/hooks';
import { getMotionProps, Motion, MotionComponentProps } from '../motion/Motion';
import type { MotionPreset } from '../motion/MotionPresets';
import { MotionPresence } from '../motion/MotionPresence';

export type TooltipProps = {
  /**
   * 提示内容
   */
  content: JSXElement;

  /**
   * 放置位置
   * @default 'auto'
   */
  placement?: 'auto' | Placement;

  /**
   * 显示箭头
   * @default true
   */
  arrow?: boolean;

  /**
   * 颜色
   * @default 'slate'
   */
  color?: ScaleColor;
} & MotionComponentProps;

export const Tooltip = (props: PrimitiveComponentProps<'div', TooltipProps>) => {
  const propsWithDefault = mergeProps(
    {
      placement: 'auto',
      arrow: true,
      color: 'gray',
      motionPreset: 'fade' as MotionPreset,
    },
    props
  );

  const [local, rest] = splitProps(propsWithDefault, [
    'class',
    'children',
    'content',
    'placement',
    'arrow',
    'color',
    'ref',
    'motionPreset',
    'motionProps',
  ]);

  const id = createUniqueId();

  const [open, setOpen] = createSignal(false);

  const resolved = children(() => local.children);

  const reference = createMemo(() => {
    let el = resolved() as Element;

    while (isFunction(el)) {
      el = el();
    }

    return el;
  });

  const [floating, setFloating] = createSignal<HTMLElement>();

  const position = createFloating(reference, floating, {
    placement: local.placement == 'auto' ? undefined : (local.placement as Placement),
    middleware: [offset(8), local.placement == 'auto' ? autoPlacement() : flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  createEffect(() => {
    const triggerElement = reference();

    if (!triggerElement) {
      return;
    }

    const handleOpen = () => {
      setOpen(true);
      position.update();
    };

    const handleClose = () => {
      setOpen(false);
    };

    triggerElement.addEventListener('mouseenter', handleOpen);
    triggerElement.addEventListener('mouseleave', handleClose);

    triggerElement.addEventListener('focus', handleOpen);
    triggerElement.addEventListener('blur', handleClose);

    onCleanup(() => {
      triggerElement.removeEventListener('mouseenter', handleOpen);
      triggerElement.removeEventListener('mouseleave', handleClose);

      triggerElement.removeEventListener('focus', handleOpen);
      triggerElement.removeEventListener('blur', handleClose);
    });
  });

  createEffect(() => {
    if (open()) {
      reference().setAttribute('aria-describedby', id);
    } else {
      reference().removeAttribute('aria-describedby');
    }
  });

  return (
    <>
      {reference}
      <Portal>
        <MotionPresence>
          <Show when={open()} keyed>
            <Motion
              {...getMotionProps(local.motionPreset, local.motionProps)}
              ref={mergeRefs(setFloating, local.ref)}
              id={id}
              role={'tooltip'}
              class={cx(
                'absolute z-50 inline-block rounded border py-1 px-2 text-sm shadow',
                `border-${local.color}-600 bg-${local.color}-600 text-${local.color}-50`,
                local.class
              )}
              style={{
                top: position.y ? `${position.y}px` : '',
                left: position.x ? `${position.x}px` : '',
              }}
              {...rest}
            >
              {local.content}
              <Show when={local.arrow} keyed>
                <FloatingArrow
                  class={`border-${local.color}-600 bg-${local.color}-600 text-${local.color}-50`}
                  placement={position.placement}
                />
              </Show>
            </Motion>
          </Show>
        </MotionPresence>
      </Portal>
    </>
  );
};
