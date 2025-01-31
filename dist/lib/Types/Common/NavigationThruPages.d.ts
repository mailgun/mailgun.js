export type PagesList = {
    previous: string;
    first: string;
    last: string;
    next: string;
};
export type ParsedPage = {
    id: string;
    page: string;
    iteratorPosition: string | undefined;
    url: string;
};
export type ParsedPagesList = {
    previous: ParsedPage;
    first: ParsedPage;
    last: ParsedPage;
    next: ParsedPage;
};
export type PagesListAccumulator = {
    [index: string]: ParsedPage;
};
export type ResponseWithPaging = {
    body: {
        paging: PagesList;
    };
};
export type QueryWithPage = {
    page?: string;
};
export type UpdatedUrlAndQuery = {
    url: string;
    updatedQuery: Record<string, unknown>;
};
