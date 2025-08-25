import formData from 'form-data';

import base64 from 'base-64';
import nock from 'nock';
import Request from './test-utils/TestRequest.js';
import APIError from '../../lib/Classes/common/Error.js';
import {
  InputFormData,
  APIResponse,
  RequestOptions,
  RequestHeaders
} from '../../lib/Types/Common/index.js';
import SubaccountsClient from '../../lib/Classes/Subaccounts.js';

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

  describe('request', function () {
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

      expect(reqHeaders).toMatchObject({
        authorization: encodedAuthHeader,
        test: 'Custom Header',
        'x-csrf-token': 'protectme'
      });
    });

    it('parses API response', function () {
      api = nock(baseURL, { reqheaders: headers })
        .get('/v2/some/resource')
        .reply(200, { id: 1, message: 'hello' });

      const req = new Request({ username: 'api', key: 'key', url: baseURL } as RequestOptions, formData as InputFormData);
      const res = req.request('get', '/v2/some/resource')
        .then(function (response: APIResponse) {
          expect(response.status).toBe(200);
          expect(response.body).toMatchObject({ id: 1, message: 'hello' });
        });

      return res;
    });

    it('parses API response with string (axios)', async function () {
      api = nock(baseURL, { reqheaders: headers })
        .get('/v3/some/resource')
        .reply(200, 'Mailgun Magnificent API');

      const req = new Request({
        username: 'api', key: 'key', url: baseURL, useFetch: false
      } as RequestOptions, formData as InputFormData);
      try {
        await req.request('get', '/v3/some/resource');
      } catch (error) {
        expect(error).toMatchObject({
          status: 400,
          details: 'Mailgun Magnificent API',
          message: 'Incorrect url'
        });
      }
    });

    it('parses API response with string (fetch)', async function () {
      api = nock(baseURL, { reqheaders: headers })
        .get('/v3/some/resource')
        .reply(200, 'Mailgun Magnificent API');

      const req = new Request({
        username: 'api', key: 'key', url: baseURL, useFetch: true
      } as RequestOptions, formData as InputFormData);
      try {
        await req.request('get', '/v3/some/resource');
      } catch (error) {
        expect(error).toMatchObject({
          status: 400,
          details: 'Mailgun Magnificent API',
          message: '(Fetch) Incorrect url'
        });
      }
    });

    it('handles API error', function () {
      api = nock(baseURL, { reqheaders: headers })
        .get('/v2/some/resource')
        .reply(429, 'Too many requests');

      const req = new Request({ username: 'api', key: 'key', url: baseURL } as RequestOptions, formData as InputFormData);
      const res = req.request('get', '/v2/some/resource').catch(function (error: APIError) {
        expect(error.status).toBe(429);
        expect(error.details).toBe('Too many requests');
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
        expect(error).toHaveProperty('status');
        expect(error).toHaveProperty('details');
        const err: APIError = error as APIError;
        expect(err.status).toBe(400);
        expect(err.details).toBe('Request body larger than maxBodyLength limit');
      }

      // should not reach the api if size is more than limit
      expect(res?.body.message).not.toBe('Too big body');
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
        expect(error).toHaveProperty('status');
        expect(error).toHaveProperty('details');
        const err: APIError = error as APIError;
        expect(err.status).toBe(400);
        expect(err.details).toBe('Request body larger than maxBodyLength limit');
      }

      // should not reach the api if size is more than limit
      expect(res?.body.message).not.toBe('Too big body');
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
        expect(reqHeaders).toMatchObject({ test: 'string header' });
      });

      it('handle boolean header', async () => {
        let reqHeaders = {};
        const userHeaders: RequestHeaders = {
          Test: true
        };

        api = nock(baseURL, { reqheaders: { test: 'true' } })
          .get('/v2/some/resource1')
          .reply(200, function () {
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
        expect(reqHeaders).toMatchObject({ test: 'true' });
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
        expect(reqHeaders).toMatchObject({ test: 'value1, value2, value3' }); // new nock returns string
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
        }, formData as InputFormData);

        await req.request('get', '/v2/some/resource1');
        expect(reqHeaders).toMatchObject({ test: '234' });
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
        expect(reqHeaders).not.toHaveProperty('test'); // no test because prop is null
      });

      it('sets sub account header for Axios requests', async () => {
        let reqHeaders = {};
        const header = SubaccountsClient.SUBACCOUNT_HEADER.toLowerCase();
        api = nock(baseURL)
          .get('/v2/some/resource1')
          .reply(200, function () {
            reqHeaders = this.req.headers;
          });
        const req = new Request({
          username: 'api',
          key: 'key',
          url: baseURL,
          useFetch: false,
        }, formData as InputFormData);
        req.setSubaccountHeader('XYZ');
        await req.request('get', '/v2/some/resource1');
        expect(reqHeaders).toMatchObject(expect.objectContaining({ [header]: 'XYZ' }));
      });

      it('resets sub account header for Axios requests', async () => {
        let reqHeaders = {};
        const header = SubaccountsClient.SUBACCOUNT_HEADER.toLowerCase();
        api = nock(baseURL)
          .get('/v2/some/resource1')
          .reply(200, function () {
            reqHeaders = this.req.headers;
          });
        const req = new Request({
          username: 'api',
          key: 'key',
          url: baseURL,
          useFetch: false,
        }, formData as InputFormData);
        req.setSubaccountHeader('XYZ');
        req.resetSubaccountHeader();
        await req.request('get', '/v2/some/resource1');
        expect(reqHeaders).toMatchObject(
          expect.not.objectContaining({
            [header]: 'XYZ'
          })
        );
      });
    });

    describe('Headers with fetch', () => {
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
        expect(reqHeaders).toMatchObject({ test: 'string header' });
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
        expect(reqHeaders).toMatchObject({ test: 'true' });
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
        expect(reqHeaders).toMatchObject({ test: 'value1,value2,value3' });
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
        expect(reqHeaders).toMatchObject({ test: '234' }); // seems in browser it goes to string
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
        expect(reqHeaders).not.toHaveProperty('test'); // no test because prop is null
      });

      it('sets sub account header for Fetch requests', async () => {
        let reqHeaders = {};
        const header = SubaccountsClient.SUBACCOUNT_HEADER.toLowerCase();
        api = nock(baseURL)
          .get('/v2/some/resource1')
          .reply(200, function () {
            reqHeaders = this.req.headers;
          });
        const req = new Request({
          username: 'api',
          key: 'key',
          url: baseURL,
          useFetch: true,
        }, formData as InputFormData);
        req.setSubaccountHeader('XYZ');
        await req.request('get', '/v2/some/resource1');
        expect(reqHeaders).toMatchObject(expect.objectContaining({ [header]: 'XYZ' }));
      });

      it('resets sub account header for Fetch requests', async () => {
        let reqHeaders = {};
        const header = SubaccountsClient.SUBACCOUNT_HEADER.toLowerCase();
        api = nock(baseURL)
          .get('/v2/some/resource1')
          .reply(200, function () {
            reqHeaders = this.req.headers;
          });
        const req = new Request({
          username: 'api',
          key: 'key',
          url: baseURL,
          useFetch: true,
        }, formData as InputFormData);
        req.setSubaccountHeader('XYZ');
        req.resetSubaccountHeader();
        await req.request('get', '/v2/some/resource1');
        expect(reqHeaders).toMatchObject(
          expect.not.objectContaining({
            [header]: 'XYZ'
          })
        );
      });
    });
  });
});
