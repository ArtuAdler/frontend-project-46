import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { test, expect, describe } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filepath) => path.join(__dirname, '..', '__fixtures__', filepath);
const readFixture = (filepath) => readFileSync(getFixturePath(filepath), 'utf-8').trim();

const tests = ['json', 'yaml'];

const expectedStylish = readFixture('stylish.txt');
const expectedPlain = readFixture('plain.txt');
const expectedJSON = readFixture('json.txt');

describe('genDiff', () => {
  test.each(tests)('should be work with %s', (format) => {
    const filepath1 = getFixturePath(`file1.${format}`);
    const filepath2 = getFixturePath(`file2.${format}`);
    expect(genDiff(filepath1, filepath2)).toEqual(expectedStylish);
    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(expectedStylish);
    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(expectedPlain);
    expect(genDiff(filepath1, filepath2, 'json')).toEqual(expectedJSON);
  });
});

// test.each(['a', 'b'])('tes', (char) => {
//   console.log(`Have char ${char}`);
//   expect(char).toBe('a');
// });
