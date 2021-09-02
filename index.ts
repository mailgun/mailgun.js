import Client from './lib/client';
import Options from './lib/interfaces/Options';
import IFormData from './lib/interfaces/IFormData';

class Mailgun {
  private formData: new () => IFormData

  constructor(FormData: new (...args: any[]) => IFormData) {
    this.formData = FormData;
  }

  client(options: Options) : Client {
    return new Client(options, this.formData);
  }
}

export = Mailgun;
