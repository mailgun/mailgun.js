import Client from './lib/client';
import { InputFormData } from './lib/interfaces/IFormData';
import Options from './lib/interfaces/Options';
declare class Mailgun {
    private formData;
    constructor(FormData: InputFormData);
    client(options: Options): Client;
}
export = Mailgun;
