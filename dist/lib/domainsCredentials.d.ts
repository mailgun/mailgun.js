import Request from './request';
import { CreatedUpdatedDomainCredentialsResponse, DeletedDomainCredentialsResponse, DomainCredentials, DomainCredentialsList, DomainCredentialsQuery, DomainCredentialsResponseData, IDomainCredentials, UpdateDomainCredentialsData } from './interfaces/DomainCredentials';
export default class DomainCredentialsClient implements IDomainCredentials {
    baseRoute: string;
    request: Request;
    constructor(request: Request);
    _parseDomainCredentialsList(response: DomainCredentialsResponseData): DomainCredentialsList;
    list(domain: string, query: DomainCredentialsQuery): Promise<DomainCredentialsList>;
    create(domain: string, data: DomainCredentials): Promise<CreatedUpdatedDomainCredentialsResponse>;
    update(domain: string, credentialsLogin: string, data: UpdateDomainCredentialsData): Promise<CreatedUpdatedDomainCredentialsResponse>;
    destroy(domain: string, credentialsLogin: string): Promise<DeletedDomainCredentialsResponse>;
}
