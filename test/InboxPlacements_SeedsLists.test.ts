import { expect } from 'chai';
import {getTestFormData} from './TestUtils/FormData';

import nock from 'nock';

import { InputFormData, RequestOptions } from '../lib/Types/Common';

import SeedsListsClient from '../lib/Classes/InboxPlacements/SeedsLists/SeedsListsClient';
import InboxPlacementsAttributesClient from '../lib/Classes/InboxPlacements/AttributesClient';
import InboxPlacementsFiltersClient from '../lib/Classes/InboxPlacements/FiltersClient';
import TestRequest from './TestUtils/Request';

// TODO: fix types
describe('InboxPlacements SeedsLists Client', () => {
  let client: SeedsListsClient;
  let api: nock.Scope;
  const seedsList = {
    Id: 'test Id',
    kid: 'test kid',
    ID: 'test ID',
    AccountID: 'test AccountID',
    created_at: '2024-08-09T14:32:57.183Z',
    updated_at: '2024-08-09T14:32:57.183Z',
    last_result_at: '2024-08-09T14:32:57.183Z',
    Seeds: [
      {
        AccountID: 'test acount id',
        id: 'test seed id',
        token: 'test token',
        email: 'test email',
        provider: 'test provider',
        sync_state: 'test sync_state',
        local_state: 'test local_state',
        created_at: '2024-08-09T14:32:57.183Z',
        updated_at: '2024-08-09T14:32:57.183Z',
        message_count: 0,
        max_email_count_hit_at: '2024-08-09T14:32:57.183Z',
        total_msgs: 0,
        matched_msgs: 0,
        spam_message: 0,
        expected_msgs: 0,
        last_sent_to_at: '2024-08-09T14:32:57.183Z',
        last_delivered_at: '2024-08-09T14:32:57.183Z',
        account_quality: 0,
        quality_label: 'test quality_label',
        password: 'test password',
        phone_number: 'test phone_number',
        attributes: {},
        totp: {
          secret: 'test secret',
        }
      }
    ],
    target_email: 'test_email@test.com',
    sending_domains: ['test_domain.com'],
    has_results: true,
    name: 'test name',
    seed_filter: 'test filter',
    mailing_list: 'test mailing_list',
    CreatedTS: 1723214101728,
    tags: {
      sfmc_remote_id: 'test sfmc_remote_id',
    },
    delivery_stats: {
      all: {
        delivered: 0,
        missing: 0,
        pending: 0,
        spam: 0,
        inbox: 0,
        total: 0,
        provider: 'test provider',
        categories: {
          primary: 0,
          promotions: 0,
          updates: 0,
        }
      }
    },
    SeedQuality: 1,
    is_auto_generated: true,
  };

  const expectedSeedsList = {
    ...seedsList,
    Seeds: [{
      ...seedsList.Seeds[0],
      created_at: new Date('2024-08-09T14:32:57.183Z'),
      updated_at: new Date('2024-08-09T14:32:57.183Z'),
      last_sent_to_at: new Date('2024-08-09T14:32:57.183Z'),
      last_delivered_at: new Date('2024-08-09T14:32:57.183Z'),
      max_email_count_hit_at: new Date('2024-08-09T14:32:57.183Z'),
    }],
    created_at: new Date('2024-08-09T14:32:57.183Z'),
    updated_at: new Date('2024-08-09T14:32:57.183Z'),
    last_result_at: new Date('2024-08-09T14:32:57.183Z'),
  };
  delete (expectedSeedsList as {Id?: string}).Id;

  beforeEach(() => {
    const reqObject = new TestRequest({ url: 'https://api.mailgun.net' } as RequestOptions, getTestFormData() as InputFormData);
    const seedsListsAttributes = new InboxPlacementsAttributesClient(reqObject, '/v4/inbox/seedlists/a');
    const seedsListsFiltersClient = new InboxPlacementsFiltersClient(reqObject, '/v4/inbox/seedlists/_filters');
    client = new SeedsListsClient(reqObject, seedsListsAttributes, seedsListsFiltersClient);
    api = nock('https://api.mailgun.net');
  });

  afterEach(() => {
    api.done();
  });

  describe('list', () => {
    it('prepares user query', async () => {
      let requestQuery;
      api.get(/v4\/inbox\/seedlists/)
        .query((query) => { requestQuery = query; return true; })
        .reply(200,
          {
            items: [
              {
                created_at: new Date(),
                updated_at: new Date(),
                last_result_at: new Date(),
                Seeds: null
              }
            ],
            paging: {
              first: 'http://firstpage.net',
              last: 'http://lastpage.net',
              next: 'http://nextpage.net',
              previous: 'http://previouspage.net',
            }
          });

      const timeAfter = new Date();
      const timeBefore = new Date();

      await client.list({
        time_after: timeAfter,
        time_before: timeBefore,
        name: 'test',
        cursor: 'test',
        sort: 'asc',
        offset: 0,
        ascending: true,
        limit: 10
      });

      expect(requestQuery).to.be.an('object');
      expect(requestQuery).eql({
        time_after: timeAfter.toISOString(),
        time_before: timeBefore.toISOString(),
        name: 'test',
        cursor: 'test',
        sort: 'asc',
        offset: '0',
        ascending: 'true',
        limit: '10'
      });
    });

    it('fetches seeds lists with pages', async () => {
      api.get('/v4/inbox/seedlists').reply(200, {
        items: [
          seedsList
        ],
        paging: {
          first: 'https://api.mailgun.net/v4?page=first',
          last: 'https://api.mailgun.net/v4?page=last',
          next: 'https://api.mailgun.net/v4?page=next',
          previous: 'https://api.mailgun.net/v4?page=previous',
        },
      });

      const seedsLists = await client.list({});
      seedsLists.should.be.an('object').to.have.property('items');
      seedsLists.status.should.be.equal(200);

      seedsLists.items.should.be.an('array').to.have.property('length').to.be.equal(1);
      seedsLists.items[0].should.eql(expectedSeedsList);
      seedsLists.pages.first.page.should.be.equal('?page=first');
      seedsLists.pages.last.page.should.be.equal('?page=last');
      seedsLists.pages.next.page.should.be.equal('?page=next');
      seedsLists.pages.previous.page.should.be.equal('?page=previous');
    });
  });

  describe('get', () => {
    it('fetches one seeds list', async () => {
      api.get('/v4/inbox/seedlists/testId').reply(200, {
        seedlist: seedsList,
      });

      const receivedSeedsList = await client.get('testId');
      receivedSeedsList.should.be.an('object');
      receivedSeedsList.should.eql({
        ...expectedSeedsList,
        status: 200
      });
    });

    it('returns null if no seed list', async () => {
      api.get('/v4/inbox/seedlists/testId').reply(200, {
        seedlist: { ...seedsList, Seeds: undefined }
      });

      const receivedSeedsList = await client.get('testId');
      receivedSeedsList.should.be.an('object');
      receivedSeedsList.should.eql({
        ...expectedSeedsList,
        Seeds: null,
        status: 200
      });
    });
  });
  describe('create', () => {
    it('generates new seeds list', async () => {
      api.post('/v4/inbox/seedlists').reply(200, {
        ...seedsList
      });

      const newSeedsList = await client.create({});
      newSeedsList.should.be.an('object');
      newSeedsList.should.eql({
        ...expectedSeedsList,
        status: 200
      });
    });
  });
  describe('update', () => {
    it('updates seed list', async () => {
      api.put('/v4/inbox/seedlists/testId').reply(200, {
        ...seedsList,
        sending_domains: 'new sending_domains value',
        name: 'new name value',
        seed_filter: 'new seed_filter value',
      });

      const updatedSeedsList = await client.update('testId', {
        sending_domains: 'new sending_domains value',
        name: 'new name value',
        seed_filter: 'new seed_filter value',
        shuffle: true
      });

      updatedSeedsList.should.be.an('object');
      updatedSeedsList.should.eql({
        ...expectedSeedsList,
        sending_domains: 'new sending_domains value',
        name: 'new name value',
        seed_filter: 'new seed_filter value',
        status: 200
      });
    });

    it('returns null if no seed list', async () => {
      api.put('/v4/inbox/seedlists/testId').reply(200, {
        ...seedsList,
        sending_domains: 'new sending_domains value',
        name: 'new name value',
        seed_filter: 'new seed_filter value',
        Seeds: undefined
      });

      const updatedSeedsList = await client.update('testId', {
        sending_domains: 'new sending_domains value',
        name: 'new name value',
        seed_filter: 'new seed_filter value',
      });

      updatedSeedsList.should.be.an('object');
      updatedSeedsList.should.eql({
        ...expectedSeedsList,
        sending_domains: 'new sending_domains value',
        name: 'new name value',
        seed_filter: 'new seed_filter value',
        Seeds: null,
        status: 200
      });
    });
  });

  describe('destroy', () => {
    it('removes seed list', async () => {
      api.delete('/v4/inbox/seedlists/testId').reply(200, () => null);

      const deleteSeedListResponse = await client.destroy('testId');
      deleteSeedListResponse.should.eql({
        status: 200,
        body: null
      });
    });
  });

  describe('Seeds Lists Attributes Client', () => {
    describe('Attributes Client: list', () => {
      it('fetches seeds lists attributes', async () => {
        api.get('/v4/inbox/seedlists/a').reply(200, {
          items: {
            attribute: 'test_available attributes',
            values: ['test_name']
          }
        });

        const seedsListsAttributes = await client.attributes.list();
        seedsListsAttributes.should.be.an('object').to.have.property('items');
        seedsListsAttributes.status.should.be.equal(200);

        seedsListsAttributes.items.should.be.an('object');
        seedsListsAttributes.items.should.eql({
          attribute: 'test_available attributes',
          values: ['test_name']
        });
      });
    });

    describe('Attributes Client: get', () => {
      it('fetches one seeds list attribute', async () => {
        api.get('/v4/inbox/seedlists/a/test_name').reply(200, {
          items: { attribute: 'name', values: null }
        });

        const receivedSeedsListsAttribute = await client.attributes.get('test_name');
        receivedSeedsListsAttribute.should.be.an('object');
        receivedSeedsListsAttribute.should.eql({
          items: { attribute: 'name', values: null },
          status: 200
        });
      });
    });
  });

  describe('Seeds Lists Filters Client', () => {
    describe('list', () => {
      it('fetches seeds lists filters', async () => {
        api.get('/v4/inbox/seedlists/_filters').reply(200, {
          supported_filters: {
            filters: [
              { parameter: 'name', description: 'Get seedlists by name' },
              {
                parameter: 'time_before',
                description: 'Get seedlists before date'
              },
              {
                parameter: 'time_after',
                description: 'Get seedlists after date'
              }
            ]
          }
        });

        const seedsListsAttributes = await client.filters.list();
        seedsListsAttributes.should.be.an('object').to.have.property('supported_filters');
        seedsListsAttributes.should.be.an('object').to.have.property('status');
        seedsListsAttributes.status.should.be.equal(200);

        seedsListsAttributes.supported_filters.should.be.an('object').to.have.property('filters');
        seedsListsAttributes.supported_filters.filters.should.be.an('array');
        seedsListsAttributes.supported_filters.filters.should.eql([
          { parameter: 'name', description: 'Get seedlists by name' },
          {
            parameter: 'time_before',
            description: 'Get seedlists before date'
          },
          {
            parameter: 'time_after',
            description: 'Get seedlists after date'
          }
        ]);
      });
    });
  });
});
