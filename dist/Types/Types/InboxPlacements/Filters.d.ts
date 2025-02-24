export type Filter = {
    parameter: string;
    description: string;
};
export type InboxPlacementsFiltersApiResponse = {
    body: {
        supported_filters: {
            filters: Filter[];
        };
    };
    status: number;
};
export type InboxPlacementsFiltersResult = {
    supported_filters: {
        filters: Filter[];
    };
    status: number;
};
