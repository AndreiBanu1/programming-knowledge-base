const a = { state: { center: { point: { x: 10, y: 20 } } } };
const b = { state: { center: { point: { x: 10, y: 20 } } } };
const get = (i) => (i % 2 ? a : b);

let result = 0;
for (let i = 0; i < 100_000; i++) {
  result = result + get(i).state.center.point.x;
}

// 1. proxy access
const point = new Proxy({ x: 10, y: 20 }, { get: (t, k) => t[k] })
 
for (let _ = 0, i = 0; i < 100_000; i++) { _ += point.x }