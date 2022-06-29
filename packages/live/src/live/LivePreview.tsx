import type { ComponentProps, JSX, ParentProps } from 'solid-js';
import { createEffect, createSignal, onCleanup, splitProps } from 'solid-js';
import * as SolidJS from 'solid-js';
import { unwrap } from 'solid-js/store';
import { transform } from 'sucrase';
import { Fragment, jsx } from 'solid-js/h/jsx-runtime';
import { useLiveContext } from './LiveProvider';

const compiler = (code: string, scope: { [k: string]: (props: ParentProps) => JSX.Element }) => {
  const scopes = { jsx, Fragment, ...SolidJS, ...scope };

  const codeTrimmed = code.trim().replace(/;$/, '');

  const result = transform(`return (${codeTrimmed})`, {
    transforms: ['jsx', 'imports'],
    jsxPragma: 'jsx',
    jsxFragmentPragma: 'Fragment',
    production: true,
  });

  return new Function(...Object.keys(scopes), result.code)(...Object.values(scopes));
};

export type LivePreviewProps = {
  code?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  scope?: { [key: string]: any };
  transformCode?: (code: string) => string | Promise<string>;
};

export const LivePreview = (props: Omit<ComponentProps<'div'>, 'children'> & LivePreviewProps) => {
  const [local, rest] = splitProps(props, ['code', 'scope', 'transformCode']);
  const context = useLiveContext();

  const [previewCode, setPreviewCode] = createSignal<string>('');
  const [element, setElement] = createSignal<Element>();

  createEffect(() => {
    setPreviewCode(context?.previewCode() || local.code || '');
  });

  createEffect(() => {
    if (previewCode()) {
      const transformResult = local.transformCode ? local.transformCode(previewCode()) : previewCode();
      const scope = unwrap(local.scope) || {};

      return Promise.resolve(transformResult)
        .then((transformedCode) => {
          const element = compiler(transformedCode || '', scope);

          setElement(() => element);
          context && context.onError('');
        })
        .catch((error) => {
          context && context.onError(error.toString());
        });
    }

    onCleanup(() => {
      context && context.onError('');
    });
  });

  return <div {...rest}>{element()}</div>;
};
