import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { test, expect, describe } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filepath) => path.join(__dirname, '..', '__fixtures__', filepath);
const readFixture = (filepath) => readFileSync(getFixturePath(filepath), 'utf-8');

const expectedStylish = readFixture('stylish.txt').trim();
const expectedPlain = readFixture('plain.txt').trim();
const expectedJSON = readFixture('json.txt').trim();

describe('genDiff', () => {
  test('should be work with json', () => {
    expect(genDiff('file1.json', 'file2.json')).toEqual(expectedStylish);
    expect(genDiff('file1.json', 'file2.json', 'stylish')).toEqual(expectedStylish);
    expect(genDiff('file1.json', 'file2.json', 'plain')).toEqual(expectedPlain);
    expect(genDiff('file1.json', 'file2.json', 'json')).toEqual(expectedJSON);
  });
  test('should be work with yaml', () => {
    expect(genDiff('file1.yaml', 'file2.yaml')).toEqual(expectedStylish);
    expect(genDiff('file1.yaml', 'file2.yaml', 'stylish')).toEqual(expectedStylish);
    expect(genDiff('file1.yaml', 'file2.yaml', 'plain')).toEqual(expectedPlain);
    expect(genDiff('file1.yaml', 'file2.yaml', 'json')).toEqual(expectedJSON);
  });
});
