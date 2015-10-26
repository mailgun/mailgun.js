var nock = require('nock');
var should = require('should');
import Request from '../lib/request';
var ParseClient = require('../lib/parse');

describe('ParseClient', function() {
  var client, api;

  beforeEach(function() {
    client = new ParseClient(new Request({ url: 'https://api.mailgun.net' }));
    api = nock('https://api.mailgun.net');
  });

  afterEach(function() {
    api.done();
  });

  describe('get', function() {
    it('parses a single email addresses', function() {
      var data = {
        parsed: ['foo@example.com'],
        unparseable: []
      };

      api.get('/v3/address/parse?addresses=foo%40example.com').reply(200, data);

      return client.get('foo@example.com').then(function(response) {
        response.should.eql(data);
      });
    });

    it('parses an array email addresses', function() {
      var data = {
        parsed: ['foo@example.com'],
        unparseable: ['example.com']
      };

      api.get('/v3/address/parse?addresses=foo%40example.com%2Cexample.com').reply(200, data);

      return client.get(['foo@example.com', 'example.com']).then(function(response) {
        response.should.eql(data);
      });
    });

    it('parses email addresses with dns and esp checks', function() {
      var data = {
        parsed: [],
        unparseable: ['foo@example.com']
      };

      api.get('/v3/address/parse?addresses=foo%40example.com&syntax_only=false').reply(200, data);

      return client.get('foo@example.com', true).then(function(response) {
        response.should.eql(data);
      });
    });
  });
});
