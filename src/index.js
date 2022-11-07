import path from 'path';
import { readFileSync } from 'fs';
import parse from './parsers.js';
import format from './formatters/index.js';
import buildTree from './treeBuilder.js';

const buildFullPath = (filepath) => path.resolve(process.cwd(), '__fixtures__', filepath);

const extractFormat = (filepath) => path.extname(filepath).slice(1);

const getData = (filepath) => {
  const data = readFileSync(buildFullPath(filepath), 'utf-8');
  const extension = extractFormat(filepath);
  return parse(data, extension);
};

const genDiff = (filepath1, filepath2, outputFormat) => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const tree = buildTree(data1, data2);
  return format(tree, outputFormat);
};

export default genDiff;
