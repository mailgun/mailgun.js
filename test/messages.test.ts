import formData from 'form-data'; // importing this way to not have type error in line 13

import fs from 'fs';
import nock from 'nock';
import chai from 'chai';
import spies from 'chai-spies';

import Request from '../lib/Classes/common/Request';
import MessagesClient from '../lib/Classes/Messages';
import { InputFormData, RequestOptions } from '../lib/Types/Common';
import { MessagesSendResult } from '../lib/Types/Messages';

chai.use(spies);
const expect = chai.expect;

const mailgunLogo = fs.createReadStream(`${__dirname}/img/mailgun.png`);

describe('MessagesClient', function () {
  let client: MessagesClient;
  let api: nock.Scope;
  let request: Request;
  beforeEach(function () {
    request = new Request({ url: 'https://api.mailgun.net' } as RequestOptions, formData as InputFormData);
    chai.spy.on(request, 'postWithFD');
    client = new MessagesClient(request);
    api = nock('https://api.mailgun.net');
  });

  afterEach(function () {
    api.done();
    chai.spy.restore();
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

    it('converts boolean to yes/no values', function () {
      api.post('/v3/sandbox.mailgun.org/messages').reply(200, {
        message: 'Queued. Thank you.',
        id: '<20111114174239.25659.5817@samples.mailgun.org>'
      });

      return client.create('sandbox.mailgun.org', {
        'o:testmode': true,
        't:text': false,
        'o:dkim': true,
        'o:tracking': false,
        'o:tracking-clicks': true,
        'o:tracking-opens': true,
        'o:require-tls': true,
        'o:skip-verification': true,
        text: 'test'
      }).then(function (data: MessagesSendResult) {
        expect(request.postWithFD).to.have.been.called.with({
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
        expect(data.message).to.eql('Queued. Thank you.');
        expect(data.id).to.eql('<20111114174239.25659.5817@samples.mailgun.org>');
        expect(data.status).to.eql(200);
      });
    });

    it('returns error messages', function () {
      api.post('/v3/sandbox.mailgun.org/messages').reply(400, { message: 'Missing parameter \'to\'.' });

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
        message: 'hello world!'
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
