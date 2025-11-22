export type SubaccountsQuery = {
    enabled?: boolean;
    limit?: number;
    skip?: number;
    sort?: 'asc' | 'desc';
};
export type SubaccountFeatureValue = {
    enabled: boolean;
};
export type SubaccountFeatures = {
    email_preview?: SubaccountFeatureValue;
    inbox_placement?: SubaccountFeatureValue;
    sending?: SubaccountFeatureValue;
    validations?: SubaccountFeatureValue;
    validations_bulk?: SubaccountFeatureValue;
};
export type SubaccountFeaturesResult = {
    features: SubaccountFeatures;
};
export type SubaccountFeaturesData = {
    email_preview?: boolean;
    inbox_placement?: boolean;
    sending?: boolean;
    validations?: boolean;
    validations_bulk?: boolean;
};
export type SubaccountApiItem = {
    id: string;
    name: string;
    status: string;
    created_at: string;
    updated_at: string;
    features: SubaccountFeatures;
};
export type SubaccountItem = Omit<SubaccountApiItem, 'created_at' | 'updated_at'> & {
    created_at: Date;
    updated_at: Date;
};
export type SubaccountListAPIResponseData = {
    body: {
        subaccounts: SubaccountApiItem[];
        total: number;
    };
};
export type SubaccountListResponseData = {
    subaccounts: SubaccountItem[];
    total: number;
};
export type SubaccountAPIResponseData = {
    body: {
        subaccount: SubaccountApiItem;
    };
};
export type SubaccountResponseData = {
    subaccount: SubaccountItem;
};
export type SubaccountSendingLimitResponse = {
    limit: number;
    current: number;
    period: string;
};
export type SubaccountSetSendingLimitResponse = {
    success: boolean;
};
export type SubaccountDestroyResponse = {
    message: string;
};
