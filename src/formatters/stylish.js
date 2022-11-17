import _ from 'lodash';

const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return String(data);
  }
  const lines = Object
    .entries(data)
    .map(([key, value]) => `${indent(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`);
  return `{\n${lines.join('\n')}\n${indent(depth)}  }`;
};

const iter = (children, depth) => children.map((node) => {
  switch (node.type) {
    case 'added':
      return `${indent(depth)}+ ${node.key}: ${stringify(node.value, depth)}`;
    case 'deleted':
      return `${indent(depth)}- ${node.key}: ${stringify(node.value, depth)}`;
    case 'nested': {
      const lines = iter(node.children, depth + 1);
      return `${indent(depth)}  ${node.key}: {\n${lines.join('\n')}\n${indent(depth)}  }`;
    }
    case 'changed': {
      const lines1 = `${indent(depth)}- ${node.key}: ${stringify(node.value1, depth)}`;
      const lines2 = `${indent(depth)}+ ${node.key}: ${stringify(node.value2, depth)}`;
      return `${lines1}\n${lines2}`;
    }
    case 'unchanged':
      return `${indent(depth)}  ${node.key}: ${stringify(node.value, depth)}`;
    default:
      throw new Error(`Unknown type of data ${node.type}`);
  }
});

const formatStylish = (tree) => `{\n${iter(tree, 1).join('\n')}\n}`;

export default formatStylish;
