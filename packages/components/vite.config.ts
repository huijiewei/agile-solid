import { resolve } from 'path';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

import pkg from './package.json';

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['cjs', 'es'],
      name: pkg.name,
      fileName: 'index',
    },
    rollupOptions: {
      external: [...Object.keys(pkg.peerDependencies)],
    },
  },
  resolve: {
    alias: {
      '@agile-solid/utils': resolve(__dirname, '../packages/utils/src'),
      '@agile-solid/hooks': resolve(__dirname, '../packages/hooks/src'),
    },
  },
});
