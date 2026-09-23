/**
 * 🔹 Built-in Collections: Map, Set, WeakMap, WeakSet
 *
 * Definition:
 *  - These are the runtime containers the language gives you, already implemented.
 *  - `Map` is the same concept as the hand-rolled `HashMap` in ./HashMaps.ts —
 *    "HashMap" is the Java name, "Map" is the JavaScript one. Read that file for
 *    *why* lookups are O(1); read this one for *what you actually type*.
 *
 * Why a separate file:
 *  - Every other file here rebuilds a structure to expose its cost.
 *  - You cannot usefully rebuild these (V8 implements them in C++), so the skill
 *    is choosing the right one and knowing where each leaks.
 *
 * Complexity (average case)
 *  | Operation      | Map  | Set  | Object        | Array         |
 *  | -------------- | ---- | ---- | ------------- | ------------- |
 *  | get / has      | O(1) | O(1) | O(1)          | O(n) includes |
 *  | set / add      | O(1) | O(1) | O(1)          | O(1) push     |
 *  | delete         | O(1) | O(1) | O(1)          | O(n) splice   |
 *  | size / count   | O(1) | O(1) | O(n) keys()   | O(1) length   |
 *
 * NOTE: `Record<K, V>` is NOT in this file on purpose. It is a *type-level*
 * utility that describes the shape of a plain object and emits zero runtime code.
 * It lives in ../total-typescript-book/06-objects-classes-mutability.
 * `Record<string, T>` describes an object — it is not a Map.
 */

// ────────────────────────────────────────────────────────────────────────────
// 1) Map vs plain object
// ────────────────────────────────────────────────────────────────────────────
/**
 * A plain object only accepts string/symbol keys and inherits from
 * Object.prototype, so keys like "constructor" are already "present".
 * A Map accepts ANY key type, starts truly empty, and knows its own size in O(1).
 */

// Keys of any type — an object silently stringifies them
const keyObject = { id: 1 }
const keyFn = () => {}

const anyKeyMap = new Map<unknown, string>()
anyKeyMap.set(keyObject, 'object as key')
anyKeyMap.set(keyFn, 'function as key')
anyKeyMap.set(42, 'number as key')
anyKeyMap.set('42', 'string as key') // distinct from the number 42
// anyKeyMap.size → 4

const stringifiedKeys: Record<string, string> = {}
stringifiedKeys[42] = 'number as key'
stringifiedKeys['42'] = 'string as key' // overwrote the line above — both became "42"
// Object.keys(stringifiedKeys).length → 1

// Inherited keys — the classic bug in a hand-rolled counter
const plainCounter: Record<string, number> = {}
const inheritedIsTruthy = Boolean(({} as Record<string, unknown>)['constructor']) // → true
const mapIsClean = new Map<string, number>().has('constructor') // → false

// O(1) size vs O(n) counting
const sizeInO1 = anyKeyMap.size // property, no iteration
const sizeInOn = Object.keys(stringifiedKeys).length // builds an array first

/**
 * Choose an object when: the keys are known strings, you need JSON.stringify,
 * or you want literal `{}` syntax and spread.
 * Choose a Map when: keys are dynamic, non-string, or user-supplied.
 */

// ────────────────────────────────────────────────────────────────────────────
// 2) Map: the API and iteration
// ────────────────────────────────────────────────────────────────────────────
/**
 * `get` returns `V | undefined`, so a miss and a stored `undefined` look
 * identical — use `has` when that difference matters. Iteration order is
 * insertion order, guaranteed for every key type (objects are not).
 */

const stock = new Map<string, number>([
  ['apple', 10],
  ['banana', 0],
])

stock.set('orange', 30) // insert or overwrite
stock.get('apple') // → 10
stock.get('pear') // → undefined
stock.has('banana') // → true  (0 is stored, but falsy — this is why `has` exists)
stock.delete('apple') // → true (false if the key was absent)

// `set` returns the Map, so calls chain
stock.set('kiwi', 5).set('fig', 2)

// Three iterators; the Map itself iterates as [key, value] entries
for (const [name, qty] of stock) {
  void name
  void qty
}
const allNames = [...stock.keys()]
const allQty = [...stock.values()]
const totalQty = [...stock.values()].reduce((sum, n) => sum + n, 0)

// The idiomatic "count into a Map" line — default before increment
function tally(words: string[]): Map<string, number> {
  const counts = new Map<string, number>()
  for (const word of words) {
    counts.set(word, (counts.get(word) ?? 0) + 1)
  }
  return counts
}

// Conversions both ways
const asObject = Object.fromEntries(stock) // Map → object (string keys only)
const asMap = new Map(Object.entries(asObject)) // object → Map

/**
 * Gotcha: JSON.stringify(new Map(...)) → "{}". A Map has no JSON
 * representation, so serialise via Object.fromEntries or [...map].
 */
const notSerialisable = JSON.stringify(stock) // → "{}"

// EXERCISE 2 — Invert a Map: values become keys, keys become values.
// Assume values are unique. Do not mutate the input.
export function invertMap<K, V>(map: Map<K, V>): Map<V, K> {
  throw new Error('Not implemented')
}

// ────────────────────────────────────────────────────────────────────────────
// 3) Set: membership in O(1)
// ────────────────────────────────────────────────────────────────────────────
/**
 * A Set stores unique values with O(1) `has`. This is the whole reason
 * ../algorithms/hashmaps/hasDuplicates.ts beats a nested loop: `includes`
 * on an array is O(n), making the loop O(n²), while Set makes it O(n).
 */

const seen = new Set<number>([1, 2, 3])
seen.add(3) // no-op, already present
seen.has(2) // → true, O(1)
seen.delete(1) // → true
seen.size // → 2

// Dedupe an array — the most common one-liner in the language
const unique = [...new Set([1, 1, 2, 3, 3])] // → [1, 2, 3]

// O(n) vs O(n²): the same task, two costs
function hasDuplicatesFast(nums: number[]): boolean {
  const s = new Set<number>()
  for (const n of nums) {
    if (s.has(n)) return true // O(1) per check
    s.add(n)
  }
  return false
}

function hasDuplicatesSlow(nums: number[]): boolean {
  const acc: number[] = []
  for (const n of nums) {
    if (acc.includes(n)) return true // O(n) per check → O(n²) total
    acc.push(n)
  }
  return false
}

// EXERCISE 3 — Return the first value that appears twice, scanning left to
// right, or undefined if there are none. Must be O(n).
// firstDuplicate([2, 1, 3, 5, 3, 2]) → 3   (3 repeats before 2 does)
export function firstDuplicate(nums: number[]): number | undefined {
  throw new Error('Not implemented')
}

// EXERCISE 4 — Set algebra, without using any built-in set-operation method.
// Do not mutate the inputs.
export function intersection<T>(a: Set<T>, b: Set<T>): Set<T> {
  throw new Error('Not implemented')
}

export function difference<T>(a: Set<T>, b: Set<T>): Set<T> {
  throw new Error('Not implemented')
}

/**
 * Modern runtimes ship these natively (ES2025): a.intersection(b),
 * a.difference(b), a.union(b), a.isSubsetOf(b). They need "lib": "ESNext"
 * in tsconfig to typecheck, which this repo does not set — hence the exercise.
 */

// ────────────────────────────────────────────────────────────────────────────
// 4) WeakMap and WeakSet: keys the garbage collector can reclaim
// ────────────────────────────────────────────────────────────────────────────
/**
 * A Map holds its keys strongly — an object used as a key can never be
 * collected while the Map lives, which is a memory leak in a long-lived cache.
 * A WeakMap holds keys weakly: when nothing else references the key, the entry
 * disappears. The price is no iteration, no `.size`, and object keys only.
 */

type Element = { tag: string }

const metadata = new WeakMap<Element, { renderedAt: number }>()
let node: Element | null = { tag: 'div' }
metadata.set(node, { renderedAt: 0 })
metadata.get(node) // → { renderedAt: 0 }
node = null // the entry is now unreachable and eligible for collection

// WeakMap has only get / set / has / delete — no keys(), values(), size
const visitedNodes = new WeakSet<Element>() // "have I processed this object?"

/**
 * Use WeakMap for per-object metadata you do not own (DOM nodes, instances
 * from a library) and for caches keyed by object identity.
 * Use Map when you need to enumerate or count the entries.
 */

// EXERCISE 5 — Cache a function's result per object argument, so that calling
// it twice with the same object reference computes only once. The cache must
// not prevent the argument from being garbage collected.
export function memoizeByObject<A extends object, R>(fn: (arg: A) => R): (arg: A) => R {
  throw new Error('Not implemented')
}

// ────────────────────────────────────────────────────────────────────────────
// 5) The equality rule: SameValueZero
// ────────────────────────────────────────────────────────────────────────────
/**
 * Map and Set compare keys by SameValueZero — reference equality for objects,
 * `===` for primitives, with two exceptions: NaN equals itself, and +0 === -0.
 * See ../algorithms/notes/equality-reference.ts.
 */

// Two structurally identical objects are two different keys
const twoDistinctObjects = new Set([{ a: 1 }, { a: 1 }]).size // → 2

// Same reference collapses to one
const shared = { a: 1 }
const oneObject = new Set([shared, shared]).size // → 1

// NaN is findable in a Set, unlike with ===
const notANumber: number = NaN
const nanIsEqualToItself = new Set([NaN, NaN]).size // → 1
const nanViaTripleEquals = notANumber === notANumber // → false
const nanInArray = [NaN].includes(NaN) // → true  (includes also uses SameValueZero)
const nanViaIndexOf = [NaN].indexOf(NaN) // → -1  (indexOf uses ===)

// Zeros collapse
const zerosCollapse = new Set([0, -0]).size // → 1

/**
 * Consequence: you cannot dedupe objects with `new Set(objects)`.
 * You must reduce each object to a primitive key first — that is exercise 6.
 */

// EXERCISE 6 — Dedupe by a derived key, keeping the FIRST occurrence of each.
// dedupeBy([{id:1,n:'a'},{id:2,n:'b'},{id:1,n:'c'}], x => x.id)
//   → [{id:1,n:'a'}, {id:2,n:'b'}]
export function dedupeBy<T, K>(items: T[], keyFn: (item: T) => K): T[] {
  throw new Error('Not implemented')
}

// ────────────────────────────────────────────────────────────────────────────
// 6) Grouping
// ────────────────────────────────────────────────────────────────────────────
/**
 * Bucketing items by a computed key is the pattern behind
 * ../algorithms/hashmaps/groupAnagrams.ts. A Map handles non-string keys;
 * a plain object would stringify them.
 */

// The manual shape, written out
const people = [
  { name: 'Ana', dept: 'eng' },
  { name: 'Bo', dept: 'ops' },
  { name: 'Cy', dept: 'eng' },
]
const byDept = new Map<string, typeof people>()
for (const person of people) {
  const bucket = byDept.get(person.dept)
  if (bucket) {
    bucket.push(person)
  } else {
    byDept.set(person.dept, [person])
  }
}
// byDept → Map { "eng" => [Ana, Cy], "ops" => [Bo] }

/**
 * ES2024 added Map.groupBy(items, keyFn) and Object.groupBy(items, keyFn),
 * which do exactly the loop above. Both need "lib": "ES2024" or later; this
 * repo targets ES2022, so they are unavailable here — hence the exercise.
 * Object.groupBy also returns a partial object (values may be undefined).
 */

// EXERCISE 7 — Implement the generic grouper. Preserve encounter order both
// in the outer Map and inside each bucket.
export function groupBy<T, K>(items: T[], keyFn: (item: T) => K): Map<K, T[]> {
  throw new Error('Not implemented')
}

// ────────────────────────────────────────────────────────────────────────────
// EXERCISE 1 — Map vs object (placed last so the exports read in order)
// ────────────────────────────────────────────────────────────────────────────
// Count occurrences of each key. Must return the right count even for keys
// that collide with Object.prototype members, e.g.
// safeCount(["a", "constructor", "a", "__proto__"])
//   → Map { "a" => 2, "constructor" => 1, "__proto__" => 1 }
export function safeCount(keys: string[]): Map<string, number> {
  throw new Error('Not implemented')
}

// Silence "declared but never read" noise from the reference examples above.
void [
  inheritedIsTruthy,
  mapIsClean,
  sizeInO1,
  sizeInOn,
  plainCounter,
  allNames,
  allQty,
  totalQty,
  asMap,
  notSerialisable,
  unique,
  hasDuplicatesFast,
  hasDuplicatesSlow,
  seen,
  metadata,
  visitedNodes,
  twoDistinctObjects,
  oneObject,
  nanIsEqualToItself,
  nanViaTripleEquals,
  nanInArray,
  nanViaIndexOf,
  zerosCollapse,
  byDept,
  tally,
]
