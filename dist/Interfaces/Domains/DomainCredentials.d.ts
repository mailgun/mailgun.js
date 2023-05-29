import { DomainCredentials, DomainCredentialsList, DomainCredentialsQuery, DomainCredentialsResult, UpdateDomainCredentialsData } from '../../Types/Domains';
export interface IDomainCredentials {
    list(domain: string, query: DomainCredentialsQuery): Promise<DomainCredentialsList>;
    create(domain: string, data: DomainCredentials): Promise<DomainCredentialsResult>;
    update(domain: string, credentialsLogin: string, data: UpdateDomainCredentialsData): Promise<DomainCredentialsResult>;
    destroy(domain: string, credentialsLogin: string): Promise<DomainCredentialsResult>;
}
