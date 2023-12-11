export type SubaccountsQuery = {
    enabled?: boolean;
    limit?: number;
    skip?: number;
    sort?: 'asc' | 'desc';
};
export type SubaccountListItem = {
    id: string;
    name: string;
    status: string;
};
export type SubaccountListResponseData = {
    subaccounts: SubaccountListItem[];
    total: number;
};
export type SubaccountResponseData = {
    subaccount: SubaccountListItem;
};
