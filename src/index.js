import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';
import { fileURLToPath } from 'url';
import parse from './parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const stringify = (data, symb = ' ', count = 2) => {
  const tab = symb.repeat(count);
  const x = JSON.stringify(data, null, tab);
  return x.replaceAll('"', '').replaceAll(',', '');
};

const findDifference = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(keys);
  const newObj = sortedKeys.reduce((acc, key) => {
    if (!Object.hasOwn(obj1, key)) {
      acc[`+ ${[key]}`] = obj2[key];
    } else if (!Object.hasOwn(obj2, key)) {
      acc[`- ${[key]}`] = obj1[key];
    } else if (keys1.includes(key) && keys2.includes(key)) {
      if (obj2[key] !== obj1[key]) {
        acc[`- ${[key]}`] = obj1[key];
        acc[`+ ${[key]}`] = obj2[key];
      } else {
        acc[`  ${key}`] = obj1[key];
      }
    }
    return acc;
  }, {});
  return newObj;
};

const genDiff = (file1, file2) => {
  const data1 = readFileSync(getFixturePath(file1), 'utf-8');
  const data2 = readFileSync(getFixturePath(file2), 'utf-8');

  const format1 = getFixturePath(file1).split('.')[1];
  const format2 = getFixturePath(file2).split('.')[1];

  const obj1 = parse(data1, format1);
  const obj2 = parse(data2, format2);

  const answer = findDifference(obj1, obj2);
  return stringify(answer);
};

export default genDiff;
