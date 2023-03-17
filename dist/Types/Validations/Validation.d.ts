export declare type ValidationQuery = {
    address: string;
};
export declare type ValidationResult = {
    address: string;
    is_disposable_address: boolean;
    is_role_address: boolean;
    reason: string[];
    result: string;
    risk: string;
};
export declare type ValidationResponse = {
    status: number;
    body: ValidationResult;
};
