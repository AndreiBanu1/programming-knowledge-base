/**
 * LRU Cache (Least Recently Used)
 *
 * Asked at: OpenAI
 * Status: TODO — not solved yet
 *
 * Problem:
 * Implement a cache with a fixed capacity that evicts the least recently
 * used entry when it runs out of room.
 *
 * API:
 *
 *   new LRUCache(capacity)
 *   get(key)         -> value, or -1 / undefined if not present
 *   put(key, value)  -> inserts or updates, evicting if over capacity
 *
 * Both operations must run in O(1) average time.
 *
 * "Used" means either a get or a put. The most recently used entry is the
 * one touched last; the least recently used is the one untouched longest.
 *
 * Example:
 *
 * capacity = 2
 *
 * put(1, 1)   cache: {1=1}
 * put(2, 2)   cache: {1=1, 2=2}
 * get(1)      -> 1        cache: {2=2, 1=1}   (1 is now most recent)
 * put(3, 3)   evicts 2    cache: {1=1, 3=3}
 * get(2)      -> -1       (evicted)
 * put(4, 4)   evicts 1    cache: {3=3, 4=4}
 * get(1)      -> -1
 * get(3)      -> 3
 * get(4)      -> 4
 *
 * Requirements:
 *
 * 1. get and put both O(1).
 * 2. Reading an entry counts as a use and moves it to most-recent.
 * 3. Updating an existing key must NOT grow the size or evict anything.
 * 4. Evict only when inserting a new key over capacity.
 *
 * Concepts tested:
 *
 * - Hash map for O(1) lookup
 * - Doubly linked list for O(1) reordering / eviction
 * - Combining two data structures to hit a complexity target
 * - Pointer surgery without losing nodes
 *
 * Time Complexity:
 *
 * get: O(1)
 * put: O(1)
 *
 * Space Complexity:
 *
 * O(capacity)
 *
 *
 * Notes / gotchas to watch for when solving:
 *
 * - A singly linked list is not enough: removing a node needs its previous
 *   node, which a singly linked list can only find in O(n).
 * - Sentinel head/tail nodes remove most of the null-checking in the
 *   unlink/insert code.
 * - JS `Map` preserves insertion order, so a Map-only solution is possible
 *   (delete + re-set to move to the end, `map.keys().next().value` for the
 *   oldest). Worth writing both: the Map version to show you know the
 *   language, the hash map + DLL version to show you know the structure.
 *   Interviewers usually want the second one.
 * - capacity = 0 is a valid edge case.
 */

export class LRUCache<K, V> {
  constructor(private capacity: number) {
    throw new Error('Not implemented')
  }

  get(key: K): V | undefined {
    throw new Error('Not implemented')
  }

  put(key: K, value: V): void {
    throw new Error('Not implemented')
  }
}
