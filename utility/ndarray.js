// Check if two ndarrays are equal. Similar to object.arrayEquals, except that
// this function only checks arrays.
export function equals(X, Y) {
  if (Array.isArray(X) && Array.isArray(Y)) {
    if (X.length !== Y.length) return false;
    return X.every((x, i) => equals(x, Y[i]));
  } else {
    return X === Y;
  }
}

export function init(shape, valueFn) {
  if (typeof(valueFn) !== 'function') {
    const value = valueFn;
    valueFn = () => value;
  }

  function _init(shape, idx) {
    const arr = [];
    const shape_ = shape.slice(1);
    for (let i = 0; i < shape[0]; i++) {
      const idx_ = idx.concat(i);
      arr.push(shape_.length ? _init(shape_, idx_) : valueFn(...idx_));
    }
    return arr;
  }

  return _init(shape, []);
}

export function shape(arr) {
  return Array.isArray(arr) ? [arr.length].concat(shape(arr[0])) : [];
}

export function index(arr, idx) {
  return idx.length ? index(arr[idx[0]], idx.slice(1)) : arr;
}

export function map(arr, mapFn) {
  return init(shape(arr), (...idx) => mapFn(index(arr, idx), ...idx));
}
