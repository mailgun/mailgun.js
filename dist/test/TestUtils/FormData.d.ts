import NodeFormData from 'form-data';
declare const getTestFormData: (config?: {
    type?: "env" | "package" | "global" | undefined;
} | undefined) => typeof NodeFormData | {
    new (form?: HTMLFormElement | undefined): FormData;
    prototype: FormData;
};
export { getTestFormData };
