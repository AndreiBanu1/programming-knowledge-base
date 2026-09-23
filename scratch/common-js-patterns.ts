// 1) Add item
function addItem<T>(arr: T[], item: T): T[] {
  return [...arr, item]
}

// 2) Remove item
function removeItem<T>(arr: T[], item: T): T[] {
  return arr.filter((i) => i !== item)
}

// 3) Update item
function updateItem<T>(arr: T[], oldItem: T, newItem: T): T[] {
  return arr.map((i) => (i === oldItem ? newItem : i))
}

// 4) Find item
function findItem<T>(arr: T[], item: T): T | undefined {
  return arr.find((i) => i === item)
}

// 5) Remove duplicate items
function removeDuplicates<T>(arr: T[]): T[] {
  return Array.from(new Set(arr))
}

// 6) Toggle item - Very common in: selected IDs / checkbox lists / tags / permissions
function toggleItem<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item]
}

// 7) Replace item by predicate
// replaceWhere(users, u => u.id === 5, updatedUser)
function replaceItem<T>(arr: T[], predicate: (item: T) => boolean, newItem: T): T[] {
  return arr.map((i) => (predicate(i) ? newItem : i))
}

// 8) Upsert - Update if exists, otherwise insert: api caching / normalize text / redux reducers / db sync
function upsertById<T extends { id: number | string }>(arr: T[], item: T): T[] {
  const exists = arr.some((i) => i.id === item.id)

  return exists ? arr.map((i) => (i.id === item.id ? item : i)) : [...arr, item]
}

// 9) Group by: analytics / UI sections / backend transforms
function groupBy<T, K extends string | number>(arr: T[], keyFn: (item: T) => K): Record<K, T[]> {
  return arr.reduce(
    (acc, item) => {
      const key = keyFn(item)
      acc[key] = [...(acc[key] || []), item]
      return acc
    },
    {} as Record<K, T[]>,
  )
}

// 10) Sort by key
function sortBy<T, K extends string | number>(arr: T[], keyFn: (item: T) => K): T[] {
  return [...arr].sort((a, b) => {
    const keyA = keyFn(a)
    const keyB = keyFn(b)

    if (keyA < keyB) return -1
    if (keyA > keyB) return 1
    return 0
  })
}

// 11) Count by: Very useful for statistics / aggregation.
function countBy<T, K extends string | number>(
  arr: T[],
  getKey: (item: T) => K,
): Record<K, number> {
  return arr.reduce(
    (acc, item) => {
      const key = getKey(item)
      acc[key] = (acc[key] || 0) + 1
      return acc
    },
    {} as Record<K, number>,
  )
}

// 12) Unique by property - Remove duplicates based on a specific property (e.g., unique users by email)
function uniqueBy<T, K extends string | number>(arr: T[], keyFn: (item: T) => K): T[] {
  const seen = new Set<K>()
  return arr.filter((item) => {
    const key = keyFn(item)
    if (seen.has(key)) {
      return false
    }
    seen.add(key)
    return true
  })
}

// 13) Partition - Split array into two based on a predicate (e.g., partition users into active and inactive)
function partition<T>(arr: T[], predicate: (item: T) => boolean): [T[], T[]] {
  return arr.reduce(
    (acc, item) => {
      if (predicate(item)) {
        acc[0].push(item)
      } else {
        acc[1].push(item)
      }
      return acc
    },
    [[], []] as [T[], T[]],
  )
}

// 14) Index by key - Create an object indexed by a specific property (e.g., index users by ID)
function indexBy<T, K extends string | number>(arr: T[], keyFn: (item: T) => K): Record<K, T> {
  return arr.reduce(
    (acc, item) => {
      const key = keyFn(item)
      acc[key] = item
      return acc
    },
    {} as Record<K, T>,
  )
}

// 15) Async Map - Map over an array with an async function and wait for all results (e.g., fetch data for a list of IDs)
async function asyncMap<T, U>(arr: T[], asyncFn: (item: T) => Promise<U>): Promise<U[]> {
  return Promise.all(arr.map(asyncFn))
}

export {
  addItem,
  removeItem,
  updateItem,
  findItem,
  removeDuplicates,
  toggleItem,
  replaceItem,
  upsertById,
  groupBy,
  sortBy,
  countBy,
  uniqueBy,
  partition,
  indexBy,
  asyncMap,
}
