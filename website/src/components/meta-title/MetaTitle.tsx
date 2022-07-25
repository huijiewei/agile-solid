import { useLocation } from 'solid-app-router';
import { createEffect, createMemo } from 'solid-js';

export const MetaTitle = () => {
  const location = useLocation();

  createEffect(() => {
    console.log(location.pathname);
  });

  return <></>;
};
