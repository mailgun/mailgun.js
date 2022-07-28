export interface BounceData {
    address: string;
    code: number;
    error: string;
    created_at: string | Date;
}
export interface IBounce {
    address: string;
    code: number;
    error: string;
    created_at: Date;
    type: string;
}
