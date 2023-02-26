import type { ComputePositionConfig, ComputePositionReturn, ReferenceElement } from '@floating-ui/dom';
import { createEffect, createSignal, onCleanup } from 'solid-js';
import { computePosition } from '@floating-ui/dom';

type UseFloatingOptions<R extends ReferenceElement, F extends HTMLElement> = Partial<ComputePositionConfig> & {
  whileElementsMounted?: (reference: R, floating: F, update: () => void) => void | (() => void);
};

type UseFloatingState = Omit<ComputePositionReturn, 'x' | 'y'> & {
  x?: number | null;
  y?: number | null;
  isPositioned?: boolean;
};

export const createFloating = <R extends ReferenceElement, F extends HTMLElement>(
  reference: () => R | undefined | null,
  floating: () => F | undefined | null,
  options?: UseFloatingOptions<R, F>
) => {
  const placement = () => options?.placement ?? 'bottom';
  const strategy = () => options?.strategy ?? 'absolute';

  const [data, setData] = createSignal<UseFloatingState>({
    x: null,
    y: null,
    placement: placement(),
    strategy: strategy(),
    middlewareData: {},
    isPositioned: false,
  });

  const update = () => {
    const currentReference = reference();
    const currentFloating = floating();

    if (currentReference && currentFloating) {
      computePosition(currentReference, currentFloating, {
        middleware: options?.middleware,
        placement: placement(),
        strategy: strategy(),
      }).then((currentData) => {
        setData({ ...currentData, isPositioned: true });
      });
    }
  };

  createEffect(() => {
    const currentReference = reference();
    const currentFloating = floating();

    placement();
    strategy();

    if (currentReference && currentFloating) {
      if (options?.whileElementsMounted) {
        const cleanup = options.whileElementsMounted(currentReference, currentFloating, update);

        if (cleanup) {
          onCleanup(cleanup);
        }
      } else {
        update();
      }
    }
  });

  return {
    get x() {
      return data().x;
    },
    get y() {
      return data().y;
    },
    get placement() {
      return data().placement;
    },
    get strategy() {
      return data().strategy;
    },
    get middlewareData() {
      return data().middlewareData;
    },
    get isPositioned() {
      return data().isPositioned;
    },
    update,
  };
};
