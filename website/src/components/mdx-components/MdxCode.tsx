import { LiveEditor, LiveError, LivePreview, LiveProvider } from '@agile-solid/live';
import { children, ComponentProps, Show, splitProps } from 'solid-js';
import { FormDemo } from '../form-demo/FormDemo';
import type { Props } from './types';
import * as AgileUI from '@agile-solid/components';
import * as AgileIcons from '@agile-solid/icons';

type CodeProps = {
  preview?: boolean;
  editable?: boolean;
};

export const MdxPre = (props: Props & CodeProps) => {
  const [local, rest] = splitProps(props, ['children']);

  return <CodeBlock {...rest}>{local.children}</CodeBlock>;
};

export const MdxCode = (props: Props & CodeProps) => {
  const [local, rest] = splitProps(props, ['className', 'children']);

  return (
    <Show
      when={local.className}
      fallback={
        <code class={'m-0 px-[0.4em] py-[0.2em] bg-gray-100 rounded text-sm'} {...rest}>
          {local.children}
        </code>
      }
      keyed
    >
      {local.children}
    </Show>
  );
};

export const CodeBlock = (props: ComponentProps<'pre'> & CodeProps) => {
  const code = children(() => props.children);

  return (
    <LiveProvider code={code() as string}>
      {props.preview && (
        <LivePreview class={'border border-gray-300 p-3 rounded'} scope={{ ...AgileUI, ...AgileIcons, FormDemo }} />
      )}
      <LiveEditor editable={props.editable} class={'text-sm bg-gray-100 rounded p-3 leading-snug'} />
      {props.preview && <LiveError class={'mt-1 rounded bg-red-300 px-2 py-1 font-mono text-sm'} />}
    </LiveProvider>
  );
};
