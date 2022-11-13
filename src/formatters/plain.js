const stringifyValue = (value) => {
  if (value === null) return value;
  switch (typeof value) {
    case 'string':
      return `'${value}'`;
    case 'number':
      return `${value}`;
    case 'boolean':
      return `${value}`;
    case 'object':
      return '[complex value]';
    default:
      throw new Error(`bad type of ${value}`);
  }
};

const plain = (tree) => {
  const iter = (node, path) => {
    const lines = node.map((obj) => {
      switch (obj.type) {
        case 'nested':
          return iter(obj.children, `${path}${obj.key}.`);
        case 'added':
          return `Property '${path}${obj.key}' was added with value: ${stringifyValue(obj.value)}`;
        case 'deleted':
          return `Property '${path}${obj.key}' was removed`;
        case 'changed':
          return `Property '${path}${obj.key}' was updated. From ${stringifyValue(obj.value1)} to ${stringifyValue(obj.value2)}`;
        default: return '';
      }
    });
    return lines.filter((str) => str !== '').join('\n');
  };
  return iter(tree, '');
};
export default plain;
