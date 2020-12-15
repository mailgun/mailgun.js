import Client from './lib/client';
import Options from './lib/interfaces/Options';
export default class Mailgun {
    private formData;
    constructor(FormData: FormData);
    client(options: Options): Client;
}
