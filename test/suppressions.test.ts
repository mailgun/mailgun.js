import chai, { expect } from 'chai';
import formData from 'form-data';
import nock from 'nock';
import APIError from '../lib/Classes/common/Error';

import Request from '../lib/Classes/common/Request';
import Bounce from '../lib/Classes/Suppressions/Bounce';
import Complaint from '../lib/Classes/Suppressions/Complaint';
import SuppressionClient from '../lib/Classes/Suppressions/SuppressionsClient';
import Unsubscribe from '../lib/Classes/Suppressions/Unsubscribe';
import WhiteList from '../lib/Classes/Suppressions/WhiteList';
import { InputFormData, ParsedPage, RequestOptions } from '../lib/Types/Common';
import {
  SuppressionCreationResult,
  SuppressionDestroyResult,
  SuppressionList,
  SuppressionListResponse
} from '../lib/Types/Suppressions';

chai.should();

describe('SuppressionsClient', function () {
  let client: SuppressionClient;
  let api: nock.Scope;

  beforeEach(function () {
    client = new SuppressionClient(new Request({ url: 'https://api.mailgun.net' } as RequestOptions, formData as InputFormData));
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
      bounce1.address.should.eql('unknown@unknown.com');
      bounce1.code.should.eql(550);
      bounce1.error.should.eql('No such mailbox');
      (bounce1.created_at as Date).toUTCString().should.eql('Fri, 21 Oct 2011 11:02:55 GMT');

      const bounce2: Bounce = result.items[1] as Bounce;
      bounce2.address.should.eql('full@disk.com');
      bounce2.code.should.eql(552);
      bounce2.error.should.eql('Mailbox full');
      (bounce2.created_at as Date).toUTCString().should.eql('Fri, 21 Oct 2011 12:02:55 GMT');
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
      unsubscribe1.address.should.eql('brad@example.com');
      unsubscribe1.tags.should.eql(['*']);
      unsubscribe1.created_at.toUTCString().should.eql('Fri, 21 Oct 2011 11:02:55 GMT');

      const unsubscribe2: Unsubscribe = result.items[1] as Unsubscribe;
      unsubscribe2.address.should.eql('roman@example.com');
      unsubscribe2.tags.should.eql(['*']);
      unsubscribe2.created_at.toUTCString().should.eql('Fri, 21 Oct 2011 12:02:55 GMT');
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
      complaint1.address.should.eql('brad@example.com');
      complaint1.created_at.toUTCString().should.eql('Fri, 21 Oct 2011 11:02:55 GMT');

      const complaint2: Complaint = result.items[1] as Complaint;
      complaint2.address.should.eql('roman@example.com');
      complaint2.created_at.toUTCString().should.eql('Fri, 21 Oct 2011 12:02:55 GMT');
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
      whitelist1.type.should.eql('whitelists');
      whitelist1.value.should.eql('brad@example.com');
      whitelist1.reason.should.eql('first reason');
      whitelist1.createdAt.should.eql(new Date('2021-11-30T10:38:56.000Z'));

      const whitelist2: WhiteList = result.items[1] as WhiteList;
      whitelist2.type.should.eql('whitelists');
      whitelist2.value.should.eql('roman@example.com');
      whitelist2.reason.should.eql('second reason');
      whitelist2.createdAt.should.eql(new Date('2021-11-30T10:38:56.000Z'));
    });

    it('parses page links', async () => {
      api.get('/v3/domain.com/bounces').reply(200, response.body);
      const bounces: SuppressionList = await client.list('domain.com', 'bounces');
      let page: ParsedPage;

      page = bounces.pages.first;
      page.url.should.eql('https://api.mailgun.net/v3/mailgun.com/bounces?page=first');
      expect(page.page).to.eql('?page=first');
      expect(page.iteratorPosition).to.be.eql(undefined);

      page = bounces.pages.last;
      page.url.should.eql('https://api.mailgun.net/v3/mailgun.com/bounces?page=last');
      expect(page.page).to.be.eql('?page=last');
      expect(page.iteratorPosition).to.be.eql(undefined);

      page = bounces.pages.next;
      page.url.should.eql('https://api.mailgun.net/v3/mailgun.com/bounces?page=next&address=next@mailgun.com');
      expect(page.page).to.be.eql('?page=next&address=next@mailgun.com');
      page.should.have.property('iteratorPosition').eql('next@mailgun.com');

      page = bounces.pages.previous;
      page.url.should.eql('https://api.mailgun.net/v3/mailgun.com/bounces?page=previous&address=previous@mailgun.com');
      expect(page.page).to.be.eql('?page=previous&address=previous@mailgun.com');
      page.should.have.property('iteratorPosition').eql('previous@mailgun.com');
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

      expect(bounces.pages.previous.page).to.be.eql('?page=previous&address=next@mailgun.com');
      expect(bounces.items).to.be.empty;
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
      bounce.address.should.eql('address?@unknown.com');
      bounce.code.should.eql(550);
      bounce.error.should.eql('No such mailbox');
      bounce.created_at.toUTCString().should.eql('Fri, 21 Oct 2011 11:02:55 GMT');
    });

    it('fetches unsubscribe for address', async () => {
      api.get('/v3/domain.com/unsubscribes/roman%3F%40example.com').reply(200, {
        address: 'address?@unknown.com',
        tags: ['*'],
        created_at: 'Fri, 21 Oct 2011 12:02:55 GMT'
      });

      const unsubscribe: Unsubscribe = await client.get('domain.com', 'unsubscribes', 'roman?@example.com') as Unsubscribe;
      unsubscribe.address.should.eql('address?@unknown.com');
      unsubscribe.tags.should.eql(['*']);
      unsubscribe.created_at.toUTCString().should.eql('Fri, 21 Oct 2011 12:02:55 GMT');
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
        createdBounce.message.should.eql('1 addresses have been added to the bounces table');
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
        createdBounces.message.should.eql(message);
      });
    });

    describe('whitelists', function () {
      it('throws in case type is unknown', async () => {
        try {
          await client.create('domain.com', 'wrong type',
            { address: 'myaddress' });
        } catch (error: unknown) {
          const err: APIError = error as APIError;
          err.message.should.eql('Unknown type value');
          err.details.should.eql('Type may be only one of [bounces, complaints, unsubscribes, whitelists]');
          err.status.should.eql(400);
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
        createdWhitelist.message.should.eql(message);
      });

      it('throws in case multiple whitelists provided', async () => {
        try {
          await client.create('domain.com', 'whitelists',
            [{ address: 'myaddress' }, { address: 'myaddress1' }]);
        } catch (error: unknown) {
          const err: APIError = error as APIError;
          err.message.should.eql('Data property should be an object');
          err.details.should.eql("Whitelist's creation process does not support multiple creations. Data property should be an object");
          err.status.should.eql(400);
        }
      });
    });

    describe('unsubscribes', () => {
      it('creates unsubscribe', async () => {
        api.post('/v3/domain.com/unsubscribes').reply(200, {
          message: '1 addresses have been added to the unsubscribes table'
        });
        const createdUnsubscribe: SuppressionCreationResult = await client.create(
          'domain.com',
          'unsubscribes',
          [{ address: 'test5@example.com', tags: ['test'] }]
        );
        createdUnsubscribe.message.should.eql('1 addresses have been added to the unsubscribes table');
      });

      it('creates unsubscribe(tag may be provided)', async () => {
        api.post('/v3/domain.com/unsubscribes').reply(200, {
          message: '1 addresses have been added to the unsubscribes table'
        });
        const createdUnsubscribe: SuppressionCreationResult = await client.create(
          'domain.com',
          'unsubscribes',
          [{ address: 'test5@example.com', tag: 'test' }]
        );
        createdUnsubscribe.message.should.eql('1 addresses have been added to the unsubscribes table');
      });

      it('creates unsubscribe(tag is not required)', async () => {
        api.post('/v3/domain.com/unsubscribes').reply(200, {
          message: '1 addresses have been added to the unsubscribes table'
        });
        const createdUnsubscribe: SuppressionCreationResult = await client.create(
          'domain.com',
          'unsubscribes',
          [{ address: 'test5@example.com' }]
        );
        createdUnsubscribe.message.should.eql('1 addresses have been added to the unsubscribes table');
      });

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
        createdUnsubscribes.message.should.eql(message);
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
      res.address.should.eql('my?@address.com');
    });
  });
});
