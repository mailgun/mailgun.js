import { IMailgunClient } from './Interfaces';
import { InputFormData } from './Types/Common';
import { MailgunClientOptions } from './Types/MailgunClient';
export * as Enums from './Enums';
export * from './Types';
export * as Interfaces from './Interfaces';
export default class Mailgun {
    static get default(): typeof Mailgun;
    private formData;
    constructor(FormData: InputFormData);
    client(options: MailgunClientOptions): IMailgunClient;
}
