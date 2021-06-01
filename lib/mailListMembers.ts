import Request from './request';
import {
  MailListMembersQuery,
  IMailListsMembers,
  CreateUpdateMailListMembers,
  MailListMember,
  MultipleMembersData,
  MultipleMembersReqData,
  DeletedMember,
  CreateUpdateMailListMembersReq
} from './interfaces/mailListMembers';
import { CreateUpdateList } from './interfaces/lists';

export default class MailListsMembers implements IMailListsMembers{
  baseRoute: string;
  request: Request;

  constructor(request: Request) {
    this.request = request;
    this.baseRoute = '/v3/lists';
  }

  private checkAndUpdateData(data: CreateUpdateMailListMembers) {
    const newData = { ...data };

    if (typeof data.vars === 'object') {
      newData.vars = JSON.stringify(newData.vars);
    }

    if (typeof data.subscribed === "boolean") {
      newData.subscribed = data.subscribed ? "yes" : "no";
    }

    return newData as CreateUpdateMailListMembersReq;
  }

  listMembers(mailListAddress: string, query?: MailListMembersQuery) {
    return this.request.get(`${this.baseRoute}/${mailListAddress}/members/pages`, query)
      .then((response) =>  response.body.items as [MailListMember]);
  }

  getMember(mailListAddress: string, mailListMemberAddress: string) {
    return this.request.get(`${this.baseRoute}/${mailListAddress}/members/${mailListMemberAddress}`)
      .then((response) => response.body.member as MailListMember);
  }

  createMember(mailListAddress: string, data: CreateUpdateMailListMembers) {
    const reqData = this.checkAndUpdateData(data);
    return this.request.postMulti(`${this.baseRoute}/${mailListAddress}/members`, reqData)
    .then((response) => {
      return response.body.member as MailListMember;
    });
  }

  createMembers(mailListAddress: string, data: MultipleMembersData) {

    const newData: MultipleMembersReqData = {
      members: Array.isArray(data.members) ? JSON.stringify(data.members): data.members,
      upsert: data.upsert
    };

    return this.request.postMulti(`${this.baseRoute}/${mailListAddress}/members.json`, newData)
      .then((response) => {
        return response.body;
      });
  }

  updateMember(mailListAddress: string, mailListMemberAddress: string, data: CreateUpdateList) {
    return this.request.putMulti(`${this.baseRoute}/${mailListAddress}/members/${mailListMemberAddress}`, data)
      .then((response) => response.body.member as MailListMember);
  }

  destroyMember(mailListAddress: string, mailListMemberAddress: string) {
    return this.request.delete(`${this.baseRoute}/${mailListAddress}/members/${mailListMemberAddress}`)
      .then((response) => response.body as DeletedMember);
  }
}
