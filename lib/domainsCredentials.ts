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
  DomainCredentialsResult,
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

  private _parseDomainCredentialsList(
    response: DomainCredentialsResponseData
  ): DomainCredentialsList {
    return {
      items: response.body.items,
      totalCount: response.body.total_count
    };
  }

  private _parseMessageResponse(
    response: CreatedUpdatedDomainCredentialsResponse
  ): DomainCredentialsResult {
    const result = {
      status: response.status,
      message: response.body.message
    } as DomainCredentialsResult;
    return result;
  }

  private _parseDeletedResponse(
    response:DeletedDomainCredentialsResponse
  ): DomainCredentialsResult {
    const result = {
      status: response.status,
      message: response.body.message,
      spec: response.body.spec
    } as DomainCredentialsResult;

    return result;
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
  ): Promise<DomainCredentialsResult> {
    return this.request.postWithFD(`${this.baseRoute}${domain}/credentials`, data)
      .then((res: APIResponse) => this._parseMessageResponse(res));
  }

  update(
    domain: string,
    credentialsLogin: string,
    data: UpdateDomainCredentialsData
  ): Promise<DomainCredentialsResult> {
    return this.request.putWithFD(`${this.baseRoute}${domain}/credentials/${credentialsLogin}`, data)
      .then((res: APIResponse) => this._parseMessageResponse(res));
  }

  destroy(
    domain: string,
    credentialsLogin: string
  ): Promise<DomainCredentialsResult> {
    return this.request.delete(`${this.baseRoute}${domain}/credentials/${credentialsLogin}`)
      .then((res: APIResponse) => this._parseDeletedResponse(res));
  }
}
