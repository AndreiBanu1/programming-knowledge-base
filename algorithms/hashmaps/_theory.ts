/**
 * Hash Maps — trade memory for time
 * ==================================
 *
 * A Map/Set/plain object gives you O(1) average lookup, insert and delete.
 * Any time a brute-force solution says "for each element, search the rest of
 * the array" (O(n^2)), a hash map usually collapses it to one pass, O(n) time
 * and O(n) space.
 *
 * Four shapes cover almost everything:
 *
 *   1. SEEN SET          remember what you've already passed.
 *                        -> hasDuplicates, removeDuplicates
 *
 *   2. FREQUENCY COUNT   value -> how many times it appeared.
 *                        -> frequencyOfApparition, isAnagram
 *
 *   3. INDEX / COMPLEMENT  value -> where I saw it, so a later element can
 *                        look back and find its partner in O(1).
 *                        -> twoSum
 *
 *   4. GROUP BY KEY      derive a canonical key, bucket everything under it.
 *                        -> groupAnagrams (key = sorted letters)
 *
 * Tell-tale signs in a problem statement:
 *   "has a duplicate" · "count / frequency / most common" · "anagram"
 *   · "pair that sums to X" (UNSORTED — sorted wants two pointers)
 *   · "group together"
 *
 * Map vs Set vs object:
 *   Set     — membership only, no value.
 *   Map     — any key type (objects, numbers), keeps insertion order, `.size`.
 *   object  — keys are coerced to strings; fine for chars/words. Watch out for
 *             inherited keys — prefer `Object.create(null)` or a Map.
 *
 * Watch out for:
 *   - `map.get(k)` returns `undefined`, not 0 — use `?? 0` before `+ 1`.
 *   - Objects/arrays as Map keys compare by REFERENCE, not contents; stringify
 *     or build a primitive key instead (see [[equality-reference]] in notes/).
 *   - Returning the *index* vs the *value* — reread the required output.
 */

// --- 1. Seen set: first repeated element ------------------------------------
export function firstDuplicate(nums: number[]): number | null {
  const seen = new Set<number>();

  for (const n of nums) {
    if (seen.has(n)) return n; // already passed it -> done
    seen.add(n);
  }
  return null;
}
// firstDuplicate([2, 5, 3, 5, 2]) -> 5

// --- 2. Frequency count: value -> occurrences -------------------------------
// The `?? 0` is the whole trick: undefined on first sight, then the tally.
export function countBy<T>(items: T[]): Map<T, number> {
  const counts = new Map<T, number>();

  for (const item of items) {
    counts.set(item, (counts.get(item) ?? 0) + 1);
  }
  return counts;
}
// countBy(["a", "b", "a"]) -> Map { "a" => 2, "b" => 1 }

// --- 3. Complement lookup: two-sum on an UNSORTED array ---------------------
// Store value -> index as you go, and ask "have I already seen what I need?".
// One pass, O(n) — no sorting, so the original indices stay valid.
export function twoSum(nums: number[], target: number): [number, number] | null {
  const seen = new Map<number, number>(); // value -> index

  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i]!;
    const j = seen.get(need);
    if (j !== undefined) return [j, i];
    seen.set(nums[i]!, i);
  }
  return null;
}
// twoSum([3, 4, 5, 6], 7) -> [0, 1]

// --- 4. Group by derived key ------------------------------------------------
// Anagrams share the same sorted letters, so that's the canonical key.
export function groupAnagrams(words: string[]): string[][] {
  const buckets = new Map<string, string[]>();

  for (const word of words) {
    const key = word.split("").sort().join("");
    // create the bucket on first sight, then push into it
    const bucket = buckets.get(key);
    bucket ? bucket.push(word) : buckets.set(key, [word]);
  }
  return [...buckets.values()];
}
// groupAnagrams(["act", "pots", "cat", "stop"]) -> [["act","cat"], ["pots","stop"]]
