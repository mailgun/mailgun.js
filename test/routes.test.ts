/* eslint-disable camelcase */
import formData from 'form-data';
import nock from 'nock';
import { IRoutesClient } from '../lib/Interfaces/Routes/IRoutesClient';
import Request from '../lib/Classes/common/Request';
import RoutesClient from '../lib/Classes/Routes';
import { InputFormData, RequestOptions } from '../lib/Types/Common';
import { DestroyRouteResponse, Route, UpdateRouteResponse } from '../lib/Types/Routes';

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

  describe('list', async () => {
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
      response.should.eql(data);
    });
  });

  describe('get', async () => {
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
      response.should.eql(data);
    });
  });

  describe('create', async () => {
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
      response.should.eql(data);
    });
  });

  describe('update', async () => {
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
      response.should.eql({ data });
    });
  });

  describe('destroy', function () {
    it('deletes route', async () => {
      const data = {
        id: '562da483125730608a7d1719',
        message: 'Route has been deleted'
      };

      api.delete('/v3/routes/123').reply(200, { data });

      const response: DestroyRouteResponse = await client.destroy('123');
      response.should.eql({ data });
    });
  });
});
