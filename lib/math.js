function withSpread(fn) {
  return (...xs) =>
    // If it's an object, spread it assuming it's container-like.
    (xs.length === 1 && typeof(xs[0]) === 'object') ? fn(...xs[0]) : fn(...xs);
}

export const max = withSpread(Math.max);
export const min = withSpread(Math.min);

export function argbest(xs, isBetter) {
  if (xs.length === 0) return -1;
  let best = xs[0];
  let bestIdx = 0;
  for (let i = 1; i < xs.length; i++) {
    if (isBetter(best, xs[i])) {
      best = xs[i];
      bestIdx = i;
    }
  }
  return bestIdx;
}

export function argmax(xs) {
  return argbest(xs, (best, x) => x > best);
}

export function argmin(xs) {
  return argbest(xs, (best, x) => x < best);
}

export function sum(xs) {
  let res = 0;
  for (const x of xs) res += x;
  return res;
}

function len(xs) {
  return xs.length ?? xs.size;
}

export function mean(xs) {
  return sum(xs) / len(xs);
}

export const average = mean;

export function variance(xs) {
  const m = mean(xs);
  let res = 0;
  for (const x of xs) res += (x - m) ** 2;
  return res / len(xs);
}

export function std(xs) {
  return Math.sqrt(variance(xs));
}

function containerMap(xs, f) {
  const res = new xs.constructor();
  for (const x of xs) {
    const x_ = f(x);
    res.push ? res.push(x_) : res.add(x_);
  }
  return res;
}

export function rescale(xs, range=[0, 1]) {
  const [a, b] = range;
  const max_x = max(xs);
  const min_x = min(xs);
  const scaleFactor = (b - a) / (max_x - min_x);
  return containerMap(xs, x => a + (x - min_x) * scaleFactor);
}

export function standardize(xs) {
  const mu = mean(xs);
  const sig = std(xs);
  return containerMap(xs, x => (x - mu) / sig);
}
