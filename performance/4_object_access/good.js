const a = { x: 10, y: 20 }.x;
const b = { x: 10, y: 20 }.x;
const get = (i) => (i % 2 ? a : b);

let result = 0;
for (let i = 0; i < 100_000; i++) {
  result = result + get(i);
}

// 2. direct access
const point = { x: 10, y: 20 }
const x = point.x
 
for (let _ = 0, i = 0; i < 100_000; i++) { _ += x }