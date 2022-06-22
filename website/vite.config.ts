import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      solidPlugin(),
      splitVendorChunkPlugin(),
      VitePWA({
        includeAssets: ['favicon.svg'],
        registerType: 'autoUpdate',
        manifest: {
          name: 'Agile Solid UI',
          description: 'SolidJS + TypeScript UI Components',
          short_name: 'agile-solid',
          start_url: '/home',
          icons: [
            { src: 'icons/android-chrome-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
            { src: 'icons/android-chrome-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          ],
          theme_color: '#206BC4',
          background_color: '#FFFFFF',
          display: 'standalone',
        },
      }),
    ],
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
