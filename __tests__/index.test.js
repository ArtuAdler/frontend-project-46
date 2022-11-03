import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { test, expect, describe } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixtures = (filepath) => readFileSync(getFixturePath(filepath), 'utf-8');

const expectedStylish = readFixtures('stylish.txt');
const expectedPlain = readFixtures('plain.txt');
const expectedJSON = readFixtures('json.txt');

describe('genDiff', () => {
  test('should be work with json', () => {
    expect(genDiff('file1.json', 'file2.json')).toEqual(expectedStylish.trim());
    expect(genDiff('file1.json', 'file2.json', 'stylish')).toEqual(expectedStylish.trim());
    expect(genDiff('file1.json', 'file2.json', 'plain')).toEqual(expectedPlain.trim());
    expect(genDiff('file1.json', 'file2.json', 'json')).toEqual(expectedJSON.trim());
  });
  test('should be work with yaml', () => {
    expect(genDiff('file1.yaml', 'file2.yaml')).toEqual(expectedStylish.trim());
    expect(genDiff('file1.yaml', 'file2.yaml', 'stylish')).toEqual(expectedStylish.trim());
    expect(genDiff('file1.yaml', 'file2.yaml', 'plain')).toEqual(expectedPlain.trim());
    expect(genDiff('file1.yaml', 'file2.yaml', 'json')).toEqual(expectedJSON.trim());
  });
});
