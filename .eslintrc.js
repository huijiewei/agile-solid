module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  parserOptions: {
    sourceType: 'module',
  },
  extends: ['eslint:recommended', 'prettier'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', 'solid'],
      extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:solid/typescript', 'prettier'],
    },
  ],
};
