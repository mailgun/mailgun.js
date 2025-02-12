import nock from 'nock';
import formData from 'form-data';

import Request from '../lib/Classes/common/Request.js';
import ListsClient from '../lib/Classes/MailingLists/mailingLists.js';
import MailListMembers from '../lib/Classes/MailingLists/mailListMembers.js';
import {
  MailingListCancelValidationResult,
  MailingList,
  StartValidationResult,
  MailingListValidationResult,
  CreateUpdateList,
  DestroyedList,
  InputFormData,
  RequestOptions
} from '../lib/Types/index.js';
import { IMailingListsClient } from '../lib/Interfaces/index.js';

describe('ListsClient', function () {
  let mailingListsClient: IMailingListsClient;
  let api: nock.Scope;
  let defaultList : MailingList;

  beforeEach(function () {
    const reqObject = new Request({ url: 'https://api.mailgun.net' } as RequestOptions, formData as InputFormData);
    const mailListMembers = new MailListMembers(reqObject);
    mailingListsClient = new ListsClient(reqObject, mailListMembers);
    api = nock('https://api.mailgun.net');
    defaultList = {
      access_level: 'readonly',
      address: 'test@testdomain.com',
      created_at: 'Thu, 01 Nov 2018 20:39:43 -0000',
      description: 'stuff',
      members_count: 1,
      name: '123',
      reply_preference: null
    } as MailingList;
  });

  afterEach(function () {
    api.done();
  });

  describe('list', async () => {
    it('fetches all mail lists', async () => {
      const lists = [defaultList];

      api.get('/v3/lists/pages').reply(200, {
        items: lists,
        paging: {
          first: 'https://api.mailgun.net/v3/lists/pages?page=first&limit=1',
          last: 'https://api.mailgun.net/v3/lists/pages?page=last&limit=1',
          next: 'https://api.mailgun.net/v3/lists/pages?page=next&address=test%40test.com&limit=1',
          previous: 'https://api.mailgun.net/v3/lists/pages?page=prev&address=test%40test.com&limit=1',
        }
      });

      const result = await mailingListsClient.list();
      result.items[0].should.eql(defaultList);
      result.pages.should.be.eql({
        first: {
          id: 'first',
          page: '?page=first&limit=1',
          iteratorPosition: undefined,
          url: 'https://api.mailgun.net/v3/lists/pages?page=first&limit=1'
        },
        last: {
          id: 'last',
          page: '?page=last&limit=1',
          iteratorPosition: undefined,
          url: 'https://api.mailgun.net/v3/lists/pages?page=last&limit=1'
        },
        next: {
          id: 'next',
          page: '?page=next&address=test%40test.com&limit=1',
          iteratorPosition: 'test@test.com',
          url: 'https://api.mailgun.net/v3/lists/pages?page=next&address=test%40test.com&limit=1'
        },
        previous: {
          id: 'previous',
          page: '?page=prev&address=test%40test.com&limit=1',
          iteratorPosition: 'test@test.com',
          url: 'https://api.mailgun.net/v3/lists/pages?page=prev&address=test%40test.com&limit=1'
        }
      });
    });
  });

  describe('get', async () => {
    it('gets a specific mailing list', async () => {
      api.get('/v3/lists/testing.example.com').reply(200, {
        list: defaultList
      });

      const result: MailingList = await mailingListsClient.get('testing.example.com');
      result.should.eql(defaultList);
    });
  });

  describe('create', async () => {
    it('creates the list', async () => {
      api.post('/v3/lists').reply(200, {
        list: defaultList
      });

      const result: MailingList = await mailingListsClient.create({ name: 'another.example.com' } as CreateUpdateList);
      result.should.eql(defaultList);
    });
  });

  describe('destroy', async () => {
    it('deletes the list', async () => {
      api.delete('/v3/lists/test.example.com').reply(200, {
        address: 'test.example.com',
        message: 'list deleted'
      });

      const result: DestroyedList = await mailingListsClient.destroy('test.example.com');
      result.should.eql({
        address: 'test.example.com',
        message: 'list deleted'
      });
    });
  });

  describe('update', async () => {
    it('updates the list', async () => {
      api.put('/v3/lists/test@example.com').reply(200, {
        list: defaultList
      });
      const result: MailingList = await mailingListsClient.update(
        'test@example.com',
        { name: 'another name' } as CreateUpdateList
      );
      result.should.eql(defaultList);
    });
  });

  describe('validate', async () => {
    it('start validation of the list', async () => {
      api.post('/v3/lists/test@example.com/validate').reply(200, {
        id: 'testId',
        message: 'test message',
      });
      const data: StartValidationResult = await mailingListsClient.validate('test@example.com');
      data.should.eql({
        status: 200,
        id: 'testId',
        message: 'test message',
      });
    });
  });

  describe('validationResult', async () => {
    it('returns correct result shape', async () => {
      api.get('/v3/lists/test@example.com/validate').reply(200, {
        status: 'uploaded',
        created_at: 1649665452,
        download_url: {
          csv: 'csvURL',
          json: 'JSONURL'
        },
        id: 'testId',
        quantity: 100,
        records_processed: 100,
        summary: {
          result: {
            catch_all: 0,
            deliverable: 0,
            do_not_send: 0,
            undeliverable: 0,
            unknown: 100
          },
          risk: {
            high: 0,
            low: 0,
            medium: 0,
            unknown: 100
          }
        }
      });

      const data: MailingListValidationResult = await mailingListsClient.validationResult('test@example.com');
      data.should.eql({
        status: 200,
        validationResult: {
          status: 'uploaded',
          created_at: new Date('2022-04-11T08:24:12.000Z'),
          download_url: {
            csv: 'csvURL',
            json: 'JSONURL'
          },
          id: 'testId',
          quantity: 100,
          records_processed: 100,
          summary: {
            result: {
              catch_all: 0,
              deliverable: 0,
              do_not_send: 0,
              undeliverable: 0,
              unknown: 100
            },
            risk: {
              high: 0,
              low: 0,
              medium: 0,
              unknown: 100
            }
          }
        }
      });
    });
  });
  describe('cancelValidation', async () => {
    it('cancels validation process', async () => {
      api.delete('/v3/lists/test@example.com/validate').reply(200, {
        message: 'test message'
      });
      const data: MailingListCancelValidationResult = await mailingListsClient.cancelValidation('test@example.com');
      data.should.eql({
        status: 200,
        message: 'test message'
      });
    });
  });
});
