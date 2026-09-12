import { describe, it, expect } from 'vitest'
import {
  safeCount,
  invertMap,
  firstDuplicate,
  intersection,
  difference,
  memoizeByObject,
  dedupeBy,
  groupBy,
} from '../BuiltIns'

describe('exercise 1: safeCount', () => {
  it('counts repeated keys', () => {
    expect(safeCount(['a', 'b', 'a'])).toEqual(
      new Map([
        ['a', 2],
        ['b', 1],
      ]),
    )
  })

  it('returns an empty Map for no keys', () => {
    expect(safeCount([]).size).toBe(0)
  })

  it('does not treat prototype members as pre-existing keys', () => {
    const result = safeCount(['constructor', '__proto__', 'toString', 'constructor'])
    expect(result.get('constructor')).toBe(2)
    expect(result.get('__proto__')).toBe(1)
    expect(result.get('toString')).toBe(1)
  })
})

describe('exercise 2: invertMap', () => {
  it('swaps keys and values', () => {
    const input = new Map([
      ['a', 1],
      ['b', 2],
    ])
    expect(invertMap(input)).toEqual(
      new Map([
        [1, 'a'],
        [2, 'b'],
      ]),
    )
  })

  it('does not mutate the input', () => {
    const input = new Map([['a', 1]])
    invertMap(input)
    expect(input).toEqual(new Map([['a', 1]]))
  })

  it('handles object values as the new keys', () => {
    const value = { id: 1 }
    const inverted = invertMap(new Map([['k', value]]))
    expect(inverted.get(value)).toBe('k')
  })

  it('returns an empty Map for an empty input', () => {
    expect(invertMap(new Map()).size).toBe(0)
  })
})

describe('exercise 3: firstDuplicate', () => {
  it('returns the value whose second occurrence comes first', () => {
    expect(firstDuplicate([2, 1, 3, 5, 3, 2])).toBe(3)
  })

  it('returns undefined when all values are unique', () => {
    expect(firstDuplicate([1, 2, 3])).toBeUndefined()
  })

  it('returns undefined for an empty array', () => {
    expect(firstDuplicate([])).toBeUndefined()
  })

  it('handles adjacent duplicates', () => {
    expect(firstDuplicate([4, 4])).toBe(4)
  })

  it('does not mistake 0 for absent', () => {
    expect(firstDuplicate([0, 1, 0])).toBe(0)
  })
})

describe('exercise 4: intersection', () => {
  it('keeps only values present in both', () => {
    expect(intersection(new Set([1, 2, 3]), new Set([2, 3, 4]))).toEqual(new Set([2, 3]))
  })

  it('returns empty when there is no overlap', () => {
    expect(intersection(new Set([1]), new Set([2])).size).toBe(0)
  })

  it('does not mutate either input', () => {
    const a = new Set([1, 2])
    const b = new Set([2, 3])
    intersection(a, b)
    expect(a).toEqual(new Set([1, 2]))
    expect(b).toEqual(new Set([2, 3]))
  })
})

describe('exercise 4: difference', () => {
  it('keeps values in a that are not in b', () => {
    expect(difference(new Set([1, 2, 3]), new Set([2]))).toEqual(new Set([1, 3]))
  })

  it('is not symmetric', () => {
    const a = new Set([1, 2])
    const b = new Set([2, 3])
    expect(difference(a, b)).toEqual(new Set([1]))
    expect(difference(b, a)).toEqual(new Set([3]))
  })

  it('returns empty when a is a subset of b', () => {
    expect(difference(new Set([1]), new Set([1, 2])).size).toBe(0)
  })
})

describe('exercise 5: memoizeByObject', () => {
  it('computes once per object reference', () => {
    let calls = 0
    const key = { id: 1 }
    const fn = memoizeByObject((arg: { id: number }) => {
      calls++
      return arg.id * 2
    })

    expect(fn(key)).toBe(2)
    expect(fn(key)).toBe(2)
    expect(calls).toBe(1)
  })

  it('treats structurally equal but distinct objects as different keys', () => {
    let calls = 0
    const fn = memoizeByObject((arg: { id: number }) => {
      calls++
      return arg.id
    })

    fn({ id: 1 })
    fn({ id: 1 })
    expect(calls).toBe(2)
  })

  // NOTE: that the cache is a WeakMap and not a Map cannot be asserted from
  // outside the closure — GC is not observable in a test. Verify it by reading
  // your own implementation.

  it('caches a falsy result rather than recomputing it', () => {
    let calls = 0
    const key = {}
    const fn = memoizeByObject(() => {
      calls++
      return undefined
    })

    fn(key)
    fn(key)
    expect(calls).toBe(1)
  })
})

describe('exercise 6: dedupeBy', () => {
  it('keeps the first occurrence of each key', () => {
    expect(
      dedupeBy(
        [
          { id: 1, n: 'a' },
          { id: 2, n: 'b' },
          { id: 1, n: 'c' },
        ],
        (x) => x.id,
      ),
    ).toEqual([
      { id: 1, n: 'a' },
      { id: 2, n: 'b' },
    ])
  })

  it('preserves input order', () => {
    expect(dedupeBy([3, 1, 3, 2], (n) => n)).toEqual([3, 1, 2])
  })

  it('returns an empty array for an empty input', () => {
    expect(dedupeBy([], (x) => x)).toEqual([])
  })

  it('does not mutate the input', () => {
    const input = [{ id: 1 }, { id: 1 }]
    dedupeBy(input, (x) => x.id)
    expect(input).toHaveLength(2)
  })
})

describe('exercise 7: groupBy', () => {
  const people = [
    { name: 'Ana', dept: 'eng' },
    { name: 'Bo', dept: 'ops' },
    { name: 'Cy', dept: 'eng' },
  ]

  it('buckets items by the computed key', () => {
    const result = groupBy(people, (p) => p.dept)
    expect(result.get('eng')).toEqual([people[0], people[2]])
    expect(result.get('ops')).toEqual([people[1]])
  })

  it('preserves encounter order of the keys', () => {
    expect([...groupBy(people, (p) => p.dept).keys()]).toEqual(['eng', 'ops'])
  })

  it('supports non-string keys', () => {
    const result = groupBy([1, 2, 3, 4], (n) => n % 2 === 0)
    expect(result.get(true)).toEqual([2, 4])
    expect(result.get(false)).toEqual([1, 3])
  })

  it('returns an empty Map for an empty input', () => {
    expect(groupBy([], (x) => x).size).toBe(0)
  })

  it('does not mutate the input', () => {
    const input = [{ dept: 'eng' }]
    groupBy(input, (p) => p.dept)
    expect(input).toEqual([{ dept: 'eng' }])
  })
})
