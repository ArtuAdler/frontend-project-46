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
    if (!_.isArray(node)) {
      return `${node}`;
    }
    const replacer = ' ';
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const indentDiff = replacer.repeat(indentSize - 2);
    const closeIndent = replacer.repeat(indentSize - 4);
    const lines = node.map((obj) => {
      switch (obj.type) {
        case 'nested':
          return `${currentIndent}${obj.key}: ${iter(obj.children, depth + 1)}`;
        case 'added':
          return `${indentDiff}+ ${obj.key}: ${stringify(obj.value, replacer, indentSize)}`;
        case 'deleted':
          return `${indentDiff}- ${obj.key}: ${stringify(obj.value, replacer, indentSize)}`;
        case 'unchanged':
          return `${currentIndent}${obj.key}: ${stringify(obj.value, replacer, indentSize)}`;
        case 'changed':
          return `${indentDiff}- ${obj.key}: ${stringify(obj.value1, replacer, indentSize)}\n${indentDiff}+ ${obj.key}: ${stringify(obj.value2, replacer, indentSize)}`;
        default:
          return '';
      }
    });
    return ['{', ...lines, `${closeIndent}}`].join('\n');
  };
  return iter(tree, 1);
};

export default stylish;
