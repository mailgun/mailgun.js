// jscs:disable requireDotNotation
import formData from 'form-data';

import base64 from 'base-64';
import nock from 'nock';
import { expect } from 'chai';
import Request from '../lib/Classes/common/Request';
import APIError from '../lib/Classes/common/Error';
import {
  InputFormData,
  APIResponse,
  RequestOptions,
  RequestHeaders
} from '../lib/Types/Common';

describe('Request', function () {
  let headers: { [key: string]: string };
  const encodedAuthHeader = 'Basic YXBpOmtleQ==';
  const baseURL = 'https://api.mailgun.com';
  let api: nock.Scope;

  beforeEach(function () {
    headers = {};
    headers.Authorization = `Basic ${base64.encode('api:key')}`;
  });

  afterEach(() => {
    if (api) {
      api.done();
    }
  });

  describe('request', async function () {
    it('makes API request with correct headers', async function () {
      let reqHeaders = {};
      headers.Test = 'Custom Header';
      headers['X-CSRF-Token'] = 'protectme';

      nock(baseURL, { reqheaders: headers })
        .get('/v2/some/resource1')
        .query({ name: 'test' })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .reply(200, function (_, requestBody) {
          reqHeaders = this.req.headers;
        });

      const req = new Request({
        username: 'api',
        key: 'key',
        url: baseURL,
        headers: { 'X-CSRF-Token': 'protectme', Test: 'Custom Header' },
        timeout: 10000,
      }, formData as InputFormData);

      await req.request('get', '/v2/some/resource1', {
        query: { name: 'test' }
      });

      expect(reqHeaders).to.have.property('authorization').to.eql(encodedAuthHeader);
      expect(reqHeaders).to.have.property('test').to.eql('Custom Header');
      expect(reqHeaders).to.have.property('x-csrf-token').to.eql('protectme');
    });

    it('parses API response', function () {
      api = nock(baseURL, { reqheaders: headers })
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
      api = nock(baseURL, { reqheaders: headers })
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
      api = nock(baseURL, { reqheaders: headers })
        .get('/v2/some/resource')
        .reply(429, 'Too many requests');

      const req = new Request({ username: 'api', key: 'key', url: baseURL } as RequestOptions, formData as InputFormData);
      const res = req.request('get', '/v2/some/resource').catch(function (error: APIError) {
        expect(error.status).to.eql(429);
        expect(error.details).to.eql('Too many requests');
      });

      return res;
    });

    it('handles body bigger than max body size error (axios)', async () => {
      nock(baseURL, { reqheaders: headers })
        .post('/v2/some/resource')
        .reply(400, 'Too big body');
      const twentyFiveMegabytesInBytes = 52428899;
      const moreThanExpectedLimitBuffer = Buffer.alloc(twentyFiveMegabytesInBytes);
      const req = new Request({
        username: 'api',
        key: 'key',
        url: baseURL,
        useFetch: false,
      } as RequestOptions, formData as InputFormData);
      let res;
      try {
        res = await req.postWithFD(
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

      // should not reach the api if size is more than limit
      expect(res?.body.message).to.not.equal('Too big body');
    });

    it('handles body bigger than max body size error (fetch)', async () => {
      nock(baseURL, { reqheaders: headers })
        .post('/v2/some/resource')
        .reply(400, 'Too big body');
      const twentyFiveMegabytesInBytes = 52428899;
      const moreThanExpectedLimitBuffer = Buffer.alloc(twentyFiveMegabytesInBytes);
      const req = new Request({
        username: 'api',
        key: 'key',
        url: baseURL,
        useFetch: true,
      } as RequestOptions, FormData);
      let res;
      try {
        res = await req.postWithFD(
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

      // should not reach the api if size is more than limit
      expect(res?.body.message).to.not.equal('Too big body');
    });

    describe('query', () => {
      const search = { name: 'test' };

      it('sends data as query parameter', async () => {
        api = nock(baseURL)
          .get('/v2/some/resource2')
          .query(search)
          .reply(200, {});

        const req = new Request({ url: baseURL } as RequestOptions, formData as InputFormData);
        await req.query('get', '/v2/some/resource2', search);
      });
    });

    describe('command', () => {
      const body = { query: 'data' };

      it('sends data as form-encoded request body', () => {
        api = nock(baseURL)
          .post('/v2/some/resource')
          .reply(200, {});

        const req = new Request({ url: baseURL } as RequestOptions, formData as InputFormData);
        const res = req.command('post', '/v2/some/resource', body);

        return res;
      });
    });

    describe('Headers', () => {
      it('handle string header', async () => {
        let reqHeaders = {};
        headers.Test = 'string header';

        api = nock(baseURL, { reqheaders: headers })
          .get('/v2/some/resource1')
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .reply(200, function (_, requestBody) {
            reqHeaders = this.req.headers;
          });

        const req = new Request({
          username: 'api',
          key: 'key',
          url: baseURL,
          headers,
        }, formData as InputFormData);
        await req.request('get', '/v2/some/resource1');
        expect(reqHeaders).to.have.property('test').to.eql('string header');
      });

      it('handle boolean header', async () => {
        let reqHeaders = {};
        const userHeaders: RequestHeaders = {
          Test: true
        };

        api = nock(baseURL, { reqheaders: { test: 'true' } })
          .get('/v2/some/resource1')
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .reply(200, function (_, requestBody) {
            reqHeaders = this.req.headers;
          });

        const req = new Request({
          username: 'api',
          key: 'key',
          url: baseURL,
          headers: userHeaders,
          timeout: 10000
        }, formData as InputFormData);

        await req.request('get', '/v2/some/resource1');
        expect(reqHeaders).to.have.property('test').to.eql('true');
      });

      it('handle array of strings in header', async () => {
        let reqHeaders = {};
        const userHeaders: RequestHeaders = {
          Test: ['value1', 'value2', 'value3']
        };

        api = nock(baseURL)
          .get('/v2/some/resource1')
          .reply(200, function () {
            reqHeaders = this.req.headers;
          });

        const req = new Request({
          username: 'api',
          key: 'key',
          url: baseURL,
          headers: userHeaders,
          useFetch: false
        }, formData as InputFormData);

        await req.request('get', '/v2/some/resource1');
        expect(reqHeaders).to.have.property('test').to.eql('value1, value2, value3'); // seems in browser it goes to string
      });

      it('handle number in header', async () => {
        let reqHeaders = {};
        const userHeaders: RequestHeaders = {
          Test: 234
        }

        api = nock(baseURL, { reqheaders: { test: '234' } })
          .get('/v2/some/resource1')
          .reply(200, function () {
            reqHeaders = this.req.headers;
          });

        const req = new Request({
          username: 'api',
          key: 'key',
          url: baseURL,
          headers: userHeaders,
        }, formData as InputFormData);

        await req.request('get', '/v2/some/resource1');
        expect(reqHeaders).to.have.property('test').to.eql('234'); // seems in browser it goes to string
      });

      it('handle null in header', async () => {
        let reqHeaders = {};
        const userHeaders: RequestHeaders = {
          Test: null
        };

        api = nock(baseURL)
          .get('/v2/some/resource1')
          .reply(200, function () {
            reqHeaders = this.req.headers;
          });

        const req = new Request({
          username: 'api',
          key: 'key',
          url: baseURL,
          headers: userHeaders,
        }, formData as InputFormData);

        await req.request('get', '/v2/some/resource1');
        expect(reqHeaders).not.to.have.property('test'); // no test because prop is null
      });
    });

    describe('Headers with fetch', async () => {
      it('handle string header', async () => {
        let reqHeaders = {};
        headers.Test = 'string header';

        api = nock(baseURL, { reqheaders: headers }).get('/test')
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .reply(200, function (_, requestBody) {
            reqHeaders = this.req.headers;
          });

        const req = new Request({
          username: 'api',
          key: 'key',
          url: baseURL,
          headers,
          useFetch: true
        }, formData as InputFormData);
        await req.request('get', '/test');
        expect(reqHeaders).to.have.property('test').to.eql('string header');
      });

      it('handle boolean header', async () => {
        let reqHeaders = {};
        const userHeaders: RequestHeaders = {
          Test: true
        };

        api = nock(baseURL, { reqheaders: { test: 'true' } })
          .get('/v2/some/resource1')
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .reply(200, function (_, requestBody) {
            reqHeaders = this.req.headers;
          });

        const req = new Request({
          username: 'api',
          key: 'key',
          url: baseURL,
          headers: userHeaders,
          useFetch: true
        }, formData as InputFormData);

        await req.request('get', '/v2/some/resource1');
        expect(reqHeaders).to.have.property('test').to.eql('true');
      });

      it('handle array of strings in header', async () => {
        let reqHeaders = {};
        const userHeaders: RequestHeaders = {
          Test: ['value1', 'value2', 'value3']
        };

        api = nock(baseURL, { reqheaders: headers })
          .get('/v2/some/resource1')
          .reply(200, function () {
            reqHeaders = this.req.headers;
          });

        const req = new Request({
          username: 'api',
          key: 'key',
          url: baseURL,
          headers: userHeaders,
          useFetch: true
        }, formData as InputFormData);

        await req.request('get', '/v2/some/resource1');
        expect(reqHeaders).to.have.property('test').to.eql('value1,value2,value3');
      });

      it('handle number in header', async () => {
        let reqHeaders = {};
        const userHeaders: RequestHeaders = {
          Test: 234
        };

        api = nock(baseURL, { reqheaders: { test: '234' } })
          .get('/v2/some/resource1')
          .reply(200, function () {
            reqHeaders = this.req.headers;
          });

        const req = new Request({
          username: 'api',
          key: 'key',
          url: baseURL,
          headers: userHeaders,
          useFetch: true
        }, formData as InputFormData);

        await req.request('get', '/v2/some/resource1');
        expect(reqHeaders).to.have.property('test').to.eql('234'); // seems in browser it goes to string
      });

      it('handle null in header', async () => {
        let reqHeaders = {};
        const userHeaders: RequestHeaders = {
          Test: null
        };

        api = nock(baseURL)
          .get('/v2/some/resource1')
          .reply(200, function () {
            reqHeaders = this.req.headers;
          });

        const req = new Request({
          username: 'api',
          key: 'key',
          url: baseURL,
          headers: userHeaders,
          useFetch: true
        }, formData as InputFormData);

        await req.request('get', '/v2/some/resource1');
        expect(reqHeaders).not.to.have.property('test'); // no test because prop is null
      });
    });
  });
});
