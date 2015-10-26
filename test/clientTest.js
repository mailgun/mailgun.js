var Client = require('../lib/client');
var Request = require('../lib/request');
var DomainClient = require('../lib/domains');
var EventClient = require('../lib/events');
var WebhookClient = require('../lib/webhooks');
var SuppressionClient = require('../lib/suppressions');
var MessagesClient = require('../lib/messages');
var RoutesClient = require('../lib/routes');
var ValidateClient = require('../lib/validate');
var ParseClient = require('../lib/parse');

describe('Client', function() {
  var client;

  beforeEach(function() {
    client = new Client({ username: 'username', key: 'key', public_key: 'key' });
  });

  it('raises error when username is not provided', function() {
    (function() {
      return new Client({ key: 'key' });
    }).should.throw('Parameter "username" is required');
  });

  it('raises error when key is not provided', function() {
    (function() {
      return new Client({ username: 'username' });
    }).should.throw('Parameter "key" is required');
  });

  it('exposes raw request client', function() {
    client.request.should.be.instanceOf(Request);
  });

  it('creates domain client', function() {
    client.domains.should.be.instanceOf(DomainClient);
  });

  it('creates event client', function() {
    client.events.should.be.instanceOf(EventClient);
  });

  it('creates webhook client', function() {
    client.webhooks.should.be.instanceOf(WebhookClient);
  });

  it('creates suppressions client', function() {
    client.suppressions.should.be.instanceOf(SuppressionClient);
  });

  it('creates messages client', function() {
    client.messages.should.be.instanceOf(MessagesClient);
  });

  it('creates routes client', function() {
    client.routes.should.be.instanceOf(RoutesClient);
  });

  it('creates address validate client', function() {
    client.validate.should.be.instanceOf(ValidateClient);
  });

  it('creates address parse client', function() {
    client.parse.should.be.instanceOf(ParseClient);
  });
});
