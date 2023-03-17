export type APIErrorOptions = {
    headers: {
        [key: string]: any;
    };
    status: number;
    message: string;
    body: any;
    url: string;
    statusText: string;
};
export type APIErrorType = {
    stack: string;
    status: number;
    message: string;
    details: string;
};
