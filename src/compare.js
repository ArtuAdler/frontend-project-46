import _ from 'lodash';

const compare = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const keysUnion = _.union(keys1, keys2);
  const sortedKeysUnion = _.sortBy(keysUnion);

  return sortedKeysUnion.reduce((acc, key) => {
    const object1Value = obj1[key];
    const object2Value = obj2[key];
    if (_.isPlainObject(object1Value) && _.isPlainObject(object2Value)) {
      const object = { [key]: { type: 'children', value: compare(object1Value, object2Value) } };
      return { ...acc, ...object };
    }
    if (object1Value === object2Value) {
      return { ...acc, [key]: { type: 'unchanged', value: object1Value } };
    }
    if (_.has(obj1, key) && _.has(obj2, key)) {
      return { ...acc, [key]: { type: 'changed', oldValue: object1Value, newValue: object2Value } };
    }
    if (_.has(obj1, key)) {
      return { ...acc, [key]: { type: 'deleted', value: object1Value } };
    }
    if (_.has(obj2, key)) {
      return { ...acc, [key]: { type: 'added', value: object2Value } };
    }
    return acc;
  }, {});
};

export default compare;
