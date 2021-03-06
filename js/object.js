/**
 * 获取某个数据的类型
 * @param value 需要过去类型的数据
 * @returns {string} 对应类型名称
 */
 export function getType(value) {
  const str = Object.prototype.toString.call(value);
  return str.slice(8, -1);
}

/**
 * 检测a，b两个值是否相同
 * @param a
 * @param b
 * @returns {boolean}
 */
export function isSame(a, b) {
  if (getType(a) !== getType(b)) return false;
  const type = getType(a);
  if (type === 'Object') {
    return Object.keys(a).every(key => isSame(a[key], b[key]));
  }
  if (type === 'Array') {
    return a.every((item) => b.some(temp => isSame(item, temp)));
  }
  return a === b;
}

// 深度克隆
export function deepClone(srcData, hash = new WeakMap()) {
  if (srcData === null || typeof srcData !== 'object') {
    return srcData;
  }
  if (srcData instanceof Date) return new Date(srcData);
  if (srcData instanceof RegExp) return new RegExp(srcData);
  if (hash.get(srcData)) {
    return hash.get(srcData);
  }

  const newData = new srcData.constructor();
  hash.set(srcData, newData);
  const keys = [...Object.keys(srcData), ...Object.getOwnPropertySymbols(srcData)];
  keys.forEach(k => {
    newData[k] = deepClone(srcData[k], hash);
  });
  return newData;
}
