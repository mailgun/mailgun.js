import { PagesList, ParsedPagesList } from '../../Common/index.js';
export type InboxPlacementsResultsQuery = {
    sender?: string;
    subject?: string;
    provider?: string;
    target_email?: string;
    time_after?: string | Date;
    time_before?: string | Date;
    cursor?: string;
    sort?: string;
    offset?: number;
    ascending?: boolean;
    limit?: number;
};
export type InboxPlacementsResultsDates = {
    time_after?: string;
    time_before?: string;
};
export type InboxPlacementsResultsApiQuery = Omit<InboxPlacementsResultsQuery, 'time_after' | 'time_before'> & InboxPlacementsResultsDates;
export type InboxPlacementsSeedResultAPIShape = {
    email: string;
    provider: string;
    destination: string;
    state: string;
    originating_ip: string;
    tags: string[];
    dkim: string;
    spf: string;
    dmarc: string;
    headers: {
        key: string;
        value: string;
    }[];
    extensions: {
        category: string;
    };
};
export type InboxPlacementsBoxAPIShape = {
    Id: string;
    kid: string;
    ID: string;
    AccountID: string;
    created_at: string;
    updated_at: string;
    last_result_at: string;
    Seeds: null;
    target_email: string;
    sending_domains: null;
    has_results: boolean;
    name: string;
    seed_filter: string;
    mailing_list: string;
    CreatedTS: number;
    tags: string[];
    SeedQuality: number;
    is_auto_generated: boolean;
};
export type InboxPlacementsBox = Omit<InboxPlacementsBoxAPIShape, 'created_at' | 'updated_at' | 'last_result_at'> & {
    created_at: Date;
    updated_at: Date;
    last_result_at: Date;
};
export type InboxPlacementsResultAPIShape = {
    Id: string;
    rid: string;
    result_id: string;
    AccountID: string;
    KeyBoxID: string;
    keybox_email: string;
    subject: string;
    sender: string;
    seedlist_name: string;
    created_at: string;
    updated_at: string;
    status: string;
    CreatedTS: number;
    attributes: {
        [key: string]: string | unknown;
    };
    campaign_id: string;
    sharing_enabled: boolean;
    sharing_id: string;
    sharing_expires_at: string;
    Box: InboxPlacementsBoxAPIShape;
    seed_results: InboxPlacementsSeedResultAPIShape[];
    spamassassin: {
        is_spam: boolean;
        score: number;
        required: number;
        rules: {
            name: string;
            points: number;
            short_description: string;
            long_description: string;
        }[];
    };
    delivery_stats: {
        [key: string]: {
            delivered: number;
            missing: number;
            pending: number;
            spam: number;
            inbox: number;
            total: number;
            provider: string;
            categories: {
                primary: number;
                updates: number;
            } | object;
        };
    };
};
export type InboxPlacementsResult = Omit<InboxPlacementsResultAPIShape, 'Id' | 'Box' | 'created_at' | 'updated_at' | 'sharing_expires_at'> & {
    Box: InboxPlacementsBox;
    created_at: Date;
    updated_at: Date;
    sharing_expires_at: Date;
    id: string;
};
export type InboxPlacementsResultAPIResponse = {
    body: {
        result: InboxPlacementsResultAPIShape;
    };
    status: number;
};
export type InboxPlacementsResultWithStatus = {
    inboxPlacementResult: InboxPlacementsResult;
    status: number;
};
export type InboxPlacementsResultsListAPIResponse = {
    body: {
        items: InboxPlacementsResultAPIShape[];
        paging: PagesList;
        total: number;
    };
    status: number;
};
export type InboxPlacementsResultsList = {
    items: InboxPlacementsResult[];
    status: number;
    pages: ParsedPagesList;
};
export type InboxPlacementsDestroyAPIResponse = {
    body: {
        Message: string;
    };
    status: number;
};
export type InboxPlacementsDestroyResult = {
    Message: string;
    status: number;
};
