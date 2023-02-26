import { createContext, onCleanup, onMount } from 'solid-js';
import type { MotionState } from '@motionone/dom';

export const MotionContext = createContext<MotionState>();

export type MotionPresenceState = {
  initial: () => boolean;
  addMount: (fn: VoidFunction) => void;
  addCleanup: (fn: VoidFunction) => void;
};

export const MotionPresenceContext = createContext<MotionPresenceState>({
  initial: () => true,
  addMount: onMount,
  addCleanup: onCleanup,
});
