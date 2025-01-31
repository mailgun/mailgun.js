import { InputFormData, RequestOptions } from '../../lib';
import Request from '../../lib/Classes/common/Request';
declare class TestRequest extends Request {
    constructor(options: RequestOptions, formData: InputFormData);
}
export default TestRequest;
