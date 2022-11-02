import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const answer = readFileSync(getFixturePath('stylish.txt'), 'utf-8');

const answerPlain = readFileSync(getFixturePath('plain.txt'), 'utf-8');

test('stylish', () => {
  expect(genDiff('file1.json', 'file2.json')).toEqual(answer.trim());
});

test('yaml', () => {
  expect(genDiff('file1.yaml', 'file2.yaml')).toEqual(answer.trim());
});

test('plain', () => {
  expect(genDiff('file1.json', 'file2.json', 'plain')).toEqual(answerPlain.trim());
});
