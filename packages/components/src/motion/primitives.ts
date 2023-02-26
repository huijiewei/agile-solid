import { Accessor, createEffect, getOwner, runWithOwner } from 'solid-js';
import type { MotionOptions } from './types';
import type { MotionState } from '@motionone/dom';
import { createMotionState } from '@motionone/dom';
import type { MotionPresenceState } from './MotionContext';

export const createMotionOneState = (
  target: Accessor<Element>,
  options: Accessor<MotionOptions>,
  presenceState: MotionPresenceState,
  parentState?: MotionState
): MotionState => {
  const { addCleanup, addMount, initial } = presenceState;

  const state = createMotionState(initial() ? options() : { ...options(), initial: false }, parentState);

  addMount(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    runWithOwner.bind(void 0, getOwner()!, () => {
      addCleanup(state.mount(target()));
      createEffect(() => state.update(options()));
    })
  );

  return state;
};
