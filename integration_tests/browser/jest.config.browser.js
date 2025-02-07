// eslint-disable-next-line spaced-comment, tsdoc/syntax
/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'jest-puppeteer',
  transform: {
    '^.+.tsx?$': ['ts-jest', {
      tsconfig: {
        target: 'ES2017',
      }
    }],
  },
  globalSetup: './setup/globalSetup.js',
  globalTeardown: './setup/globalTeardown.js',
  testEnvironment: 'jest-environment-puppeteer',
  testMatch: ['**/tests/**/*.test.ts'],
  setupFilesAfterEnv: ['./setup/addPageListeners.js'],
  maxWorkers: 4 // limit by 4 to speed up teardown process
};
