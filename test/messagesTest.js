var nock = require('nock');
var should = require('should');
import Request from '../lib/request';
import MessagesClient from '../lib/messages';

describe('MessagesClient', function() {
  var client, api;

  beforeEach(function() {
    client = new MessagesClient(new Request({ url: 'https://api.mailgun.net' }));
    api = nock('https://api.mailgun.net');
  });

  afterEach(function() {
    api.done();
  });

  describe('create', function() {
    it('sends an email', function() {
      api.post('/v3/sandbox.mailgun.org/messages').reply(200, {
        message: 'Queued. Thank you.',
        id: '<20111114174239.25659.5817@samples.mailgun.org>'
      });

      return client.create('sandbox.mailgun.org', {
        to: 'foo@example.com',
        from: 'bar@example.com',
        subject: 'howdy!',
        text: 'ello world!'
      }).then(function(data) {
        data.message.should.eql('Queued. Thank you.');
      });
    });

    it('returns error messages', function() {
      api.post('/v3/sandbox.mailgun.org/messages').reply(400, {
        message: 'Missing parameter \'to\'.'
      });

      return client.create('sandbox.mailgun.org', {
        from: 'bar@example.com',
        subject: 'howdy!',
        text: 'ello world!'
      }).catch(function(data) {
        data.message.should.eql('Missing parameter \'to\'.');
      });
    });

    it('sends a mime email', function() {
      api.post('/v3/sandbox.mailgun.org/messages.mime').reply(200, {
        message: 'Queued. Thank you.',
        id: '<20111114174239.25659.5817@samples.mailgun.org>'
      });

      return client.create('sandbox.mailgun.org', {
        to: 'foo@example.com',
        from: 'bar@example.com',
        subject: 'howdy!',
        mime: 'ello world!'
      }).then(function(data) {
        data.message.should.eql('Queued. Thank you.');
      });
    });
  });
});
