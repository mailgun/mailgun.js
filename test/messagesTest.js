const nock = require('nock');
const fs = require('fs');

const Request = require('../lib/request');
const MessagesClient = require('../lib/messages');

const mailgunLogo = fs.createReadStream(`${__dirname}/img/mailgun.png`);

describe('MessagesClient', function () {
  let client;
  let api;

  beforeEach(function () {
    client = new MessagesClient(new Request({ url: 'https://api.mailgun.net' }));
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
      }).then(function (data) {
        data.message.should.eql('Queued. Thank you.');
      });
    });

    it('returns error messages', function () {
      api.post('/v3/sandbox.mailgun.org/messages').reply(400, {
        message: 'Missing parameter \'to\'.'
      });

      return client.create('sandbox.mailgun.org', {
        from: 'bar@example.com',
        subject: 'howdy!',
        text: 'ello world!'
      }).catch(function (data) {
        data.message.should.eql('Missing parameter \'to\'.');
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
      }).then(function (data) {
        data.message.should.eql('Queued. Thank you.');
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
      }).then(function (data) {
        data.message.should.eql('Queued. Thank you.');
      });
    });

    it('sends with recipient-variables', function () {
      api.post('/v3/sandbox.mailgun.org/messages').reply(200, {
        message: 'Queued. Thank you.',
        id: '<20111114174239.25659.5817@samples.mailgun.org>'
      });

      return client.create('sandbox.mailgun.org', {
        to: ['foo@example.com', 'bar@example.com'],
        from: 'bar@example.com',
        subject: 'howdy!',
        text: 'Testing some Mailgun awesomeness!',
        'recipient-variables': { 'foo@example.com': { test: 'test' }, 'bar@example.com': { test: 'test' } },
      }).then(function (data) {
        data.message.should.eql('Queued. Thank you.');
      });
    });
  });
});
