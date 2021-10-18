export interface EventsPage {
    id: string;
    number: string;
    url: string;
}
export interface PagesList {
    previous: string;
    first: string;
    last: string;
    next: string;
}
export interface EventsResponse {
    body: {
        items: [];
        paging: PagesList;
    }
}

export interface EventsList {
    items: [];
    pages: PagesList;
}
export interface PagesListAccumulator {
    [index: string]: EventsPage
}
