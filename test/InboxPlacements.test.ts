import formData from 'form-data';

import nock from 'nock';

import { InputFormData, RequestOptions } from '../lib/Types/Common';

import { IInboxPlacementsClient } from '../lib/Interfaces';
import InboxPlacementsClient from '../lib/Classes/InboxPlacements/inboxPlacements';

import SeedsListsClient from '../lib/Classes/InboxPlacements/SeedsLists/SeedsListsClient';
import InboxPlacementsResultsClient from '../lib/Classes/InboxPlacements/Results/InboxPlacementsResultsClient';
import InboxPlacementsProvidersClient from '../lib/Classes/InboxPlacements/providers/InboxPlacementsProviders';
import TestRequest from './TestUtils/Request';

// TODO: fix types
describe('Inbox Placements Client', () => {
  let client: IInboxPlacementsClient;
  let api: nock.Scope;

  beforeEach(() => {
    const reqObject = new TestRequest({ url: 'https://api.mailgun.net' } as RequestOptions, formData as InputFormData);
    client = new InboxPlacementsClient(
      reqObject,
      {} as SeedsListsClient,
      {} as InboxPlacementsResultsClient,
      {} as InboxPlacementsProvidersClient
    );
    api = nock('https://api.mailgun.net');
  });

  afterEach(() => {
    api.done();
  });

  describe('runTest', () => {
    it('runs inbox placements test', async () => {
      api.post('/v4/inbox/tests').reply(200, {
        result_id: 'test_result_id',
        links: {
          results: 'test_results'
        }
      });

      const runTestResponse = await client.runTest({
        from: 'from',
        subject: 'subject',
        provider_filter: ['test'],
        html: 'some html',
      });
      runTestResponse.should.eql({
        result_id: 'test_result_id',
        links: {
          results: 'test_results'
        },
        status: 200
      });
    });
  });
});
