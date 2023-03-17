export declare type PagesList = {
    previous: string;
    first: string;
    last: string;
    next: string;
};
export declare type ParsedPage = {
    id: string;
    page: string;
    iteratorPosition: string | undefined;
    url: string;
};
export declare type ParsedPagesList = {
    previous: ParsedPage;
    first: ParsedPage;
    last: ParsedPage;
    next: ParsedPage;
};
export declare type PagesListAccumulator = {
    [index: string]: ParsedPage;
};
export declare type ResponseWithPaging = {
    body: {
        paging: PagesList;
    };
};
export declare type QueryWithPage = {
    page?: string;
};
export declare type UpdatedUrlAndQuery = {
    url: string;
    updatedQuery: Record<string, unknown>;
};
