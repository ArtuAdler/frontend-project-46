import stylish from './stylish.js';

const getDiff = (data, formatN = 'stylish') => {
  switch (formatN) {
    case 'stylish':
      return stylish(data);
    default:
      throw new Error(`Unknown format: ${formatN}`);
  }
};
export default getDiff;
