import Client from './lib/client';
import Options from './lib/interfaces/Options';
export default class Mailgun {
    private formData;
    constructor(FormData: new (...args: any[]) => FormData);
    client(options: Options): Client;
}
