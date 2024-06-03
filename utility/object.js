// Checks if a value is a (plain) object.
export function isObject(x, plain=false) {
  return x instanceof Object && (!plain || x.constructor === Object);
}

// Checks equality only within objects (nested, if deep=true).
// Use `equals.objectEquals` for deep equality with other types of objects.
export function equals(x, y, deep=false) {
  return (Object.keys(x).length === Object.keys(y).length &&
          Object.entries(x).every(([k, v]) =>
            (deep && isObject(v) && isObject(y[k])) ? equals(v, y[k], true)
                                                    : v === y[k]));
}
