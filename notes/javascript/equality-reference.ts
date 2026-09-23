
/**
 * Reference vs Value Equality  (and how to compare arrays / Maps / objects)
 * ==========================================================================
 *
 * THE ONE RULE:
 *   `===` asks "same VALUE?"  for primitives (number, string, boolean, null, undefined)
 *   `===` asks "same BOX?"    for objects, arrays, Maps, Sets  (reference identity)
 *
 * So two DIFFERENT boxes with identical contents are NOT `===`.
 * To ask "same CONTENTS?" about a box, you must compare it yourself:
 *   -> walk one and check the other.
 *
 * This file is runnable:  npx tsx algorithms/notes/equality-reference.ts
 */

const line = (label: string, val: unknown) => console.log(label.padEnd(50), val);

// ---------------------------------------------------------------------------
// A. Primitives compare by VALUE
// ---------------------------------------------------------------------------
line("1 === 1", 1 === 1);                 // true
line('"a" === "a"', "a" === "a");         // true
line("true === true", true === true);     // true

// ---------------------------------------------------------------------------
// B. Objects / arrays / Maps compare by REFERENCE ("same box?")
// ---------------------------------------------------------------------------
const arr1 = [1, 2, 3];
const arr2 = [1, 2, 3];
line("arr1 === arr2  (identical contents, 2 boxes)", arr1 === arr2); // false !
const arr3 = arr1;                        // NOT a copy — a 2nd label on the same box
line("arr3 === arr1  (arr3 = arr1)", arr3 === arr1);                 // true

// Proof arr3 and arr1 are the same box: mutating one changes the other.
arr3.push(4);
line("after arr3.push(4), arr1 is", arr1);                           // [1,2,3,4]

const mA = new Map([["a", 2], ["b", 1]]);
const mB = new Map([["a", 2], ["b", 1]]);
line("mA === mB  (identical Maps)", mA === mB);                      // false
line("{x:1} === {x:1}", ({ x: 1 } as any) === ({ x: 1 } as any));   // false

// ---------------------------------------------------------------------------
// C. The JSON.stringify "workaround" — and why it's fragile
//    Stringifying turns a box into a primitive string, so === compares by value.
//    But it's order-sensitive and breaks on undefined/functions/Map/Set/NaN.
// ---------------------------------------------------------------------------
line("stringify([1,2,3]) === stringify([1,2,3])",
     JSON.stringify([1, 2, 3]) === JSON.stringify([1, 2, 3]));       // true
line("stringify({a,b}) === stringify({b,a})  (order!)",
     JSON.stringify({ a: 1, b: 2 }) === JSON.stringify({ b: 2, a: 1 })); // false (trap)

// ===========================================================================
// D. COMPARING TWO MAPS by contents  — guard on size, walk one, check the other
// ===========================================================================
function mapsEqual(x: Map<string, number>, y: Map<string, number>): boolean {
  if (x.size !== y.size) return false;      // cheap reject first
  for (const [k, v] of x) {                 // walk x's entries
    if (y.get(k) !== v) return false;       // check each against y (missing key -> undefined -> fails)
  }
  return true;
}
line("mapsEqual(mA, mB)", mapsEqual(mA, mB));                        // true
line("mapsEqual(mA, {a:2,b:9})", mapsEqual(mA, new Map([["a", 2], ["b", 9]]))); // false

// ===========================================================================
// D2. COMPARING TWO OBJECTS by contents — SAME logic as D, different tools.
//     Objects have no .size / .get, so:  x.size -> Object.keys(x).length
//                                         x.get(k) -> x[k]
//     Object.entries(x) yields [key, value] pairs, exactly like iterating a Map.
// ===========================================================================
function objectsEqual(x: Record<string, number>, y: Record<string, number>): boolean {
  if (Object.keys(x).length !== Object.keys(y).length) return false; // the "size" guard
  for (const [k, v] of Object.entries(x)) {  // walk x's pairs (mirrors `for (const [k,v] of map)`)
    if (y[k] !== v) return false;            // value-in-x vs value-in-y (missing key -> undefined -> fails)
  }
  return true;
}
line("objectsEqual({a:2,b:1},{a:2,b:1})", objectsEqual({ a: 2, b: 1 }, { a: 2, b: 1 })); // true
line("objectsEqual({a:2,b:1},{a:2,b:9})", objectsEqual({ a: 2, b: 1 }, { a: 2, b: 9 })); // false
line("objectsEqual({a:2,b:1},{a:2})", objectsEqual({ a: 2, b: 1 }, { a: 2 } as any));    // false
line("key order irrelevant for objects", objectsEqual({ a: 1, b: 2 }, { b: 2, a: 1 }));  // true

// Three ways objects differ from Maps:
//   1. Keys are ALWAYS strings — obj[1] and obj["1"] are the same key (a Map keeps them distinct).
//   2. Not directly iterable — you need Object.keys / Object.values / Object.entries.
//   3. Still SHALLOW: nested objects compare by reference, so this returns false ->
line("SHALLOW: {v:{n:1}} vs {v:{n:1}}",
     objectsEqual({ v: { n: 1 } } as any, { v: { n: 1 } } as any)); // false — inner objects are different boxes

// ===========================================================================
// E. COMPARING TWO ARRAYS — first ask: does ORDER matter?
// ===========================================================================

// E1. ORDER MATTERS -> walk by index.  O(n)
function arraysEqualOrdered(x: number[], y: number[]): boolean {
  if (x.length !== y.length) return false;  // guard is required for correctness,
  for (let i = 0; i < x.length; i++) {      // not just speed: the loop only checks
    if (x[i] !== y[i]) return false;        // x.length slots; without it a shorter x
  }                                         // would "match" a longer y's prefix.
  return true;
}
line("ordered [1,2,3] vs [1,2,3]", arraysEqualOrdered([1, 2, 3], [1, 2, 3])); // true
line("ordered [1,2,3] vs [3,2,1]", arraysEqualOrdered([1, 2, 3], [3, 2, 1])); // false

// E2. ORDER DOESN'T MATTER, option A -> sort COPIES, then ordered-compare.  O(n log n)
function arraysEqualUnorderedSort(x: number[], y: number[]): boolean {
  if (x.length !== y.length) return false;
  const a = [...x].sort((p, q) => p - q);   // [...x] copies first — see the .sort() trap below
  const b = [...y].sort((p, q) => p - q);
  return a.every((v, i) => v === b[i]);
}
line("unordered-sort [1,2,3] vs [3,2,1]", arraysEqualUnorderedSort([1, 2, 3], [3, 2, 1])); // true

// E3. ORDER DOESN'T MATTER, option B -> tally with a Map (the anagram pattern).  O(n)
//     Count x UP, count y DOWN; fail if anything is missing or goes negative.
function arraysEqualUnorderedTally(x: number[], y: number[]): boolean {
  if (x.length !== y.length) return false;
  const count = new Map<number, number>();
  for (const v of x) count.set(v, (count.get(v) ?? 0) + 1);
  for (const v of y) {
    const c = count.get(v);
    if (c === undefined || c === 0) return false; // y has one x doesn't
    count.set(v, c - 1);
  }
  return true; // lengths equal + nothing left over => same multiset
}
line("unordered-tally [1,2,2,3] vs [3,2,1,2]", arraysEqualUnorderedTally([1, 2, 2, 3], [3, 2, 1, 2])); // true
line("unordered-tally [1,2,2,3] vs [3,2,1,3]", arraysEqualUnorderedTally([1, 2, 2, 3], [3, 2, 1, 3])); // false

// ---------------------------------------------------------------------------
// F. The .sort() mutation trap — sort() reorders IN PLACE and returns the SAME box.
//    Always sort a copy ([...x]) when comparing, so you don't rearrange the caller's data.
// ---------------------------------------------------------------------------
const original = [3, 1, 2];
original.sort((a, b) => a - b);
line("after original.sort(), original is", original); // [1,2,3] — the original changed!

/**
 * DECISION TABLE
 * --------------
 * Comparing two boxes for CONTENTS ("walk one, check the other" every time):
 *   Maps         -> guard on .size, `for (const [k,v] of x)`, y.get(k) !== v   (D)
 *   Objects      -> guard on Object.keys().length, x[k] !== y[k]               (D2)
 *   Arrays, order matters      -> walk by index                               (E1)  O(n)
 *   Arrays, order irrelevant   -> sort copies + compare                       (E2)  O(n log n)
 *                              or tally with a Map (anagram pattern)           (E3)  O(n)
 *
 * ALWAYS: length/size guard first (cheap reject) + never mutate the inputs.
 * NOTE:   all of these are SHALLOW — nested boxes still compare by reference.
 *         Comparing nested contents means recursing (that's what deepEqual does).
 */

export {
  mapsEqual,
  objectsEqual,
  arraysEqualOrdered,
  arraysEqualUnorderedSort,
  arraysEqualUnorderedTally,
};
