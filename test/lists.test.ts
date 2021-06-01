const formData = require('form-data');

import nock from 'nock';
import Request from '../lib/request';
import ListsClient from '../lib/lists';
import RequestOptions from '../lib/interfaces/RequestOptions';
import MailListMembers from '../lib/mailListMembers';
import { MailingList } from '../lib/interfaces/lists';

describe('ListsClient', function () {
  let client: any;
  let api: any;
  let defaultList : MailingList;

  beforeEach(function () {
    const reqObject = new Request({ url: 'https://api.mailgun.net' } as RequestOptions, formData);
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
    } as MailingList
  });

  afterEach(function () {
    api.done();
  });

  describe('list', function () {
    it('fetches all mail lists', function () {
      const lists = [defaultList];

      api.get('/v3/lists/pages').reply(200, {
        items: lists
      });

      return client.list().then(function (lists: MailingList[]) {
        lists[0].should.eql(defaultList);
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
});
