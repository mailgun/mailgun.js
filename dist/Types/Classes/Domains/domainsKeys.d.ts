import { DKIMSelectorInfo, UpdatedDKIMSelectorResult, UpdatedDKIMAuthority, DKIMAuthorityInfo, DomainKeyCreateData, DomainKeyCreateDataResult, DomainKeysListResult, DomainKeysListAllQuery, DomainKeysListAllResult, DomainKeysListAllApi, DeletedDomainKeysResult, ActivateDomainKeyResponse, DeactivateDomainKeyResponse } from '../../Types/Domains/index.js';
import Request from '../common/Request.js';
import { IDomainKeysClient } from '../../Interfaces/Domains/index.js';
import NavigationThruPages from '../common/NavigationThruPages.js';
export default class DomainKeysClient extends NavigationThruPages<DomainKeysListAllResult> implements IDomainKeysClient {
    baseRoute: string;
    request: Request;
    constructor(request: Request);
    private _parseDomainKeysList;
    protected parseList(response: DomainKeysListAllApi): DomainKeysListAllResult;
    list(domainName: string): Promise<DomainKeysListResult>;
    listAll(query?: DomainKeysListAllQuery): Promise<DomainKeysListAllResult>;
    create(data: DomainKeyCreateData): Promise<DomainKeyCreateDataResult>;
    activate(domainName: string, selector: string): Promise<ActivateDomainKeyResponse>;
    deactivate(domainName: string, selector: string): Promise<DeactivateDomainKeyResponse>;
    destroy(domain: string, selector: string): Promise<DeletedDomainKeysResult>;
    updateDKIMSelector(domain: string, data: DKIMSelectorInfo): Promise<UpdatedDKIMSelectorResult>;
    updateDKIMAuthority(domain: string, data: DKIMAuthorityInfo): Promise<UpdatedDKIMAuthority>;
}
