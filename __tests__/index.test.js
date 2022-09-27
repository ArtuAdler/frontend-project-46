import genDiff from '../src/index.js';

const x = genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')

test('genDiff', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json').toEqual(x));
});


// console.log(x)
