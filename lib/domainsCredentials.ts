import urljoin from 'url-join';
import APIResponse from './interfaces/ApiResponse';
import Request from './request';

import {
  CreatedUpdatedDomainCredentialsResponse,
  DeletedDomainCredentialsResponse,
  DomainCredentials,
  DomainCredentialsList,
  DomainCredentialsQuery,
  DomainCredentialsResponseData,
  IDomainCredentials,
  UpdateDomainCredentialsData
} from './interfaces/DomainCredentials';

export default class DomainCredentialsClient implements IDomainCredentials {
  baseRoute: string;
  request: Request;

  constructor(request: Request) {
    this.request = request;
    this.baseRoute = '/v3/domains/';
  }

  _parseDomainCredentialsList(response: DomainCredentialsResponseData): DomainCredentialsList {
    return {
      items: response.body.items,
      totalCount: response.body.total_count
    };
  }

  list(domain: string, query?: DomainCredentialsQuery): Promise<DomainCredentialsList> {
    return this.request.get(urljoin(this.baseRoute, domain, '/credentials'), query)
      .then(
        (res: APIResponse) => this._parseDomainCredentialsList(res as DomainCredentialsResponseData)
      );
  }

  create(
    domain: string,
    data: DomainCredentials
  ): Promise<CreatedUpdatedDomainCredentialsResponse> {
    return this.request.postWithFD(`${this.baseRoute}${domain}/credentials`, data)
      .then((res: APIResponse) => res as CreatedUpdatedDomainCredentialsResponse);
  }

  update(
    domain: string,
    credentialsLogin: string,
    data: UpdateDomainCredentialsData
  ): Promise<CreatedUpdatedDomainCredentialsResponse> {
    return this.request.putWithFD(`${this.baseRoute}${domain}/credentials/${credentialsLogin}`, data)
      .then((res: APIResponse) => res as CreatedUpdatedDomainCredentialsResponse);
  }

  destroy(
    domain: string,
    credentialsLogin: string
  ): Promise<DeletedDomainCredentialsResponse> {
    return this.request.delete(`${this.baseRoute}${domain}/credentials/${credentialsLogin}`)
      .then((res: APIResponse) => res as DeletedDomainCredentialsResponse);
  }
}
