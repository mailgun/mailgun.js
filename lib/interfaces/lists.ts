export interface ListsQuery {
    address?: string;
    limit?: number;
    skip?: number;
}

export interface CreateUpdateList {
    address: string;
    name?: string;
    description?: string;
    access_level?: 'read-only' | 'members'| 'everyone';
    reply_preference?: 'list' | 'sender';
}

export interface DestroyedList {
    address: string;
    message: string;
}

export interface MailingList {
    access_level: string;
    address: string;
    created_at: string;
    description: string;
    members_count: number;
    name: string;
    reply_preference: null | string;
}
