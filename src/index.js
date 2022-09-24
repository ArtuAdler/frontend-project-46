import path from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';

const getFilePath = (filepath) => path.resolve(process.cwd(), filepath);

const stringify = (data, symb = ' ', count = 3) => {
    const tab = symb.repeat(count);
    let x = JSON.stringify(data, null, tab)
    return x.replaceAll('"', '').replaceAll(',', '')
}

const findDifference = (obj1, obj2) => {
    const keys = _.union(_.keys(obj1), _.keys(obj2));
    const newObj = {};
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    for (const k of keys1) {
        if (!keys2.includes(k)) {
            newObj['- ' + [k]] = obj1[k];
        }
    }
    for (const k of keys) {
        if (keys2.includes(k) && keys1.includes(k)) {
            if (obj2[k] !== obj1[k]) {
                newObj['- ' + [k]] = obj1[k];
                newObj['+ ' + [k]] = obj2[k];
            }
            if (obj2[k] === obj1[k]) {
                newObj['  ' + k] = obj1[k];
            }
        }
    }
    for (const k of keys2) {
        if (!keys1.includes(k)) {
            newObj['+ ' + [k]] = obj2[k];
        }
    }
    return newObj;
};

const genDiff = (file1, file2) => {
    const data1 = readFileSync(getFilePath(file1), 'utf-8');
    const data2 = readFileSync(getFilePath(file2), 'utf-8');

    const obj1 = JSON.parse(data1);
    const obj2 = JSON.parse(data2);

    const answer = findDifference(obj1, obj2);
    return stringify(answer);
}

export default genDiff;