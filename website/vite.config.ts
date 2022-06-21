import { defineConfig, splitVendorChunkPlugin } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import tsconfigPaths from 'vite-tsconfig-paths';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [solidPlugin(), tsconfigPaths(), splitVendorChunkPlugin()],
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
});
