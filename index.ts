import Client from './lib/client';
import { InputFormData } from './lib/interfaces/IFormData';
import Options from './lib/interfaces/Options';

class Mailgun {
  private formData: InputFormData

  constructor(FormData: InputFormData) {
    this.formData = FormData;
  }

  client(options: Options) : Client {
    return new Client(options, this.formData);
  }
}

export = Mailgun;
