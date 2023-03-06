// jscs:disable requireDotNotation
import formData from 'form-data';

import base64 from 'base-64';
import nock from 'nock';
import { expect } from 'chai';
import Request from '../lib/request';
import { RequestOptions } from '../lib/interfaces/RequestOptions';
import APIError from '../lib/error';
import APIResponse from '../lib/interfaces/ApiResponse';
import { InputFormData } from '../lib/interfaces/IFormData';

describe('Request', function () {
  let headers: { [key: string]: string };
  const baseURL = 'https://api.mailgun.com';

  beforeEach(function () {
    headers = {};
    headers.Authorization = `Basic ${base64.encode('api:key')}`;
  });

  describe('request', async function () {
    it('makes API request with correct headers', async function () {
      let reqHeaders = {};
      headers.Test = 'Custom Header';
      headers['X-CSRF-Token'] = 'protectme';

      nock(baseURL, { reqheaders: headers })
        .get('/v2/some/resource1')
        .query({ some: 'parameter' })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .reply(200, function (_, requestBody) {
          reqHeaders = this.req.headers;
        });

      const req = new Request({
        username: 'api',
        key: 'key',
        url: baseURL,
        headers: { 'X-CSRF-Token': 'protectme' },
        timeout: 10000
      }, formData as InputFormData);

      await req.request('get', '/v2/some/resource1', {
        headers: { Test: 'Custom Header', 'X-CSRF-Token': 'protectme' },
        query: { some: 'parameter' }
      });
      expect(reqHeaders).to.have.property('authorization').to.eql('Basic YXBpOmtleQ==');
      expect(reqHeaders).to.have.property('test').to.eql('Custom Header');
      expect(reqHeaders).to.have.property('x-csrf-token').to.eql('protectme');
    });

    it('parses API response', function () {
      nock(baseURL, { reqheaders: headers })
        .get('/v2/some/resource')
        .reply(200, { id: 1, message: 'hello' });

      const req = new Request({ username: 'api', key: 'key', url: baseURL } as RequestOptions, formData as InputFormData);
      const res = req.request('get', '/v2/some/resource')
        .then(function (response: APIResponse) {
          expect(response.status).to.eql(200);
          expect(response.body).to.eql({ id: 1, message: 'hello' });
        });

      return res;
    });

    it('parses API response with string', async function () {
      nock(baseURL, { reqheaders: headers })
        .get('/v3/some/resource')
        .reply(200, 'Mailgun Magnificent API');

      const req = new Request({ username: 'api', key: 'key', url: baseURL } as RequestOptions, formData as InputFormData);
      try {
        await req.request('get', '/v3/some/resource');
      } catch (error) {
        expect(error).to.include({
          status: 400,
          details: 'Mailgun Magnificent API',
          message: 'Incorrect url'
        });
      }
    });

    it('handles API error', function () {
      nock(baseURL, { reqheaders: headers })
        .get('/v2/some/resource')
        .reply(429, 'Too many requests');

      const req = new Request({ username: 'api', key: 'key', url: baseURL } as RequestOptions, formData as InputFormData);
      const res = req.request('get', '/v2/some/resource').catch(function (error: APIError) {
        expect(error.status).to.eql(429);
        expect(error.details).to.eql('Too many requests');
      });

      return res;
    });

    it('handles axios error', async () => {
      nock(baseURL, { reqheaders: headers })
        .post('/v2/some/resource')
        .reply(400, 'Too big body');

      const twentyFiveMegabytesInBytes = 52428899;
      const moreThanExpectedLimitBuffer = Buffer.alloc(twentyFiveMegabytesInBytes);
      const req = new Request({ username: 'api', key: 'key', url: baseURL } as RequestOptions, formData as InputFormData);
      try {
        await req.postWithFD(
          '/v2/some/resource',
          {
            attachment: [{
              filename: 'test.pdf',
              data: moreThanExpectedLimitBuffer
            }]
          }
        );
      } catch (error: unknown) {
        expect(error).to.have.property('status');
        expect(error).to.have.property('details');
        const err: APIError = error as APIError;
        expect(err.status).to.eql(400);
        expect(err.details).to.eql('Request body larger than maxBodyLength limit');
      }
    });
  });

  describe('query', function () {
    const search = { query: 'data' };

    it('sends data as query parameter', async function () {
      nock(baseURL)
        .get('/v2/some/resource2')
        .query(search)
        .reply(200, {});

      const req = new Request({ url: baseURL } as RequestOptions, formData as InputFormData);
      await req.query('get', '/v2/some/resource2', search);
    });
  });

  describe('command', function () {
    const body = { query: 'data' };

    it('sends data as form-encoded request body', function () {
      nock(baseURL)
        .post('/v2/some/resource')
        .reply(200, {});

      const req = new Request({ url: baseURL } as RequestOptions, formData as InputFormData);
      const res = req.command('post', '/v2/some/resource', body);

      return res;
    });
  });
});
