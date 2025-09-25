import nock from 'nock';
import APIError from '../../lib/Classes/common/Error.js';

import Request from './test-utils/TestRequest.js';
import Bounce from '../../lib/Classes/Suppressions/Bounce.js';
import Complaint from '../../lib/Classes/Suppressions/Complaint.js';
import SuppressionClient from '../../lib/Classes/Suppressions/SuppressionsClient.js';
import Unsubscribe from '../../lib/Classes/Suppressions/Unsubscribe.js';
import WhiteList from '../../lib/Classes/Suppressions/WhiteList.js';
import {
  ParsedPage,
  RequestOptions,
  SuppressionCreationResult,
  SuppressionDestroyResult,
  SuppressionList,
  SuppressionListResponse
} from '../../lib/Types/index.js';
import getTestFormData from './test-utils/TestFormData.js';

describe('SuppressionsClient', function () {
  let client: SuppressionClient;
  let api: nock.Scope;

  beforeEach(function () {
    client = new SuppressionClient(new Request({ url: 'https://api.mailgun.net' } as RequestOptions, getTestFormData()));
    api = nock('https://api.mailgun.net');
  });

  afterEach(function () {
    api.done();
  });

  describe('list', function () {
    let response: SuppressionListResponse;

    beforeEach(function () {
      response = {
        status: 200,
        body: {
          items: [],
          paging: {
            first: 'https://api.mailgun.net/v3/mailgun.com/bounces?page=first',
            last: 'https://api.mailgun.net/v3/mailgun.com/bounces?page=last',
            next: 'https://api.mailgun.net/v3/mailgun.com/bounces?page=next&address=next@mailgun.com',
            previous: 'https://api.mailgun.net/v3/mailgun.com/bounces?page=previous&address=previous@mailgun.com'
          }
        }
      };
    });

    it('fetches bounces', async () => {
      response.body.items = [{
        address: 'unknown@unknown.com',
        code: 550,
        error: 'No such mailbox',
        created_at: 'Fri, 21 Oct 2011 11:02:55 GMT'
      }, {
        address: 'full@disk.com',
        code: 552,
        error: 'Mailbox full',
        created_at: 'Fri, 21 Oct 2011 12:02:55 GMT'
      }];

      api.get('/v3/domain.com/bounces').reply(200, response.body);

      const result: SuppressionList = await client.list('domain.com', 'bounces');
      const bounce1: Bounce = result.items[0] as Bounce;
      expect(bounce1).toMatchObject({
        address: 'unknown@unknown.com',
        code: 550,
        error: 'No such mailbox',
        created_at: expect.any(Date)
      });
      expect((bounce1.created_at as Date).toUTCString()).toEqual('Fri, 21 Oct 2011 11:02:55 GMT');

      const bounce2: Bounce = result.items[1] as Bounce;
      expect(bounce2).toMatchObject({
        address: 'full@disk.com',
        code: 552,
        error: 'Mailbox full',
        created_at: expect.any(Date)
      });
      expect((bounce2.created_at as Date).toUTCString()).toEqual('Fri, 21 Oct 2011 12:02:55 GMT');
    });

    it('fetches unsubscribes', async () => {
      response.body.items = [{
        address: 'brad@example.com',
        tags: ['*'],
        created_at: 'Fri, 21 Oct 2011 11:02:55 GMT'
      }, {
        address: 'roman@example.com',
        tags: ['*'],
        created_at: 'Fri, 21 Oct 2011 12:02:55 GMT'
      }];

      api.get('/v3/domain.com/unsubscribes').reply(200, response.body);

      const result: SuppressionList = await client.list('domain.com', 'unsubscribes');
      const unsubscribe1: Unsubscribe = result.items[0] as Unsubscribe;
      expect(unsubscribe1).toMatchObject({
        address: 'brad@example.com',
        created_at: expect.any(Date),
        tags: ['*']
      });
      expect(unsubscribe1.created_at.toUTCString()).toEqual('Fri, 21 Oct 2011 11:02:55 GMT');

      const unsubscribe2: Unsubscribe = result.items[1] as Unsubscribe;
      expect(unsubscribe2).toMatchObject({
        address: 'roman@example.com',
        created_at: expect.any(Date),
        tags: ['*']
      });
      expect(unsubscribe2.created_at.toUTCString()).toEqual('Fri, 21 Oct 2011 12:02:55 GMT');
    });

    it('fetches complaints', async () => {
      response.body.items = [{
        address: 'brad@example.com',
        created_at: 'Fri, 21 Oct 2011 11:02:55 GMT'
      }, {
        address: 'roman@example.com',
        created_at: 'Fri, 21 Oct 2011 12:02:55 GMT'
      }];

      api.get('/v3/domain.com/complaints').reply(200, response.body);

      const result: SuppressionList = await client.list('domain.com', 'complaints');

      const complaint1: Complaint = result.items[0] as Complaint;
      expect(complaint1).toMatchObject({
        address: 'brad@example.com',
        created_at: expect.any(Date),
      });
      expect(complaint1.created_at.toUTCString()).toEqual('Fri, 21 Oct 2011 11:02:55 GMT');

      const complaint2: Complaint = result.items[1] as Complaint;
      expect(complaint2).toMatchObject({
        address: 'roman@example.com',
        created_at: expect.any(Date),
      });
      expect(complaint2.created_at.toUTCString()).toEqual('Fri, 21 Oct 2011 12:02:55 GMT');
    });

    it('fetches WhiteLists', async () => {
      response.body.items = [{
        type: 'whitelists',
        value: 'brad@example.com',
        reason: 'first reason',
        createdAt: '2021-11-30T10:38:56.000Z'
      }, {
        type: 'whitelists',
        value: 'roman@example.com',
        reason: 'second reason',
        createdAt: '2021-11-30T10:38:56.000Z'
      }];

      api.get('/v3/domain.com/whitelists').reply(200, response.body);

      const result: SuppressionList = await client.list('domain.com', 'whitelists');
      const whitelist1: WhiteList = result.items[0] as WhiteList;

      expect(whitelist1).toMatchObject({
        type: 'whitelists',
        value: 'brad@example.com',
        reason: 'first reason',
        createdAt: expect.any(Date)
      });

      // whitelist1.type.should.eql('whitelists');
      // whitelist1.value.should.eql('brad@example.com');
      // whitelist1.reason.should.eql('first reason');
      expect(whitelist1.createdAt).toEqual(new Date('2021-11-30T10:38:56.000Z'));

      const whitelist2: WhiteList = result.items[1] as WhiteList;
      expect(whitelist2).toMatchObject({
        type: 'whitelists',
        value: 'roman@example.com',
        reason: 'second reason',
        createdAt: expect.any(Date)
      });
      // whitelist2.type.should.eql('whitelists');
      // whitelist2.value.should.eql('roman@example.com');
      // whitelist2.reason.should.eql('second reason');
      expect(whitelist2.createdAt).toEqual(new Date('2021-11-30T10:38:56.000Z'));
    });

    it('parses page links', async () => {
      api.get('/v3/domain.com/bounces').reply(200, response.body);
      const bounces: SuppressionList = await client.list('domain.com', 'bounces');
      let page: ParsedPage;

      page = bounces.pages.first;
      expect(page).toMatchObject({
        url: 'https://api.mailgun.net/v3/mailgun.com/bounces?page=first',
        page: '?page=first',
        iteratorPosition: undefined
      });
      // page.url.should.eql('https://api.mailgun.net/v3/mailgun.com/bounces?page=first');
      // expect(page.page).to.eql('?page=first');
      // expect(page.iteratorPosition).to.be.eql(undefined);

      page = bounces.pages.last;
      expect(page).toMatchObject({
        url: 'https://api.mailgun.net/v3/mailgun.com/bounces?page=last',
        page: '?page=last',
        iteratorPosition: undefined
      });
      // page.url.should.eql('https://api.mailgun.net/v3/mailgun.com/bounces?page=last');
      // expect(page.page).to.be.eql('?page=last');
      // expect(page.iteratorPosition).to.be.eql(undefined);

      page = bounces.pages.next;
      expect(page).toMatchObject({
        url: 'https://api.mailgun.net/v3/mailgun.com/bounces?page=next&address=next@mailgun.com',
        page: '?page=next&address=next@mailgun.com',
        iteratorPosition: 'next@mailgun.com'
      });
      // page.url.should.eql('https://api.mailgun.net/v3/mailgun.com/bounces?page=next&address=next@mailgun.com');
      // expect(page.page).to.be.eql('?page=next&address=next@mailgun.com');
      // page.should.have.property('iteratorPosition').eql('next@mailgun.com');

      page = bounces.pages.previous;
      expect(page).toMatchObject({
        url: 'https://api.mailgun.net/v3/mailgun.com/bounces?page=previous&address=previous@mailgun.com',
        page: '?page=previous&address=previous@mailgun.com',
        iteratorPosition: 'previous@mailgun.com'
      });
      // page.url.should.eql('https://api.mailgun.net/v3/mailgun.com/bounces?page=previous&address=previous@mailgun.com');
      // expect(page.page).to.be.eql('?page=previous&address=previous@mailgun.com');
      // page.should.have.property('iteratorPosition').eql('previous@mailgun.com');
    });

    it('should not fail when requesting an empty page of results', async () => {
      api.get('/v3/domain.com/bounces?page-next&address=next@mailgun.com').reply(200, {
        paging: {
          first: 'https://api.mailgun.net/v3/mailgun.com/bounces?page=first',
          last: 'https://api.mailgun.net/v3/mailgun.com/bounces?page=last',
          previous: 'https://api.mailgun.net/v3/mailgun.com/bounces?page=previous&address=next@mailgun.com',
        },
      });
      const bounces = await client.list('domain.com', 'bounces', {
        page: '?page-next&address=next@mailgun.com',
      });
      expect(bounces).toMatchObject({
        pages: {
          previous: {
            page: '?page=previous&address=next@mailgun.com'
          }
        },
        items: expect.any(Array)
      });
      // expect(bounces.pages.previous.page).to.be.eql('?page=previous&address=next@mailgun.com');
      expect(bounces.items).toHaveLength(0);
    });
  });

  describe('get', function () {
    it('fetches bounce for address', async () => {
      api.get('/v3/domain.com/bounces/address%3F%40unknown.com').reply(200, {
        address: 'address?@unknown.com',
        code: 550,
        error: 'No such mailbox',
        created_at: 'Fri, 21 Oct 2011 11:02:55 GMT'
      });

      const bounce: Bounce = await client.get('domain.com', 'bounces', 'address?@unknown.com') as Bounce;
      expect(bounce).toMatchObject({
        address: 'address?@unknown.com',
        code: 550,
        error: 'No such mailbox',
        created_at: expect.any(Date)
      });
      expect((bounce.created_at as Date).toUTCString()).toEqual('Fri, 21 Oct 2011 11:02:55 GMT');
    });

    it('fetches unsubscribe for address', async () => {
      api.get('/v3/domain.com/unsubscribes/roman%3F%40example.com').reply(200, {
        address: 'address?@unknown.com',
        tags: ['*'],
        created_at: 'Fri, 21 Oct 2011 12:02:55 GMT'
      });

      const unsubscribe: Unsubscribe = await client.get('domain.com', 'unsubscribes', 'roman?@example.com') as Unsubscribe;
      expect(unsubscribe).toMatchObject({
        address: 'address?@unknown.com',
        tags: ['*'],
        created_at: expect.any(Date)
      });
      expect((unsubscribe.created_at as Date).toUTCString()).toEqual('Fri, 21 Oct 2011 12:02:55 GMT');
    });
  });

  describe('create', function () {
    describe('bounces', () => {
      it('creates bounce', async () => {
        api.post('/v3/domain.com/bounces').reply(200, {
          message: '1 addresses have been added to the bounces table'
        });
        const createdBounce: SuppressionCreationResult = await client.create('domain.com', 'bounces', {
          address: 'myaddress',
          code: 550
        });
        expect(createdBounce).toEqual({
          message: '1 addresses have been added to the bounces table',
          status: 200,
          type: '',
          value: ''
        });
      });

      it('creates multiple bounces', async () => {
        const message = '2 addresses have been added to the bounces table';
        api.post('/v3/domain.com/bounces').reply(200, {
          message
        });
        const createdBounces: SuppressionCreationResult = await client.create(
          'domain.com',
          'bounces',
          [{ address: 'myaddress' }, { address: 'myaddress1' }]
        );
        expect(createdBounces).toEqual({
          message: '2 addresses have been added to the bounces table',
          status: 200,
          type: '',
          value: ''
        });
      });
    });

    describe('whitelists', function () {
      it('throws in case type is unknown', async () => {
        try {
          await client.create('domain.com', 'wrong type',
            { address: 'myaddress' });
        } catch (error: unknown) {
          expect(error).toMatchObject({
            message: 'Unknown type value',
            details: 'Type may be only one of [bounces, complaints, unsubscribes, whitelists]',
            status: 400
          });
        }
      });

      it('creates whitelist', async function () {
        const message = '1 addresses have been added to the whitelists table';
        api.post('/v3/domain.com/whitelists').reply(200, {
          message
        });
        const createdWhitelist: SuppressionCreationResult = await client.create(
          'domain.com',
          'whitelists',
          { address: 'myaddress' }
        );
        expect(createdWhitelist.message).toEqual(message);
      });

      it('throws in case multiple whitelists provided', async () => {
        try {
          await client.create('domain.com', 'whitelists',
            [{ address: 'myaddress' }, { address: 'myaddress1' }]);
        } catch (error: unknown) {
          const err: APIError = error as APIError;
          expect(err).toMatchObject({
            message: 'Data property should be an object',
            details: "Whitelist's creation process does not support multiple creations. Data property should be an object",
            status: 400
          });
        }
      });
    });

    describe('unsubscribes', () => {
      describe('one unsubscribe', () => {
        it('creates unsubscribe(tag may be provided)', async () => {
          api.post('/v3/domain.com/unsubscribes').reply(200, {
            message: '1 addresses have been added to the unsubscribes table'
          });
          const createdUnsubscribe: SuppressionCreationResult = await client.create(
            'domain.com',
            'unsubscribes',
            { address: 'test5@example.com', tag: 'test' }
          );
          expect(createdUnsubscribe.message).toEqual('1 addresses have been added to the unsubscribes table');
        });

        it('creates unsubscribe(tag is not required)', async () => {
          api.post('/v3/domain.com/unsubscribes').reply(200, {
            message: '1 addresses have been added to the unsubscribes table'
          });
          const createdUnsubscribe: SuppressionCreationResult = await client.create(
            'domain.com',
            'unsubscribes',
            { address: 'test5@example.com' }
          );
          expect(createdUnsubscribe.message).toEqual('1 addresses have been added to the unsubscribes table');
        });

        it('usage of "tags" property is forbidden', async () => {
          // tags property works only if array of unsubscribes was provided as argument
          try {
            await client.create(
              'domain.com',
              'unsubscribes',
              { address: 'test5@example.com', tags: ['test'] }
            );
          } catch (error) {
            expect(error).toMatchObject({
              message: 'Tags property should not be used for creating one unsubscribe.',
              details: 'Tags property can be used if you provides an array of unsubscribes as second argument of create method. Please use tag instead',
              status: 400,
            });
          }
        });

        it('tag property can not be an array', async () => {
          // API ignores all values from array except for the first one.
          try {
            await client.create(
              'domain.com',
              'unsubscribes',
              // @ts-expect-error: Method may be called from node without TS.
              { address: 'test5@example.com', tag: ['test'] }
            );
          } catch (error) {
            expect(error).toMatchObject({
              message: 'Tag property can not be an array',
              details: 'Please use array of unsubscribes as second argument of create method to be able to provide few tags',
              status: 400,
            });
          }
        });
      });
      describe('array of unsubscribes', () => {
        it('creates multiple unsubscribes', async () => {
          const message = '2 addresses have been added to the unsubscribes table';
          api.post('/v3/domain.com/unsubscribes').reply(200, {
            message
          });
          const createdUnsubscribes: SuppressionCreationResult = await client.create(
            'domain.com',
            'unsubscribes',
            [{ address: 'test5@example.com', tags: ['test'] }, { address: 'test6@example.com', tags: ['test'] }]
          );
          expect(createdUnsubscribes.message).toEqual(message);
        });

        it('creates one unsubscribe with one tag using array', async () => {
          api.post('/v3/domain.com/unsubscribes').reply(200, {
            message: '1 addresses have been added to the unsubscribes table'
          });
          const createdUnsubscribe: SuppressionCreationResult = await client.create(
            'domain.com',
            'unsubscribes',
            [{ address: 'test5@example.com', tags: ['test'] }]
          );
          expect(createdUnsubscribe.message).toEqual('1 addresses have been added to the unsubscribes table');
        });

        it('tags property may be omitted', async () => {
          api.post('/v3/domain.com/unsubscribes').reply(200, {
            message: '1 addresses have been added to the unsubscribes table'
          });
          const createdUnsubscribe: SuppressionCreationResult = await client.create(
            'domain.com',
            'unsubscribes',
            [{ address: 'test5@example.com' }]
          );
          expect(createdUnsubscribe.message).toEqual('1 addresses have been added to the unsubscribes table');
        });

        it('usage of "tag" property is forbidden', async () => {
          // tag property is ignored when an array is provided
          try {
            await client.create(
              'domain.com',
              'unsubscribes',
              // @ts-expect-error: Method may be called from non TS environment.
              [{ address: 'test5@example.com', tag: ['test'] }]
            );
          } catch (error) {
            expect(error).toMatchObject({
              message: 'Tag property should not be used for creating multiple unsubscribes.',
              details: 'Tag property can be used only if one unsubscribe provided as second argument of create method. Please use tags instead.',
              status: 400,
            });
          }
        });
      });
    });
  });

  describe('destroy', function () {
    it('deletes suppression', async () => {
      api.delete('/v3/domain.com/bounces/my%3F%40address.com').reply(200, {
        message: 'Bounced address has been removed',
        address: 'my?@address.com'
      });

      const res: SuppressionDestroyResult = await client.destroy('domain.com', 'bounces', 'my?@address.com');
      expect(res.address).toEqual('my?@address.com');
    });
  });
});
