import { Bounce, Complaint, Unsubscribe, WhiteList } from '../../suppressions';
import { PagesList, ParsedPagesList } from '../NavigationThruPages';
import { BounceData } from './Bounce';
import { ComplaintData } from './Complaint';
import { UnsubscribeData } from './Unsubscribe';
import { WhiteListData } from './WhiteList';
export declare enum SuppressionModels {
    BOUNCES = "bounces",
    COMPLAINTS = "complaints",
    UNSUBSCRIBES = "unsubscribes",
    WHITELISTS = "whitelists"
}
export interface SuppressionList {
    items: (Bounce | Complaint | Unsubscribe | WhiteList)[];
    pages: ParsedPagesList;
    status: number;
}
export type SuppressionListQuery = {
    limit?: number;
    page?: string;
};
export type SuppressionDataType = BounceData | ComplaintData | UnsubscribeData | WhiteListData;
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
export type SuppressionCreationData = {
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
