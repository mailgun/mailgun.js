import Client from './lib/client'
import Options from './lib/interfaces/Options';

export default class Mailgun {
  private formData: new () => FormData

  constructor(FormData: new () => FormData) {
    this.formData = FormData;
  }

  client(options: Options) {
    return new Client(options, this.formData)
  }
};