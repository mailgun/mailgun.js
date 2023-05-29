import { IDomainCredentials } from '../../Interfaces/Domains';
import { DomainCredentialsList, DomainCredentialsResult, DomainCredentialsQuery, DomainCredentials, UpdateDomainCredentialsData } from '../../Types/Domains';
import Request from '../common/Request';
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
