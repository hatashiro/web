export function equals(xs, ys) {
  return xs.size === ys.size && Array.from(xs).every(x => ys.has(x));
}
