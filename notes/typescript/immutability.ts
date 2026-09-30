/**
 * Immutability in TypeScript
 * ==========================
 *   const · readonly · Readonly<T> · as const · DeepReadonly<T> · Object.freeze()
 * 
 * RULE to remember:
 *     const / readonly protects the reference to an object
 *     as const / Readonly<T> protects the properties of the object
 *     const and Object.freeze() are runtime safety (exists in JS) 
 *     readonly, as const, Readonly<T> are TS only (no JS equivalent after compilation)
 *
 * THE TWO QUESTIONS TO ASK OF EACH TOOL:
 *   1. WHEN does it protect?  compile time (types only, erased at runtime)
 *                             or runtime (JS actually refuses the write)?
 *   2. HOW DEEP?              only the binding / top level (shallow), or every level (deep)?
 *
 *   | Tool             | When          | Depth                  | Protects                  |
 *   |------------------|---------------|------------------------|---------------------------|
 *   | const            | compile + run | the binding only       | reassignment of variable  |
 *   | readonly         | compile only  | one property / array   | writes to that property   |
 *   | Readonly<T>      | compile only  | shallow (top level)    | writes to T's properties  |
 *   | as const         | compile only  | deep (whole literal)   | writes + narrows literals |
 *   | DeepReadonly<T>  | compile only  | deep (custom type)     | writes at any level       |
 *   | Object.freeze()  | runtime (+ Readonly<T> type) | shallow | writes, adds, deletes     |
 *
 * See also: total-typescript-book/07-mutability-and-inference/ for the book exercises,
 *           notes/typescript/deep-vs-shallow-copy.ts for why shared references matter.
 *
 * This file is runnable:  node notes/typescript/immutability.ts
 * Lines marked `@ts-expect-error` are intentional compile errors — tsc fails if
 * the error ever goes away, so the notes stay honest.
 */

import type { Equal, Expect, NotEqual } from '../../total-typescript-book/helpers'

const line = (label: string, val: unknown) => console.log(label.padEnd(55), val)
const section = (title: string) => console.log(`\n--- ${title} ---`)

// ===========================================================================
// 1. const — freezes the BINDING, not the value
// ===========================================================================
section('1. const')
{
  const album = { title: 'Abbey Road', genres: ['rock'] }

  try {
    // @ts-expect-error — cannot reassign a const variable
    album = { title: 'Help!', genres: [] }
  } catch (e) {
    // const is also enforced at RUNTIME (unlike readonly / as const)
    line('reassigning a const ->', (e as Error).constructor.name) // TypeError
  }

  // ...but the object it points to is fully mutable
  album.title = 'Let It Be'
  album.genres.push('pop')
  line('album after mutation through a const', album)

  // Side effect on inference: const + primitive -> literal type (can't change later)
  const genre = 'rock' //   type: 'rock'
  let genre2 = 'rock' //    type: string (widened, because it may be reassigned)
  genre2 = 'pop'
  type _ = [Expect<Equal<typeof genre, 'rock'>>, Expect<Equal<typeof genre2, string>>]
}

// ===========================================================================
// 2. readonly — a modifier on individual properties / arrays / tuples
// ===========================================================================
section('2. readonly')
{
  interface Album {
    readonly id: number // locked
    title: string // still mutable
  }
  const album: Album = { id: 1, title: 'Abbey Road' }
  album.title = 'Let It Be' // fine
  // @ts-expect-error — id is readonly
  album.id = 2

  // Readonly arrays: `readonly T[]` === `ReadonlyArray<T>`
  // They have no mutating methods at all (push, pop, splice, sort, reverse...)
  const genres: readonly string[] = ['rock', 'pop']
  // @ts-expect-error — push does not exist on readonly string[]
  genres.push('jazz')
  // @ts-expect-error — index signature is readonly
  genres[0] = 'jazz'
  const upper = genres.map((g) => g.toUpperCase()) // fine: returns a NEW mutable array
  const sorted = [...genres].sort() // fine: sorts a mutable COPY (ES2023: genres.toSorted())
  line('upper / sorted', [upper, sorted])

  // Readonly tuples
  const point: readonly [number, number] = [1, 2]
  // @ts-expect-error
  point[0] = 5

  // Parameters: `readonly` on a param is a PROMISE "I won't mutate your array".
  // Mutable -> readonly is allowed; readonly -> mutable is NOT.
  const printReadonly = (xs: readonly string[]) => xs.join(', ')
  const printMutable = (xs: string[]) => xs.join(', ')
  const mutable = ['a', 'b']
  printReadonly(mutable) // ✔
  printReadonly(genres) // ✔
  printMutable(mutable) // ✔
  // @ts-expect-error — the function could mutate it, so TS refuses
  printMutable(genres)

  // Classes: same modifier; assignable only in the declaration or constructor
  class Track {
    readonly name: string
    constructor(name: string) {
      this.name = name // ✔ allowed here
    }
    rename(n: string) {
      // @ts-expect-error — not allowed outside the constructor
      this.name = n
    }
  }
  line('new Track("Something").name', new Track('Something').name)

  // ⚠ It's TYPE-LEVEL ONLY. At runtime the property is a normal property.
  const writable = album as { id: number }
  writable.id = 99
  line('album.id after casting readonly away', album.id) // 99 — nothing stopped it
  // Proof: the @ts-expect-error writes above still RAN — genres was mutated
  line('genres (readonly at compile time only)', genres) // ['jazz','pop','jazz']
}

// ===========================================================================
// 3. Readonly<T> — a mapped type that adds `readonly` to every TOP-LEVEL key
//
//    Its definition in lib.es5.d.ts is simply:
//      type Readonly<T> = { readonly [P in keyof T]: T[P] }
//    Siblings: ReadonlyArray<T>, ReadonlyMap<K, V>, ReadonlySet<T>
// ===========================================================================
section('3. Readonly<T>')
{
  type Album = {
    title: string
    artist: { name: string }
    genres: string[]
  }

  const album: Readonly<Album> = {
    title: 'Abbey Road',
    artist: { name: 'The Beatles' },
    genres: ['rock'],
  }

  // @ts-expect-error — top level is readonly
  album.title = 'Help!'
  // @ts-expect-error
  album.genres = []

  // ⚠ SHALLOW: nested objects / arrays are still mutable
  album.artist.name = 'Wings' // no error!
  album.genres.push('pop') // no error!
  // (the @ts-expect-error writes above also ran: title is 'Help!', genres was replaced)
  line('album after nested mutation', album)

  // Readonly collections
  const ratings: ReadonlyMap<string, number> = new Map([['rym', 4.3]])
  // @ts-expect-error — no set() on ReadonlyMap
  ratings.set('rym', 5)
  const tags: ReadonlySet<string> = new Set(['classic'])
  // @ts-expect-error — no add() on ReadonlySet
  tags.add('new')

  // ⚠ GOTCHA: readonly PROPERTIES are not checked on assignment.
  //   Unlike readonly arrays, a Readonly<T> object is assignable to a mutable T.
  //   This is a known hole in TS — the "readonly" disappears through an alias.
  const mutableAlias: Album = album // compiles fine!
  mutableAlias.title = 'Oops'
  line('album.title after writing via mutable alias', album.title) // 'Oops'

  // The reverse — removing readonly on purpose — uses the `-readonly` modifier:
  type Mutable<T> = { -readonly [P in keyof T]: T[P] }
  type _ = Expect<Equal<Mutable<Readonly<Album>>, Album>>
}

// ---------------------------------------------------------------------------
// 3b. When readonly does NOT work: passing a readonly object to a function
//     that takes the mutable version
//
//     `{ readonly foo: number }` and `{ foo: number }` are assignable to EACH
//     OTHER. TypeScript ignores `readonly` when it checks whether two object
//     types are compatible. So a function that accepts the mutable type can
//     change your "readonly" object, with no error at the call site.
//
//     Readonly ARRAYS don't have this hole (see section 2: printMutable(genres)
//     is an error), because `readonly T[]` lacks methods like push and splice.
//     Readonly object properties don't remove anything, so the types still match.
// ---------------------------------------------------------------------------
section('3b. readonly leaks through a mutable parameter')
{
  type ReadonlyResult = {
    readonly foo: number
    readonly bar: number
  }

  type Result = {
    foo: number
    bar: number
  }

  function produceReadonlyResult(): Readonly<ReadonlyResult> {
    return { foo: 123, bar: 456 }
  }

  const item = produceReadonlyResult()

  // @ts-expect-error — direct writes ARE caught...
  item.foo = 0

  function mutateResult(result: Result) {
    result.foo += 3113
    result.bar += 3113
  }

  // Log the object itself: `'before: ' + item` would print "[object Object]"
  line('before', { ...item }) // { foo: 0, bar: 456 } — the @ts-expect-error write above ran too
  mutateResult(item) // ...but this compiles with no error!
  line('after', item) // { foo: 3113, bar: 3569 } — mutated anyway

  // The two types count as the same when checking assignment:
  type _ = [
    Expect<ReadonlyResult extends Result ? true : false>,
    Expect<Result extends ReadonlyResult ? true : false>,
  ]
  // ...even though Equal (which compares exactly) can tell them apart:
  type __ = Expect<NotEqual<ReadonlyResult, Result>>

  // How to protect yourself (TypeScript has no compiler flag to close this hole):
  //   1. Make functions that don't mutate take `Readonly<T>` / `DeepReadonly<T>`
  //      parameters. It documents intent, but it doesn't stop mutating functions.
  //   2. Don't mutate: return a new object instead ({ ...result, foo: ... }).
  //   3. Need a real guarantee? Freeze it at runtime. The same call then throws:
  const frozen = Object.freeze(produceReadonlyResult())
  try {
    mutateResult(frozen) // still compiles...
  } catch (e) {
    line('mutateResult(frozen) ->', (e as Error).constructor.name) // ...but TypeError at runtime
  }
}

// ===========================================================================
// 4. as const — "treat this literal as immutable and as narrow as possible"
//
//    Applied to a literal, it does three things RECURSIVELY:
//      - strings/numbers/booleans become literal types ('rock', not string)
//      - object properties become readonly
//      - arrays become readonly tuples
//    Still compile-time only — it's a type assertion, not a runtime freeze.
// ===========================================================================
section('4. as const')
{
  const withoutConst = { genre: 'rock', tags: ['a', 'b'] }
  const withConst = { genre: 'rock', tags: ['a', 'b'] } as const

  type _ = [
    Expect<Equal<typeof withoutConst, { genre: string; tags: string[] }>>,
    Expect<Equal<typeof withConst, { readonly genre: 'rock'; readonly tags: readonly ['a', 'b'] }>>,
  ]

  // @ts-expect-error — readonly, and deep: nested array is readonly too
  withConst.tags.push('c')

  // Main use case #1: literal types for function arguments
  type Genre = 'rock' | 'pop' | 'jazz'
  const playGenre = (g: Genre) => g
  const config = { genre: 'rock' }
  // @ts-expect-error — config.genre is `string`, not assignable to Genre
  playGenre(config.genre)
  const configConst = { genre: 'rock' } as const
  playGenre(configConst.genre) // ✔ 'rock'

  // Main use case #2: a single source of truth for a union type (instead of an enum)
  const GENRES = ['rock', 'pop', 'jazz'] as const
  type GenreFromArray = (typeof GENRES)[number] // 'rock' | 'pop' | 'jazz'

  const STATUS = { draft: 'DRAFT', published: 'PUBLISHED' } as const
  type Status = (typeof STATUS)[keyof typeof STATUS] // 'DRAFT' | 'PUBLISHED'

  type __ = [
    Expect<Equal<GenreFromArray, 'rock' | 'pop' | 'jazz'>>,
    Expect<Equal<Status, 'DRAFT' | 'PUBLISHED'>>,
  ]

  // Combine with `satisfies` to validate the shape WITHOUT widening it back
  type Route = { path: string; auth: boolean }
  const ROUTES = {
    home: { path: '/', auth: false },
    admin: { path: '/admin', auth: true },
  } as const satisfies Record<string, Route>
  type ___ = Expect<Equal<(typeof ROUTES)['admin']['path'], '/admin'>>

  // `const` type parameters (TS 5.0): the caller gets as-const inference for free
  const tuple = <const T extends readonly unknown[]>(...xs: T) => xs
  const t = tuple('a', 1, true)
  type ____ = Expect<Equal<typeof t, readonly ['a', 1, true]>>

  // ⚠ Runtime: nothing is frozen
  const mutableTags = withConst.tags as unknown as string[]
  mutableTags.push('c')
  line('withConst.tags after casting away as const', withConst.tags) // ['a','b','c','c'] — the @ts-expect-error push above ran too
}

// ===========================================================================
// 5. DeepReadonly<T> — Readonly<T>, but recursive
//
//    Not built into TS; you write it (or use ts-essentials / type-fest).
//    Key detail: functions are objects too — leave them alone, otherwise
//    they'd be mapped into an object type and stop being callable.
// ===========================================================================
section('5. DeepReadonly<T>')

type DeepReadonly<T> = T extends (...args: never[]) => unknown
  ? T // functions: keep as-is
  : T extends ReadonlyMap<infer K, infer V>
    ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
    : T extends ReadonlySet<infer U>
      ? ReadonlySet<DeepReadonly<U>>
      : T extends object // objects, arrays and tuples
        ? { readonly [P in keyof T]: DeepReadonly<T[P]> } // mapped types preserve arrays/tuples
        : T // primitives

{
  type Album = {
    title: string
    artist: { name: string; members: { name: string }[] }
    tags: Set<string>
    play: () => void
  }

  const album: DeepReadonly<Album> = {
    title: 'Abbey Road',
    artist: { name: 'The Beatles', members: [{ name: 'John' }] },
    tags: new Set(['classic']),
    play: () => {},
  }

  // @ts-expect-error — level 1
  album.title = 'x'
  // @ts-expect-error — level 2 (Readonly<T> would have allowed this)
  album.artist.name = 'Wings'
  // @ts-expect-error — nested array
  album.artist.members.push({ name: 'Paul' })
  // @ts-expect-error — element of nested array
  album.artist.members[0]!.name = 'Ringo'
  // @ts-expect-error — Set became ReadonlySet
  album.tags.add('new')
  album.play() // ✔ still callable

  type _ = [
    Expect<Equal<DeepReadonly<string[]>, readonly string[]>>,
    Expect<Equal<DeepReadonly<[number, { a: string }]>, readonly [number, { readonly a: string }]>>,
    Expect<Equal<DeepReadonly<{ a: { b: number } }>, { readonly a: { readonly b: number } }>>,
  ]

  // Typical use: make a function's "I won't touch your data" promise deep
  const totalMembers = (a: DeepReadonly<Album>) => a.artist.members.length
  line('totalMembers(album)', totalMembers(album))

  // ⚠ Still compile-time only, and the same assignability hole as Readonly<T>
}

// ===========================================================================
// 6. Object.freeze() — the only RUNTIME protection
//
//    After freeze: no writes, no new props, no deletes, can't change prototype.
//    In strict mode (ES modules / classes are always strict) a write THROWS
//    a TypeError; in sloppy mode it silently does nothing.
//    Typed as `Readonly<T>`, so you get the compile-time errors too.
// ===========================================================================
section('6. Object.freeze')
{
  const album = Object.freeze({
    title: 'Abbey Road',
    artist: { name: 'The Beatles' },
    genres: ['rock'],
  })

  // Compile time: typed as Readonly<...>, so TS already complains
  try {
    // @ts-expect-error — title is readonly
    album.title = 'Help!'
  } catch (e) {
    line('write to frozen prop ->', (e as Error).constructor.name) // TypeError
  }

  // ⚠ SHALLOW — both at runtime and in the type
  album.artist.name = 'Wings' // works, no error anywhere
  album.genres.push('pop') // works
  line('album after nested mutation', album)
  line('Object.isFrozen(album)', Object.isFrozen(album)) // true
  line('Object.isFrozen(album.artist)', Object.isFrozen(album.artist)) // false

  // Arrays can be frozen too -> typed as readonly T[]
  const frozenGenres = Object.freeze(['rock', 'pop'])
  try {
    // @ts-expect-error — push does not exist on readonly string[]
    frozenGenres.push('jazz')
  } catch (e) {
    line('push on frozen array ->', (e as Error).constructor.name) // TypeError
  }

  // Related, weaker levels:
  //   Object.preventExtensions(o) — no NEW props; existing ones writable & deletable
  //   Object.seal(o)              — no new props, no deletes; existing ones writable
  //   Object.freeze(o)            — none of the above; everything locked
  const sealed = Object.seal({ n: 1 })
  sealed.n = 2 // ✔ allowed
  line('sealed.n', sealed.n)

  // Freeze does NOT protect the internal state of Map / Set / Date
  const frozenMap = Object.freeze(new Map([['a', 1]]))
  frozenMap.set('b', 2) // works: freeze only locks own properties, not internal slots
  line('frozenMap.size', frozenMap.size) // 2
}

// ---------------------------------------------------------------------------
// deepFreeze — runtime + compile-time deep immutability
// ---------------------------------------------------------------------------
section('6b. deepFreeze')

function deepFreeze<T>(value: T): DeepReadonly<T> {
  if (typeof value === 'object' && value !== null && !Object.isFrozen(value)) {
    Object.freeze(value) // freeze first, so cycles terminate
    for (const key of Reflect.ownKeys(value)) {
      deepFreeze((value as Record<PropertyKey, unknown>)[key])
    }
  }
  return value as DeepReadonly<T>
}

{
  const album = deepFreeze({
    title: 'Abbey Road',
    artist: { name: 'The Beatles' },
    genres: ['rock'],
  })

  try {
    // @ts-expect-error — DeepReadonly catches the nested write at compile time...
    album.artist.name = 'Wings'
  } catch (e) {
    // ...and freeze catches it at runtime
    line('nested write on deepFrozen ->', (e as Error).constructor.name) // TypeError
  }
  line('album.artist.name', album.artist.name) // 'The Beatles'
}

/**
 * ---------------------------------------------------------------------------
 * CHEAT SHEET — which one do I reach for?
 * ---------------------------------------------------------------------------
 *
 *  - "This variable should never point elsewhere"       -> const (always, by default)
 *  - "This one field must not change" (id, createdAt)    -> readonly on the property
 *  - "My function won't mutate the argument"             -> readonly T[] / Readonly<T> param
 *                                                           (DeepReadonly<T> for nested data)
 *  - "Config / lookup table / list of allowed values"    -> as const (+ satisfies for validation)
 *  - "Derive a union from a runtime list"                -> as const + (typeof X)[number]
 *  - "Must be immutable even for plain JS callers / at runtime"
 *                                                        -> Object.freeze / deepFreeze
 *
 *  Remember:
 *   - Everything except Object.freeze disappears after compilation.
 *   - Readonly<T>, readonly and Object.freeze are SHALLOW.
 *     as const and DeepReadonly<T> are deep.
 *   - Readonly object properties can leak through a mutable alias (section 3);
 *     readonly arrays can't.
 *   - Immutable data + structural sharing (see deep-vs-shallow-copy.ts, section F)
 *     is the normal way to "change" immutable values: build a new one.
 */
