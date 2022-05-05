import { Bounce, Complaint, Unsubscribe, WhiteList } from '../suppressions';
export interface BounceData {
    address: string;
    code: number;
    error: string;
    created_at: string | Date;
}
export interface ComplaintData {
    address: string;
    created_at: string | Date;
}
export interface UnsubscribeData {
    address: string;
    tags: any;
    created_at: string | Date;
}
export interface WhiteListData {
    type: string;
    value: string;
    reason: string;
    createdAt: string | Date;
}
export interface ParsedPage {
    id: string;
    page: string | null | undefined;
    address: string | null | undefined;
    url: string;
}
export interface ParsedPagesList {
    previous: ParsedPage;
    first: ParsedPage;
    last: ParsedPage;
    next: ParsedPage;
}
export interface SuppressionList {
    items: (Bounce | Complaint | Unsubscribe | WhiteList)[];
    pages: ParsedPagesList;
}
export interface PagesList {
    previous: string;
    first: string;
    last: string;
    next: string;
}
export declare enum SuppressionModels {
    BOUNCES = "bounces",
    COMPLAINTS = "complaints",
    UNSUBSCRIBES = "unsubscribes",
    WHITELISTS = "whitelists"
}
export interface PagesListAccumulator {
    [index: string]: ParsedPage;
}
export declare type SuppressionListQuery = {
    limit?: number;
};
export interface SuppressionListResponse {
    body: {
        items: BounceData[] | ComplaintData[] | UnsubscribeData[] | WhiteListData[];
        paging: PagesList;
    };
    status: number;
}
export interface SuppressionResponse {
    body: BounceData | ComplaintData | UnsubscribeData | WhiteListData;
    status: number;
}
export interface SuppressionDestroyResponse {
    body: {
        message: string;
        value?: string;
        address?: string;
    };
    status: number;
}
export interface SuppressionDestroyResult {
    message: string;
    value: string;
    address: string;
    status: number;
}
export declare type SuppressionCreationData = {
    address: string;
    code?: number;
    error?: string;
    domain?: string;
    tag?: string;
    created_at?: string;
};
export interface SuppressionCreationResponse {
    body: {
        message: string;
        type?: string;
        value?: string;
    };
    status: number;
}
export interface SuppressionCreationResult {
    message: string;
    type: string;
    value: string;
    status: number;
}
