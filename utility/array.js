// A faster version of `Array.from`.
export function asarray(xs) {
  return xs instanceof Array ? xs : Array.from(xs);
}

// There are multiple functions for array equality.
// - `array.equals` for shallow equality.
// - `ndarray.equals` for deep equality only within ndarrays.
// - `equals.arrayEquals` for deep equality including other types of objects.
export function equals(xs, ys) {
  return xs.length === ys.length && asarray(xs).every((x, i) => x === ys[i]);
}
