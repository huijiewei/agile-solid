import { onCleanup } from 'solid-js';

export type Target = HTMLElement | Element | Window | Document;

type Options<T extends Target = Target> = {
  target?: T | null;
  capture?: boolean;
  once?: boolean;
  passive?: boolean;
};

type UseEventListener = {
  <K extends keyof HTMLElementEventMap>(
    eventName: K,
    handler: (event: HTMLElementEventMap[K]) => void,
    options?: Options<HTMLElement>
  ): void;
  <K extends keyof ElementEventMap>(
    eventName: K,
    handler: (event: ElementEventMap[K]) => void,
    options?: Options<Element>
  ): void;
  <K extends keyof DocumentEventMap>(
    eventName: K,
    handler: (event: DocumentEventMap[K]) => void,
    options?: Options<Document>
  ): void;
  <K extends keyof WindowEventMap>(
    eventName: K,
    handler: (event: WindowEventMap[K]) => void,
    options?: Options<Window>
  ): void;
};

export const useEventListener: UseEventListener = (
  eventName: string,
  handler: (event: Event) => void,
  options: Options = {}
) => {
  const targetElement = options?.target || window;

  if (!targetElement?.addEventListener) {
    return;
  }

  targetElement.addEventListener(eventName, handler, {
    capture: options.capture,
    once: options.once,
    passive: options.passive,
  });

  onCleanup(() => {
    targetElement.removeEventListener(eventName, handler, {
      capture: options.capture,
    });
  });
};
