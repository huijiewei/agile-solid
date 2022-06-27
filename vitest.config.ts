import { resolve } from 'path';
import solidPlugin from 'vite-plugin-solid';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [solidPlugin()],

  test: {
    environment: 'jsdom',
    transformMode: {
      web: [/\.[jt]sx?$/],
    },
    deps: {
      inline: [/solid-js/],
    },
  },
  resolve: {
    conditions: ['development', 'browser'],
    alias: {
      '@agile-solid/components': resolve(__dirname, './packages/components/src'),
      '@agile-solid/hooks': resolve(__dirname, './packages/hooks/src'),
      '@agile-solid/twind': resolve(__dirname, './packages/twind/src'),
      '@agile-solid/icons': resolve(__dirname, './packages/icons/src'),
      '@agile-solid/utils': resolve(__dirname, './packages/utils/src'),
      '@agile-solid/test': resolve(__dirname, './packages/test/src'),
    },
  },
});
