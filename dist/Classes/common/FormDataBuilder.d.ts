import * as NodeFormData from 'form-data';
import { InputFormData } from '../../Types/Common';
declare class FormDataBuilder {
    private FormDataConstructor;
    constructor(FormDataConstructor: InputFormData);
    createFormData(data: any): NodeFormData | FormData;
    private isFormDataPackage;
    private getAttachmentOptions;
    private addMimeDataToFD;
    private addFilesToFD;
    private isStream;
    private addCommonPropertyToFD;
}
export default FormDataBuilder;
