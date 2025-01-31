import NodeFormData from 'form-data';
const { env } = process;

const getTestFormData = (config?: {
  type?: 'package' | 'global' | 'env'
}) =>{
  const type = config?.type ?? 'env';
  if (type == 'env') {
    return Boolean(env.USE_FETCH && env.USE_FETCH === 'true') ? FormData : NodeFormData;
  } else if(type == 'package'){
    return NodeFormData;
  } else if(type === 'global') {
    return FormData
  }

  throw new Error('Please provide expected type of FormData');
}

export {getTestFormData}
