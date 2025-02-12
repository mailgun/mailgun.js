import type { BounceData, ComplaintData, UnsubscribeData, WhiteListData } from './index.js';
import type { IBounce, IComplaint, IUnsubscribe, IWhiteList } from '../../Interfaces/index.js';
import { PagesList, ParsedPagesList } from '../Common/index.js';
export type SuppressionList = {
    items: (IBounce | IComplaint | IUnsubscribe | IWhiteList)[];
    pages: ParsedPagesList;
    status: number;
};
export type SuppressionListQuery = {
    limit?: number;
    page?: string;
};
export type SuppressionDataType = BounceData | ComplaintData | UnsubscribeData | WhiteListData;
export type SuppressionListResponse = {
    body: {
        items: BounceData[] | ComplaintData[] | UnsubscribeData[] | WhiteListData[];
        paging: PagesList;
    };
    status: number;
};
export type SuppressionResponse = {
    body: SuppressionDataType;
    status: number;
};
export type SuppressionDestroyResponse = {
    body: {
        message: string;
        value?: string;
        address?: string;
    };
    status: number;
};
export type SuppressionDestroyResult = {
    message: string;
    value: string;
    address: string;
    status: number;
};
export type SuppressionCreationData = {
    address: string;
    code?: number;
    error?: string;
    domain?: string;
    tag?: string;
    created_at?: string;
    tags?: string[];
};
export type SuppressionCreationResponse = {
    body: {
        message: string;
        type?: string;
        value?: string;
    };
    status: number;
};
export type SuppressionCreationResult = {
    message: string;
    type: string;
    value: string;
    status: number;
};
