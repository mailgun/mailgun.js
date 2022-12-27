import MailgunClient from './Classes/MailgunClient';
import { InputFormData } from './interfaces/IFormData';
import MailgunClientOptions from './interfaces/MailgunClientOptions';
export default class Mailgun {
    static get default(): typeof Mailgun;
    private formData;
    constructor(FormData: InputFormData);
    client(options: MailgunClientOptions): MailgunClient;
}
