import { isFunction } from '@agile-solid/utils';
import {
  autoPlacement,
  autoUpdate,
  computePosition,
  ComputePositionReturn,
  flip,
  offset,
  shift,
} from '@floating-ui/dom';
import type { Placement } from '@floating-ui/dom';
import {
  children,
  createEffect,
  createMemo,
  createSignal,
  createUniqueId,
  mergeProps,
  onCleanup,
  Show,
  splitProps,
} from 'solid-js';
import type { JSX } from 'solid-js';
import { createStore } from 'solid-js/store';
import { Portal } from 'solid-js/web';
import { cx } from 'twind';
import { Animation } from '../animation/Animation';
import type { AnimationBaseProps } from '../animation/Animation';
import type { PrimitiveComponentProps } from '../utils/component';
import type { ScaleColor } from '../utils/types';

export type TooltipProps = {
  /**
   * 提示内容
   */
  content: JSX.Element;

  /**
   * 放置位置
   * @default 'auto'
   */
  placement?: 'auto' | Placement;

  /**
   * 动画
   * @default 'hover'
   */
  animation?: AnimationBaseProps;

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
};

const opposites = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' };

export const Tooltip = (props: PrimitiveComponentProps<'div', TooltipProps>) => {
  const defaultProps = {
    placement: 'auto',
    arrow: true,
    color: 'slate',
  };

  const propsWithDefault = mergeProps(defaultProps, props);

  const [local, rest] = splitProps(propsWithDefault, [
    'class',
    'children',
    'content',
    'placement',
    'arrow',
    'color',
    'animation',
  ]);
  const id = createUniqueId();

  const [open, setOpen] = createSignal(false);
  const [tooltip, setTooltip] = createSignal<HTMLElement>();

  const resolved = children(() => local.children);

  const trigger = createMemo(() => {
    let el = resolved() as Element;

    while (isFunction(el)) {
      el = el();
    }

    return el;
  });

  const [data, setData] = createStore<
    Omit<ComputePositionReturn, 'x' | 'y'> & {
      x: number | null;
      y: number | null;
    }
  >({
    x: null,
    y: null,
    placement: 'bottom',
    strategy: 'absolute',
    middlewareData: {},
  });

  const update = () => {
    const triggerElement = trigger();
    const tooltipElement = tooltip();

    if (!triggerElement || !tooltipElement) {
      return;
    }

    computePosition(triggerElement, tooltipElement, {
      placement: local.placement == 'auto' ? undefined : (local.placement as Placement),
      middleware: [offset(8), local.placement == 'auto' ? autoPlacement() : flip(), shift({ padding: 8 })],
    }).then((data) => {
      setData(data);
    });
  };

  createEffect(() => {
    const triggerElement = trigger();
    const tooltipElement = tooltip();

    if (!triggerElement || !tooltipElement) {
      return;
    }

    const cleanup = autoUpdate(triggerElement, tooltipElement, update);

    onCleanup(() => {
      cleanup();
    });
  });

  createEffect(() => {
    const triggerElement = trigger();

    if (!triggerElement) {
      return;
    }

    const handleOpen = () => {
      setOpen(true);
      update();
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
      trigger().setAttribute('aria-describedby', id);
    } else {
      trigger().removeAttribute('aria-describedby');
    }
  });

  return (
    <>
      {trigger}
      <Portal>
        <Animation
          ref={(el) => setTooltip(el)}
          show={open()}
          id={id}
          role={'tooltip'}
          class={cx(
            'absolute inline-block rounded py-1 px-2 text-sm border z-50',
            `border-${local.color}-700 bg-${local.color}-700 text-${local.color}-50`,
            local.class
          )}
          style={{
            top: data.y ? `${data.y}px` : '',
            left: data.x ? `${data.x}px` : '',
          }}
          {...rest}
        >
          {local.content}
          <Show when={local.arrow}>
            <TooltipArrow placement={data.placement} color={local.color as ScaleColor} />
          </Show>
        </Animation>
      </Portal>
    </>
  );
};

const tooltipArrowStyles = {
  top: 'border-t border-l',
  right: 'border-t border-r',
  bottom: 'border-b border-r',
  left: 'border-b border-l',
};

type TooltipArrowProps = {
  placement: Placement;
  color?: ScaleColor;
};

type TooltipArrowPlacement = {
  side: 'top' | 'left' | 'bottom' | 'right';
  position: 'center' | 'start' | 'end';
  horizontal: boolean;
};

const TooltipArrow = (props: TooltipArrowProps) => {
  const [placement, setPlacement] = createStore<TooltipArrowPlacement>({
    side: 'top',
    position: 'center',
    horizontal: false,
  });

  createEffect(() => {
    const [side, position = 'center'] = props.placement.split('-') as [
      TooltipArrowPlacement['side'],
      TooltipArrowPlacement['position']
    ];

    setPlacement({
      side,
      position,
      horizontal: side == 'left' || side == 'right',
    });
  });

  return (
    <span
      class={cx(
        'absolute h-[8px] w-[8px] rotate-45',
        `border-${props.color}-700 bg-${props.color}-700 text-${props.color}-50`,
        `-${opposites[placement.side]}-[4px]`,
        placement.position == 'center'
          ? `${placement.horizontal ? 'top' : 'left'}-[calc(50%-4px)]`
          : placement.position == 'start'
          ? `${placement.horizontal ? 'top' : 'left'}-[8px]`
          : `${placement.horizontal ? 'bottom' : 'right'}-[8px]`,
        tooltipArrowStyles[placement.side]
      )}
    />
  );
};
