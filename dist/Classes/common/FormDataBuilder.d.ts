import * as NodeFormData from 'form-data';
import { FormDataInput, InputFormData } from '../../Types/Common';
import { MimeMessage } from '../../Types';
declare class FormDataBuilder {
    private FormDataConstructor;
    private fileKeys;
    private attachmentsHandler;
    constructor(FormDataConstructor: InputFormData);
    createFormData(data: FormDataInput): NodeFormData | FormData;
    private addMimeDataToFD;
    isMIME(data: unknown): data is MimeMessage;
    private isFormDataPackage;
    private isMessageAttachment;
    private addFilesToFD;
    private addCommonPropertyToFD;
}
export default FormDataBuilder;
