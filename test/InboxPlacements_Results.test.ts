import { expect } from 'chai';
import formData from 'form-data';

import nock from 'nock';

import { InputFormData, RequestOptions } from '../lib/Types/Common';

import InboxPlacementsAttributesClient from '../lib/Classes/InboxPlacements/AttributesClient';
import InboxPlacementsFiltersClient from '../lib/Classes/InboxPlacements/FiltersClient';
import { IInboxPlacementsResultsClient } from '../lib/Interfaces';
import InboxPlacementsResultsClient from '../lib/Classes/InboxPlacements/Results/InboxPlacementsResultsClient';
import IPRSharingClient from '../lib/Classes/InboxPlacements/Results/InboxPlacementsResultsSharingClient';
import TestRequest from './TestUtils/Request';

// TODO: fix types
describe('Inbox Placements results', () => {
  let client: IInboxPlacementsResultsClient;
  let api: nock.Scope;
  const testDate = new Date();
  const IPresult = {
    Id: 'test_Id',
    rid: 'test_rid',
    result_id: 'test_result_id',
    AccountID: 'test_AccountID',
    KeyBoxID: 'test_KeyBoxID',
    keybox_email: 'test_keybox_email',
    subject: 'test_subject',
    sender: 'test_sender',
    seedlist_name: 'test_seedlist_name',
    created_at: testDate.toISOString(),
    updated_at: testDate.toISOString(),
    status: 'test_status',
    CreatedTS: testDate.getMilliseconds(),
    attributes: {
      test_attribute: 'test_attribute_value'
    },
    campaign_id: 'test_campaign_id',
    sharing_enabled: true,
    sharing_id: 'test_sharing_id',
    sharing_expires_at: testDate,
    Box: {
      Id: 'test_box_Id',
      kid: 'test_box_kid',
      ID: 'test_box_ID',
      AccountID: 'test_box_AccountID',
      created_at: testDate.toISOString(),
      updated_at: testDate.toISOString(),
      last_result_at: testDate.toISOString(),
      Seeds: null,
      target_email: 'test_box_target_email',
      sending_domains: null,
      has_results: true,
      name: 'test_box_name',
      seed_filter: 'test_box_seed_filter',
      mailing_list: 'test_box_mailing_list',
      CreatedTS: testDate.getMilliseconds(),
      tags: ['test_tag'],
      SeedQuality: 100,
      is_auto_generated: true,
    },
    seed_results: [{
      email: 'test_seed_result_email',
      provider: 'test_seed_result_provider',
      destination: 'test_seed_result_destination',
      state: 'test_seed_result_state',
      originating_ip: 'test_seed_result_originating_ip',
      tags: ['test_seed_result_tag'],
      dkim: 'test_seed_result_dkim',
      spf: 'test_seed_result_spf',
      dmarc: 'test_seed_result_dmarc',
      headers: [{
        key: 'test_seed_result_header_key',
        value: 'test_seed_result_header_value',
      }],
      extensions: {
        category: 'test_seed_result_extensions_category',
      }
    }],
    spamassassin: {
      is_spam: false,
      score: 1,
      required: 1,
      rules: [{
        name: 'test_rule_name',
        points: 100,
        short_description: 'test_short_description',
        long_description: 'test_long_description',
      }],
    },
    delivery_stats: {
      test_delivery_stat: {
        delivered: 1,
        missing: 0,
        pending: 0,
        spam: 0,
        inbox: 0,
        total: 1,
        provider: 'test_provider',
        categories: {
          primary: 1,
          updates: 0,
        }
      }
    }
  };

  const expectedResult = {
    ...IPresult,
    Box: {
      ...IPresult.Box,
      created_at: testDate,
      updated_at: testDate,
      last_result_at: testDate,
    },
    created_at: testDate,
    updated_at: testDate,
    id: IPresult.Id,
  };
  delete (expectedResult as {ID?: string}).ID;
  delete (expectedResult.Box as {ID?: string}).ID;

  beforeEach(() => {
    const reqObject = new TestRequest({ url: 'https://api.mailgun.net' } as RequestOptions, formData as InputFormData);
    const seedsListsAttributes = new InboxPlacementsAttributesClient(reqObject, '/v4/inbox/results/a');
    const seedsListsFiltersClient = new InboxPlacementsFiltersClient(reqObject, '/v4/inbox/results/_filters');
    const InboxPlacementsResultsSharingClient = new IPRSharingClient(reqObject);

    client = new InboxPlacementsResultsClient(
      reqObject,
      seedsListsAttributes,
      seedsListsFiltersClient,
      InboxPlacementsResultsSharingClient
    );
    api = nock('https://api.mailgun.net');
  });

  afterEach(() => {
    api.done();
  });

  describe('list', () => {
    it('prepares user query', async () => {
      let requestQuery;
      api.get(/v4\/inbox\/results/)
        .query((query) => { requestQuery = query; return true; })
        .reply(200,
          {
            items: [
              {
                created_at: testDate,
                updated_at: testDate,
                last_result_at: testDate,
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

      await client.list({
        sender: 'test_sender',
        subject: 'test_subject',
        provider: 'test_provider',
        target_email: 'test_target_email',
        time_after: testDate,
        time_before: testDate,
        cursor: 'test_cursor',
        sort: 'test_sort',
        offset: 0,
        ascending: true,
        limit: 1
      });

      expect(requestQuery).to.be.an('object');
      expect(requestQuery).eql({
        sender: 'test_sender',
        subject: 'test_subject',
        provider: 'test_provider',
        target_email: 'test_target_email',
        time_after: testDate.toISOString(),
        time_before: testDate.toISOString(),
        cursor: 'test_cursor',
        sort: 'test_sort',
        offset: '0',
        ascending: 'true',
        limit: '1'
      });
    });

    it('fetches inbox placement results list with pages', async () => {
      api.get('/v4/inbox/results').reply(200, {
        items: [IPresult],
        paging: {
          first: 'https://api.mailgun.net/v4?page=first',
          last: 'https://api.mailgun.net/v4?page=last',
          next: 'https://api.mailgun.net/v4?page=next',
          previous: 'https://api.mailgun.net/v4?page=previous',
        },
      });

      const result = await client.list({});
      result.should.be.an('object').to.have.property('items');
      result.status.should.be.equal(200);

      result.items.should.be.an('array').to.have.property('length').to.be.equal(1);
      result.items[0].should.eql(expectedResult);
      result.pages.first.page.should.be.equal('?page=first');
      result.pages.last.page.should.be.equal('?page=last');
      result.pages.next.page.should.be.equal('?page=next');
      result.pages.previous.page.should.be.equal('?page=previous');
    });
  });

  describe('get', () => {
    it('fetches one inbox placement result', async () => {
      api.get('/v4/inbox/results/testId').reply(200, {
        result: IPresult,
      });

      const receivedResult = await client.get('testId');
      receivedResult.should.be.an('object');
      receivedResult.should.eql({
        inboxPlacementResult: {
          ...expectedResult
        },
        status: 200
      });
    });

    it('returns empty object if no Box data', async () => {
      api.get('/v4/inbox/results/testId').reply(200, {
        result: {
          ...IPresult,
          Box: null
        },
      });

      const receivedResult = await client.get('testId');
      receivedResult.should.be.an('object');
      receivedResult.should.eql({
        inboxPlacementResult: {
          ...expectedResult,
          Box: {},
        },
        status: 200
      });
    });
  });

  describe('destroy', () => {
    it('removes inbox placement result', async () => {
      api.delete('/v4/inbox/results/testId').reply(200, {
        message: 'deleted'
      });

      const deleteIPResultResponse = await client.destroy('testId');
      deleteIPResultResponse.should.eql({
        status: 200,
        message: 'deleted'
      });
    });
  });

  describe('getResultByShareId', () => {
    it('removes inbox placement result', async () => {
      api.get('/v4/inbox/sharing/public/testId').reply(200, {
        result: IPresult,
      });

      const receivedResult = await client.getResultByShareId('testId');
      receivedResult.should.eql({
        inboxPlacementResult: {
          ...expectedResult
        },
        status: 200
      });
    });
  });

  describe('Attributes', () => {
    describe('Attributes: list', () => {
      it('fetches inbox placements results attributes', async () => {
        api.get('/v4/inbox/results/a').reply(200, {
          items: {
            attribute: 'test_available attributes',
            values: ['subject', 'sender']
          }
        });

        const seedsListsAttributes = await client.attributes.list();
        seedsListsAttributes.should.be.an('object').to.have.property('items');
        seedsListsAttributes.status.should.be.equal(200);

        seedsListsAttributes.items.should.be.an('object');
        seedsListsAttributes.items.should.eql({
          attribute: 'test_available attributes',
          values: ['subject', 'sender']
        });
      });
    });

    describe('Attributes:', () => {
      it('fetches inbox placements results attribute', async () => {
        api.get('/v4/inbox/results/a/test_name').reply(200, {
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

  describe('Filters', () => {
    describe('Filters: list', () => {
      it('fetches inbox placements results filters list', async () => {
        const filters = [
          { parameter: 'sender', description: 'Sender address' },
          { parameter: 'subject', description: 'Subject line' },
          {
            parameter: 'target_email',
            description: 'Seedlist target e-mail'
          },
          {
            parameter: 'time_before',
            description: 'Get results before date'
          },
        ];

        api.get('/v4/inbox/results/_filters').reply(200, {
          supported_filters: {
            filters
          }
        });

        const seedsListsAttributes = await client.filters.list();
        seedsListsAttributes.should.be.an('object').to.have.property('supported_filters');
        seedsListsAttributes.should.be.an('object').to.have.property('status');
        seedsListsAttributes.status.should.be.equal(200);

        seedsListsAttributes.supported_filters.should.be.an('object').to.have.property('filters');
        seedsListsAttributes.supported_filters.filters.should.be.an('array');
        seedsListsAttributes.supported_filters.filters.should.eql(filters);
      });
    });
  });

  describe('Sharing', () => {
    describe('Sharing: get', () => {
      it('fetches inbox placements results sharing', async () => {
        const expiresAt = new Date();
        api.get('/v4/inbox/sharing/test_id').reply(200, {
          sharing: {
            expires_at: expiresAt.toISOString()
          }
        });

        const sharingResult = await client.sharing.get('test_id');
        sharingResult.should.be.an('object');
        sharingResult.should.eql({
          expires_at: expiresAt,
          status: 200
        });
      });
    });
    describe('Sharing: update', () => {
      it('updates inbox placements results sharing', async () => {
        const expiresAt = new Date();
        api.put('/v4/inbox/sharing/test_id?enabled=false').reply(200, {
          sharing: {
            result_id: 'test_id',
            expires_at: expiresAt.toISOString(),
            enabled: false,
            url_id: 'test_url_id',
            url: 'test_url',
            api_url: 'test_api_url',
            status: 200
          }
        });

        const sharingResult = await client.sharing.update('test_id', { enabled: false });
        sharingResult.should.be.an('object');
        sharingResult.should.eql({
          expires_at: expiresAt,
          result_id: 'test_id',
          enabled: false,
          url_id: 'test_url_id',
          url: 'test_url',
          api_url: 'test_api_url',
          status: 200
        });
      });
    });
  });
});
