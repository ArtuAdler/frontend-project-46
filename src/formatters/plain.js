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

const plain = (obj) => {
  const iter = (node, path) => {
    const lines = Object.entries(node)
      .map(([key, val]) => {
        if (val.type === 'children') {
          return iter(val.value, `${path}${key}.`);
        }
        switch (val.type) {
          case 'added':
            return `Property '${path}${key}' was added with value: ${stringifyValue(val.value)}`;
          case 'deleted':
            return `Property '${path}${key}' was removed`;
          case 'changed':
            return `Property '${path}${key}' was updated. From ${stringifyValue(val.oldValue)} to ${stringifyValue(val.newValue)}`;
          default:
            return '';
        }
      });
    return lines.filter((str) => str !== '').join('\n');
  };
  return iter(obj, '');
};

export default plain;
