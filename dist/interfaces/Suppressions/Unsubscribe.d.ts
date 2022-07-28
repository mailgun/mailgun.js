export interface UnsubscribeData {
    address: string;
    tags: any;
    created_at: string | Date;
}
export interface IUnsubscribe {
    address: string;
    tags: any;
    created_at: Date;
    type: string;
}
