import formData from 'form-data';

import nock from 'nock';
import Request from '../lib/request';
import RequestOptions from '../lib/interfaces/RequestOptions';
import { InputFormData } from '../lib/interfaces/IFormData';
import DomainsTagsClient, { DomainTagStatistic } from '../lib/domainsTags';
import {
  DomainTagCountriesAggregation,
  DomainTagDevicesAggregation,
  DomainTagProvidersAggregation,
  DomainTagsItem,
  DomainTagsList,
  DomainTagsMessageRes
} from '../lib/interfaces/DomainTags';

describe('DomainsTagsClient', function () {
  let client: DomainsTagsClient;
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
    it('fetches all domain tags', function () {
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

      return client.list('testDomain').then(function (credentialsList: DomainTagsList) {
        credentialsList.should.be.an('object').to.have.property('items');
        credentialsList.items.should.be.an('array').to.have.property('length').to.be.equal(3);
        credentialsList.items[0].should.eql({
          tag: 'tagName',
          description: 'test description',
          'first-seen': new Date('2020-12-03T00:00:00.000Z'),
          'last-seen': new Date('2021-10-11T17:34:02.297Z')
        });
        credentialsList.pages.last.should.eql({
          id: 'last',
          url: 'https://api.mailgun.net/v3/testDomain/tags?limit=1000&page=last&tag='
        });
      });
    });
  });

  describe('get', function () {
    it('fetches one domain tag', function () {
      api.get('/v3/testDomain/tags/tagName').reply(200, {
        tag: 'tagName',
        description: 'test description',
        'first-seen': '2020-12-03T00:00:00.000Z',
        'last-seen': '2021-10-11T17:34:02.297Z'
      });

      return client.get('testDomain', 'tagName').then(function (tag: DomainTagsItem) {
        tag.should.eql({
          tag: 'tagName',
          description: 'test description',
          'first-seen': new Date('2020-12-03T00:00:00.000Z'),
          'last-seen': new Date('2021-10-11T17:34:02.297Z')
        });
      });
    });
  });

  describe('update', function () {
    it('updates domain tags', function () {
      api.put('/v3/testDomain/tags/tagName').reply(200, {
        message: 'Tag updated'
      });

      return client.update('testDomain', 'tagName', 'new Description').then(function (res: DomainTagsMessageRes) {
        res.should.eql({ message: 'Tag updated' });
      });
    });
  });

  describe('destroy', function () {
    it('deletes a domain tags', function () {
      api.delete('/v3/testDomain/tags/tagName').reply(200, {
        message: 'Tag deleted'
      });

      return client.destroy('testDomain', 'tagName').then(function (data: DomainTagsMessageRes) {
        data.should.eql({
          message: 'Tag deleted',
          status: 200
        });
      });
    });
  });

  describe('statistic', function () {
    it('returns statistic for a tag', function () {
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

      return client.statistic('testDomain', 'tagName', { event: 'stored' }).then(function (data: DomainTagStatistic) {
        data.should.eql({
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
  });

  describe('countries', function () {
    it('returns statistic by countries for a tag', function () {
      api.get('/v3/testDomain/tags/tagName/stats/aggregates/countries').reply(200, {
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
      });

      return client.countries('testDomain', 'tagName').then(function (data: DomainTagCountriesAggregation) {
        data.should.eql({
          tag: 'tagName',
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
          }
        });
      });
    });
  });

  describe('providers', function () {
    it('returns statistic by providers for a tag', function () {
      api.get('/v3/testDomain/tags/tagName/stats/aggregates/providers').reply(200, {
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
      });

      return client.providers('testDomain', 'tagName').then(function (data: DomainTagProvidersAggregation) {
        data.should.eql({
          tag: 'tagName',
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
          }
        });
      });
    });
  });

  describe('providers', function () {
    it('returns statistic by devices for a tag', function () {
      api.get('/v3/testDomain/tags/tagName/stats/aggregates/devices').reply(200, {
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
      });

      return client.devices('testDomain', 'tagName').then(function (data: DomainTagDevicesAggregation) {
        data.should.eql({
          tag: 'tagName',
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
          }
        });
      });
    });
  });
});
