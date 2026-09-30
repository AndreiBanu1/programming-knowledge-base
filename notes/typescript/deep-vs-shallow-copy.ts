/**
 * Deep copy vs Shallow copy
 * =========================
 *
 * THE CORE IDEA:
 *   An object / array / Map / Set is a "box" in memory. A variable holds only a
 *   REFERENCE (address) to the box, not the box itself.
 *
 *   - Assignment (`b = a`)  -> NOT a copy. Two labels on the SAME box.
 *   - Shallow copy          -> a NEW box at the top level, but nested boxes
 *                              (objects in objects, arrays in objects) are
 *                              SHARED with the original.
 *   - Deep copy             -> a new box at EVERY level. Nothing is shared.
 *
 * See also: notes/typescript/equality-reference.ts (=== compares references, not contents).
 *
 * This file is runnable:  node notes/typescript/deep-vs-shallow-copy.ts
 */

const line = (label: string, val: unknown) => console.log(label.padEnd(55), val)
const section = (title: string) => console.log(`\n--- ${title} ---`)

type Album = {
  title: string
  year: number
  artist: { name: string; country: string }
  genres: string[]
}

const makeAlbum = (): Album => ({
  title: 'Abbey Road',
  year: 1969,
  artist: { name: 'The Beatles', country: 'UK' },
  genres: ['rock', 'pop'],
})

// ---------------------------------------------------------------------------
// A. Assignment copies nothing
// ---------------------------------------------------------------------------
section('A. Assignment = same reference')
{
  const original = makeAlbum()
  const alias = original

  alias.title = 'Let It Be'
  line('original.title after alias.title = ...', original.title) // 'Let It Be' !
  line('alias === original', alias === original) // true
}

// ---------------------------------------------------------------------------
// B. Shallow copy — top level is new, everything below is shared
//
//    Common ways:
//      objects: { ...obj }, Object.assign({}, obj)
//      arrays:  [...arr], arr.slice(), Array.from(arr), arr.concat()
//      Map/Set: new Map(map), new Set(set)
// ---------------------------------------------------------------------------
section('B. Shallow copy')
{
  const original = makeAlbum()
  const copy = { ...original }

  line('copy === original', copy === original) // false — new box
  line('copy.artist === original.artist', copy.artist === original.artist) // true — SHARED

  // Top-level primitives are copied by value -> independent
  copy.title = 'Help!'
  line('original.title (after copy.title = ...)', original.title) // 'Abbey Road' ✔

  // But nested objects are the same boxes -> the mutation leaks into the original
  copy.artist.name = 'Wings'
  copy.genres.push('experimental')
  line('original.artist.name', original.artist.name) // 'Wings' ✘
  line('original.genres', original.genres) // ['rock','pop','experimental'] ✘
}

{
  // Same thing with arrays of objects
  const tracks = [{ name: 'Come Together' }, { name: 'Something' }]
  const tracksCopy = [...tracks]

  tracksCopy.push({ name: 'Octopus’s Garden' }) // fine: the array itself is new
  tracksCopy[0]!.name = 'CHANGED' // ✘ the element is the same object
  line('tracks.length (after push into copy)', tracks.length) // 2 ✔
  line('tracks[0].name (after mutating copy)', tracks[0]!.name) // 'CHANGED' ✘
}

// ---------------------------------------------------------------------------
// C. Deep copy with structuredClone() — the default choice today
//
//    Global in modern browsers and Node >= 17.
//    ✔ Handles: objects, arrays, Date, Map, Set, RegExp, typed arrays,
//               ArrayBuffer, Error, circular references, NaN / Infinity / undefined.
//    ✘ Does NOT handle: functions (throws DataCloneError), DOM nodes, Symbols.
//    ⚠ Drops the prototype: a class instance comes back as a plain object (no
//      methods) — and TypeScript does NOT warn you, because the signature is
//      `<T>(value: T) => T`.
// ---------------------------------------------------------------------------
section('C. structuredClone')
{
  const original = makeAlbum()
  const deep = structuredClone(original)

  deep.artist.name = 'Wings'
  deep.genres.push('experimental')
  line('original.artist.name', original.artist.name) // 'The Beatles' ✔
  line('original.genres', original.genres) // ['rock','pop'] ✔
  line('deep.artist === original.artist', deep.artist === original.artist) // false ✔
}

{
  // "Special" types and circular references — all fine
  type Node = { value: number; next?: Node }
  const a: Node = { value: 1 }
  a.next = a // cycle

  const data = {
    releasedAt: new Date('1969-09-26'),
    tags: new Set(['classic']),
    ratings: new Map([['rym', 4.3]]),
    loop: a,
  }
  const cloned = structuredClone(data)

  line('cloned.releasedAt instanceof Date', cloned.releasedAt instanceof Date) // true
  line('cloned.tags instanceof Set', cloned.tags instanceof Set) // true
  line('cloned.loop.next === cloned.loop (cycle kept)', cloned.loop.next === cloned.loop) // true
}

{
  // Gotcha: functions
  try {
    structuredClone({ onPlay: () => console.log('play') })
  } catch (e) {
    line('structuredClone with a function ->', (e as Error).name) // 'DataCloneError'
  }

  // Gotcha: classes lose their methods (the type says Track, but it lies)
  class Track {
    name: string
    constructor(name: string) {
      this.name = name
    }
    shout() {
      return this.name.toUpperCase()
    }
  }
  const cloned = structuredClone(new Track('Something'))
  line('cloned instanceof Track', cloned instanceof Track) // false
  line('typeof cloned.shout', typeof cloned.shout) // 'undefined' — yet TS says () => string
}

// ---------------------------------------------------------------------------
// D. JSON.parse(JSON.stringify(x)) — the "poor man's deep copy"
//
//    Only safe for pure JSON data (string, number, boolean, null, objects, arrays).
//    Anything else gets silently corrupted:
// ---------------------------------------------------------------------------
section('D. JSON.parse(JSON.stringify(...)) — gotchas')
{
  const tricky = {
    date: new Date('1969-09-26'), // -> becomes a string
    missing: undefined, // -> the key DISAPPEARS
    notANumber: NaN, // -> null
    inf: Infinity, // -> null
    map: new Map([['a', 1]]), // -> {} (empty!)
    set: new Set([1, 2]), // -> {} (empty!)
    fn: () => 42, // -> DISAPPEARS
  }
  const viaJson = JSON.parse(JSON.stringify(tricky))

  line('typeof viaJson.date', typeof viaJson.date) // 'string'
  line("'missing' in viaJson", 'missing' in viaJson) // false
  line('viaJson.notANumber', viaJson.notANumber) // null
  line('viaJson.map', viaJson.map) // {}
  line("'fn' in viaJson", 'fn' in viaJson) // false
  // On top of that it returns `any` -> you lose all type safety.

  const cyclic: { self?: unknown } = {}
  cyclic.self = cyclic
  try {
    JSON.stringify(cyclic)
  } catch (e) {
    line('JSON.stringify on a cycle ->', (e as Error).name) // 'TypeError'
  }
}

// ---------------------------------------------------------------------------
// E. Hand-written deep clone (to understand the mechanism)
//
//    Recursive: primitives are returned as-is, containers are rebuilt.
//    `seen` (WeakMap) handles circular references.
//    In production: structuredClone or lodash `cloneDeep`.
// ---------------------------------------------------------------------------
section('E. Manual deepClone')

function deepClone<T>(value: T, seen = new WeakMap<object, unknown>()): T {
  // Primitives (and functions) don't need copying
  if (typeof value !== 'object' || value === null) return value

  // Cycle: we've seen this object before -> return the copy already made
  if (seen.has(value)) return seen.get(value) as T

  if (value instanceof Date) return new Date(value.getTime()) as T

  if (value instanceof Map) {
    const result = new Map()
    seen.set(value, result)
    value.forEach((v, k) => result.set(deepClone(k, seen), deepClone(v, seen)))
    return result as T
  }

  if (value instanceof Set) {
    const result = new Set()
    seen.set(value, result)
    value.forEach((v) => result.add(deepClone(v, seen)))
    return result as T
  }

  if (Array.isArray(value)) {
    const result: unknown[] = []
    seen.set(value, result)
    value.forEach((item) => result.push(deepClone(item, seen)))
    return result as T
  }

  // Plain object / class instance — keep the prototype (unlike structuredClone)
  const result = Object.create(Object.getPrototypeOf(value))
  seen.set(value, result)
  for (const key of Reflect.ownKeys(value)) {
    result[key] = deepClone((value as Record<PropertyKey, unknown>)[key], seen)
  }
  return result
}

{
  const original = makeAlbum()
  const deep = deepClone(original)
  deep.artist.name = 'Wings'
  line('original.artist.name (deepClone)', original.artist.name) // 'The Beatles' ✔
}

// ---------------------------------------------------------------------------
// F. Immutable update = copy ONLY the path you change
//
//    You often don't need a full deep copy (expensive on big objects).
//    Shallow-copy each level you modify; everything else stays shared
//    ("structural sharing"). This is how React state, Redux and Immer work.
// ---------------------------------------------------------------------------
section('F. Immutable update (structural sharing)')
{
  const original = makeAlbum()

  const updated: Album = {
    ...original, // level 1 copied
    artist: { ...original.artist, name: 'Wings' }, // level 2 copied ONLY here
    // genres is untouched -> same reference (fine, we're not changing it)
  }

  line('original.artist.name', original.artist.name) // 'The Beatles' ✔
  line('updated.artist !== original.artist', updated.artist !== original.artist) // true
  line('updated.genres === original.genres (shared)', updated.genres === original.genres) // true

  // For arrays, use the methods that return a NEW array:
  //   map, filter, concat, [...arr, x], and in ES2023+ toSorted, toReversed, toSpliced, with
  const moreGenres = [...original.genres, 'experimental']
  const sorted = [...original.genres].sort() // copy, then sort (ES2023: original.genres.toSorted())
  line('moreGenres', moreGenres)
  line('sorted !== original.genres', sorted !== original.genres)
}

/**
 * ---------------------------------------------------------------------------
 * SUMMARY
 * ---------------------------------------------------------------------------
 *
 * | Method                        | Depth     | Date/Map/Set  | Cycles   | Functions | Classes          |
 * |-------------------------------|-----------|---------------|----------|-----------|------------------|
 * | b = a                         | 0 (alias) | -             | -        | -         | -                |
 * | {...a}, Object.assign, [...a] | shallow   | by reference  | ✔        | copied    | ✘ spread drops prototype |
 * | JSON.parse(JSON.stringify(a)) | deep      | ✘ corrupted   | ✘ throws | ✘ dropped | ✘                |
 * | structuredClone(a)            | deep      | ✔             | ✔        | ✘ throws  | ✘ plain object   |
 * | manual deepClone / cloneDeep  | deep      | ✔ (if coded)  | ✔        | by ref    | ✔ prototype kept |
 *
 * Which one when:
 *   - Only changing the top level?          -> spread / shallow copy.
 *   - Updating a nested field (state)?      -> spread along the changed path (section F).
 *   - Need a fully isolated copy?           -> structuredClone.
 *   - Data with functions / class instances? -> lodash cloneDeep or a manual clone.
 *
 * Link to immutability (see immutability.ts):
 *   If the data is immutable (Readonly / DeepReadonly / Object.freeze) you no
 *   longer need defensive copies — nobody can mutate the shared box.
 */
