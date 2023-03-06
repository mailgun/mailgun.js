import Request from './request';
import { CreateDomainTemplateVersionResult, DomainTemplate, DomainTemplateData, DomainTemplatesQuery, DomainTemplateUpdateData, DomainTemplateUpdateVersionData, DomainTemplateVersionData, IDomainTemplatesClient, ListDomainTemplatesAPIResponse, ListDomainTemplatesResult, ListDomainTemplateVersionsResult, MutateDomainTemplateVersionResult, NotificationResult, ShortTemplateVersion, TemplateQuery, TemplateVersion, UpdateOrDeleteDomainTemplateResult } from './interfaces/DomainTemplates';
import NavigationThruPages from './common/NavigationThruPages';
export declare class DomainTemplateItem implements DomainTemplate {
    name: string;
    description: string;
    createdAt: Date | '';
    createdBy: string;
    id: string;
    version?: TemplateVersion;
    versions?: ShortTemplateVersion[];
    constructor(domainTemplateFromAPI: DomainTemplate);
}
export default class DomainTemplatesClient extends NavigationThruPages<ListDomainTemplatesResult> implements IDomainTemplatesClient {
    baseRoute: string;
    request: Request;
    constructor(request: Request);
    private parseCreationResponse;
    private parseCreationVersionResponse;
    private parseMutationResponse;
    private parseNotificationResponse;
    private parseMutateTemplateVersionResponse;
    protected parseList(response: ListDomainTemplatesAPIResponse): ListDomainTemplatesResult;
    private parseListTemplateVersions;
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
