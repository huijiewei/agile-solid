import { JSX, mergeProps, splitProps } from 'solid-js';
import type { ComponentProps } from 'solid-js';
import { useLiveContext } from './LiveProvider';

export type LiveEditorProps = {
  code?: string;
  lang?: string;
  theme?: string;
  editable?: boolean;
};

export const LiveEditor = (props: Omit<ComponentProps<'pre'>, 'children'> & LiveEditorProps) => {
  const context = useLiveContext();

  const mergedProps = mergeProps(props, {
    code: context ? context.code : '',
  });

  const [local, rest] = splitProps(mergedProps, ['code', 'lang', 'theme', 'editable']);

  const inputHandler: JSX.EventHandler<HTMLPreElement, InputEvent> = (e) => {
    context && context.onChange(e.currentTarget.textContent || '');
  };

  const keydownHandler: JSX.EventHandler<HTMLPreElement, KeyboardEvent> = (e) => {
    if (e.defaultPrevented) {
      return;
    }

    if (e.key === 'Tab') {
      document.execCommand('insertHTML', false, '&#009');
      e.preventDefault();
      return;
    }
  };

  return (
    <pre
      style={{ 'white-space': 'pre-wrap', 'tab-size': '2', outline: 'none' }}
      spellcheck={false}
      contentEditable={local.editable}
      onInput={inputHandler}
      onKeyDown={keydownHandler}
      {...rest}
      textContent={local.code}
    />
  );
};
