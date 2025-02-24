const { teardown: teardownDevServer } = require('jest-dev-server');
const teardownPuppeteer = require('jest-environment-puppeteer/teardown');
const fs = require('fs/promises');
const path = require('path');

module.exports = async function globalTeardown(globalConfig) {
  // shut down the testing http server.
  const ciEnvValue = process.env.CI;
  if (typeof ciEnvValue !== 'string' || ciEnvValue !== 'true') { // local machine
    await teardownDevServer(globalThis.servers);
    await fs.rm(path.join(__dirname, '../server/dist/'), { recursive: true });
    await fs.mkdir(path.join(__dirname, '../server/dist/'));
    await fs.writeFile(path.join(__dirname, '../server/dist/.gitkeep'), '');
  }

  await teardownPuppeteer(globalConfig);
};
