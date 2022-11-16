import { DomainTemplateItem } from '../domainsTemplates';
import { PagesList, ParsedPagesList } from './NavigationThruPages';
export declare enum YesNo {
    YES = "yes",
    NO = "no"
}
export declare type DomainTemplateData = {
    name: string;
    description: string;
    template: string;
    tag?: string;
    engine?: string;
    comment?: string;
};
export declare type DomainTemplateVersionData = {
    template: string;
    tag: string;
    engine?: string;
    comment?: string;
    active?: YesNo;
};
export declare type DomainTemplateUpdateData = {
    description: string;
};
export declare type DomainTemplateUpdateVersionData = {
    template?: string;
    comment?: string;
    active?: YesNo;
};
export declare type DomainTemplatesQuery = {
    /** 'page' (optionally 'p') params from previous response's 'paging' object.
     * Value must be stringified as query params. Ex: '?page=first','?page=next&p=name-of-last-item'
     .... */
    page?: `?${string}`;
    /** Number of records to retrieve. Default value is 10. */
    limit?: number;
};
export declare type TemplateQuery = {
    active: YesNo;
};
export interface ShortTemplateVersion {
    tag: string;
    engine: string;
    mjml: string;
    createdAt: string | Date;
    comment: string;
    active: boolean;
    id: string;
}
export interface TemplateVersion extends ShortTemplateVersion {
    template: string;
}
export interface DomainTemplate {
    name: string;
    description: string;
    createdAt: string | Date;
    createdBy: string;
    id: string;
    version?: TemplateVersion;
    versions?: ShortTemplateVersion[];
}
export interface CreateDomainTemplateAPIResponse {
    status: number;
    body: {
        message: string;
        template: DomainTemplate;
    };
}
export interface ListDomainTemplatesAPIResponse {
    status: number;
    body: {
        items: DomainTemplate[];
        paging: {
            first: string;
            last: string;
            next: string;
            previous: string;
        };
    };
}
export interface ListDomainTemplatesResult {
    items: DomainTemplate[];
    pages: ParsedPagesList;
    status: number;
}
export interface GetDomainTemplateAPIResponse {
    status: number;
    body: {
        template: DomainTemplate;
    };
}
export interface UpdateOrDeleteDomainTemplateAPIResponse {
    status: number;
    body: {
        message: string;
        template: {
            name: string;
        };
    };
}
export interface UpdateOrDeleteDomainTemplateResult {
    status: number;
    message: string;
    templateName?: string;
}
export interface NotificationAPIResponse {
    status: number;
    body: {
        message: string;
    };
}
export interface NotificationResult {
    status: number;
    message: string;
}
export interface CreateDomainTemplateVersionAPIResponse {
    status: number;
    body: {
        message: string;
        template: DomainTemplate;
    };
}
export interface CreateDomainTemplateVersionResult {
    status: number;
    message: string;
    template: DomainTemplate;
}
export interface MutateDomainTemplateVersionAPIResponse {
    status: number;
    body: {
        message: string;
        template: {
            name: string;
            version: {
                tag: string;
            };
        };
    };
}
export interface MutateDomainTemplateVersionResult {
    status: number;
    message: string;
    templateName: string;
    templateVersion: {
        tag: string;
    };
}
export interface ListDomainTemplateVersionsAPIResponse {
    status: number;
    body: {
        template: {
            name: string;
            description: string;
            createdAt: string;
            createdBy: string;
            id: string;
            versions: ShortTemplateVersion[];
        };
        paging: PagesList;
    };
}
export interface ListDomainTemplateVersionsResult {
    template: DomainTemplateItem;
    pages: ParsedPagesList;
}
export interface IDomainTemplatesClient {
    list(domain: string, query?: DomainTemplatesQuery): Promise<ListDomainTemplatesResult>;
    get(domain: string, templateName: string, query?: TemplateQuery): Promise<DomainTemplateItem>;
    create(domain: string, data: DomainTemplateData): Promise<DomainTemplateItem>;
    update(domain: string, templateName: string, data: DomainTemplateUpdateData): Promise<UpdateOrDeleteDomainTemplateResult>;
    destroy(domain: string, templateName: string): Promise<UpdateOrDeleteDomainTemplateResult>;
    destroyAll(domain: string): Promise<NotificationResult>;
    createVersion(domain: string, templateName: string, data: DomainTemplateVersionData): Promise<CreateDomainTemplateVersionResult>;
    getVersion(domain: string, templateName: string, tag: string): Promise<DomainTemplateItem>;
    updateVersion(domain: string, templateName: string, tag: string, data: DomainTemplateUpdateVersionData): Promise<MutateDomainTemplateVersionResult>;
    destroyVersion(domain: string, templateName: string, tag: string): Promise<MutateDomainTemplateVersionResult>;
    listVersions(domain: string, templateName: string, query?: DomainTemplatesQuery): Promise<ListDomainTemplateVersionsResult>;
}
