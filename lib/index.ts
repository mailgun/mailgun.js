import MailgunClient from './Classes/MailgunClient';
import { IMailgunClient } from './Interfaces';
import { InputFormData } from './Types/Common';
import { MailgunClientOptions } from './Types/MailgunClient';

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
