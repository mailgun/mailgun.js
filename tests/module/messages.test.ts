import fs from 'fs';
import nock from 'nock';

import Request from './test-utils/TestRequest.js';
import MessagesClient from '../../lib/Classes/Messages.js';
import { RequestOptions } from '../../lib/Types/index.js';
import getTestFormData from './test-utils/TestFormData.js';

const mailgunLogo = fs.createReadStream(`${__dirname}/img/mailgun.png`);

describe('MessagesClient', function () {
  let client: MessagesClient;
  let api: nock.Scope;
  const request = new Request({ url: 'https://api.mailgun.net' } as RequestOptions, getTestFormData());
  beforeEach(function () {
    // chai.spy.on(request, 'postWithFD');
    client = new MessagesClient(request);
    api = nock('https://api.mailgun.net');
  });

  afterEach(function () {
    api.done();
    jest.restoreAllMocks();
  });

  describe('create', function () {
    it('sends an email', async () => {
      api.post('/v3/sandbox.mailgun.org/messages').reply(200, {
        message: 'Queued. Thank you.',
        id: '<20111114174239.25659.5817@samples.mailgun.org>'
      });

      const data = await client.create('sandbox.mailgun.org', {
        to: 'foo@example.com',
        from: 'bar@example.com',
        subject: 'howdy!',
        text: 'ello world!'
      });
      expect(data).toMatchObject({
        message: 'Queued. Thank you.',
        id: '<20111114174239.25659.5817@samples.mailgun.org>',
        status: 200,
      });
    });

    it('converts boolean to yes/no values', async () => {
      const postWithFDMock = jest.spyOn(request, 'postWithFD');
      api.post('/v3/sandbox.mailgun.org/messages').reply(200, {
        message: 'Queued. Thank you.',
        id: '<20111114174239.25659.5817@samples.mailgun.org>'
      });

      const data = await client.create('sandbox.mailgun.org', {
        'o:testmode': true,
        't:text': false,
        'o:dkim': true,
        'o:tracking': false,
        'o:tracking-clicks': true,
        'o:tracking-opens': true,
        'o:require-tls': true,
        'o:skip-verification': true,
        text: 'test'
      });

      expect(postWithFDMock).toHaveBeenCalledWith('/v3/sandbox.mailgun.org/messages', {
        'o:testmode': 'yes',
        't:text': 'no',
        'o:dkim': 'yes',
        'o:tracking': 'no',
        'o:tracking-clicks': 'yes',
        'o:tracking-opens': 'yes',
        'o:require-tls': 'yes',
        'o:skip-verification': 'yes',
        text: 'test'
      });
      expect(data).toMatchObject({
        message: 'Queued. Thank you.',
        id: '<20111114174239.25659.5817@samples.mailgun.org>',
        status: 200,
      });
    });

    it('returns error messages', async () => {
      api.post('/v3/sandbox.mailgun.org/messages').reply(400, { message: 'Missing parameter \'to\'.' });
      try {
        await client.create('sandbox.mailgun.org', {
          from: 'bar@example.com',
          subject: 'howdy!',
          text: 'ello world!'
        });
      } catch (error) {
        expect(error).toMatchObject({
          details: 'Missing parameter \'to\'.',
          status: 400
        });
      }
    });

    it('sends a mime email', async () => {
      api.post('/v3/sandbox.mailgun.org/messages.mime').reply(200, {
        message: 'Queued. Thank you.',
        id: '<20111114174239.25659.5817@samples.mailgun.org>'
      });

      const data = await client.create('sandbox.mailgun.org', {
        to: 'foo@example.com',
        from: 'bar@example.com',
        subject: 'howdy!',
        message: 'hello world!'
      });
      expect(data).toMatchObject({
        message: 'Queued. Thank you.',
        status: 200,
      });
    });

    it('sends an attachment', async () => {
      api.post('/v3/sandbox.mailgun.org/messages').reply(200, {
        message: 'Queued. Thank you.',
        id: '<20111114174239.25659.5817@samples.mailgun.org>'
      });

      const data = await client.create('sandbox.mailgun.org', {
        to: 'foo@example.com',
        from: 'bar@example.com',
        subject: 'howdy!',
        text: 'Testing some Mailgun awesomeness!',
        attachment: [mailgunLogo]
      });
      expect(data).toMatchObject({
        message: 'Queued. Thank you.',
        status: 200,
      });
    });

    it('throws error when no data provided', async () => {
      try {
        // @ts-expect-error testing invalid data
        await client.create('sandbox.mailgun.org', {});
      } catch (error) {
        expect(error).toMatchObject({
          message: 'Message data object can not be empty', details: 'Message data object can not be empty'
        });
      }
    });
  });

  describe('retrieveStoredEmail', function () {
    it('retrieves stored email', async () => {
      const apiResponse = {
        'Content-Type': 'multipart/alternative; boundary="boundary_12345"',
        From: 'postmaster@sandbox.mailgun.org',
        'Message-Id': '<123.123@sandbox.mailgun.org>',
        'Mime-Version': '1.0',
        Subject: 'Hello',
        To: 'foo@example.com',
        'X-Mailgun-Deliver-By': 'Fri, 28 Nov 2025 18:02:00 +0000',
        sender: 'postmaster@sandbox.mailgun.org',
        recipients: 'foo@example.com',
        from: 'postmaster@sandbox.mailgun.org',
        subject: 'Hello',
        'body-html': '<a href="https://test.com">Test</a>',
        'body-plain': 'Testing some Mailgun awesomness!',
        attachments: [],
        'content-id-map': {},
        'message-headers': [
          ['Mime-Version', '1.0'],
          [
            'Content-Type',
            'multipart/alternative; boundary="boundary_12345'
          ],
          ['Subject', 'Hello'],
          ['From', 'postmaster@sandbox.mailgun.org'],
          ['To', 'foo@example.com'],
          ['X-Mailgun-Deliver-By', 'Fri, 28 Nov 2025 18:02:00 +0000'],
          [
            'Message-Id',
            '<123.123@sandbox.mailgun.org>'
          ]
        ],
        'stripped-html': '<a href="https://test.com">Test</a>',
        'stripped-text': 'Testing some Mailgun awesomness!',
        'stripped-signature': ''
      };
      api.get('/v3/domains/sandbox.mailgun.org/messages/abc123').reply(200, apiResponse);

      const data = await client.retrieveStoredEmail('sandbox.mailgun.org', 'abc123');
      expect(data).toMatchObject(apiResponse);
    });
  });

  describe('resendEmail', function () {
    it('resends stored email', async () => {
      api.post('/v3/domains/sandbox.mailgun.org/messages/abc123').reply(200, {
        message: 'Queued. Thank you.',
        id: '<20111114174239.25659.5817@samples.mailgun.org>'
      });

      const data = await client.resendEmail('sandbox.mailgun.org', 'abc123', 'foo@example.com');
      expect(data).toMatchObject({
        message: 'Queued. Thank you.',
        status: 200,
      });
    });
  });

  describe('getMessagesQueueStatus', function () {
    it('retrieves messages queue status', async () => {
      const apiResponse = {
        regular: {
          is_disabled: false,
          disabled: {
            until: null,
            reason: ''
          }
        },
        scheduled: {
          is_disabled: true,
          disabled: {
            until: '2025-11-28T18:02:00Z',
            reason: 'High load'
          }
        }
      };
      api.get('/v3/domains/sandbox.mailgun.org/sending_queues').reply(200, apiResponse);

      const data = await client.getMessagesQueueStatus('sandbox.mailgun.org');
      expect(data).toMatchObject({
        regular: {
          is_disabled: false,
          disabled: {
            until: '',
            reason: ''
          }
        },
        scheduled: {
          is_disabled: true,
          disabled: {
            until: new Date('2025-11-28T18:02:00Z'),
            reason: 'High load'
          }
        }
      });
    });
  });

  describe('clearMessagesQueue', function () {
    let storageApi: nock.Scope;
    beforeEach(function () {
      storageApi = nock('https://storage-us-east4.api.mailgun.net');
    });

    afterEach(function () {
      storageApi.done();
    });

    it('clears messages queue', async () => {
      storageApi.delete('/v3/sandbox.mailgun.org/envelopes').reply(200, {
        message: 'done'
      });

      const data = await client.clearMessagesQueue('sandbox.mailgun.org', 'storage-us-east4.api.mailgun.net');
      expect(data).toMatchObject({
        message: 'done'
      });
    });

    it('throws error for invalid storage URL', async () => {
      try {
        await client.clearMessagesQueue('sandbox.mailgun.org', 'invalid-storage.api.mailgun.net');
      } catch (error) {
        expect(error).toMatchObject({
          message: 'Invalid storage URL',
          details: 'The provided storage URL is not allowed.'
        });
      }
    });
  });
});
