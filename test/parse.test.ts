const formData = require('form-data');

import { URLSearchParams } from 'url';
import nock from 'nock';
import Request from '../lib/request';
import ParseClient from '../lib/parse';

import RequestOptions from '../lib/interfaces/RequestOptions';

interface Data {
  parsed: string[],
  unparseable: string[]
};

describe('ParseClient', function () {
  let client: any;
  let api: any;

  beforeEach(function () {
    client = new ParseClient(new Request({ url: 'https://api.mailgun.net' } as RequestOptions, formData));
    api = nock('https://api.mailgun.net');
  });

  afterEach(function () {
    api.done();
  });

  describe('get', function () {
    it('parses a single email addresses', function () {
      const data: Data = {
        parsed: ['foo@example.com'],
        unparseable: []
      };

      const query = new URLSearchParams({ addresses: data.parsed });

      api.get('/v3/address/parse').query(query).reply(200, data);

      return client.get('foo@example.com').then(function (response: Data) {
        response.should.eql(data);
      });
    });

    it('parses an array email addresses', function () {
      const data: Data = {
        parsed: ['foo@example.com'],
        unparseable: ['example.com']
      };

      api.get('/v3/address/parse')
        .query({ addresses: 'foo@example.com,example.com' })
        .reply(200, data);

      return client.get(['foo@example.com', 'example.com']).then(function (response: Data) {
        response.should.eql(data);
      });
    });

    it('parses email addresses with dns and esp checks', function () {
      const data: Data = {
        parsed: [],
        unparseable: ['foo@example.com']
      };

      api.get('/v3/address/parse')
        .query({ addresses: 'foo@example.com', syntax_only: false })
        .reply(200, data);

      return client.get('foo@example.com', true).then(function (response: Data) {
        response.should.eql(data);
      });
    });
  });
});
