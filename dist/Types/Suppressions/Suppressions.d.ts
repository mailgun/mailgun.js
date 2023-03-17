import Bounce from '../../Classes/Suppressions/Bounce';
import Complaint from '../../Classes/Suppressions/Complaint';
import Unsubscribe from '../../Classes/Suppressions/Unsubscribe';
import WhiteList from '../../Classes/Suppressions/WhiteList';
import { BounceData, ComplaintData, UnsubscribeData, WhiteListData } from '.';
import { PagesList, ParsedPagesList } from '../Common';
export declare type SuppressionList = {
    items: (Bounce | Complaint | Unsubscribe | WhiteList)[];
    pages: ParsedPagesList;
    status: number;
};
export declare type SuppressionListQuery = {
    limit?: number;
    page?: string;
};
export declare type SuppressionDataType = BounceData | ComplaintData | UnsubscribeData | WhiteListData;
export declare type SuppressionListResponse = {
    body: {
        items: BounceData[] | ComplaintData[] | UnsubscribeData[] | WhiteListData[];
        paging: PagesList;
    };
    status: number;
};
export declare type SuppressionResponse = {
    body: SuppressionDataType;
    status: number;
};
export declare type SuppressionDestroyResponse = {
    body: {
        message: string;
        value?: string;
        address?: string;
    };
    status: number;
};
export declare type SuppressionDestroyResult = {
    message: string;
    value: string;
    address: string;
    status: number;
};
export declare type SuppressionCreationData = {
    address: string;
    code?: number;
    error?: string;
    domain?: string;
    tag?: string;
    created_at?: string;
};
export declare type SuppressionCreationResponse = {
    body: {
        message: string;
        type?: string;
        value?: string;
    };
    status: number;
};
export declare type SuppressionCreationResult = {
    message: string;
    type: string;
    value: string;
    status: number;
};
