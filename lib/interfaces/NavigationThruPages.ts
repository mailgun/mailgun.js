export interface PagesList {
    previous: string;
    first: string;
    last: string;
    next: string;
}

export interface ParsedPage {
    id: string;
    page: string | null | undefined;
    address: string | null | undefined;
    url: string
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
        paging: PagesList
    }
}
