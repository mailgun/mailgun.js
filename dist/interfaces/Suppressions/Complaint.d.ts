export interface ComplaintData {
    address: string;
    created_at: string | Date;
}
export interface IComplaint {
    address: string;
    created_at: Date;
    type: string;
}
