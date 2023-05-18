import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: 'tests',
  testMatch: '*.spec.ts',
  // Run all tests in parallel.
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retry on CI only.
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: process.env.CI ? 'dot' : 'list',

  // Configure projects for major browsers.
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  use: {
    acceptDownloads: true,
    bypassCSP: true,
    browserName: 'chromium',
  },
  webServer: {
    command: 'http-server  ./dist/browser/ -c-1',
    url: 'http://127.0.0.1:8080',
    reuseExistingServer: !process.env.CI,
  },

});
