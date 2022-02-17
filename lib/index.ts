import Client from './client';
import { InputFormData } from './interfaces/IFormData';
import Options from './interfaces/Options';

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
