import Options from './lib/interfaces/Options';
import IFormData from './lib/interfaces/IFormData';
export default class Mailgun {
    private formData;
    constructor(FormData: new (...args: any[]) => IFormData);
    client(options: Options): any;
}
