const { setup: setupDevServer } = require('jest-dev-server');
const setup = require('jest-environment-puppeteer/setup');
const fs = require('fs/promises');
const path = require('path');

module.exports = async function globalSetup(globalConfig) {
  const ciEnvValue = process.env.CI;
  if (typeof ciEnvValue !== 'string' || ciEnvValue !== 'true') { // local machine
    await fs.copyFile(
      path.join(__dirname, '../../../dist/mailgun.web.js'),
      path.join(__dirname, '../server/dist/mailgun.web.js')
    );
    try {
      // set up a web server to server pages
      globalThis.servers = await setupDevServer({
        command: 'http-server ./integration_tests/browser/server -p 3000', // this goes to background
        launchTimeout: 20000,
        port: 3000,
        usedPortAction: 'error'
      });
    } catch (error) {
      throw new Error('Can not setup test server');
    }
  }

  await setup(globalConfig);
};
