"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keysToCamel = exports.toCamelCase = exports.getDataFromKeys = exports.debounce = void 0;
const debounce = (func, waitFor) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), waitFor);
    };
};
exports.debounce = debounce;
const getDataFromKeys = (data, keys) => {
    return keys.reduce((outData, key) => {
        outData[key] = data[key];
        return outData;
    }, {});
};
exports.getDataFromKeys = getDataFromKeys;
const toCamelCase = (str) => str.replace(/([-_][a-z])/gi, $1 => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
});
exports.toCamelCase = toCamelCase;
const keysToCamel = obj => {
    if (obj === Object(obj) && !Array.isArray(obj) && typeof obj !== 'function') {
        const newObj = {};
        Object.keys(obj).forEach(k => {
            newObj[(0, exports.toCamelCase)(k)] = (0, exports.keysToCamel)(obj[k]);
        });
        return newObj;
    }
    else if (Array.isArray(obj)) {
        return obj.map(i => {
            return (0, exports.keysToCamel)(i);
        });
    }
    return obj;
};
exports.keysToCamel = keysToCamel;
