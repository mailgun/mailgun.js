// eslint-disable-next-line spaced-comment, tsdoc/syntax
/** @type {import('ts-jest').JestConfigWithTsJest} **/

module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  // setupFilesAfterEnv: ['./setup/common-js.setup.js'],
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
};
