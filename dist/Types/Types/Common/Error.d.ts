export type APIErrorOptions = {
    headers?: {
        [key: string]: unknown;
    };
    status: number;
    message?: string;
    body: {
        error?: string;
        message?: string;
    };
    url?: string;
    statusText?: string;
};
export type APIErrorType = {
    stack: string;
    status: number;
    message: string;
    details: string;
};
