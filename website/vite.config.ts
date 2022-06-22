import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [solidPlugin(), splitVendorChunkPlugin()],
    optimizeDeps: {
      include: ['@agile-solid/twind'],
    },
    build: {
      commonjsOptions: {
        include: /packages\/twind/,
      },
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
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules/solid-js') || id.includes('node_modules/solid-app-router')) {
              return 'solid';
            }

            if (id.includes('node_modules/twind') || id.includes('node_modules/@twind')) {
              return 'twind';
            }

            if (id.includes('node_modules')) {
              return 'vendor';
            }

            if (id.includes('packages')) {
              return 'agile';
            }
          },
        },
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
