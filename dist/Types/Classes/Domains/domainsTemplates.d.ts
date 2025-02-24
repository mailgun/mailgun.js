import Request from '../common/Request.js';
import { CreateDomainTemplateVersionResult, DomainTemplateData, DomainTemplatesQuery, DomainTemplateUpdateData, DomainTemplateUpdateVersionData, DomainTemplateVersionData, ListDomainTemplatesAPIResponse, ListDomainTemplatesResult, ListDomainTemplateVersionsResult, MutateDomainTemplateVersionResult, NotificationResult, ShortTemplateVersion, TemplateQuery, TemplateVersion, UpdateOrDeleteDomainTemplateResult } from '../../Types/Domains/index.js';
import NavigationThruPages from '../common/NavigationThruPages.js';
import { IDomainTemplate, IDomainTemplatesClient } from '../../Interfaces/Domains/index.js';
export declare class DomainTemplateItem implements IDomainTemplate {
    name: string;
    description: string;
    createdAt: Date | '';
    createdBy: string;
    id: string;
    version?: TemplateVersion;
    versions?: ShortTemplateVersion[];
    constructor(domainTemplateFromAPI: IDomainTemplate);
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
    get(domain: string, templateName: string, query?: TemplateQuery): Promise<IDomainTemplate>;
    create(domain: string, data: DomainTemplateData): Promise<IDomainTemplate>;
    update(domain: string, templateName: string, data: DomainTemplateUpdateData): Promise<UpdateOrDeleteDomainTemplateResult>;
    destroy(domain: string, templateName: string): Promise<UpdateOrDeleteDomainTemplateResult>;
    destroyAll(domain: string): Promise<NotificationResult>;
    listVersions(domain: string, templateName: string, query?: DomainTemplatesQuery): Promise<ListDomainTemplateVersionsResult>;
    getVersion(domain: string, templateName: string, tag: string): Promise<IDomainTemplate>;
    createVersion(domain: string, templateName: string, data: DomainTemplateVersionData): Promise<CreateDomainTemplateVersionResult>;
    updateVersion(domain: string, templateName: string, tag: string, data: DomainTemplateUpdateVersionData): Promise<MutateDomainTemplateVersionResult>;
    destroyVersion(domain: string, templateName: string, tag: string): Promise<MutateDomainTemplateVersionResult>;
}
