// jscs:disable requireDotNotation
const formData = require('form-data');

import btoa from 'btoa';
import nock from 'nock';
import Request from '../lib/request';
import RequestOptions from '../lib/interfaces/RequestOptions';
import { expect } from 'chai';

interface Response {
  status: number;
  body: { id: number, message: string };
}

interface Error {
  status: number;
  message: string;
}

describe('Request', function () {
  let headers: { [key: string]: string };

  beforeEach(function () {
    headers = {};
    headers.Authorization = `Basic ${btoa('api:key')}`;
  });

  describe('request', function () {
    it('makes API request', async function () {
      headers.Test = 'Custom Header';
      headers['X-CSRF-Token'] = 'protectme';

      nock('https://api.mailgun.com', { reqheaders: headers })
        .get('/v2/some/resource')
        .query({ query: 'parameter' })
        .reply(200);

      const req = new Request({
        username: 'api',
        key: 'key',
        url: 'https://api.mailgun.com',
        headers: { 'X-CSRF-Token': 'protectme' }
      }, formData);

      const res = req.request('get', '/v2/some/resource', {
        headers: { Test: 'Custom Header' },
        query: { query: 'parameter' }
      });

      return res;
    });

    it('parses API response', function () {
      nock('https://api.mailgun.com', { reqheaders: headers })
        .get('/v2/some/resource')
        .reply(200, { id: 1, message: 'hello' });

      const req = new Request({ username: 'api', key: 'key', url: 'https://api.mailgun.com' } as RequestOptions, formData);
      const res = req.request('get', '/v2/some/resource')
        .then(function (response: Response) {
          expect(response.status).to.eql(200);
          expect(response.body).to.eql({ id: 1, message: 'hello' });
        });

      return res;
    });

    it('handles API error', function () {
      nock('https://api.mailgun.com', { reqheaders: headers })
        .get('/v2/some/resource')
        .reply(429, { message: 'Too many requests' });

      const req = new Request({ username: 'api', key: 'key', url: 'https://api.mailgun.com' } as RequestOptions, formData);
      const res = req.request('get', '/v2/some/resource').catch(function (error: Error) {
        expect(error.status).to.eql(429);
        expect(error.message).to.eql('Too many requests');
      });

      return res;
    });
  });

  describe('query', function () {
    const search = { query: 'data' };

    it('sends data as query parameter', function () {
      nock('https://api.mailgun.com')
        .get('/v2/some/resource')
        .query(search)
        .reply(200);

      const req = new Request({ url: 'https://api.mailgun.com' } as RequestOptions, formData);
      const res = req.query('get', '/v2/some/resource', { query: search });

      return res;
    });
  });

  describe('command', function () {
    const body = { query: 'data' };

    it('sends data as form-encoded request body', function () {
      nock('https://api.mailgun.com')
        .post('/v2/some/resource')
        .reply(200, {});

      const req = new Request({ url: 'https://api.mailgun.com' } as RequestOptions, formData);
      const res = req.command('post', '/v2/some/resource', body);

      return res;
    });
  });
});
