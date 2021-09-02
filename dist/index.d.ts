import Client from './lib/client';
import Options from './lib/interfaces/Options';
import IFormData from './lib/interfaces/IFormData';
declare class Mailgun {
    private formData;
    constructor(FormData: new (...args: any[]) => IFormData);
    client(options: Options): Client;
}
export = Mailgun;
