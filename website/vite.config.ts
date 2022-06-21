import { resolve } from 'path';
import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [solidPlugin(), splitVendorChunkPlugin()],
    build: {
      rollupOptions: {
        plugins: [
          env['BUNDLE_ANALYZE'] == '1' &&
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
  };
});
