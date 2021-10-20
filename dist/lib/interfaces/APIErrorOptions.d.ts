interface APIErrorOptions {
    headers: {
        [key: string]: any;
    };
    status: number | string;
    message: string;
    body: any;
    url: string;
    statusText: string;
}
export default APIErrorOptions;
