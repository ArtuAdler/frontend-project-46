import stylish from './stylish.js';
import plain from './plain.js';

const getDiff = (data, formatN = 'stylish') => {
  switch (formatN) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    case 'json':
      return JSON.stringify(data);
    default:
      throw new Error(`Unknown format: ${formatN}`);
  }
};
export default getDiff;
