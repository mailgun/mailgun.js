export declare type DomainCredentialsQuery = {
    limit: number;
    skip: number;
};
export declare type DomainCredentials = {
    login: string;
    password: string;
};
export declare type DomainCredentialsItem = {
    created_at: string;
    login: string;
    mailbox: string;
    size_bytes: number | null;
};
export declare type DomainCredentialsResponseData = {
    status: number;
    body: {
        items: DomainCredentialsItem[];
        total_count: number;
    };
};
export declare type DomainCredentialsList = {
    items: DomainCredentialsItem[];
    totalCount: number;
};
export declare type DomainCredentialsResult = {
    status: number;
    message: string;
    spec?: string;
};
export declare type CreatedUpdatedDomainCredentialsResponse = {
    status: number;
    body: {
        message: string;
    };
};
export declare type DeletedDomainCredentialsResponse = {
    status: number;
    body: {
        message: string;
        spec: string;
    };
};
export declare type UpdateDomainCredentialsData = {
    password: string;
};
