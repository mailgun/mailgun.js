import { InputFormData, RequestOptions } from '../../lib';
import Request from '../../lib/Classes/common/Request';

const { env } = process;
class TestRequest extends Request {
  constructor(options: RequestOptions, formData: InputFormData) {
    const isENVUseFetch = env.USE_FETCH && env.USE_FETCH === 'true';
    const optionsCopy = {
      ...options,
      useFetch: options.useFetch ?? (isENVUseFetch || false)
    };
    super(optionsCopy, formData);
  }
}

export default TestRequest;
