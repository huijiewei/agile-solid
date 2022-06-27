import { getQueriesForElement, prettyDOM } from '@testing-library/dom';
import { hydrate as solidHydrate, render as solidRender } from 'solid-js/web';
import type { Ref, RenderOptions, RenderResult, Ui } from './types';

const mountedContainers = new Set<Ref>();

export const render = (ui: Ui, options: RenderOptions = {}): RenderResult => {
  const { container, baseElement = container || document.body, queries, hydrate = false } = options;

  const renderContainer = container || baseElement.appendChild(document.createElement('div'));

  const dispose = hydrate
    ? (solidHydrate(ui, renderContainer) as unknown as () => void)
    : solidRender(ui, renderContainer);

  mountedContainers.add({ container: renderContainer, dispose });

  return {
    container: renderContainer,
    baseElement,
    debug: (el = baseElement, maxLength, options) =>
      Array.isArray(el)
        ? el.forEach((e) => console.log(prettyDOM(e, maxLength, options)))
        : console.log(prettyDOM(el, maxLength, options)),
    unmount: dispose,
    ...getQueriesForElement(baseElement, queries),
  };
};

export const cleanup = () => {
  mountedContainers.forEach((ref: Ref) => {
    const { container, dispose } = ref;
    dispose();

    if (container.parentNode === document.body) {
      document.body.removeChild(container);
    }

    mountedContainers.delete(ref);
  });
};
