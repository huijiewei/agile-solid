import { useLocation } from '@solidjs/router';
import { createEffect } from 'solid-js';

export const MetaTitle = () => {
  const location = useLocation();

  createEffect(() => {
    console.log(location.pathname);
  });

  return <></>;
};
