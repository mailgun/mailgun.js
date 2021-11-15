export interface DomainCredentialsQuery {
    limit: number;
    skip: number;
}
export interface DomainCredentials {
    login: string;
    password: string;
}
export interface DomainCredentialsItem {
    created_at: string;
    login: string;
    mailbox: string;
    size_bytes: number | null;
}
export interface DomainCredentialsResponseData {
    status: number;
    body: {
        items: DomainCredentialsItem[];
        total_count: number;
    };
}
export interface DomainCredentialsList {
    items: DomainCredentialsItem[];
    totalCount: number;
}
export interface CreatedUpdatedDomainCredentialsResponse {
    status: number;
    body: {
        message: string;
    };
}
export interface DeletedDomainCredentialsResponse {
    status: number;
    body: {
        message: string;
        spec: string;
    };
}
export interface UpdateDomainCredentialsData {
    password: string;
}
export interface IDomainCredentials {
    list(domain: string, query: DomainCredentialsQuery): Promise<DomainCredentialsList>;
    create(domain: string, data: DomainCredentials): Promise<CreatedUpdatedDomainCredentialsResponse>;
    update(domain: string, credentialsLogin: string, data: UpdateDomainCredentialsData): Promise<CreatedUpdatedDomainCredentialsResponse>;
    destroy(domain: string, credentialsLogin: string): Promise<DeletedDomainCredentialsResponse>;
}
