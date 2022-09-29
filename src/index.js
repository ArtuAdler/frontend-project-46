import path from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';

const getFilePath = (filepath) => path.resolve(process.cwd(), filepath);

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
  const data1 = readFileSync(getFilePath(file1), 'utf-8');
  const data2 = readFileSync(getFilePath(file2), 'utf-8');

  const obj1 = JSON.parse(data1);
  const obj2 = JSON.parse(data2);

  const answer = findDifference(obj1, obj2);
  return stringify(answer);
};

export default genDiff;
