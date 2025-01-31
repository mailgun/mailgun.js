export type InboxPlacementsProviderAPIShape = {
    domain: string;
    display_name: string;
    region: string;
    created_at: string;
    updated_at: string;
    max_email_count?: number;
    unsupported_authentications?: object;
};
export type InboxPlacementsProvider = Omit<InboxPlacementsProviderAPIShape, 'created_at' | 'updated_at'> & {
    created_at: Date;
    updated_at: Date;
};
export type InboxPlacementsProvidersListAPIResponse = {
    body: {
        items: InboxPlacementsProviderAPIShape[];
    };
    status: number;
};
export type InboxPlacementsProvidersList = {
    items: InboxPlacementsProvider[];
    status: number;
};
