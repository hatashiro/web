import {asarray} from './array.js';
import * as set from './set.js';

// There are multiple functions for array equality, with slightly different
// behaviors. See the comment of `array.equals` for details.
export function arrayEquals(xs, ys) {
  return (xs.length === ys.length &&
          asarray(xs).every((x, i) => equals(x, ys[i])));
}

// See `map.equals` too.
export function mapEquals(x, y) {
  return (x.size === y.size &&
          x.entries().every(([k, v]) => y.has(k) && equals(v, y.get(k))));
}

// See `object.equals` too.
export function objectEquals(x, y) {
  return (Object.keys(x).length === Object.keys(y).length &&
          Object.entries(x).every(([k, v]) => equals(v, y[k])));
}

export function equals(x, y) {
  if (x === y) return true;
  if (typeof(x) !== 'object') return false;  // Simple types.
  if (!x || !y) return false;  // null.
  if (x.constructor !== y.constructor) return false;  // Different types.
  if ([Set, WeakSet].includes(x.constructor)) return set.equals(x, y);  // Set.
  if ([Map, WeakMap].includes(x.constructor)) return mapEquals(x, y);  // Map.
  if (Number.isFinite(x.length)) return arrayEquals(x, y);  // Array-like.
  return objectEquals(x, y);  // Other objects.
}
