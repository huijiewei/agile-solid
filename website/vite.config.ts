import { resolve } from 'path';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [
    solidPlugin(),
    splitVendorChunkPlugin(),
    VitePWA({
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png', 'safari-pinned-tab.svg'],
      manifest: {
        name: 'Agile Solid UI',
        description: 'SolidJS + TypeScript UI Components',
        short_name: 'agile-solid',
        start_url: '/home',
        lang: 'zh',
        icons: [
          { src: 'icons/pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/pwa-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/maskable-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
          { src: 'icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
        theme_color: '#206BC4',
        background_color: '#FFFFFF',
        display: 'standalone',
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/solid-js') || id.includes('node_modules/solid-app-router')) {
            return 'solid';
          }

          if (
            id.includes('node_modules/twind') ||
            id.includes('node_modules/@twind') ||
            id.includes('node_modules/style-vendorizer')
          ) {
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
    alias: {
      '@agile-solid/components': resolve(__dirname, '../packages/components/src'),
      '@agile-solid/hooks': resolve(__dirname, '../packages/hooks/src'),
      '@agile-solid/twind': resolve(__dirname, '../packages/twind/src'),
      '@agile-solid/icons': resolve(__dirname, '../packages/icons/src'),
      '@agile-solid/utils': resolve(__dirname, '../packages/utils/src'),
    },
  },
});
