import mdxPlugin from '@mdx-js/rollup';
import rehypeSlug from 'rehype-slug';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxCodeMeta from 'remark-mdx-code-meta';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import solidPlugin from 'vite-plugin-solid';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    mdxPlugin({
      jsxImportSource: 'solid-jsx',
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm, remarkMdxCodeMeta],
      rehypePlugins: [rehypeSlug],
    }),
    solidPlugin(),
    VitePWA({
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png', 'safari-pinned-tab.svg'],
      registerType: 'autoUpdate',
      manifest: {
        name: 'Agile Solid UI',
        description: 'SolidJS + TypeScript UI Components',
        short_name: 'agile-solid',
        start_url: '/home',
        lang: 'zh-CN',
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
    tsconfigPaths(),
  ],
  build: {
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/solid-js') || id.includes('node_modules/@solid-js')) {
            return 'solid';
          }

          if (id.includes('node_modules/@twind') || id.includes('node_modules/style-vendorizer')) {
            return 'twind';
          }

          if (id.includes('node_modules/sucrase') || id.includes('packages/live')) {
            return 'solid-live';
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
});
