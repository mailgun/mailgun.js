export type InboxPlacementsAttributesResult = {
    items: {
        attribute: string;
        values: string[];
    };
    status: number;
};
export type InboxPlacementsAttributesApiResponse = {
    body: {
        items: {
            attribute: string;
            values: string[];
        };
    };
    status: number;
};
export type InboxPlacementsValuesResult = object;
export type InboxPlacementsValuesApiResponse = {
    body: InboxPlacementsValuesResult;
    status: number;
};
