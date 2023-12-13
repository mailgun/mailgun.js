import MailgunClient from './Classes/MailgunClient';
import { IMailgunClient } from './Interfaces';
import { InputFormData, MailgunClientOptions } from './Types';

export * as Enums from './Enums';
export * from './Types';
export * as Interfaces from './Interfaces';

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
