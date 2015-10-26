var nock = require('nock');
var should = require('should');
import Request from '../lib/request';
var ValidateClient = require('../lib/validate');

describe('ValidateClient', function() {
  var client, api;

  beforeEach(function() {
    client = new ValidateClient(new Request({ url: 'https://api.mailgun.net' }));
    api = nock('https://api.mailgun.net');
  });

  afterEach(function() {
    api.done();
  });

  describe('get', function() {
    it('validates a single email address', function() {
      var data = {
        address: 'Alice <alice@example.com>',
        did_you_mean: null,
        is_valid: false,
        parts: { display_name: null, domain: null, local_part: null }
      };

      api.get('/v3/address/validate?address=foo%40example.com').reply(200, data);

      return client.get('foo@example.com').then(function(response) {
        response.should.eql(data);
      });
    });
  });
});
