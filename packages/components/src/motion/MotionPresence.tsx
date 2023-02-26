import type { FlowComponent } from 'solid-js';
import { batch, children, createComputed, createMemo, createSignal, on, onCleanup, onMount, untrack } from 'solid-js';
import { MotionContext, MotionPresenceContext } from './MotionContext';
import { isServer } from 'solid-js/web';
import { mountedStates } from '@motionone/dom';
import type { ResolvedChildren } from 'solid-js/types/reactive/signal';

export const MotionPresence: FlowComponent<{
  initial?: boolean;
  onExitComplete?: () => void;
  exitBeforeEnter?: boolean;
}> = (props) => {
  // eslint-disable-next-line solid/reactivity
  let { initial = true } = props;
  onMount(() => (initial = true));

  let exiting = false;
  let mounts: VoidFunction[] = [];
  let newUnmounts: VoidFunction[] = [];
  let exitUnmounts: VoidFunction[] = [];

  onCleanup(() => {
    exitUnmounts.concat(newUnmounts).forEach((f) => f());
    newUnmounts = exitUnmounts = mounts = [];
  });

  return (
    <MotionPresenceContext.Provider
      value={{
        addCleanup: (fn) => newUnmounts.push(fn),
        addMount: (fn) => mounts.push(fn),
        initial: () => initial,
      }}
    >
      <MotionContext.Provider value={undefined}>
        {untrack(() => {
          if (isServer) {
            return props.children;
          }

          const resolved = children(() => props.children);
          const resolvedChild = createMemo(() => getSingleElement(resolved()));

          const [el, setEl] = createSignal<Element>();
          const [el2, setEl2] = createSignal<Element>();

          createComputed(
            on(resolvedChild, (newEl) => {
              exitUnmounts.push(...newUnmounts);
              newUnmounts = [];

              batch(() => {
                // exit -> enter
                if (props.exitBeforeEnter) {
                  exitTransition(() => !exiting && enterTransition(newEl));
                }
                // exit & enter
                else {
                  exitTransition();
                  enterTransition(newEl);
                }
              });
            })
          );

          return [el, el2];

          function enterTransition(el?: Element) {
            setEl(el);
            mounts.forEach((f) => f());
            mounts = [];
          }

          function exitTransition(done?: VoidFunction) {
            const complete = () => {
              setEl2();
              exitUnmounts.forEach((f) => f());
              exitUnmounts = [];
              done?.();
            };

            const exitEl = setEl2(el() ?? el2());

            if (!exitEl) {
              return complete();
            }

            const state = mountedStates.get(exitEl);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (!state || !(state.getOptions() as any).exit) {
              return complete();
            }

            state.setActive('exit', (exiting = true));

            // eslint-disable-next-line solid/reactivity
            addCompleteListener(exitEl, () => {
              exiting = false;
              complete();
              props.onExitComplete?.();
            });
          }
        })}
      </MotionContext.Provider>
    </MotionPresenceContext.Provider>
  );
};
const getSingleElement = (resolved: ResolvedChildren): Element | undefined => {
  resolved = Array.isArray(resolved) ? resolved[0] : resolved;
  return resolved instanceof Element ? resolved : undefined;
};

const addCompleteListener = (el: Element, fn: VoidFunction) => {
  const options: AddEventListenerOptions = { once: true };

  el.addEventListener('motioncomplete', fn, options);

  onCleanup(el.removeEventListener.bind(el, 'motioncomplete', fn, options));
};
