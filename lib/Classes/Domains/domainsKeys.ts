import urljoin from 'url-join';
import { APIResponse } from '../../Types/Common/ApiResponse.js';
import {
  DKIMSelectorInfo,
  UpdatedDKIMSelectorResult,
  UpdatedDKIMSelectorResponse,
  UpdatedDKIMAuthority,
  DKIMAuthorityInfo,
  UpdatedDKIMAuthorityResponse,
  DomainKeysList,
  DomainKeyCreateData,
  DomainKeyCreateDataResult,
  DomainKeyCreateDataApi,
  DomainKeysListResult,
  DomainKeysListAllQuery,
  DomainKeysListAllResult,
  DomainKeysListAllApi,
  DeletedDomainKeysResult,
  ActivateDomainKeyResponse,
  DeactivateDomainKeyResponse
} from '../../Types/Domains/index.js';
import Request from '../common/Request.js';
import { PutOptionsType, } from '../../definitions.js';
import { IDomainKeysClient } from '../../Interfaces/Domains/index.js';
import NavigationThruPages from '../common/NavigationThruPages.js';

export default class DomainKeysClient
  extends NavigationThruPages<DomainKeysListAllResult>
  implements IDomainKeysClient {
  baseRoute: string;
  request: Request;

  constructor(request: Request) {
    super(request);
    this.request = request;
    this.baseRoute = '/v3/domains/';
  }

  private _parseDomainKeysList(
    response: DomainKeysList
  ): DomainKeysList {
    return {
      items: response.items,
    };
  }

  protected parseList(response: DomainKeysListAllApi): DomainKeysListAllResult {
    const data = {} as DomainKeysListAllResult;
    data.items = response.body.items;
    data.pages = this.parsePageLinks(response, '?', 'page');
    data.status = response.status;
    return {
      items: response.body.items,
      pages: this.parsePageLinks(response, '?', 'page'),
      status: response.status || 200,
    };
  }

  async list(domainName: string): Promise<DomainKeysListResult> {
    const res = await this.request.get(urljoin('v4/domains/', domainName, '/keys'));
    return { ...this._parseDomainKeysList(res.body), status: res.status };
  }

  async listAll(query?: DomainKeysListAllQuery): Promise<DomainKeysListAllResult> {
    // Suggested way of filtering in the docs using the FormData can't be used
    // since body is not allowed in GET requests.
    // Omitting the limit and page for now.
    const preparedQuery = {
      ...(query?.signingDomain
        ? { signing_domain: encodeURIComponent(query.signingDomain) }
        : {}
      ),
      ...(query?.selector ? { selector: encodeURIComponent(query.selector) } : {}),
      page: '',
      limit: ''
    };
    const res = await this.requestListWithPages(
      urljoin('/v1/dkim/keys'),
      preparedQuery
    );
    return res;
  }

  async create(
    data: DomainKeyCreateData
  ): Promise<DomainKeyCreateDataResult> {
    const preparedData: DomainKeyCreateDataApi = {
      signing_domain: data.signingDomain,
      selector: data.selector,
    };

    if (data.bits) {
      preparedData.bits = data.bits;
    }
    if (data.pem) {
      preparedData.pem = data.pem;
    }

    const res = await this.request.postWithFD(urljoin('v1/dkim/keys'), preparedData);
    return {
      status: res.status,
      ...res.body
    };
  }

  async activate(domainName: string, selector: string): Promise<ActivateDomainKeyResponse> {
    const res = await this.request.put(`/v4/domains/${domainName}/keys/${selector}/activate`);
    return { ...res.body, status: res.status };
  }

  async deactivate(domainName: string, selector: string): Promise<DeactivateDomainKeyResponse> {
    const res = await this.request.put(`/v4/domains/${domainName}/keys/${selector}/deactivate`);
    return { ...res.body, status: res.status };
  }

  async destroy(
    domain: string,
    selector: string
  ): Promise<DeletedDomainKeysResult> {
    const res = await this.request.delete(urljoin('v1/dkim/keys'), undefined, { signing_domain: domain, selector });
    return res.body as DeletedDomainKeysResult;
  }

  async updateDKIMSelector(
    domain: string,
    data: DKIMSelectorInfo
  ): Promise<UpdatedDKIMSelectorResult> {
    const options: PutOptionsType = { query: `dkim_selector=${data.dkimSelector}` };
    const res: UpdatedDKIMSelectorResponse = await this.request.put(`/v3/domains/${domain}/dkim_selector`, {}, options);

    return {
      status: res.status,
      message: res?.body?.message
    };
  }

  async updateDKIMAuthority(domain: string, data: DKIMAuthorityInfo)
  : Promise<UpdatedDKIMAuthority> {
    const options: PutOptionsType = { query: `self=${data.self}` };
    return this.request.put(`/v3/domains/${domain}/dkim_authority`, {}, options)
      .then((res : APIResponse) => res as UpdatedDKIMAuthorityResponse)
      .then((res : UpdatedDKIMAuthorityResponse) => res.body as UpdatedDKIMAuthority);
  }
}
