// jscs:disable requireDotNotation
import formData from 'form-data';

import base64 from 'base-64';
import nock from 'nock';
import fs from 'fs';
import path from 'path';
import Request from '../../lib/Classes/common/Request.js';
import { InputFormData, RequestOptions } from '../../lib/Types/Common/index.js';

describe('Request', function () {
  let headers: { [key: string]: string };
  const baseURL = 'https://api.mailgun.com';

  beforeEach(function () {
    headers = {};
    headers.Authorization = `Basic ${base64.encode('api:key')}`;
  });

  afterEach(() => {
    jest.resetAllMocks();
    nock.cleanAll();
  });

  describe('request', () => {
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
      expect(reqHeaders).toMatchObject({
        authorization: 'Basic YXBpOmtleQ==',
        test: 'Custom Header',
        'x-csrf-token': 'protectme'
      });

      // expect(reqHeaders).to.have.property('test').to.eql('Custom Header');
      // expect(reqHeaders).to.have.property('x-csrf-token').to.eql('protectme');
    });

    it('parses API response', async () => {
      nock(baseURL, { reqheaders: headers })
        .get('/v2/some/resource')
        .reply(200, { id: 1, message: 'hello' });

      const req = new Request({ username: 'api', key: 'key', url: baseURL } as RequestOptions, formData as InputFormData);
      const res = await req.request('get', '/v2/some/resource');
      expect(res).toMatchObject({
        status: 200,
        body: {
          id: 1, message: 'hello'
        }
      });
    });

    it('parses API response with string', async function () {
      nock(baseURL, { reqheaders: headers })
        .get('/v3/some/resource')
        .reply(200, 'Mailgun Magnificent API');

      const req = new Request({ username: 'api', key: 'key', url: baseURL } as RequestOptions, formData as InputFormData);
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

    it('handles API error', async () => {
      nock(baseURL, { reqheaders: headers })
        .get('/v2/some/resource')
        .reply(429, 'Too many requests');

      const req = new Request({ username: 'api', key: 'key', url: baseURL } as RequestOptions, formData as InputFormData);
      try {
        await req.request('get', '/v2/some/resource');
      } catch (error) {
        expect(error).toMatchObject({
          status: 429,
          details: 'Too many requests',
        });
      }
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
        expect(error).toMatchObject({
          status: 400,
          details: 'Request body larger than maxBodyLength limit',
        });
      }
    });

    it('default timeout is 60 seconds', async () => {
      nock(baseURL, { reqheaders: headers })
        .post('/v2/some/resource')
        .delay(61000) // 61 seconds
        .reply(200, { id: 1, message: 'hello' });
      const filepath = path.resolve(__dirname, './data/emailsValidation1.csv');
      const stream = fs.createReadStream(filepath);
      const attachments = [
        {
          filename: 'test.pdf',
          data: stream,
          contentType: 'application/pdf',
          knownLength: 13264,
        }
      ];
      const req = new Request({ username: 'api', key: 'key', url: baseURL } as RequestOptions, formData as InputFormData);
      try {
        await req.postWithFD(
          '/v2/some/resource',
          {
            attachments
          }
        );
      } catch (error: unknown) {
        expect(error).toMatchObject({
          status: 400,
          details: 'timeout of 60000ms exceeded',
        });
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
      const reqSpy = jest.spyOn(req, 'request');
      await req.query('get', '/v2/some/resource2', search);
      expect(reqSpy).toHaveBeenCalledWith('get', '/v2/some/resource2', { query: { query: 'data' } });
    });
  });

  describe('command', function () {
    const body = { query: 'data' };

    it('sends data as form-encoded request body', function () {
      nock(baseURL)
        .post('/v2/some/resource')
        .reply(200, {});
      const req = new Request({ url: baseURL } as RequestOptions, formData as InputFormData);
      const reqSpy = jest.spyOn(req, 'request');
      req.command('post', '/v2/some/resource', body);
      expect(reqSpy).toHaveBeenCalledWith('post', '/v2/some/resource', {
        'Content-Type': 'application/x-www-form-urlencoded',
        body: {
          query: 'data',
        },
      });
    });
  });
});
