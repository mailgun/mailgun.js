/* eslint-disable no-console */
/* global page, beforeAll */
const { default: mockServer } = require('pptr-mock-server');
const BrowserClient = require('../helpers/BrowserClient');
const NodeClient = require('../helpers/NodeClient');

const launchType = process.env.LAUNCH_TYPE;
beforeAll(async function () {
  global.MailgunClient = null;
  if (typeof page !== 'undefined') { // browser environment
    // add page listeners
    page.on('console', (message) => console.debug(`Browser console -> ${message.type()} ${message.text()}`))
      .on('pageerror', ({ message }) => console.error(`Browser page error -> ${message}`))
      .on('response', (response) => console.log(`Browser got response -> ${response.status()} ${response.url()}`))
      .on('requestfailed', (request) => console.log(`Browser request failed ->${request.failure().errorText} ${request.url()}`));

    global.server_url = 'http://localhost:3000';
    const mockRequest = await mockServer.init(page, {
      // By default all requests matching baseAppUrl are continued.
      baseAppUrl: global.server_url,
    });
    const browserClient = new BrowserClient(mockRequest);
    browserClient.setLaunchType(launchType);
    await browserClient.initiateClient();
    global.MailgunClient = browserClient;
  } else {
    const nodeClient = new NodeClient();
    nodeClient.setLaunchType(launchType);
    await nodeClient.initiateClient();
    global.MailgunClient = nodeClient;
  }
  return global.MailgunClient;
});
