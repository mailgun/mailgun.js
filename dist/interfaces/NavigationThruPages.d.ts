export interface PagesList {
    previous: string;
    first: string;
    last: string;
    next: string;
}
export interface ParsedPage {
    id: string;
    page: string;
    iteratorPosition: string | undefined;
    url: string;
}
export interface ParsedPagesList {
    previous: ParsedPage;
    first: ParsedPage;
    last: ParsedPage;
    next: ParsedPage;
}
export interface PagesListAccumulator {
    [index: string]: ParsedPage;
}
export interface ResponseWithPaging {
    body: {
        paging: PagesList;
    };
}
export interface QueryWithPage {
    page?: string;
}
export interface UpdatedUrlAndQuery {
    url: string;
    updatedQuery: Record<string, unknown>;
}
