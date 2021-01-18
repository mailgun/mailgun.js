const formData = require('form-data');

import nock from 'nock';
import Request from '../lib/request';
import ValidateClient from '../lib/validate';
import RequestOptions from '../lib/interfaces/RequestOptions';

describe('ValidateClient', function () {
  let client: any;
  let api: any;

  beforeEach(function () {
    client = new ValidateClient(new Request({ url: 'https://api.mailgun.net' } as RequestOptions, formData));
    api = nock('https://api.mailgun.net');
  });

  afterEach(function () {
    api.done();
  });

  describe('get', function () {
    it('validates a single email address', function () {
      const data: any = {
        address: 'Alice <alice@example.com>',
        did_you_mean: null,
        is_valid: false,
        parts: { display_name: null, domain: null, local_part: null }
      };

      api.get('/v3/address/validate')
        .query({ address: 'foo@example.com' })
        .reply(200, data);

      return client.get('foo@example.com').then(function (response: any) {
        response.should.eql(data);
      });
    });
  });
});
