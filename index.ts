import Client from './lib/client';
import Options from './lib/interfaces/Options';
import IFormData from './lib/interfaces/IFormData';

export default class Mailgun {
  private formData: new () => IFormData

  constructor(FormData: new (...args: any[]) => IFormData) {
    this.formData = FormData;
  }

  client(options: Options) : any {
    return new Client(options, this.formData);
  }
}
