import MailgunClient from './Classes/MailgunClient.js';
import { IMailgunClient } from './Interfaces/MailgunClient/index.js';
import { InputFormData, MailgunClientOptions } from './Types/index.js';

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
