import { IMailgunClient } from './Interfaces/MailgunClient/index.js';
import { InputFormData, MailgunClientOptions } from './Types/index.js';
export default class Mailgun {
    static get default(): typeof Mailgun;
    private formData;
    constructor(FormData: InputFormData);
    client(options: MailgunClientOptions): IMailgunClient;
}
