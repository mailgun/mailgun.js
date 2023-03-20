import nock from 'nock';
import formData from 'form-data';
import Request from '../lib/Classes/common/Request';
import MailListMembers from '../lib/Classes/MailingLists/mailListMembers';
import {
  CreateUpdateMailListMembers,
  DeletedMember,
  MailListMember,
  MultipleMembersData,
  NewMultipleMembersResponse
} from '../lib/Types/MailingLists';
import { InputFormData, RequestOptions } from '../lib/Types/Common';
import { IMailListsMembers } from '../lib/Interfaces';

describe('mailListsMembersClient', function () {
  let mailListsMembersClient: IMailListsMembers;
  let api: nock.Scope;
  let defaultListMember : MailListMember;

  beforeEach(function () {
    const reqObject = new Request({ url: 'https://api.mailgun.net' } as RequestOptions, formData as InputFormData);
    mailListsMembersClient = new MailListMembers(reqObject);
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

      const result = await mailListsMembersClient.listMembers('list-name');

      result.should.have.property('items');
      result.items.length.should.be.equal(1);
      result.items[0].should.eql(defaultListMember);

      result.should.have.property('pages');
      result.pages.first.page.should.be.eql('?page=1');
      result.pages.first.url.should.be.eql('http://test.com/pages?page=1');
      result.pages.first.id.should.be.eql('first');
    });
  });

  describe('getMember', async () => {
    it('gets a specific mailing list member', async () => {
      const mailingListAddress = 'testingMailingListAddress@example.com';
      const mailingListMemberAddress = 'testingMailingListMemberAddress@example.com';
      api.get(`/v3/lists/${mailingListAddress}/members/${mailingListMemberAddress}`).reply(200, {
        member: defaultListMember
      });

      const listMember: MailListMember = await mailListsMembersClient.getMember('testingMailingListAddress@example.com', 'testingMailingListMemberAddress@example.com');
      listMember.should.eql(defaultListMember);
    });
  });

  describe('createMember', async () => {
    it('adds list member to the mailing list ', async () => {
      const member: CreateUpdateMailListMembers = {
        ...defaultListMember,
        subscribed: true,
        vars: JSON.stringify(defaultListMember.vars)
      };

      const mailingListAddress = 'testingMailingListAddress@example.com';
      api.post(`/v3/lists/${mailingListAddress}/members`).reply(200, {
        member
      });

      const newListMember: MailListMember = await mailListsMembersClient
        .createMember(mailingListAddress, member);
      newListMember.should.eql(member);
    });

    it('works with string value in subscribed field', async () => {
      const member: CreateUpdateMailListMembers = {
        ...defaultListMember,
        subscribed: 'yes',
        vars: JSON.stringify(defaultListMember.vars)
      };
      const mailingListAddress = 'testingMailingListAddress@example.com';
      api.post(`/v3/lists/${mailingListAddress}/members`).reply(200, {
        member
      });

      const newListMember: MailListMember = await mailListsMembersClient
        .createMember(mailingListAddress, member);
      newListMember.should.eql(member);
    });

    it('works with false value in subscribed field', async () => {
      const member: CreateUpdateMailListMembers = {
        ...defaultListMember,
        subscribed: false,
        vars: JSON.stringify(defaultListMember.vars)
      };
      const mailingListAddress = 'testingMailingListAddress@example.com';
      api.post(`/v3/lists/${mailingListAddress}/members`).reply(200, {
        member
      });

      const newListMember: MailListMember = await mailListsMembersClient
        .createMember(mailingListAddress, member);
      newListMember.should.eql(member);
    });
  });

  describe('createMembers', async () => {
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

    it('adds list of members to the mailing list', async () => {
      const newMembersListPlaceholder = new Array(5).fill(0);
      const newMembersList = newMembersListPlaceholder.map((_, index) => ({
        address: `test${index}@example.com`,
        name: `test name ${index}`,
        vars: { gender: 'female', age: index },
        subscribed: true,
        upsert: 'yes'
      }));

      api.post(`/v3/lists/${mailingListAddress}/members.json`).reply(200, response);

      const result: NewMultipleMembersResponse = await mailListsMembersClient.createMembers(
        mailingListAddress, {
          members: newMembersList,
          upsert: 'yes'
        }
      );
      result.should.eql(response);
    });

    it('works with string value in members field', async () => {
      const newMembersListPlaceholder = new Array(5).fill(0);
      const newMembersList = newMembersListPlaceholder.map((_, index) => ({
        address: `test${index}@example.com`,
        name: `test name ${index}`,
        vars: { gender: 'female', age: index },
        subscribed: true,
        upsert: 'yes'
      }));
      api.post(`/v3/lists/${mailingListAddress}/members.json`).reply(200, response);
      const result: NewMultipleMembersResponse = await mailListsMembersClient
        .createMembers(mailingListAddress, {
          members: newMembersList,
          upsert: 'yes'
        } as MultipleMembersData);
      result.should.eql(response);
    });
  });

  describe('updateMember', async () => {
    it('updates list member in the mailing list ', async () => {
      const mailingListAddress = 'testingMailingListAddress@example.com';
      const mailingListMemberAddress = 'testingMailingListMemberAddress@example.com';
      const member: CreateUpdateMailListMembers = {
        ...defaultListMember,
        vars: JSON.stringify(defaultListMember.vars)
      };
      api.put(`/v3/lists/${mailingListAddress}/members/${mailingListMemberAddress}`).reply(200, { member: defaultListMember });

      const res: MailListMember = await mailListsMembersClient.updateMember(
        mailingListAddress,
        mailingListMemberAddress,
        member
      );
      res.should.eql(defaultListMember);
    });

    it('works with string value in subscribed field', function () {
      const mailingListAddress = 'testingMailingListAddress@example.com';
      const mailingListMemberAddress = 'testingMailingListMemberAddress@example.com';
      const member: CreateUpdateMailListMembers = {
        ...defaultListMember,
        subscribed: 'yes',
        vars: JSON.stringify(defaultListMember.vars)
      };
      api.put(`/v3/lists/${mailingListAddress}/members/${mailingListMemberAddress}`).reply(200, { member: defaultListMember });

      return mailListsMembersClient.updateMember(
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

      return mailListsMembersClient.destroyMember(
        mailingListAddress,
        mailingListMemberAddress
      ).then(function (deletedMemberRes: DeletedMember) {
        deletedMemberRes.should.eql(res);
      });
    });
  });
});
