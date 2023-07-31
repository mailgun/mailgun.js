const { setup: setupDevServer } = require('jest-dev-server');
const setup = require('jest-environment-puppeteer/setup');
const fs = require('fs');
const path = require('path');

module.exports = async function globalSetup(globalConfig) {
  if (process.env.CI !== true) { // local machine
    fs.copyFileSync(path.join(__dirname, '../../dist/mailgun.web.js'), path.join(__dirname, '../server/dist/mailgun.web.js'));

    // set up a web server to server pages
    globalThis.servers = await setupDevServer({
      command: 'http-server ./integration_tests/server -p 3000', // this goes to background
      launchTimeout: 20000,
      port: 3000
    });
  }

  await setup(globalConfig);
  console.log('globalSetup.js was invoked');
};
