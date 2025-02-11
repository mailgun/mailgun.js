import { YesNo } from '../../Enums';
import { IDomainTemplate } from '../../Interfaces/Domains';
import { PagesList, ParsedPagesList } from '../Common';
export type DomainTemplateData = {
    name: string;
    description: string;
    template: string;
    tag?: string;
    engine?: string;
    comment?: string;
};
export type DomainTemplateVersionData = {
    template: string;
    tag: string;
    engine?: string;
    comment?: string;
    active?: YesNo;
};
export type DomainTemplateUpdateData = {
    description: string;
};
export type DomainTemplateUpdateVersionData = {
    template?: string;
    comment?: string;
    active?: YesNo;
};
export type DomainTemplatesQuery = {
    /** 'page' (optionally 'p') params from previous response's 'paging' object.
     * Value must be stringified as query params. Ex: '?page=first','?page=next&p=name-of-last-item'
     .... */
    page?: `?${string}`;
    /** Number of records to retrieve. Default value is 10. */
    limit?: number;
};
export type TemplateQuery = {
    active: YesNo;
};
export type ShortTemplateVersion = {
    tag: string;
    engine: string;
    mjml: string;
    createdAt: string | Date;
    comment: string;
    active: boolean;
    id: string;
};
export type TemplateVersion = ShortTemplateVersion & {
    template: string;
};
export type CreateDomainTemplateAPIResponse = {
    status: number;
    body: {
        message: string;
        template: IDomainTemplate;
    };
};
export type ListDomainTemplatesAPIResponse = {
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
export type ListDomainTemplatesResult = {
    items: IDomainTemplate[];
    pages: ParsedPagesList;
    status: number;
};
export type GetDomainTemplateAPIResponse = {
    status: number;
    body: {
        template: IDomainTemplate;
    };
};
export type UpdateOrDeleteDomainTemplateAPIResponse = {
    status: number;
    body: {
        message: string;
        template: {
            name: string;
        };
    };
};
export type UpdateOrDeleteDomainTemplateResult = {
    status: number;
    message: string;
    templateName?: string;
};
export type NotificationAPIResponse = {
    status: number;
    body: {
        message: string;
    };
};
export type NotificationResult = {
    status: number;
    message: string;
};
export type CreateDomainTemplateVersionAPIResponse = {
    status: number;
    body: {
        message: string;
        template: IDomainTemplate;
    };
};
export type CreateDomainTemplateVersionResult = {
    status: number;
    message: string;
    template: IDomainTemplate;
};
export type MutateDomainTemplateVersionAPIResponse = {
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
export type MutateDomainTemplateVersionResult = {
    status: number;
    message: string;
    templateName: string;
    templateVersion: {
        tag: string;
    };
};
export type ListDomainTemplateVersionsAPIResponse = {
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
export type ListDomainTemplateVersionsResult = {
    template: IDomainTemplate;
    pages: ParsedPagesList;
};
