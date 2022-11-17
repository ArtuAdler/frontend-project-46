import _ from 'lodash';

const stringify = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }
  if (typeof data === 'string') {
    return `'${data}'`;
  }
  return String(data);
};

const iter = (children, path) => {
  const lines = children.map((node) => {
    switch (node.type) {
      case 'added':
        return `Property '${path}${node.key}' was added with value: ${stringify(node.value)}`;
      case 'deleted':
        return `Property '${path}${node.key}' was removed`;
      case 'nested':
        return iter(node.children, `${path}${node.key}.`);
      case 'changed':
        return `Property '${path}${node.key}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
      case 'unchanged':
        return null;
      default:
        throw new Error(`Unknown type of data ${node.type}`);
    }
  });
  return lines.filter(Boolean).join('\n');
};

const formatPlain = (tree) => iter(tree, '');

export default formatPlain;
