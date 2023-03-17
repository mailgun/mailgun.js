import { DomainTemplateItem } from '../../Classes/Domains/domainsTemplates';
import { YesNo } from '../../Enums';
import { IDomainTemplate } from '../../Interfaces/Domains';
import { PagesList, ParsedPagesList } from '../Common';
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
export declare type ShortTemplateVersion = {
    tag: string;
    engine: string;
    mjml: string;
    createdAt: string | Date;
    comment: string;
    active: boolean;
    id: string;
};
export declare type TemplateVersion = ShortTemplateVersion & {
    template: string;
};
export declare type CreateDomainTemplateAPIResponse = {
    status: number;
    body: {
        message: string;
        template: IDomainTemplate;
    };
};
export declare type ListDomainTemplatesAPIResponse = {
    status: number;
    body: {
        items: IDomainTemplate[];
        paging: {
            first: string;
            last: string;
            next: string;
            previous: string;
        };
    };
};
export declare type ListDomainTemplatesResult = {
    items: IDomainTemplate[];
    pages: ParsedPagesList;
    status: number;
};
export declare type GetDomainTemplateAPIResponse = {
    status: number;
    body: {
        template: IDomainTemplate;
    };
};
export declare type UpdateOrDeleteDomainTemplateAPIResponse = {
    status: number;
    body: {
        message: string;
        template: {
            name: string;
        };
    };
};
export declare type UpdateOrDeleteDomainTemplateResult = {
    status: number;
    message: string;
    templateName?: string;
};
export declare type NotificationAPIResponse = {
    status: number;
    body: {
        message: string;
    };
};
export declare type NotificationResult = {
    status: number;
    message: string;
};
export declare type CreateDomainTemplateVersionAPIResponse = {
    status: number;
    body: {
        message: string;
        template: IDomainTemplate;
    };
};
export declare type CreateDomainTemplateVersionResult = {
    status: number;
    message: string;
    template: IDomainTemplate;
};
export declare type MutateDomainTemplateVersionAPIResponse = {
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
};
export declare type MutateDomainTemplateVersionResult = {
    status: number;
    message: string;
    templateName: string;
    templateVersion: {
        tag: string;
    };
};
export declare type ListDomainTemplateVersionsAPIResponse = {
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
};
export declare type ListDomainTemplateVersionsResult = {
    template: DomainTemplateItem;
    pages: ParsedPagesList;
};
