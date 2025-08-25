import NodeFormData from 'form-data';

const { env } = process;

export type TestFormDataConfig = {
  type?: 'package' | 'global' | 'env'
};

const getTestFormData = (config?: TestFormDataConfig) => {
  const type = config?.type ?? 'env';
  if (type === 'env') {
    return env.USE_FETCH && env.USE_FETCH === 'true' ? FormData : NodeFormData;
  } if (type === 'package') {
    return NodeFormData;
  } if (type === 'global') {
    return FormData;
  }

  throw new Error('Please provide expected type of FormData');
};

export default getTestFormData;
