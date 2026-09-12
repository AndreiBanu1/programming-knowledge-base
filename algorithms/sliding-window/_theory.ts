/**
 * Sliding Window — a contiguous range that slides instead of restarting
 * =====================================================================
 *
 * For problems about a CONTIGUOUS subarray/substring, the naive answer
 * recomputes every range from scratch (O(n^2) or worse).  Instead keep a
 * window [left, right] and update it INCREMENTALLY: add what enters on the
 * right, remove what leaves on the left.  Each element enters and leaves at
 * most once, so O(n).
 *
 * Two shapes, and picking the right one is most of the work:
 *
 *   1. FIXED WINDOW      size k is given.  Slide by one: add nums[right],
 *                        subtract nums[right - k].
 *                        -> countGoodSubstrings (k = 3), max sum of k elements
 *
 *   2. VARIABLE WINDOW   size isn't given; a CONDITION defines validity.
 *                        Grow `right` every iteration; while the window is
 *                        invalid, shrink from `left`.  Record the answer.
 *                        -> longest substring without repeats, min window sum
 *
 * Tell-tale signs in a problem statement:
 *   "substring" / "subarray" (contiguous!) · "of length k" · "longest / shortest
 *   ... such that" · "at most k distinct" · "consecutive"
 *
 * NOT a sliding window if the elements don't have to be adjacent — that's
 * subsequence territory (sorting, hash maps, or DP).
 *
 * Watch out for:
 *   - Off-by-one on the window: with `right` inclusive, size is right-left+1.
 *   - Shrinking with `if` instead of `while` — one shrink may not be enough.
 *   - Forgetting to remove the outgoing element's state (count, sum) as `left`
 *     moves; stale state is the classic sliding-window bug.
 *   - Delete zero counts from the map, or `map.size` overcounts distinct chars.
 */

// --- 1. Fixed window: best sum of exactly k consecutive elements ------------
// Build the first window, then slide: one add + one subtract per step.
export function maxSumOfK(nums: number[], k: number): number {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += nums[i]!;

  let best = sum;
  for (let right = k; right < nums.length; right++) {
    sum += nums[right]! - nums[right - k]!; // in on the right, out on the left
    best = Math.max(best, sum);
  }
  return best;
}
// maxSumOfK([2, 1, 5, 1, 3, 2], 3) -> 9   (5 + 1 + 3)

// --- 1b. Fixed window over a string: substrings of length 3, no repeats -----
// With k = 3 a Set of the 3 chars is enough — size 3 means all distinct.
export function countGoodSubstrings(s: string): number {
  let count = 0;

  for (let i = 0; i + 3 <= s.length; i++) {
    if (new Set(s.slice(i, i + 3)).size === 3) count++;
  }
  return count;
}
// countGoodSubstrings("xyzzaz") -> 1   (only "xyz")

// --- 2. Variable window: longest substring with no repeated character -------
// Grow right always; while the new char is already inside, shrink from left.
export function longestUnique(s: string): number {
  const window = new Set<string>();
  let left = 0;
  let best = 0;

  for (let right = 0; right < s.length; right++) {
    // `while`, not `if` — keep shrinking until the window is valid again
    while (window.has(s[right]!)) {
      window.delete(s[left]!); // drop the outgoing char's state
      left++;
    }
    window.add(s[right]!);
    best = Math.max(best, right - left + 1); // right inclusive -> +1
  }
  return best;
}
// longestUnique("abcabcbb") -> 3   ("abc")
