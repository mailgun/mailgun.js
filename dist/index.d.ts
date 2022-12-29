import MailgunClient from './Classes/MailgunClient';
import { InputFormData } from './Types/Common';
import MailgunClientOptions from './interfaces/MailgunClientOptions';
export default class Mailgun {
    static get default(): typeof Mailgun;
    private formData;
    constructor(FormData: InputFormData);
    client(options: MailgunClientOptions): MailgunClient;
}
