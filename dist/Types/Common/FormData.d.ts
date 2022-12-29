import * as NodeFormData from 'form-data';
export type FormDataOptions = {
    [key: string]: any;
};
export type InputFormData = {
    new (options?: HTMLFormElement | FormDataOptions): NodeFormData | FormData;
};
