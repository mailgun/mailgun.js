import { MessageResponseWithStatus } from '../Common/ApiResponse.js';
export type APIKeysQuery = {
    domain_name?: string;
    kind?: 'domain' | 'user' | 'web';
};
export type APIKeyResponseData = {
    id: string;
    description: string;
    kind: 'domain' | 'user' | 'web';
    role: 'admin' | 'basic' | 'sending' | 'developer';
    created_at: string;
    updated_at: string;
    expires_at?: string;
    disabled_reason?: string;
    is_disabled: boolean;
    domain_name: string | null;
    requestor: string | null;
    user_name: string | null;
};
export type APIKeysResponse = {
    total_count: number;
    items: APIKeyResponseData[];
};
export type APIKeyResultData = Omit<APIKeyResponseData, 'created_at' | 'updated_at' | 'expires_at'> & {
    created_at: Date;
    updated_at: Date;
    expires_at?: Date;
};
export type APIKeysResult = {
    status: number;
    totalCount: number;
    items: APIKeyResultData[];
};
export type APIKeyData = {
    domain_name?: string;
    kind?: 'domain' | 'user' | 'web';
    description?: string;
    expiration?: string;
    role: string;
    user_id?: string;
    user_name?: string;
    email?: string;
};
export type RegeneratePublicKeyResult = MessageResponseWithStatus & {
    key: string;
};
