import _ from 'lodash';

const stringify = (value, replacer = ' ', spacesCount = 1) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize + 4);
    const bracketIndent = replacer.repeat(indentSize);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(value, 1);
};

const stylish = (tree) => {
  const iter = (node, depth, spacesCount = 4) => {
    if (!_.isObject(node)) {
      return `${node}`;
    }
    const replacer = ' ';
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const indentDiff = replacer.repeat(indentSize - 2);
    const indentClose = replacer.repeat(indentSize - 4);

    const lines = Object
      .entries(node)
      .map(([key, val]) => {
        const { type, value } = val;
        if (type === 'children') {
          return `${currentIndent}${key}: ${iter(value, depth + 1)}`;
        }
        const stringValue = stringify(value, replacer, indentSize);
        switch (type) {
          case 'added':
            return `${indentDiff}+ ${key}: ${stringValue}`;
          case 'deleted':
            return `${indentDiff}- ${key}: ${stringValue}`;
          case 'unchanged':
            return `${indentDiff}  ${key}: ${stringValue}`;
          case 'changed':
            return `${indentDiff}- ${key}: ${stringify(val.oldValue, replacer, indentSize)}\n${indentDiff}+ ${key}: ${stringify(val.newValue, replacer, indentSize)}`;
          default:
            throw new Error(`Unknown type: '${type}'!`);
        }
      });
    return [
      '{',
      ...lines,
      `${indentClose}}`,
    ].join('\n');
  };
  return iter(tree, 1);
};

export default stylish;
