/* global expect page beforeAll */
const { default: mockServer } = require('pptr-mock-server');
const { successResponse } = require('../../../tests_data/messageResponses');

const serverUrl = 'http://localhost:3000';

describe('Send message functionality', () => {
  let mockRequest;
  beforeAll(async () => {
    await page.goto('http://localhost:3000/pages/AMD.html');
    await page.waitForFunction(function () { return typeof window.mailgunClient !== 'undefined'; });
    mockRequest = await mockServer.init(page, {
      // By default all requests matching baseAppUrl are continued.
      baseAppUrl: global.server_url,
    });
  });

  test('Sends plain email', async () => {
    mockRequest.post(`${serverUrl}/v3/test.domain.com/messages`, 200, successResponse);
    const result = await page.evaluate(
      (domain, messageData) => window.mailgunClient.messages.create(domain, messageData),
      'test.domain.com', {
        to: 'foo@example.com',
        from: 'bar@example.com',
        subject: 'howdy!',
        text: 'Hello world!'
      }
    );
    expect(typeof result).toBe('object');
    expect(result).toEqual({
      status: 200,
      message: 'Queued. Thank you.',
      id: '<20111114174239.25659.5817@samples.mailgun.org>'
    });
  });

  test('Sends mime email', async () => {
    mockRequest.post(`${serverUrl}/v3/test.domain.com/messages.mime`, 200, successResponse);
    const result = await page.evaluate(
      (domain, messageData) => window.mailgunClient.messages.create(domain, messageData),
      'test.domain.com', {
        to: 'foo@example.com',
        from: 'bar@example.com',
        subject: 'howdy!',
        message: 'hello world!'
      }
    );
    expect(typeof result).toBe('object');
    expect(result).toEqual({
      status: 200,
      message: 'Queued. Thank you.',
      id: '<20111114174239.25659.5817@samples.mailgun.org>'
    });
  });

  it('Sends an attachment', async () => {
    mockRequest.post(`${serverUrl}/v3/test.domain.com/messages`, 200, successResponse);
    await page.waitForSelector('input[type=file]');
    const input = await page.$('input[type=file]');
    await input.uploadFile('../../../tests_data/img/mailgun.png');

    const result = await page.evaluate(
      async (domain, messageData) => {
        const messageDataCopy = { ...messageData };
        const inputFile = document.getElementById('fileUpload');
        const mailgunLogo = inputFile.files[0];
        messageDataCopy.attachment = [{ filename: mailgunLogo.name, data: mailgunLogo }];
        return window.mailgunClient.messages.create(domain, messageDataCopy);
      },
      'test.domain.com', {
        to: 'foo@example.com',
        from: 'bar@example.com',
        subject: 'howdy!',
        attachment: []
      }
    );
    expect(typeof result).toBe('object');
    expect(result).toEqual({
      status: 200,
      message: 'Queued. Thank you.',
      id: '<20111114174239.25659.5817@samples.mailgun.org>'
    });
  });
});
