const { teardown: teardownDevServer } = require('jest-dev-server');
const teardownPuppeteer = require('jest-environment-puppeteer/teardown');

module.exports = async function globalTeardown(globalConfig) {
  // shut down the testing http server.
  if (process.env.CI !== true) { // local machine
    await teardownDevServer(globalThis.servers);
  }

  await teardownPuppeteer(globalConfig);
  console.log('globalTeardown.js was invoked');
};
