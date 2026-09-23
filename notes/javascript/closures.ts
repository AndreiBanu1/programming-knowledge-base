/**
 * Closures & Lexical Scope
 * ========================
 *
 * A closure = a function bundled together with the variables from the scope
 * where it was DEFINED. An inner function "remembers" those variables even
 * after the outer function has returned.
 *
 * THE ONE RULE (lexical scope):
 *   A function looks up a variable where it was WRITTEN (defined),
 *   not where it was CALLED.
 *
 * Runnable:  npx tsx algorithms/notes/closures.ts
 */

// ---------------------------------------------------------------------------
// Quiz 1 — which `color` does the inner function see?
// ---------------------------------------------------------------------------
const color = "blue";

function createFunc() {
  const color = "red";
  return function () {
    console.log(color); // looks up `color` where THIS function was defined -> "red"
  };
}

const myFunc = createFunc();
myFunc(); // "red"  — not "blue". The inner fn closed over createFunc's `color`.

// ---------------------------------------------------------------------------
// Why it matters — closures give functions private, persistent state.
// Each call to makeCounter() creates a FRESH `count` that only its returned
// function can touch. Two counters don't share state.
// ---------------------------------------------------------------------------
function makeCounter() {
  let count = 0;              // private to this closure
  return function () {
    count++;                 // remembered across calls
    return count;
  };
}

const a = makeCounter();
const b = makeCounter();
console.log(a(), a(), a()); // 1 2 3
console.log(b());           // 1  — b has its own independent count

// ---------------------------------------------------------------------------
// Classic gotcha — `var` in a loop shares ONE binding; `let` makes a new one
// per iteration. Closures capture the variable, not its value-at-creation.
// ---------------------------------------------------------------------------
const withVar: Array<() => number> = [];
for (var i = 0; i < 3; i++) {
  withVar.push(() => i); // all close over the SAME `i`
}
console.log(withVar.map((f) => f())); // [3, 3, 3]  — loop finished, i is 3

const withLet: Array<() => number> = [];
for (let j = 0; j < 3; j++) {
  withLet.push(() => j); // each closes over its OWN `j`
}
console.log(withLet.map((f) => f())); // [0, 1, 2]

export { createFunc, makeCounter };