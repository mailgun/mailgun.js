// eslint-disable-next-line spaced-comment, tsdoc/syntax
/** @type {import('ts-jest').JestConfigWithTsJest} **/

module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  preset: 'ts-jest/presets/js-with-ts',
  transform: {
    '^.+.tsx?$': ['ts-jest', {
      tsconfig: false
    }],
  },
};
