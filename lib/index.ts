import MailgunClient from './Classes/MailgunClient';
import { InputFormData } from './Types/Common';
import MailgunClientOptions from './interfaces/MailgunClientOptions';

export default class Mailgun {
  static get default(): typeof Mailgun { return this; }
  private formData: InputFormData

  constructor(FormData: InputFormData) {
    this.formData = FormData;
  }

  client(options: MailgunClientOptions) : MailgunClient {
    return new MailgunClient(options, this.formData);
  }
}
