export type InboxPlacementsData = {
    from: string;
    subject: string;
    html: string;
    provider_filter?: string[];
    seed_list?: string;
};
export type InboxPlacementsTestResult = {
    result_id: string;
    links: {
        results: string;
    };
    status: number;
};
export type InboxPlacementsTestResultAPIResponse = {
    body: InboxPlacementsTestResult;
    status: number;
};
