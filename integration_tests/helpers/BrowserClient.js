/* global page */
const { successResponse } = require('../data/messageResponses');

let client;

class BrowserClient {
  constructor(mockRequest) {
    this.launchType = 'amd';
    /*
      can be used only for checking object structure.
      Doesn't contain the methods.
      Client created in browser and came to node.js without methods implementations
      */
    this.client = null;
    this.mockRequest = mockRequest;
  }

  setLaunchType(launchType) {
    const availableTypes = new Set(['amd']);
    if (availableTypes.has(launchType)) {
      this.launchType = launchType;
    } else {
      throw new Error(`Unknown launch type '${launchType}' available types are ${[...availableTypes]}`);
    }
  }

  async initiateClient() {
    if (this.launchType === 'amd') {
      if (this.client) {
        return this.client;
      }

      await page.goto(`${global.server_url}/pages/AMD.html`);
      await page.waitForFunction(function () { return typeof window.mailgunClient !== 'undefined'; });
      client = await page.evaluate(() => window.mailgunClient);
      this.client = client;
    }
    return this.client;
  }

  async sendMessage(domain, messageData) {
    if ('message' in messageData) {
      this.mockRequest.post(`${global.server_url}/v3/test.domain.com/messages.mime`, 200, successResponse);
    } else {
      this.mockRequest.post(`${global.server_url}/v3/test.domain.com/messages`, 200, successResponse);
    }
    return page.evaluate(
      (domain, messageData) => window.mailgunClient.messages.create(domain, messageData),
      domain, messageData
    );
  }

  async sendMessageWithAttachment(domain, messageData) {
    await page.waitForSelector('input[type=file]');
    const input = await page.$('input[type=file]');
    await input.uploadFile('../../img/mailgun.png');
    this.mockRequest.post(`${global.server_url}/v3/test.domain.com/messages`, 200, successResponse);
    return page.evaluate(
      async (domain, messageData) => {
        const messageDataCopy = { ...messageData };
        const inputFile = document.getElementById('fileUpload');
        const mailgunLogo = inputFile.files[0];
        messageDataCopy.attachment = [{ filename: mailgunLogo.name, data: mailgunLogo }];
        return window.mailgunClient.messages.create(domain, messageDataCopy);
      },
      domain, messageData
    );
  }
}

module.exports = BrowserClient;
