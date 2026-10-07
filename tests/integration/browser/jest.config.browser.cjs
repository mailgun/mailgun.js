// eslint-disable-next-line spaced-comment, tsdoc/syntax
/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  transform: {
    '^.+.tsx?$': ['ts-jest', {
      tsconfig: {
        target: 'ES2017',
      }
    }],
  },
  globalSetup: './setup/globalSetup.cjs',
  globalTeardown: './setup/globalTeardown.cjs',
  testEnvironment: './setup/browserEnvironment.cjs',
  testMatch: ['**/tests/**/*.test.ts'],
  setupFilesAfterEnv: ['./setup/addPageListeners.cjs'],
  maxWorkers: 4 // limit by 4 to speed up teardown process
};
