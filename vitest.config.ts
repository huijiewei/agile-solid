import solidPlugin from 'vite-plugin-solid';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [solidPlugin()],
  test: {
    environment: 'happy-dom',
    transformMode: {
      web: [/\.[jt]sx?$/],
    },
    deps: {
      inline: [/solid-js/],
    },
    setupFiles: './packages/test/src/setupTests.ts',
  },
  resolve: {
    conditions: ['development', 'browser'],
  },
});
