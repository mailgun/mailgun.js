export type DomainCredentialsQuery = {
    limit: number;
    skip: number;
};
export type DomainCredentials = {
    login: string;
    password: string;
};
export type DomainCredentialsItem = {
    created_at: string;
    login: string;
    mailbox: string;
    size_bytes: number | null;
};
export type DomainCredentialsResponseData = {
    status: number;
    body: {
        items: DomainCredentialsItem[];
        total_count: number;
    };
};
export type DomainCredentialsList = {
    items: DomainCredentialsItem[];
    totalCount: number;
};
export type DomainCredentialsResult = {
    status: number;
    message: string;
    spec?: string;
};
export type CreatedUpdatedDomainCredentialsResponse = {
    status: number;
    body: {
        message: string;
    };
};
export type DeletedDomainCredentialsResponse = {
    status: number;
    body: {
        message: string;
        spec: string;
    };
};
export type UpdateDomainCredentialsData = {
    password: string;
};
