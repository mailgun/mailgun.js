import * as NodeFormData from 'form-data';
import { FormDataInput, InputFormData } from '../../Types/Common/index.js';
import { MimeMessage } from '../../Types/index.js';
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
