import type { CreateDomainTemplateVersionResult, DomainTemplateData, DomainTemplatesQuery, DomainTemplateUpdateData, DomainTemplateUpdateVersionData, DomainTemplateVersionData, ListDomainTemplatesResult, ListDomainTemplateVersionsResult, MutateDomainTemplateVersionResult, NotificationResult, ShortTemplateVersion, TemplateQuery, TemplateVersion, UpdateOrDeleteDomainTemplateResult } from '../../Types/Domains/index.js';
export interface IDomainTemplate {
    name: string;
    description: string;
    createdAt: string | Date;
    createdBy: string;
    id: string;
    version?: TemplateVersion;
    versions?: ShortTemplateVersion[];
}
export interface IDomainTemplatesClient {
    list(domain: string, query?: DomainTemplatesQuery): Promise<ListDomainTemplatesResult>;
    get(domain: string, templateName: string, query?: TemplateQuery): Promise<IDomainTemplate>;
    create(domain: string, data: DomainTemplateData): Promise<IDomainTemplate>;
    update(domain: string, templateName: string, data: DomainTemplateUpdateData): Promise<UpdateOrDeleteDomainTemplateResult>;
    destroy(domain: string, templateName: string): Promise<UpdateOrDeleteDomainTemplateResult>;
    destroyAll(domain: string): Promise<NotificationResult>;
    createVersion(domain: string, templateName: string, data: DomainTemplateVersionData): Promise<CreateDomainTemplateVersionResult>;
    getVersion(domain: string, templateName: string, tag: string): Promise<IDomainTemplate>;
    updateVersion(domain: string, templateName: string, tag: string, data: DomainTemplateUpdateVersionData): Promise<MutateDomainTemplateVersionResult>;
    destroyVersion(domain: string, templateName: string, tag: string): Promise<MutateDomainTemplateVersionResult>;
    listVersions(domain: string, templateName: string, query?: DomainTemplatesQuery): Promise<ListDomainTemplateVersionsResult>;
}
