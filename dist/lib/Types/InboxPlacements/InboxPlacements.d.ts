export type InboxPlacementsData = {
    from: string;
    subject: string;
    provider_filter?: string[];
    html?: string;
    template_name?: string;
    variables?: {
        [propName: string]: string;
    };
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
