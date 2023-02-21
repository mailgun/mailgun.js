import MailgunClient from './Classes/MailgunClient';
import { InputFormData } from './Types/Common';
import { MailgunClientOptions } from './Types/MailgunClient';

export * as Enums from './Enums';
export * as Types from './Types';
export * as Interfaces from './Interfaces';

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
