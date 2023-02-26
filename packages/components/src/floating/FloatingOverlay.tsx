import type { PrimitiveComponentProps } from '../utils/component';
import { createEffect, mergeProps, splitProps } from 'solid-js';
import { cx } from '@twind/core';
import { getPlatform } from '@agile-run/utils';

const identifier = 'data-floating-scroll-lock';

export const FloatingOverlay = (props: PrimitiveComponentProps<'div', { lockScroll?: boolean }>) => {
  const propsWithDefault = mergeProps({ lockScroll: false }, props);

  const [local, rest] = splitProps(propsWithDefault, ['lockScroll', 'ref', 'class']);

  createEffect(() => {
    if (!local.lockScroll) {
      return;
    }

    const alreadyLocked = document.body.hasAttribute(identifier);

    if (alreadyLocked) {
      return;
    }

    document.body.setAttribute(identifier, '');

    const scrollbarX =
      Math.round(document.documentElement.getBoundingClientRect().left) + document.documentElement.scrollLeft;

    const paddingProp = scrollbarX ? 'paddingLeft' : 'paddingRight';

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    if (!/iP(hone|ad|od)|iOS/.test(getPlatform())) {
      Object.assign(document.body.style, {
        overflow: 'hidden',
        [paddingProp]: `${scrollbarWidth}px`,
      });

      return () => {
        document.body.removeAttribute(identifier);
        Object.assign(document.body.style, {
          overflow: '',
          [paddingProp]: '',
        });
      };
    }

    const offsetLeft = window.visualViewport?.offsetLeft || 0;
    const offsetTop = window.visualViewport?.offsetTop || 0;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    Object.assign(document.body.style, {
      position: 'fixed',
      overflow: 'hidden',
      top: `${-(scrollY - Math.floor(offsetTop))}px`,
      left: `${-(scrollX - Math.floor(offsetLeft))}px`,
      right: '0',
      [paddingProp]: `${scrollbarWidth}px`,
    });

    return () => {
      Object.assign(document.body.style, {
        position: '',
        overflow: '',
        top: '',
        left: '',
        right: '',
        [paddingProp]: '',
      });

      document.body.removeAttribute(identifier);
      window.scrollTo(scrollX, scrollY);
    };
  });

  return <div class={cx('fixed overflow-auto inset-0', local.class)} {...rest} />;
};
