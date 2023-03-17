import { Resolution } from '../../Enums';
import { PagesList, ParsedPagesList } from '../Common';
export declare type DomainTagsQuery = {
    limit: number;
    page?: string;
};
export declare type DomainTagsStatisticQuery = {
    event: string;
    start?: number;
    end?: number;
    resolution?: Resolution;
    duration?: string;
};
export declare type DomainTagsItemInfo = {
    tag: string;
    description: string;
    'first-seen': string;
    'last-seen': string;
};
export declare type DomainTagsItem = {
    tag: string;
    description: string;
    'first-seen': Date;
    'last-seen': Date;
};
export declare type DomainTagsResponseData = {
    status: number;
    body: {
        items: DomainTagsItemInfo[];
        paging: PagesList;
    };
};
export declare type DomainTagsList = {
    status: number;
    items: DomainTagsItem[];
    pages: ParsedPagesList;
};
export declare type DomainTagsMessageRes = {
    message: string;
    status?: number;
};
export declare type DomainTagAPIResponseStatsItem = {
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
};
export declare type DomainTagStatAPIResponse = {
    body: {
        tag: string;
        description: string;
        start: string;
        end: string;
        resolution: Resolution;
        stats: DomainTagAPIResponseStatsItem[];
    };
};
export declare type DomainTagStatisticItem = Omit<DomainTagAPIResponseStatsItem, 'time'> & {
    time: Date;
};
export declare type DomainTagCountriesAPIResponse = {
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
};
export declare type DomainTagCountriesAggregation = {
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
export declare type DomainTagProvidersAPIResponse = {
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
};
export declare type DomainTagProvidersAggregation = {
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
export declare type DeviceStatistic = {
    clicked: number;
    complained: number;
    opened: number;
    unique_clicked: number;
    unique_opened: number;
    unsubscribed: number;
};
export declare type DevicesTypes = {
    desktop: DeviceStatistic;
    mobile: DeviceStatistic;
    tablet: DeviceStatistic;
    unknown: DeviceStatistic;
};
export declare type DomainTagDevicesAPIResponse = {
    body: {
        tag: string;
        device: DevicesTypes;
    };
    status: number;
};
export declare type DomainTagDevicesAggregation = {
    tag: string;
    device: DevicesTypes;
};
