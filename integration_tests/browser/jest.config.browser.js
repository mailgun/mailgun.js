module.exports = {
  preset: 'jest-puppeteer',
  globalSetup: './setup/globalSetup.js',
  globalTeardown: './setup/globalTeardown.js',
  testEnvironment: 'jest-environment-puppeteer',
  testMatch: ['**/tests/**/*.test.js'],
  setupFilesAfterEnv: ['./setup/addPageListeners.js'],
  // maxConcurrency: 0,
  maxWorkers: 9 // to avoid MaxListenersExceededWarning
};
