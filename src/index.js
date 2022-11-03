import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import parse from './parsers.js';
import getDiff from './formatters/index.js';
import compare from './compare.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const genDiff = (file1, file2, formatN) => {
  const data1 = readFileSync(getFixturePath(file1), 'utf-8');
  const data2 = readFileSync(getFixturePath(file2), 'utf-8');

  const format1 = path.extname(file1).slice(1);
  const format2 = path.extname(file2).slice(1);

  const obj1 = parse(data1, format1);
  const obj2 = parse(data2, format2);

  const answer = compare(obj1, obj2);
  return getDiff(answer, formatN);
};

export default genDiff;
