interface Headers {
    [key: string]: any;
}
interface AppendOptions {
    header?: string | Headers;
    knownLength?: number;
    filename?: string;
    filepath?: string;
    contentType?: string;
}
export default abstract class IFormData {
    constructor();
    abstract append(key: string, value: any, options?: AppendOptions | string): void;
}
export {};
