import { resolve } from 'path';
import { defineConfig } from 'vite';

import pkg from './package.json';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['cjs', 'es'],
      name: pkg.name,
      fileName: 'index',
    },
    commonjsOptions: {
      include: /presets/,
    },
    rollupOptions: {
      external: [...Object.keys(pkg.peerDependencies)],
    },
  },
});
