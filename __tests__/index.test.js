import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filepath) => path.join(__dirname, '..', '__fixtures__', filepath);
const readFixture = (filepath) => readFileSync(getFixturePath(filepath), 'utf-8').trim();

test.each([
  { file1: 'file1.json', file2: 'file2.json', expected: 'stylish.txt' },
  { file1: 'file1.yaml', file2: 'file2.yaml', expected: 'stylish.txt' },
  {
    file1: 'file1.json', file2: 'file2.json', outputFormat: 'plain', expected: 'plain.txt',
  },
  {
    file1: 'file1.yaml', file2: 'file2.yaml', outputFormat: 'plain', expected: 'plain.txt',
  },
  {
    file1: 'file1.json', file2: 'file2.json', outputFormat: 'json', expected: 'json.txt',
  },
  {
    file1: 'file1.yaml', file2: 'file2.yaml', outputFormat: 'json', expected: 'json.txt',
  },
])('$file1, $file2, $outputFormat, $expected', ({
  file1, file2, outputFormat, expected,
}) => {
  const filepath1 = getFixturePath(file1);
  const filepath2 = getFixturePath(file2);
  expect(genDiff(filepath1, filepath2, outputFormat)).toEqual(readFixture(expected));
});
