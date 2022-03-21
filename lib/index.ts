import Client from './client';
import { InputFormData } from './interfaces/IFormData';
import Options from './interfaces/Options';

export default class Mailgun {
  static get default(): typeof Mailgun { return this; }
  private formData: InputFormData

  constructor(FormData: InputFormData) {
    this.formData = FormData;
  }

  client(options: Options) : Client {
    return new Client(options, this.formData);
  }
}
