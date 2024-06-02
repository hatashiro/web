export function choose(ps) {
  if (Number.isFinite(ps)) {
    ps = [1 - ps, ps];
  }

  let x = Math.random();
  for (let i = 0; i < ps.length; i++) {
    x -= ps[i];
    if (x < 0) return i;
  }
  return ps.length - 1;
}
