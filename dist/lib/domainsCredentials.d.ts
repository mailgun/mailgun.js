import Request from './request';
import { DomainCredentials, DomainCredentialsList, DomainCredentialsQuery, DomainCredentialsResult, IDomainCredentials, UpdateDomainCredentialsData } from './interfaces/DomainCredentials';
export default class DomainCredentialsClient implements IDomainCredentials {
    baseRoute: string;
    request: Request;
    constructor(request: Request);
    private _parseDomainCredentialsList;
    private _parseMessageResponse;
    private _parseDeletedResponse;
    list(domain: string, query?: DomainCredentialsQuery): Promise<DomainCredentialsList>;
    create(domain: string, data: DomainCredentials): Promise<DomainCredentialsResult>;
    update(domain: string, credentialsLogin: string, data: UpdateDomainCredentialsData): Promise<DomainCredentialsResult>;
    destroy(domain: string, credentialsLogin: string): Promise<DomainCredentialsResult>;
}
