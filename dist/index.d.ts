import Client from './client';
import { InputFormData } from './interfaces/IFormData';
import Options from './interfaces/Options';
export default class Mailgun {
    static get default(): typeof Mailgun;
    private formData;
    constructor(FormData: InputFormData);
    client(options: Options): Client;
}
