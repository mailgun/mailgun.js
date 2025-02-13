import formData from 'form-data'; // importing this way to not have type error in line 13

import fs from 'fs';
import nock from 'nock';

import Request from '../../lib/Classes/common/Request.js';
import MessagesClient from '../../lib/Classes/Messages.js';
import { InputFormData, RequestOptions } from '../../lib/Types/index.js';

const mailgunLogo = fs.createReadStream(`${__dirname}/img/mailgun.png`);

describe('MessagesClient', function () {
  let client: MessagesClient;
  let api: nock.Scope;
  const request = new Request({ url: 'https://api.mailgun.net' } as RequestOptions, formData as InputFormData);
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
  });
});
