module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        bugfixes: true,
      },
    ],
    ['solid'],
    ['@babel/preset-typescript', { allowDeclareFields: true }],
  ],
};
