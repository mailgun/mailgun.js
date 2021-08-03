import formData from 'form-data';
import nock from 'nock';
import Request from '../lib/request';
import RoutesClient from '../lib/routes';
import RequestOptions from '../lib/interfaces/RequestOptions';

interface Data {
  actions: string[],
  created_at: string,
  description: string,
  expression: string,
  id: string,
  priority: number
}

describe('RoutesClient', function () {
  let client: any;
  let api: any;

  beforeEach(function () {
    client = new RoutesClient(new Request({ url: 'https://api.mailgun.net' } as RequestOptions, formData));
    api = nock('https://api.mailgun.net');
  });

  afterEach(function () {
    api.done();
  });

  describe('list', function () {
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

    it('fetches all routes', function () {
      api.get('/v3/routes').reply(200, {
        items: data
      });

      return client.list().then(function (response: Data[]) {
        response.should.eql(data);
      });
    });
  });

  describe('get', function () {
    it('fetches single route by id', function () {
      const data = {
        actions: ['forward("http://myhost.com/messages/")', 'stop()'],
        created_at: 'Mon, 26 Oct 2015 03:56:51 GMT',
        description: 'sample',
        expression: 'match_recipient(".*@example.com")',
        id: '562da483125730608a7d1719',
        priority: 0
      };

      api.get('/v3/routes/123').reply(200, { route: data });

      return client.get('123').then(function (response: Data) {
        response.should.eql(data);
      });
    });
  });

  describe('create', function () {
    it('creates route', function () {
      const data = {
        actions: ['forward("http://myhost.com/messages/")', 'stop()'],
        created_at: 'Mon, 26 Oct 2015 03:56:51 GMT',
        description: 'sample',
        expression: 'match_recipient(".*@example.com")',
        id: '562da483125730608a7d1719',
        priority: 0
      };

      api.post('/v3/routes').reply(200, { route: data });

      return client.create({
        priority: 0,
        description: 'sample',
        expression: 'match_recipient(".*@example.org")',
        action: ['forward("http://myhost.com/messages/")', 'stop()']
      }).then(function (response: Data) {
        response.should.eql(data);
      });
    });
  });

  describe('update', function () {
    it('updates route', function () {
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

      return client.update('123', {
        priority: 0,
        description: 'sample',
        expression: 'match_recipient(".*@example.org")',
        action: ['forward("http://myhost.com/messages/")', 'stop()']
      }).then(function (response: Data) {
        response.should.eql({ data });
      });
    });
  });

  describe('destroy', function () {
    it('deletes route', function () {
      const data = {
        id: '562da483125730608a7d1719',
        message: 'Route has been deleted'
      };

      api.delete('/v3/routes/123').reply(200, { data });

      return client.destroy('123').then(function (response: Data) {
        response.should.eql({ data });
      });
    });
  });
});
