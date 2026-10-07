import { UserRoles } from '../../Enums/index.js';
export type UsersListQuery = {
    role?: UserRoles;
    limit?: number;
    skip?: number;
};
export type UserResponse = {
    id: string;
    activated: boolean;
    name: string;
    'is_disabled': boolean;
    email: string;
    'email_details': {
        address: string;
        'is_valid': boolean;
        reason?: string;
        parts: {
            'local_part': string;
            domain: string;
            'display_name'?: string;
        };
    };
    role: UserRoles;
    'account_id': string;
    'opened_ip'?: string;
    'is_master': boolean;
    metadata: Record<string, string>;
    'tfa_enabled': boolean;
    'tfa_active': boolean;
    'tfa_created_at': string | null;
    'password_updated_at': string | null;
    preferences: {
        'programming_language': string;
        'time_format': string;
        'time_zone': string;
    };
    auth: {
        method: string;
        'prior_method'?: string;
        'prior_details': Record<string, string>;
    };
    'github_user_id': string | null;
    'salesforce_user_id': string | null;
    'migration_status': string;
};
export type UsersListResponse = {
    status: number;
    body: {
        users: UserResponse[];
        total: number;
    };
};
export type UserResult = Omit<UserResponse, 'tfa_created_at' | 'password_updated_at'> & {
    tfa_created_at: Date | null;
    password_updated_at: Date | null;
};
export type UserListResult = {
    status: number;
    users: UserResult[];
    total: number;
};
