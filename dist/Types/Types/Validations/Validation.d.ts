export type ValidationQuery = {
    address: string;
};
export type ValidationResult = {
    address: string;
    is_disposable_address: boolean;
    is_role_address: boolean;
    reason: string[];
    result: string;
    risk: string;
};
export type ValidationResponse = {
    status: number;
    body: ValidationResult;
};
