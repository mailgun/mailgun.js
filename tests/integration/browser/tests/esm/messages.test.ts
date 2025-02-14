import {
  afterAll,
  beforeAll,
  describe,
  expect,
  test
} from '@jest/globals';
import { successResponse } from '../../../tests_data/messageResponses';
import { IMailgunClient } from '../../../../../lib/Interfaces';
import { MailgunMessageData } from '../../../../../lib/Types';
import 'jest-puppeteer';

const serverUrl = 'http://localhost:3000';

type ExtendedWindow = globalThis.Window & {
  mailgunClient?: IMailgunClient
  packageExport?: object
};

describe('Send message functionality (ESM)', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3000/pages/ESM.html');
    await page.waitForFunction(function () { return typeof (window as ExtendedWindow).mailgunClient !== 'undefined'; });
    await page.setRequestInterception(true);

    page.on('request', (request) => {
      const isExpectedUrls = [`${serverUrl}/v3/test.domain.com/messages`, `${serverUrl}/v3/test.domain.com/messages.mime`];
      if (isExpectedUrls.includes(request.url())) {
        request.respond({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(successResponse.body)
        });
      } else {
        request.continue();
      }
    });
  });

  afterAll(async () => {
    await page.setRequestInterception(false);
  });

  test('Sends plain email (ESM)', async () => {
    const result = await page.evaluate(
      (domain, messageData) => (window as ExtendedWindow)?.mailgunClient?.messages.create(
        domain,
        messageData
      ),
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

  test('Sends mime email (ESM)', async () => {
    const result = await page.evaluate(
      (domain, messageData) => (window as ExtendedWindow).mailgunClient?.messages.create(
        domain,
        messageData
      ),
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

  test('Sends an attachment (ESM)', async () => {
    await page.waitForSelector('input[type=file]', { timeout: 3000 });
    const input = await page.$('input[type=file]');
    expect(input).toBeTruthy();
    await input?.uploadFile('../../../tests_data/img/mailgun.png');

    const result = await page.evaluate(
      async (domain, messageData, pageInput) => {
        const messageDataCopy: MailgunMessageData = { ...messageData };
        if (pageInput && pageInput.files?.length) {
          const mailgunLogo = pageInput.files[0];
          messageDataCopy.attachment = [{
            filename: mailgunLogo.name,
            data: mailgunLogo
          }];
        }
        return (window as ExtendedWindow).mailgunClient?.messages.create(domain, messageDataCopy);
      },
      'test.domain.com', {
        to: 'foo@example.com',
        from: 'bar@example.com',
        subject: 'howdy!',
        text: 'test',
        attachment: []
      },
      input
    );
    expect(typeof result).toBe('object');
    expect(result).toEqual({
      status: 200,
      message: 'Queued. Thank you.',
      id: '<20111114174239.25659.5817@samples.mailgun.org>'
    });
  });
});
