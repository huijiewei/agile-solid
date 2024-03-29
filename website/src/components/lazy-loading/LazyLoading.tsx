import { Spinner } from '@agile-solid/components';
import { splitProps } from 'solid-js';
import type { ComponentProps } from 'solid-js';
import { cx } from '@twind/core';

export const LazyLoading = (props: ComponentProps<'div'>) => {
  const [local, rest] = splitProps(props, ['class']);

  return (
    <div
      class={cx('justify-center text-lg transition-opacity text-gray-600 flex items-center w-full', local.class)}
      {...rest}
    >
      <Spinner class={'mr-2'} color={'blue'} />
      正在加载...
    </div>
  );
};
