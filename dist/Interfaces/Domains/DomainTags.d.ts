import { Resolution } from '../../Enums';
import { DomainTagCountriesAggregation, DomainTagDevicesAggregation, DomainTagProvidersAggregation, DomainTagsItem, DomainTagsList, DomainTagsMessageRes, DomainTagsStatisticQuery, DomainTagStatisticItem } from '../../Types/Domains';
export interface IDomainTagStatisticResult {
    tag: string;
    description: string;
    start: Date;
    end: Date;
    resolution: Resolution;
    stats: DomainTagStatisticItem[];
}
export interface IDomainTagsClient {
    list(domain: string): Promise<DomainTagsList>;
    get(domain: string, tag: string): Promise<DomainTagsItem>;
    update(domain: string, tag: string, description: string): Promise<DomainTagsMessageRes>;
    destroy(domain: string, tag: string): Promise<DomainTagsMessageRes>;
    statistic(domain: string, tag: string, query: DomainTagsStatisticQuery): Promise<IDomainTagStatisticResult>;
    countries(domain: string, tag: string): Promise<DomainTagCountriesAggregation>;
    providers(domain: string, tag: string): Promise<DomainTagProvidersAggregation>;
    devices(domain: string, tag: string): Promise<DomainTagDevicesAggregation>;
}
