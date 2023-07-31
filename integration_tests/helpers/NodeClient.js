const formData = require('form-data');
const fs = require('fs');
const nock = require('nock');
const path = require('path');
const { successResponse } = require('../data/messageResponses');
const Mailgun = require('../../dist/mailgun.node');

class NodeClient {
  constructor() {
    this.launchType = 'native';
    this.client = null;
    this.url = 'https://api.mailgun.net';
  }

  setLaunchType(launchType) {
    const availableTypes = new Set(['native', 'package']);
    if (availableTypes.has(launchType)) {
      this.launchType = launchType;
    } else {
      throw new Error(`Unknown launch type '${launchType}' available types are ${[...availableTypes]}`);
    }
  }

  async initiateClient() {
    let mailgun;

    if (this.launchType === 'native') {
      if (typeof global.FormData !== 'undefined') {
        mailgun = new Mailgun(global.FormData);
      } else {
        throw new Error('global.FormData is undefined');
      }
    } else {
      mailgun = new Mailgun(formData);
    }

    const client = mailgun.client({
      username: 'js_test_username',
      key: 'js_test_key',
      public_key: 'js_test_key',
      timeout: 10000,
    });
    this.client = client;
    return this.client;
  }

  async sendMessage(domain, messageData) {
    const api = nock(this.url);

    if ('message' in messageData) {
      api.post('/v3/test.domain.com/messages.mime').reply(200, successResponse.body);
    } else {
      api.post('/v3/test.domain.com/messages').reply(200, successResponse.body);
    }
    const result = await this.client.messages.create(domain, messageData);
    api.done();
    return result;
  }

  async sendMessageWithAttachment(domain, messageData) {
    const messageDataClone = { ...messageData };
    const img = await fs.readFileSync(path.resolve(__dirname, '../img/mailgun.png'));

    const api = nock(this.url);
    api.post('/v3/test.domain.com/messages').reply(200, successResponse.body);

    messageDataClone.attachment = [{ filename: 'test_file', data: img }];
    const result = await this.client.messages.create(domain, messageDataClone);

    api.done();
    return result;
  }
}

module.exports = NodeClient;
