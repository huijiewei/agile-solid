import { createEffect, createSignal, onCleanup } from 'solid-js';

export const useClipboard = (timeout = 2000) => {
  const [value, setValue] = createSignal('');
  const [copied, setCopied] = createSignal(false);

  const onCopy = async (source: string) => {
    await navigator.clipboard.writeText(source);

    setValue(source);
    setCopied(true);
  };

  createEffect(() => {
    const id = copied() ? setTimeout(() => setCopied(false), timeout) : null;

    onCleanup(() => {
      id && clearTimeout(id);
    });
  });

  return { value, copied, onCopy };
};
