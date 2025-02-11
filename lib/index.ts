import MailgunClient from './Classes/MailgunClient';
import { IMailgunClient } from './Interfaces/MailgunClient/index';
import { InputFormData, MailgunClientOptions } from './Types/index';

export default class Mailgun {
  static get default(): typeof Mailgun { return this; }
  private formData: InputFormData

  constructor(FormData: InputFormData) {
    this.formData = FormData;
  }

  client(options: MailgunClientOptions) : IMailgunClient {
    return new MailgunClient(options, this.formData);
  }
}
