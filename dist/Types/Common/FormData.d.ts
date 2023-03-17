import * as NodeFormData from 'form-data';
export declare type FormDataOptions = {
    [key: string]: any;
};
export declare type InputFormData = {
    new (options?: HTMLFormElement | FormDataOptions): NodeFormData | FormData;
};
