import { PagesList, ParsedPagesList } from '../../Common';
export type SeedsListsAPIQueryDates = {
    time_after?: string;
    time_before?: string;
};
export type SeedAPIShape = {
    AccountID: string;
    id: string;
    token: string;
    email: string;
    provider: string;
    sync_state: string;
    local_state: string;
    created_at: string;
    updated_at: string;
    message_count: number;
    max_email_count_hit_at: string;
    total_msgs: number;
    matched_msgs: number;
    spam_message: number;
    expected_msgs: number;
    last_sent_to_at: string;
    last_delivered_at: string;
    account_quality: number;
    quality_label: string;
    password: string;
    phone_number: string;
    attributes: {
        [key: string]: unknown | undefined;
    };
    totp: {
        secret: string;
    };
};
export type Seed = Omit<SeedAPIShape, 'created_at' | 'updated_at' | 'max_email_count_hit_at' | 'last_sent_to_at' | 'last_delivered_at'> & {
    created_at: Date;
    updated_at: Date;
    max_email_count_hit_at: Date;
    last_sent_to_at: Date;
    last_delivered_at: Date;
};
export type SeedListAPIShape = {
    Id: string;
    kid: string;
    ID: string;
    AccountID: string;
    created_at: string;
    updated_at: string;
    last_result_at: string;
    Seeds: SeedAPIShape[] | null;
    target_email: string;
    sending_domains: string[];
    has_results: boolean;
    name: string;
    seed_filter: string;
    mailing_list: string;
    CreatedTS: number;
    tags: {
        sfmc_remote_id?: string;
        [key: string]: unknown | undefined;
    };
    delivery_stats: {
        all: {
            delivered: number;
            missing: number;
            pending: number;
            spam: number;
            inbox: number;
            total: number;
            provider: string;
            categories: {
                primary: number;
                promotions: number;
                updates: number;
            };
        };
    };
    SeedQuality: number;
    is_auto_generated: boolean;
};
export type SeedList = Omit<SeedListAPIShape, 'Id' | 'created_at' | 'updated_at' | 'last_result_at' | 'Seeds'> & {
    created_at: Date;
    updated_at: Date;
    last_result_at: Date;
    Seeds: null | Seed[];
};
export type SeedsListsAPIResponse = {
    body: {
        items: SeedListAPIShape[];
        paging: PagesList;
        total: number;
    };
    status: number;
};
export type SeedsListsResult = {
    items: SeedList[] | [];
    status: number;
    pages: ParsedPagesList;
};
export type SeedsListsQuery = {
    time_after?: string | Date;
    time_before?: string | Date;
    name?: string;
    cursor?: string;
    sort?: string;
    offset?: number;
    ascending?: boolean;
    limit?: number;
};
export type SeedsListsAPIQuery = Omit<SeedsListsQuery, 'time_after' | 'time_before'> & SeedsListsAPIQueryDates;
export type SeedsListsCreatingData = {
    sending_domains?: string;
    name?: string;
    seed_filter?: string;
    provider_filter?: string;
    remote_id?: string;
};
export type SeedsListsUpdatingData = Omit<SeedsListsCreatingData, 'remote_id'> & {
    shuffle?: boolean;
};
export type SeedListAPIResponse = {
    body: SeedListAPIShape;
    status: number;
};
export type SeedListGetAPIResponse = {
    body: {
        seedlist: SeedListAPIShape;
    };
    status: number;
};
export type SeedListResult = SeedList & {
    status: number;
};
export type SeedsListsDestroyApiResponse = {
    body: null;
    status: number;
};
