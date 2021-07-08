// jscs:disable requireDotNotation
import formData from 'form-data';

import base64 from 'base-64';
import nock from 'nock';
import { expect } from 'chai';
import Request from '../lib/request';
import RequestOptions from '../lib/interfaces/RequestOptions';
import APIError from '../lib/error';
import APIResponse from '../lib/interfaces/ApiResponse';

describe('Request', function () {
  let headers: { [key: string]: string };

  beforeEach(function () {
    headers = {};
    headers.Authorization = `Basic ${base64.encode('api:key')}`;
  });

  describe('request', function () {
    it('makes API request', async function () {
      headers.Test = 'Custom Header';
      headers['X-CSRF-Token'] = 'protectme';

      nock('https://api.mailgun.com', { reqheaders: headers })
        .get('/v2/some/resource1')
        .query({ some: 'parameter' })
        .reply(200, {});

      const req = new Request({
        username: 'api',
        key: 'key',
        url: 'https://api.mailgun.com',
        headers: { 'X-CSRF-Token': 'protectme' },
        timeout: 10000
      }, formData);

      await req.request('get', '/v2/some/resource1', {
        headers: { Test: 'Custom Header', 'X-CSRF-Token': 'protectme' },
        query: { some: 'parameter' }
      });
    });

    it('parses API response', function () {
      nock('https://api.mailgun.com', { reqheaders: headers })
        .get('/v2/some/resource')
        .reply(200, { id: 1, message: 'hello' });

      const req = new Request({ username: 'api', key: 'key', url: 'https://api.mailgun.com' } as RequestOptions, formData);
      const res = req.request('get', '/v2/some/resource')
        .then(function (response: APIResponse) {
          expect(response.status).to.eql(200);
          expect(response.body).to.eql({ id: 1, message: 'hello' });
        });

      return res;
    });

    it('handles API error', function () {
      nock('https://api.mailgun.com', { reqheaders: headers })
        .get('/v2/some/resource')
        .reply(429, 'Too many requests');

      const req = new Request({ username: 'api', key: 'key', url: 'https://api.mailgun.com' } as RequestOptions, formData);
      const res = req.request('get', '/v2/some/resource').catch(function (error: APIError) {
        expect(error.status).to.eql(429);
        expect(error.details).to.eql('Too many requests');
      });

      return res;
    });
  });

  describe('query', function () {
    const search = { query: 'data' };

    it('sends data as query parameter', async function () {
      nock('https://api.mailgun.com')
        .get('/v2/some/resource2')
        .query(search)
        .reply(200, {});

      const req = new Request({ url: 'https://api.mailgun.com' } as RequestOptions, formData);
      await req.query('get', '/v2/some/resource2', search);
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
