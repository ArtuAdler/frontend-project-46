import stylish from './stylish.js';
import plain from './plain.js';

const format = (data, outputFormat = 'stylish') => {
  switch (outputFormat) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    case 'json':
      return JSON.stringify(data);
    default:
      throw new Error(`Unknown format: ${outputFormat}`);
  }
};
export default format;
