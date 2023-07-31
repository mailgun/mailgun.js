const path = require('path');

module.exports = {
  preset: 'jest-puppeteer',
  globalSetup: './configs/globalSetup.js',
  globalTeardown: './configs/globalTeardown.js',
  testEnvironment: 'jest-environment-puppeteer',
  testMatch: ['**/tests/*.test.js'],
  setupFilesAfterEnv: ['./configs/setupMailgunClient.js'],
  testTimeout: 20000,
  // maxConcurrency: 0,
  maxWorkers: 9 // to avoid MaxListenersExceededWarning
};
