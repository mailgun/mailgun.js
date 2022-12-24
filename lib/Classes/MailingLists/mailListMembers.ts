import urljoin from 'url-join';
import Request from '../common/Request';
import {
  MailListMembersQuery,
  IMailListsMembers,
  CreateUpdateMailListMembers,
  MailListMember,
  MultipleMembersData,
  MultipleMembersReqData,
  DeletedMember,
  CreateUpdateMailListMembersReq,
  NewMultipleMembersResponse,
  MailListMembersResult,
  MailListMembersResponse
} from '../../interfaces/MailingLists';
import NavigationThruPages from '../common/NavigationThruPages';

export default class MailListsMembers
  extends NavigationThruPages<MailListMembersResult>
  implements IMailListsMembers {
  baseRoute: string;
  request: Request;

  constructor(request: Request) {
    super(request);
    this.request = request;
    this.baseRoute = '/v3/lists';
  }

  private checkAndUpdateData(data: CreateUpdateMailListMembers) {
    const newData = { ...data };

    if (typeof data.vars === 'object') {
      newData.vars = JSON.stringify(newData.vars);
    }

    if (typeof data.subscribed === 'boolean') {
      newData.subscribed = data.subscribed ? 'yes' : 'no';
    }

    return newData as CreateUpdateMailListMembersReq;
  }

  protected parseList(
    response: MailListMembersResponse,
  ): MailListMembersResult {
    const data = {} as MailListMembersResult;
    data.items = response.body.items;

    data.pages = this.parsePageLinks(response, '?', 'address');
    return data;
  }

  async listMembers(
    mailListAddress: string,
    query?: MailListMembersQuery
  ): Promise<MailListMembersResult> {
    return this.requestListWithPages(`${this.baseRoute}/${mailListAddress}/members/pages`, query);
  }

  getMember(mailListAddress: string, mailListMemberAddress: string): Promise<MailListMember> {
    return this.request.get(`${this.baseRoute}/${mailListAddress}/members/${mailListMemberAddress}`)
      .then((response) => response.body.member as MailListMember);
  }

  createMember(
    mailListAddress: string,
    data: CreateUpdateMailListMembers
  ): Promise<MailListMember> {
    const reqData = this.checkAndUpdateData(data);
    return this.request.postWithFD(`${this.baseRoute}/${mailListAddress}/members`, reqData)
      .then((response) => response.body.member as MailListMember);
  }

  createMembers(
    mailListAddress: string,
    data: MultipleMembersData
  ): Promise<NewMultipleMembersResponse> {
    const newData: MultipleMembersReqData = {
      members: Array.isArray(data.members) ? JSON.stringify(data.members) : data.members,
      upsert: data.upsert
    };

    return this.request.postWithFD(`${this.baseRoute}/${mailListAddress}/members.json`, newData)
      .then((response) => response.body as NewMultipleMembersResponse);
  }

  updateMember(
    mailListAddress: string,
    mailListMemberAddress: string,
    data: CreateUpdateMailListMembers
  ): Promise<MailListMember> {
    const reqData = this.checkAndUpdateData(data);
    return this.request.putWithFD(`${this.baseRoute}/${mailListAddress}/members/${mailListMemberAddress}`, reqData)
      .then((response) => response.body.member as MailListMember);
  }

  destroyMember(mailListAddress: string, mailListMemberAddress: string) : Promise<DeletedMember> {
    return this.request.delete(`${this.baseRoute}/${mailListAddress}/members/${mailListMemberAddress}`)
      .then((response) => response.body as DeletedMember);
  }
}
