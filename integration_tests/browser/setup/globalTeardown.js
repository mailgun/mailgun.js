const { teardown: teardownDevServer } = require('jest-dev-server');
const teardownPuppeteer = require('jest-environment-puppeteer/teardown');
const fs = require('fs/promises');
const path = require('path');

module.exports = async function globalTeardown(globalConfig) {
  // shut down the testing http server.
  const ciEnvValue = process.env.CI;
  if (typeof ciEnvValue !== 'string' || ciEnvValue !== 'true') { // local machine
    await teardownDevServer(globalThis.servers);
    await fs.rm(path.join(__dirname, '../server/dist/mailgun.amd.js'));
    await fs.rm(path.join(__dirname, '../server/dist/definitions.amd.js'));
  }

  await teardownPuppeteer(globalConfig);
};
