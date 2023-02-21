import nock from 'nock';
import formData from 'form-data';

import Request from '../lib/Classes/common/Request';
import ListsClient from '../lib/Classes/MailingLists/mailingLists';
import MailListMembers from '../lib/Classes/MailingLists/mailListMembers';
import {
  MailingListCancelValidationResult,
  MailingList,
  StartValidationResult,
  MailingListValidationResult
} from '../lib/Types/MailingLists';
import { InputFormData, RequestOptions } from '../lib/Types/Common';

describe('ListsClient', function () {
  let client: any;
  let api: any;
  let defaultList : MailingList;

  beforeEach(function () {
    const reqObject = new Request({ url: 'https://api.mailgun.net' } as RequestOptions, formData as InputFormData);
    const mailListMembers = new MailListMembers(reqObject);
    client = new ListsClient(reqObject, mailListMembers);
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

  describe('list', function () {
    it('fetches all mail lists', async function () {
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

      const result = await client.list();
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

  describe('get', function () {
    it('gets a specific mailing list', function () {
      api.get('/v3/lists/testing.example.com').reply(200, {
        list: defaultList
      });

      return client.get('testing.example.com').then(function (list: any) {
        list.should.eql(defaultList);
      });
    });
  });

  describe('create', function () {
    it('creates the list', function () {
      api.post('/v3/lists').reply(200, {
        list: defaultList
      });

      return client.create({ name: 'another.example.com' }).then(function (newList: any) {
        newList.should.eql(defaultList);
      });
    });
  });

  describe('destroy', function () {
    it('deletes the list', function () {
      api.delete('/v3/lists/test.example.com').reply(200, {
        address: 'test.example.com',
        message: 'list deleted'
      });

      return client.destroy('test.example.com').then(function (data: any) {
        data.should.eql({
          address: 'test.example.com',
          message: 'list deleted'
        });
      });
    });
  });

  describe('update', function () {
    it('updates the list', function () {
      api.put('/v3/lists/test@example.com').reply(200, {
        list: defaultList
      });
      return client.update('test@example.com', { name: 'another name' }).then(function (data: any) {
        data.should.eql(defaultList);
      });
    });
  });

  describe('validate', function () {
    it('start validation of the list', function () {
      api.post('/v3/lists/test@example.com/validate').reply(200, {
        id: 'testId',
        message: 'test message',
      });
      return client.validate('test@example.com').then(function (data: StartValidationResult) {
        data.should.eql({
          status: 200,
          id: 'testId',
          message: 'test message',
        });
      });
    });
  });

  describe('validationResult', function () {
    it('returns correct result shape', function () {
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

      return client.validationResult('test@example.com').then(function (data: MailingListValidationResult) {
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
  });
  describe('cancelValidation', function () {
    it('cancels validation process', function () {
      api.delete('/v3/lists/test@example.com/validate').reply(200, {
        message: 'test message'
      });
      return client.cancelValidation('test@example.com').then(function (data: MailingListCancelValidationResult) {
        data.should.eql({
          status: 200,
          message: 'test message'
        });
      });
    });
  });
});
