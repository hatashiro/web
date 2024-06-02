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

export function get(arr, idx) {
  return idx.length ? get(arr[idx[0]], idx.slice(1)) : arr;
}

// Multi-dimensional set.
export function set(arr, idx, value) {
  if (arguments.length === 2) {
    // If called without `idx`, use an empty idx to set all.
    return set(arr, [], value);
  }

  // If idx is scalar, make it singleton.
  if (!Array.isArray(idx)) {
    idx = [idx];
  }

  if (idx.length === 1 && equals(shape(arr[idx[0]]), shape(value))) {
    arr[idx[0]] = value;
  } else if (idx.length === 0) {
    for (let i = 0; i < arr.length; i++) {
      set(arr, i, value);
    }
  } else {
    set(arr[idx[0]], idx.slice(1), value);
  }
}

export function map(arr, mapFn) {
  return init(shape(arr), (...idx) => mapFn(get(arr, idx), ...idx));
}

export function copy(arr) {
  return map(arr, x => x);
}
