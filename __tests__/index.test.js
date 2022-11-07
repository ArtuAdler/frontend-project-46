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
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    expect(genDiff(filepath1, filepath2)).toEqual(expectedStylish);
    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(expectedStylish);
    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(expectedPlain);
    expect(genDiff(filepath1, filepath2, 'json')).toEqual(expectedJSON);
  });
  test('should be work with yaml', () => {
    const filepath11 = getFixturePath('file1.yaml');
    const filepath22 = getFixturePath('file2.yaml');
    expect(genDiff(filepath11, filepath22)).toEqual(expectedStylish);
    expect(genDiff(filepath11, filepath22, 'stylish')).toEqual(expectedStylish);
    expect(genDiff(filepath11, filepath22, 'plain')).toEqual(expectedPlain);
    expect(genDiff(filepath11, filepath22, 'json')).toEqual(expectedJSON);
  });
});

// expect(genDiff('file1.yaml', 'file2.yaml', 'json')).toEqual(expectedJSON);
