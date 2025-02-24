/* eslint-disable camelcase */
import formData from 'form-data';
import nock from 'nock';
import { IRoutesClient } from '../../lib/Interfaces/Routes/IRoutesClient.js';
import Request from '../../lib/Classes/common/Request.js';
import RoutesClient from '../../lib/Classes/Routes.js';
import {
  InputFormData,
  RequestOptions,
  DestroyRouteResponse,
  Route,
  UpdateRouteResponse
} from '../../lib/Types/index.js';

describe('RoutesClient', function () {
  let client: IRoutesClient;
  let api: nock.Scope;

  beforeEach(function () {
    client = new RoutesClient(new Request({ url: 'https://api.mailgun.net' } as RequestOptions, formData as InputFormData));
    api = nock('https://api.mailgun.net');
  });

  afterEach(function () {
    api.done();
  });

  describe('list', () => {
    const data = [
      {
        actions: ['forward("http://myhost.com/messages/")', 'stop()'],
        created_at: 'Mon, 26 Oct 2015 03:56:51 GMT',
        description: 'sample',
        expression: 'match_recipient(".*@example.com")',
        id: '562da483125730608a7d1719',
        priority: 0
      }
    ];

    it('fetches all routes', async () => {
      api.get('/v3/routes').reply(200, {
        items: data
      });

      const response: Route[] = await client.list({});
      expect(response).toMatchObject(data);
    });
  });

  describe('get', () => {
    it('fetches single route by id', async () => {
      const data = {
        actions: ['forward("http://myhost.com/messages/")', 'stop()'],
        created_at: 'Mon, 26 Oct 2015 03:56:51 GMT',
        description: 'sample',
        expression: 'match_recipient(".*@example.com")',
        id: '562da483125730608a7d1719',
        priority: 0
      };

      api.get('/v3/routes/123').reply(200, { route: data });

      const response: Route = await client.get('123');
      expect(response).toMatchObject(data);
    });
  });

  describe('create', () => {
    it('creates route', async () => {
      const data = {
        actions: ['forward("http://myhost.com/messages/")', 'stop()'],
        created_at: 'Mon, 26 Oct 2015 03:56:51 GMT',
        description: 'sample',
        expression: 'match_recipient(".*@example.com")',
        id: '562da483125730608a7d1719',
        priority: 0
      };

      api.post('/v3/routes').reply(200, { route: data });

      const response: Route = await client.create({
        priority: 0,
        description: 'sample',
        expression: 'match_recipient(".*@example.org")',
        action: ['forward("http://myhost.com/messages/")', 'stop()']
      });
      expect(response).toMatchObject(data);
    });
  });

  describe('update', () => {
    it('updates route', async () => {
      const data = {
        actions: ['forward("http://myhost.com/messages/")', 'stop()'],
        created_at: 'Mon, 26 Oct 2015 03:56:51 GMT',
        description: 'sample',
        expression: 'match_recipient(".*@example.com")',
        id: '562da483125730608a7d1719',
        priority: 0,
        message: 'Route has been updated',
      };

      api.put('/v3/routes/123').reply(200, { data });

      const response: UpdateRouteResponse = await client.update('123', {
        priority: 0,
        description: 'sample',
        expression: 'match_recipient(".*@example.org")',
        action: ['forward("http://myhost.com/messages/")', 'stop()']
      });
      expect(response).toMatchObject({ data });
    });
  });

  describe('destroy', () => {
    it('deletes route', async () => {
      const data = {
        id: '562da483125730608a7d1719',
        message: 'Route has been deleted'
      };

      api.delete('/v3/routes/123').reply(200, { data });

      const response: DestroyRouteResponse = await client.destroy('123');
      expect(response).toMatchObject({ data });
    });
  });
});
