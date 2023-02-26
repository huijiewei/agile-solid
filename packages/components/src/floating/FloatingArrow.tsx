import type { Placement } from '@floating-ui/dom';
import { cx } from '@twind/core';
import type { PrimitiveComponentProps } from '../utils/component';
import { createEffect, splitProps } from 'solid-js';
import { createStore } from 'solid-js/store';

const floatingArrowStyles = {
  top: 'border-b border-r',
  right: 'border-b border-l',
  bottom: 'border-t border-l',
  left: 'border-t border-r',
};

const floatingArrowOpposites = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' };

type FloatingArrowProps = {
  placement: Placement;
};

type FloatingArrowPlacement = {
  side: 'top' | 'left' | 'bottom' | 'right';
  position: 'center' | 'start' | 'end';
  horizontal: boolean;
};

export const FloatingArrow = (props: PrimitiveComponentProps<'span', FloatingArrowProps>) => {
  const [local, rest] = splitProps(props, ['placement', 'class']);

  const [placement, setPlacement] = createStore<FloatingArrowPlacement>({
    side: 'top',
    position: 'center',
    horizontal: false,
  });

  createEffect(() => {
    const [side, position = 'center'] = local.placement.split('-') as [
      FloatingArrowPlacement['side'],
      FloatingArrowPlacement['position']
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
        `-${floatingArrowOpposites[placement.side]}-[4px]`,
        placement.position == 'center'
          ? `${placement.horizontal ? 'top' : 'left'}-[calc(50%-4px)]`
          : placement.position == 'start'
          ? `${placement.horizontal ? 'top' : 'left'}-[8px]`
          : `${placement.horizontal ? 'bottom' : 'right'}-[8px]`,
        floatingArrowStyles[placement.side],
        local.class
      )}
      {...rest}
    >
      &nbsp;
    </span>
  );
};
