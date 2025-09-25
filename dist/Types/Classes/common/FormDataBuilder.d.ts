import { FormDataInput, InputFormData, FormDataBuilderConfig, CreatedFormData } from '../../Types/Common/index.js';
import { MimeMessage } from '../../Types/index.js';
declare class FormDataBuilder {
    private FormDataConstructor;
    private fileKeys;
    private attachmentsHandler;
    private useFetch?;
    constructor(FormDataConstructor: InputFormData, config: FormDataBuilderConfig);
    createFormData(data: FormDataInput): Promise<CreatedFormData>;
    private addMimeDataToFD;
    isMIME(data: unknown): data is MimeMessage;
    private isFormDataPackage;
    private isMessageAttachment;
    private addFilesToFD;
    private addCommonPropertyToFD;
}
export default FormDataBuilder;
