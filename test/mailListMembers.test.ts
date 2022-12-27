import nock from 'nock';
import formData from 'form-data';
import Request from '../lib/Classes/common/Request';
import { RequestOptions } from '../lib/interfaces/RequestOptions';
import MailListMembers from '../lib/Classes/MailingLists/mailListMembers';
import { DeletedMember, MailListMember, NewMultipleMembersResponse } from '../lib/Types/MailingLists';
import { InputFormData } from '../lib/interfaces/IFormData';

describe('mailListsMembersClient', function () {
  let client: any;
  let api: any;
  let defaultListMember : MailListMember;

  beforeEach(function () {
    const reqObject = new Request({ url: 'https://api.mailgun.net' } as RequestOptions, formData as InputFormData);
    client = new MailListMembers(reqObject);
    api = nock('https://api.mailgun.net');
    defaultListMember = {
      address: 'testingMailingListMemberAddress@example.com',
      name: 'test name',
      subscribed: true,
      vars: { gender: 'female', age: 0 }
    } as MailListMember;
  });

  afterEach(function () {
    api.done();
  });

  describe('listMembers', function () {
    it('fetches all mail list members', async function () {
      const lists = [defaultListMember];

      api.get('/v3/lists/list-name/members/pages').reply(200, {
        items: lists,
        paging: {
          first: 'http://test.com/pages?page=1'
        }
      });

      const result = await client.listMembers('list-name');

      result.should.have.property('items');
      result.items.length.should.be.equal(1);
      result.items[0].should.eql(defaultListMember);

      result.should.have.property('pages');
      result.pages.first.page.should.be.eql('?page=1');
      result.pages.first.url.should.be.eql('http://test.com/pages?page=1');
      result.pages.first.id.should.be.eql('first');
    });
  });

  describe('getMember', function () {
    it('gets a specific mailing list member', function () {
      const mailingListAddress = 'testingMailingListAddress@example.com';
      const mailingListMemberAddress = 'testingMailingListMemberAddress@example.com';
      api.get(`/v3/lists/${mailingListAddress}/members/${mailingListMemberAddress}`).reply(200, {
        member: defaultListMember
      });

      return client.getMember('testingMailingListAddress@example.com', 'testingMailingListMemberAddress@example.com')
        .then(function (listMember: MailListMember) {
          listMember.should.eql(defaultListMember);
        });
    });
  });

  describe('createMember', function () {
    it('adds list member to the mailing list ', function () {
      const member:any = { ...defaultListMember };
      member.subscribed = true;
      const mailingListAddress = 'testingMailingListAddress@example.com';
      api.post(`/v3/lists/${mailingListAddress}/members`).reply(200, {
        member
      });

      return client.createMember(mailingListAddress, member).then(function (newListMember:any) {
        newListMember.should.eql(member);
      });
    });

    it('works with string value in subscribed field', function () {
      const member:any = { ...defaultListMember };
      member.subscribed = 'yes';
      const mailingListAddress = 'testingMailingListAddress@example.com';
      api.post(`/v3/lists/${mailingListAddress}/members`).reply(200, {
        member
      });

      return client.createMember(mailingListAddress, member).then(function (newListMember:any) {
        newListMember.should.eql(member);
      });
    });

    it('works with false value in subscribed field', function () {
      const member:any = { ...defaultListMember };
      member.subscribed = false;
      const mailingListAddress = 'testingMailingListAddress@example.com';
      api.post(`/v3/lists/${mailingListAddress}/members`).reply(200, {
        member
      });

      return client.createMember(mailingListAddress, member).then(function (newListMember:any) {
        newListMember.should.eql(member);
      });
    });
  });

  describe('createMembers', function () {
    const mailingListAddress = 'testingMailingListAddress@example.com';
    let response : NewMultipleMembersResponse;

    beforeEach(function () {
      response = {
        list: {
          access_level: 'everyone',
          address: mailingListAddress,
          created_at: 'Wed, 26 May 2021 10:40:06 -0000',
          description: 'test description',
          members_count: 5,
          name: 'test name',
          reply_preference: 'list'
        },
        message: 'Mailing list has been updated',
        'task-id': '00000000000000000000000000000000'
      };
    });

    it('adds list of members to the mailing list', function () {
      const newMembersListPlaceholder = new Array(5).fill(0);
      const newMembersList = newMembersListPlaceholder.map((_, index) => ({
        address: `test${index}@example.com`,
        name: `test name ${index}`,
        vars: { gender: 'female', age: index },
        subscribed: true,
        upsert: 'yes'
      }));

      api.post(`/v3/lists/${mailingListAddress}/members.json`).reply(200, response);

      return client.createMembers(mailingListAddress, {
        members: newMembersList,
        upsert: 'yes'
      }).then(function (result: NewMultipleMembersResponse) {
        result.should.eql(response);
      });
    });

    it('works with string value in members field', function () {
      const newMembersListPlaceholder = new Array(5).fill(0);
      const newMembersList = newMembersListPlaceholder.map((_, index) => ({
        address: `test${index}@example.com`,
        name: `test name ${index}`,
        vars: JSON.stringify({ gender: 'female', age: index }),
        subscribed: true,
        upsert: 'yes'

      }));
      api.post(`/v3/lists/${mailingListAddress}/members.json`).reply(200, response);
      return client.createMembers(mailingListAddress, {
        members: newMembersList,
        upsert: 'yes'
      }).then(function (result: NewMultipleMembersResponse) {
        result.should.eql(response);
      });
    });
  });

  describe('updateMember', function () {
    it('updates list member in the mailing list ', function () {
      const mailingListAddress = 'testingMailingListAddress@example.com';
      const mailingListMemberAddress = 'testingMailingListMemberAddress@example.com';
      api.put(`/v3/lists/${mailingListAddress}/members/${mailingListMemberAddress}`).reply(200, { member: defaultListMember });

      return client.updateMember(
        mailingListAddress,
        mailingListMemberAddress,
        defaultListMember
      ).then(function (res: MailListMember) {
        res.should.eql(defaultListMember);
      });
    });

    it('works with string value in subscribed field', function () {
      const mailingListAddress = 'testingMailingListAddress@example.com';
      const mailingListMemberAddress = 'testingMailingListMemberAddress@example.com';
      const member: any = { ...defaultListMember };
      member.subscribed = 'yes';
      api.put(`/v3/lists/${mailingListAddress}/members/${mailingListMemberAddress}`).reply(200, { member: defaultListMember });

      return client.updateMember(
        mailingListAddress,
        mailingListMemberAddress,
        member
      ).then(function (res: MailListMember) {
        res.should.eql(defaultListMember);
      });
    });
  });

  describe('destroyMember', function () {
    it('deletes member from the list ', function () {
      const mailingListAddress = 'testingMailingListAddress@example.com';
      const mailingListMemberAddress = 'testingMailingListMemberAddress@example.com';
      const res = {
        member: defaultListMember,
        message: 'deleted'
      } as DeletedMember;

      api.delete(`/v3/lists/${mailingListAddress}/members/${mailingListMemberAddress}`).reply(200, res);

      return client.destroyMember(
        mailingListAddress,
        mailingListMemberAddress
      ).then(function (deletedMemberRes: DeletedMember) {
        deletedMemberRes.should.eql(res);
      });
    });
  });
});
