export type ValidationQuery = {
    address: string;
};
export interface ValidationResult {
    address: string;
    is_disposable_address: boolean;
    is_role_address: boolean;
    reason: string[];
    result: string;
    risk: string;
}
export interface ValidationResponse {
    status: number;
    body: ValidationResult;
}
