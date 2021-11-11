export interface DomainCredentialsQuery {
    limit: number;
    skip: number;
}
export interface DomainCredentials {
    login: string;
    password: string;
}
export interface DomainCredentialsResponseData {
    status: number;
    body: {
        items: DomainCredentials[];
        total_count: number;
    };
}
export interface DomainCredentialsList {
    items: DomainCredentials[];
    totalCount: number;
}
export interface CreatedUpdatedDomainCredentialsResponse {
    message: string;
}
export interface DeletedDomainCredentialsResponse {
    message: string;
    spec: string;
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
