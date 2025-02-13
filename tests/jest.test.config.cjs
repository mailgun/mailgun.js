// eslint-disable-next-line spaced-comment, tsdoc/syntax
/** @type {import('ts-jest').JestConfigWithTsJest} **/

module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/module/*.test.ts'],
  transform: {
    '\\.[jt]sx?$': ['ts-jest', {
      useESM: true
    }],
  },
  moduleNameMapper: {
    '^\\.(.+)\\.js': '.$1'
  },
  extensionsToTreatAsEsm: ['.ts'],
};
