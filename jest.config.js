module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: ['packages/**/*.{ts,tsx}'],
  watchPathIgnorePatterns: ['/node_modules/', '/dist/', '/.git/', '/.idea/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transformIgnorePatterns: ['node_modules/(?!(twind|@twind)/)'],
  moduleNameMapper: {
    '^@agile-solid/(.*?)$': '<rootDir>/packages/$1/src',
  },
  setupFilesAfterEnv: ['<rootDir>/packages/test/src/setupTests.ts'],
};
