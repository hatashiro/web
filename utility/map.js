// For shallow equality. See `equals.mapEquals` for deep equality.
export function equals(x, y) {
  return (x.size === y.size &&
          x.entries().every(([k, v]) => y.has(k) && v === y.get(k)));
}
