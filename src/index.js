import path from 'path';
import { readFileSync } from 'fs';
import parse from './parsers.js';
import getDiff from './formatters/index.js';
import compare from './compare.js';

const getFixturePath = (filename) => path.resolve(process.cwd(), '__fixtures__', filename);

const genDiff = (file1, file2, format) => {
  const data1 = readFileSync(getFixturePath(file1), 'utf-8');
  const data2 = readFileSync(getFixturePath(file2), 'utf-8');

  const format1 = path.extname(file1).slice(1);
  const format2 = path.extname(file2).slice(1);

  const obj1 = parse(data1, format1);
  const obj2 = parse(data2, format2);

  const tree = compare(obj1, obj2);
  return getDiff(tree, format);
};

export default genDiff;
