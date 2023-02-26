import { twindConfig } from '@agile-solid/twind';
import { css } from '@twind/core';

export default twindConfig({
  preflight: css`
    body {
      @apply overflow-y-scroll bg-white text-black text-base antialiased;
    }
  `,
  rules: [
    [
      'bg-gradient-radial-dot',
      { backgroundImage: 'radial-gradient(circle, var(--tw-gradient-from) 1px, var(--tw-gradient-to) 1px)' },
    ],
  ],
  ignorelist: [/^appSplash/, 'stylus'],
  hash: false,
});
