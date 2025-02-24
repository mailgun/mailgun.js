// eslint-disable-next-line spaced-comment, tsdoc/syntax
/** @type {import('ts-jest').JestConfigWithTsJest} **/

module.exports = {
  rootDir: '../',
  testEnvironment: 'node',
  testMatch: ['**/module/*.test.ts'],
  transform: {
    '\\.[jt]sx?$': ['ts-jest', {
      useESM: true
    }],
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/lib/Classes/**/*.*',
    '!**/node_modules/**',
  ],
  coverageDirectory: '.coverage',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    }
  },
  moduleNameMapper: {
    '^\\.(.+)\\.js': '.$1'
  },
  extensionsToTreatAsEsm: ['.ts'],
};
