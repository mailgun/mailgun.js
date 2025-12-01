import type { ActivateDomainKeyResponse, DeactivateDomainKeyResponse, DeletedDomainKeysResult, DKIMAuthorityInfo, DKIMSelectorInfo, DomainKeyCreateData, DomainKeyCreateDataResult, DomainKeysListAllQuery, DomainKeysListAllResult, DomainKeysListResult, UpdatedDKIMAuthority, UpdatedDKIMSelectorResult } from '../../Types/Domains/index.js';
export interface IDomainKeysClient {
    list(domainName: string): Promise<DomainKeysListResult>;
    listAll(query: DomainKeysListAllQuery): Promise<DomainKeysListAllResult>;
    create(data: DomainKeyCreateData): Promise<DomainKeyCreateDataResult>;
    destroy(domain: string, selector: string): Promise<DeletedDomainKeysResult>;
    activate(domainName: string, selector: string): Promise<ActivateDomainKeyResponse>;
    deactivate(domainName: string, selector: string): Promise<DeactivateDomainKeyResponse>;
    updateDKIMAuthority(domain: string, data: DKIMAuthorityInfo): Promise<UpdatedDKIMAuthority>;
    updateDKIMSelector(domain: string, data: DKIMSelectorInfo): Promise<UpdatedDKIMSelectorResult>;
}
