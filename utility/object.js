import {asarray} from './array.js';
import * as set from './set.js';

// There are multiple functions for array equality, with slightly different
// behaviors. See the comment of `array.equals` for details.
export function arrayEquals(xs, ys) {
  return (xs.length === ys.length &&
          asarray(xs).every((x, i) => equals(x, ys[i], true)));
}

export function mapEquals(x, y, deep=false) {
  if (x.size !== y.size) return false;
  for (const [k, v] of x.entries()) {
    if (!y.has(k)) return false;
    if (!(deep ? equals(v, y.get(k), true) : v === y.get(k))) return false;
  }
  return true;
}

export function objectEquals(x, y, deep=false) {
  const xEntries = Object.entries(x)
  if (xEntries.length !== Object.keys(y).length) return false;
  for (const [k, v] of xEntries) {
    if (!(deep ? equals(v, y[k], true) : v === y[k])) return false;
  }
  return true;
}

export function equals(x, y, deep=false) {
  if (x === y) return true;
  if (typeof(x) !== 'object') return false;  // Simple types.
  if (!x || !y) return false;  // null.
  if (x.constructor !== y.constructor) return false;  // Different types.
  if ([Set, WeakSet].includes(x.constructor)) return set.equals(x, y);  // Set.
  if ([Map, WeakMap].includes(x.constructor)) return mapEquals(x, y, deep);  // Map.
  if (Number.isFinite(x.length)) return arrayEquals(x, y);  // Array-like.
  return objectEquals(x, y, deep);  // Other objects.
}
