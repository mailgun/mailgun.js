import formData from 'form-data'; // importing this way to not have type error in line 13

import fs from 'fs';
import nock from 'nock';
import { expect } from 'chai';

import Request from '../lib/request';
import MessagesClient from '../lib/messages';
import { RequestOptions } from '../lib/interfaces/RequestOptions';
import { InputFormData } from '../lib/interfaces/IFormData';
import { MessagesSendResult } from '../lib/interfaces/Messages';

const mailgunLogo = fs.createReadStream(`${__dirname}/img/mailgun.png`);

describe('MessagesClient', function () {
  let client: MessagesClient;
  let api: nock.Scope;

  beforeEach(function () {
    client = new MessagesClient(new Request({ url: 'https://api.mailgun.net' } as RequestOptions, formData as InputFormData));
    api = nock('https://api.mailgun.net');
  });

  afterEach(function () {
    api.done();
  });

  describe('create', function () {
    it('sends an email', function () {
      api.post('/v3/sandbox.mailgun.org/messages').reply(200, {
        message: 'Queued. Thank you.',
        id: '<20111114174239.25659.5817@samples.mailgun.org>'
      });

      return client.create('sandbox.mailgun.org', {
        to: 'foo@example.com',
        from: 'bar@example.com',
        subject: 'howdy!',
        text: 'ello world!'
      }).then(function (data: MessagesSendResult) {
        expect(data.message).to.eql('Queued. Thank you.');
        expect(data.id).to.eql('<20111114174239.25659.5817@samples.mailgun.org>');
        expect(data.status).to.eql(200);
      });
    });

    it('returns error messages', function () {
      api.post('/v3/sandbox.mailgun.org/messages').reply(400, 'Missing parameter \'to\'.');

      return client.create('sandbox.mailgun.org', {
        from: 'bar@example.com',
        subject: 'howdy!',
        text: 'ello world!'
      }).catch(function (data: MessagesSendResult) {
        expect(data.details).to.eql('Missing parameter \'to\'.');
        expect(data.status).to.eql(400);
      });
    });

    it('sends a mime email', function () {
      api.post('/v3/sandbox.mailgun.org/messages.mime').reply(200, {
        message: 'Queued. Thank you.',
        id: '<20111114174239.25659.5817@samples.mailgun.org>'
      });

      return client.create('sandbox.mailgun.org', {
        to: 'foo@example.com',
        from: 'bar@example.com',
        subject: 'howdy!',
        message: 'ello world!'
      }).then(function (data: MessagesSendResult) {
        expect(data.message).to.eql('Queued. Thank you.');
        expect(data.status).to.eql(200);
      });
    });

    it('sends an attachment', function () {
      api.post('/v3/sandbox.mailgun.org/messages').reply(200, {
        message: 'Queued. Thank you.',
        id: '<20111114174239.25659.5817@samples.mailgun.org>'
      });

      return client.create('sandbox.mailgun.org', {
        to: 'foo@example.com',
        from: 'bar@example.com',
        subject: 'howdy!',
        text: 'Testing some Mailgun awesomeness!',
        attachment: [mailgunLogo]
      }).then(function (data: MessagesSendResult) {
        expect(data.message).to.eql('Queued. Thank you.');
        expect(data.status).to.eql(200);
      });
    });
  });
});
