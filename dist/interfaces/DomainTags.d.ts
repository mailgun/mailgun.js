import { DomainTagStatistic } from '../domainsTags';
export declare enum Resolution {
    HOUR = "hour",
    DAY = "day",
    MONTH = "month"
}
export declare type DomainTagsQuery = {
    limit: number;
};
export declare type DomainTagsStatisticQuery = {
    event: string;
    start?: number;
    end?: number;
    resolution?: Resolution;
    duration?: string;
};
export interface DomainTagsItemInfo {
    tag: string;
    description: string;
    'first-seen': string;
    'last-seen': string;
}
export interface DomainTagsItem {
    tag: string;
    description: string;
    'first-seen': Date;
    'last-seen': Date;
}
export interface PagesList {
    previous: string;
    first: string;
    last: string;
    next: string;
}
export interface ParsedPage {
    id: string;
    url: string;
}
export interface ParsedPagesList {
    previous: ParsedPage;
    first: ParsedPage;
    last: ParsedPage;
    next: ParsedPage;
}
export interface TagsPage {
    id: string;
    url: string;
}
export interface PagesListAccumulator {
    [index: string]: TagsPage;
}
export interface DomainTagsResponseData {
    status: number;
    body: {
        items: DomainTagsItemInfo[];
        paging: PagesList;
    };
}
export interface DomainTagsList {
    items: DomainTagsItem[];
    pages: ParsedPagesList;
}
export interface DomainTagsMessageRes {
    message: string;
    status?: number;
}
export interface DomainTagAPIResponseStatsItem {
    time: string;
    accepted?: {
        incoming: number;
        outgoing: number;
        total: number;
    };
    delivered?: {
        smtp: number;
        http: number;
        optimized: number;
        total: number;
    };
    opened?: {
        total: number;
    };
    failed?: {
        temporary: {
            espblock: number;
            total: number;
        };
        permanent: {
            'suppress-bounce': number;
            'suppress-unsubscribe': number;
            'suppress-complaint': number;
            bounce: number;
            'delayed-bounce': number;
            webhook: number;
            optimized: number;
            total: number;
        };
    };
    clicked?: {
        total: number;
    };
    unsubscribed?: {
        total: number;
    };
    complained?: {
        total: number;
    };
    stored?: {
        total: number;
    };
}
export interface DomainTagStatAPIResponse {
    body: {
        tag: string;
        description: string;
        start: string;
        end: string;
        resolution: Resolution;
        stats: DomainTagAPIResponseStatsItem[];
    };
}
export interface DomainTagStatisticItem extends Omit<DomainTagAPIResponseStatsItem, 'time'> {
    time: Date;
}
export interface DomainTagStatisticResult {
    tag: string;
    description: string;
    start: Date;
    end: Date;
    resolution: Resolution;
    stats: DomainTagStatisticItem[];
}
export interface DomainTagCountriesAPIResponse {
    body: {
        tag: string;
        country: {
            [key: string]: {
                clicked: number;
                complained: number;
                opened: number;
                unique_clicked: number;
                unique_opened: number;
                unsubscribed: number;
            };
        };
    };
}
export interface DomainTagCountriesAggregation {
    tag: string;
    country: {
        [key: string]: {
            clicked: number;
            complained: number;
            opened: number;
            unique_clicked: number;
            unique_opened: number;
            unsubscribed: number;
        };
    };
}
export interface DomainTagProvidersAPIResponse {
    body: {
        tag: string;
        provider: {
            [key: string]: {
                accepted: number;
                clicked: number;
                complained: number;
                delivered: number;
                opened: number;
                unique_clicked: number;
                unique_opened: number;
                unsubscribed: number;
            };
        };
    };
    status: number;
}
export interface DomainTagProvidersAggregation {
    tag: string;
    provider: {
        [key: string]: {
            accepted: number;
            clicked: number;
            complained: number;
            delivered: number;
            opened: number;
            unique_clicked: number;
            unique_opened: number;
            unsubscribed: number;
        };
    };
}
export interface DeviceStatistic {
    clicked: number;
    complained: number;
    opened: number;
    unique_clicked: number;
    unique_opened: number;
    unsubscribed: number;
}
export interface DevicesTypes {
    desktop: DeviceStatistic;
    mobile: DeviceStatistic;
    tablet: DeviceStatistic;
    unknown: DeviceStatistic;
}
export interface DomainTagDevicesAPIResponse {
    body: {
        tag: string;
        device: DevicesTypes;
    };
    status: number;
}
export interface DomainTagDevicesAggregation {
    tag: string;
    device: DevicesTypes;
}
export interface IDomainTagsClient {
    list(domain: string): Promise<DomainTagsList>;
    get(domain: string, tag: string): Promise<DomainTagsItem>;
    update(domain: string, tag: string, description: string): Promise<DomainTagsMessageRes>;
    destroy(domain: string, tag: string): Promise<DomainTagsMessageRes>;
    statistic(domain: string, tag: string, query: DomainTagsStatisticQuery): Promise<DomainTagStatistic>;
    countries(domain: string, tag: string): Promise<DomainTagCountriesAggregation>;
    providers(domain: string, tag: string): Promise<DomainTagProvidersAggregation>;
    devices(domain: string, tag: string): Promise<DomainTagDevicesAggregation>;
}
