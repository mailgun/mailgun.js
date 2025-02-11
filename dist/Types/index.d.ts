import { IMailgunClient } from './Interfaces/MailgunClient/index';
import { InputFormData, MailgunClientOptions } from './Types/index';
export default class Mailgun {
    static get default(): typeof Mailgun;
    private formData;
    constructor(FormData: InputFormData);
    client(options: MailgunClientOptions): IMailgunClient;
}
