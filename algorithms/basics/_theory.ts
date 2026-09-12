/**
 * Basics — array traversal fundamentals
 * =====================================
 *
 * The warm-up problems. They're all one pass over an array; the only real
 * decisions are which DIRECTION to walk and what to carry along.
 *
 * The shapes:
 *
 *   1. FORWARD PASS      accumulate as you go: sum, count, build output.
 *                        -> fizzBuzz
 *
 *   2. BACKWARD PASS     when each element depends on what's to its RIGHT.
 *                        Walking right-to-left means that information is
 *                        already computed — a "suffix" value, O(n) instead of
 *                        O(n^2) nested lookups.
 *                        -> replaceElementsInArray (greatest element to right)
 *
 *   3. SET OPERATIONS    membership questions across two collections: which
 *                        elements are in A but not B?
 *                        -> findDifferenceOfTwoArrays
 *
 * The loop menu:
 *   for (let i = 0; ...)      you need the index, or to walk backwards
 *   for (const x of arr)      you only need values
 *   .map / .filter / .reduce  building a NEW array/value, no early exit
 *   .some / .every           short-circuiting boolean checks
 *   for...in                 basically never on arrays (string keys, prototype)
 *
 * Watch out for:
 *   - Mutating an array while iterating it — indices shift under you. Build a
 *     new array, or walk backwards.
 *   - With `noUncheckedIndexedAccess` on, `arr[i]` is `T | undefined`; narrow
 *     it or use `!` when the bounds are obviously safe.
 *   - Ordering of `if` branches: FizzBuzz needs the `&&` case first, or 15
 *     never prints "FizzBuzz".
 *   - `new Array(3).fill(0)` for a real array; `new Array(3)` alone has holes
 *     that `.map` silently skips.
 */

// --- 1. Forward pass: branch ordering matters ------------------------------
// The combined condition has to come first — it's the most specific one.
export function fizzBuzz(n: number): string[] {
  const out: string[] = [];

  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) out.push("FizzBuzz"); // most specific FIRST
    else if (i % 3 === 0) out.push("Fizz");
    else if (i % 5 === 0) out.push("Buzz");
    else out.push(String(i));
  }
  return out;
}
// fizzBuzz(5) -> ["1", "2", "Fizz", "4", "Buzz"]

// --- 2. Backward pass: each element wants info from its right --------------
// Walking right-to-left, `max` is already "the greatest to the right of i".
// Write first, THEN update max — otherwise the element sees itself.
export function replaceWithGreatestOnRight(arr: number[]): number[] {
  let max = -1; // nothing to the right of the last element

  for (let i = arr.length - 1; i >= 0; i--) {
    const current = arr[i]!;
    arr[i] = max; // write the suffix max
    max = Math.max(current, max); // then extend it to include current
  }
  return arr;
}
// replaceWithGreatestOnRight([17, 18, 5, 4, 6, 1]) -> [18, 6, 6, 6, 1, -1]

// --- 3. Set operations: what's in A but not in B ---------------------------
// Sets make membership O(1) and dedupe the result for free.
export function difference(a: number[], b: number[]): [number[], number[]] {
  const setA = new Set(a);
  const setB = new Set(b);

  return [
    [...setA].filter((n) => !setB.has(n)), // in A only
    [...setB].filter((n) => !setA.has(n)), // in B only
  ];
}
// difference([1, 2, 3], [2, 4, 6]) -> [[1, 3], [4, 6]]
