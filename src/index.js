import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';
import { fileURLToPath } from 'url';
import parse from './parsers.js';
import getDiff from './formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const compare = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const keysUnion = _.union(keys1, keys2);
  const sortedKeysUnion = _.sortBy(keysUnion);

  return sortedKeysUnion.reduce((acc, key) => {
    const object1Value = obj1[key];
    const object2Value = obj2[key];
    if (_.isPlainObject(object1Value) && _.isPlainObject(object2Value)) {
      const object = { [key]: { type: 'children', value: compare(object1Value, object2Value) } };
      return { ...acc, ...object };
    }
    if (object1Value === object2Value) {
      return { ...acc, [key]: { type: 'unchanged', value: object1Value } };
    }
    if (_.has(obj1, key) && _.has(obj2, key)) {
      return { ...acc, [key]: { type: 'changed', oldValue: object1Value, newValue: object2Value } };
    }
    if (_.has(obj1, key)) {
      return { ...acc, [key]: { type: 'deleted', value: object1Value } };
    }
    if (_.has(obj2, key)) {
      return { ...acc, [key]: { type: 'added', value: object2Value } };
    }
    return acc;
  }, {});
};

const genDiff = (file1, file2, formatN) => {
  const data1 = readFileSync(getFixturePath(file1), 'utf-8');
  const data2 = readFileSync(getFixturePath(file2), 'utf-8');
  const format1 = getFixturePath(file1).split('.')[1];
  const format2 = getFixturePath(file2).split('.')[1];
  const obj1 = parse(data1, format1);
  const obj2 = parse(data2, format2);
  const answer = compare(obj1, obj2);
  return getDiff(answer, formatN);
};
export default genDiff;
