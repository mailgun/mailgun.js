import formData from 'form-data';

import nock from 'nock';
import { IDomainTagsClient } from '../../lib/Interfaces/Domains/DomainTags.js';
import Request from '../../lib/Classes/common/Request.js';
import DomainsTagsClient from '../../lib/Classes/Domains/domainsTags.js';
import {
  InputFormData, RequestOptions,
} from '../../lib/Types/index.js';

describe('DomainsTagsClient', function () {
  let client: IDomainTagsClient;
  let api: nock.Scope;

  beforeEach(function () {
    const reqObject = new Request({ url: 'https://api.mailgun.net' } as RequestOptions, formData as InputFormData);
    client = new DomainsTagsClient(reqObject);
    api = nock('https://api.mailgun.net');
  });

  afterEach(function () {
    api.done();
  });

  describe('list', function () {
    it('fetches all domain tags', async () => {
      api.get('/v3/testDomain/tags').reply(200, {
        items: [
          {
            tag: 'tagName',
            description: 'test description',
            'first-seen': '2020-12-03T00:00:00.000Z',
            'last-seen': '2021-10-11T17:34:02.297Z'
          },
          {
            tag: 'test1',
            description: 'test description 1',
            'first-seen': '2020-12-03T01:00:00.000Z',
            'last-seen': '2021-10-11T18:34:02.297Z'
          },
          {
            tag: 'test2',
            description: 'test description 2',
            'first-seen': '2020-12-03T02:00:00.000Z',
            'last-seen': '2021-10-11T19:34:02.297Z'
          }
        ],
        paging: {
          previous: 'https://api.mailgun.net/v3/testDomain/tags?limit=1000&page=prev&tag=',
          first: 'https://api.mailgun.net/v3/testDomain/tags?limit=1000&page=first&tag=',
          next: 'https://api.mailgun.net/v3/testDomain/tags?limit=1000&page=next&tag=',
          last: 'https://api.mailgun.net/v3/testDomain/tags?limit=1000&page=last&tag='
        }
      });
      const res = await client.list('testDomain');
      expect(res).toHaveProperty('items');
      expect(res).toHaveProperty('pages');
      expect(res.items).toHaveLength(3);
      expect(res.items[0]).toMatchObject({
        tag: 'tagName',
        description: 'test description',
        'first-seen': new Date('2020-12-03T00:00:00.000Z'),
        'last-seen': new Date('2021-10-11T17:34:02.297Z')
      });
      expect(res.pages).toMatchObject({
        last: {
          id: 'last',
          iteratorPosition: '',
          page: '?limit=1000&page=last&tag=',
          url: 'https://api.mailgun.net/v3/testDomain/tags?limit=1000&page=last&tag='
        }
      });
    });
  });

  describe('get', function () {
    it('fetches one domain tag', async () => {
      api.get('/v3/testDomain/tags/tagName').reply(200, {
        tag: 'tagName',
        description: 'test description',
        'first-seen': '2020-12-03T00:00:00.000Z',
        'last-seen': '2021-10-11T17:34:02.297Z'
      });

      const res = await client.get('testDomain', 'tagName');
      expect(res).toMatchObject({
        tag: 'tagName',
        description: 'test description',
        'first-seen': new Date('2020-12-03T00:00:00.000Z'),
        'last-seen': new Date('2021-10-11T17:34:02.297Z')
      });
    });
  });

  describe('update', function () {
    it('updates domain tags', async () => {
      api.put('/v3/testDomain/tags/tagName').reply(200, {
        message: 'Tag updated'
      });
      const res = await client.update('testDomain', 'tagName', 'new Description');
      expect(res).toMatchObject({ message: 'Tag updated' });
    });
  });

  describe('destroy', function () {
    it('deletes a domain tags', async () => {
      api.delete('/v3/testDomain/tags/tagName').reply(200, {
        message: 'Tag deleted'
      });
      const res = await client.destroy('testDomain', 'tagName');
      expect(res).toMatchObject({
        message: 'Tag deleted',
        status: 200
      });
    });
  });

  describe('statistic', function () {
    it('returns statistic for a tag', async () => {
      api.get('/v3/testDomain/tags/tagName/stats?event=stored').reply(200, {
        tag: 'tagName',
        description: 'test description',
        start: 'Mon, 24 Jan 2022 00:00:00 UTC',
        end: 'Mon, 31 Jan 2022 00:00:00 UTC',
        resolution: 'day',
        stats: [
          { time: 'Mon, 24 Jan 2022 00:00:00 UTC', stored: { total: 0 } },
          { time: 'Tue, 25 Jan 2022 00:00:00 UTC', stored: { total: 0 } },
        ]
      });
      const res = await client.statistic('testDomain', 'tagName', { event: 'stored' });
      expect(res).toMatchObject({
        tag: 'tagName',
        description: 'test description',
        start: new Date('Mon, 24 Jan 2022 00:00:00 UTC'),
        end: new Date('Mon, 31 Jan 2022 00:00:00 UTC'),
        resolution: 'day',
        stats: [
          { time: new Date('Mon, 24 Jan 2022 00:00:00 UTC'), stored: { total: 0 } },
          { time: new Date('Tue, 25 Jan 2022 00:00:00 UTC'), stored: { total: 0 } },
        ]
      });
    });
  });

  describe('countries', function () {
    it('returns statistic by countries for a tag', async () => {
      const expected = {
        country: {
          ad: {
            clicked: 0,
            complained: 0,
            opened: 0,
            unique_clicked: 0,
            unique_opened: 0,
            unsubscribed: 0
          },
          ae: {
            clicked: 0,
            complained: 0,
            opened: 0,
            unique_clicked: 0,
            unique_opened: 0,
            unsubscribed: 0
          }
        },
        tag: 'tagName'
      };
      api.get('/v3/testDomain/tags/tagName/stats/aggregates/countries').reply(200, expected);
      const res = await client.countries('testDomain', 'tagName');
      expect(res).toMatchObject(expected);
    });
  });

  describe('providers', function () {
    it('returns statistic by providers for a tag', async () => {
      const expected = {
        provider: {
          'gmail.com': {
            accepted: 126,
            clicked: 0,
            complained: 0,
            delivered: 126,
            opened: 0,
            unique_clicked: 0,
            unique_opened: 0,
            unsubscribed: 0
          },
          'aol.com': {
            accepted: 0,
            clicked: 0,
            complained: 0,
            delivered: 0,
            opened: 0,
            unique_clicked: 0,
            unique_opened: 0,
            unsubscribed: 0
          },
        },
        tag: 'tagName'
      };
      api.get('/v3/testDomain/tags/tagName/stats/aggregates/providers').reply(200, expected);
      const res = await client.providers('testDomain', 'tagName');
      expect(res).toMatchObject(expected);
    });
  });

  describe('devices', function () {
    it('returns statistic by devices for a tag', async () => {
      const expected = {
        device: {
          desktop: {
            clicked: 0,
            complained: 0,
            opened: 0,
            unique_clicked: 0,
            unique_opened: 0,
            unsubscribed: 0
          },
          mobile: {
            clicked: 0,
            complained: 0,
            opened: 0,
            unique_clicked: 0,
            unique_opened: 0,
            unsubscribed: 0
          },
          tablet: {
            clicked: 0,
            complained: 0,
            opened: 0,
            unique_clicked: 0,
            unique_opened: 0,
            unsubscribed: 0
          },
          unknown: {
            clicked: 0,
            complained: 0,
            opened: 0,
            unique_clicked: 0,
            unique_opened: 0,
            unsubscribed: 0
          }
        },
        tag: 'tagName'
      };
      api.get('/v3/testDomain/tags/tagName/stats/aggregates/devices').reply(200, expected);
      const res = await client.devices('testDomain', 'tagName');
      expect(res).toMatchObject(expected);
    });
  });
});
