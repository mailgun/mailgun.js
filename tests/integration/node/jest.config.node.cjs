// eslint-disable-next-line spaced-comment, tsdoc/syntax
/** @type {import('ts-jest').JestConfigWithTsJest} **/

module.exports = {
  testEnvironment: 'node',
  testEnvironmentOptions: {
    globalsCleanup: 'off',
  },
  testMatch: ['**/tests/**/*.test.*'],
  transform: {
    '^.+\\.mts$': ['ts-jest', {
      tsconfig: {
        module: 'ESNext'
      },
      useESM: true
    }],
  },
  extensionsToTreatAsEsm: ['.mts']
};
