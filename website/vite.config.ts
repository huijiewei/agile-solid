import { resolve } from 'path';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [solidPlugin(), splitVendorChunkPlugin()],
  build: {
    rollupOptions: {
      plugins: [
        visualizer({
          open: true,
          filename: './node_modules/.cache/visualizer/stats.html',
          gzipSize: true,
          brotliSize: true,
        }),
      ],
    },
  },
  resolve: {
    alias: [
      {
        find: /^@agile-solid\/(.*)$/,
        replacement: resolve(__dirname, '../packages/$1/src'),
      },
    ],
  },
});
