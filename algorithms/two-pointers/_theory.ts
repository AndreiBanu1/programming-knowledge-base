/**
 * Two Pointers — one pass, two indices
 * =====================================
 *
 * Keep two indices moving over the same array (or one per array) instead of
 * nesting loops.  Turns the O(n^2) "compare every pair" instinct into O(n),
 * usually with O(1) extra space.
 *
 * Three shapes cover almost everything:
 *
 *   1. OPPOSITE ENDS   left = 0, right = n - 1, walk inward.
 *                      Needs a SORTED array (or symmetry, like a palindrome).
 *                      -> validPalindrome, reverseString, twoSum_SortedArray
 *
 *   2. SLOW / FAST     slow = write position, fast = read position.
 *                      In-place filtering: fast scans, slow only advances when
 *                      an element is a keeper.  Order preserved.
 *                      -> moveZeros, removeElementFromArray, removeDuplicates*
 *
 *   3. TWO ARRAYS      one pointer per array, advance the smaller one.
 *                      -> mergeArrays, sortedSquares (largest-first from ends)
 *
 * Tell-tale signs in a problem statement:
 *   "sorted array" · "in-place" · "O(1) extra space" · "pair that sums to X"
 *   · "palindrome" · "merge two sorted ..."
 *
 * Watch out for:
 *   - Forgetting to fill the tail after a slow/fast pass (zeros, new length).
 *   - `while (left < right)` vs `<=` — `<=` also visits the middle element.
 *   - Opposite-ends only works sorted; unsorted pair-sum wants a hash map.
 */

// --- 1. Opposite ends: pair summing to target in a SORTED array -------------
// Too small a sum? move left up. Too big? move right down. O(n) / O(1).
export function twoSumSorted(nums: number[], target: number): [number, number] | null {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const sum = nums[left]! + nums[right]!;
    if (sum === target) return [left, right];
    sum < target ? left++ : right--;
  }
  return null;
}
// twoSumSorted([1, 3, 4, 8, 11], 14) -> [1, 4]   (3 + 11)

// --- 2. Slow / fast: in-place filter, order preserved ----------------------
// `slow` is where the next keeper gets written; `fast` reads everything.
// Returns the new logical length — the tail beyond it is junk.
export function removeValue(nums: number[], val: number): number {
  let slow = 0;

  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== val) {
      nums[slow] = nums[fast]!;
      slow++;
    }
  }
  return slow;
}
// removeValue([3, 2, 2, 3], 3) -> 2, nums starts [2, 2, ...]

// --- 3. Two arrays: merge two sorted arrays --------------------------------
// Always take from whichever side is currently smaller. O(n + m).
export function merge(a: number[], b: number[]): number[] {
  const out: number[] = [];
  let i = 0;
  let j = 0;

  while (i < a.length && j < b.length) {
    out.push(a[i]! <= b[j]! ? a[i++]! : b[j++]!);
  }
  // one side is exhausted — flush the rest of the other
  while (i < a.length) out.push(a[i++]!);
  while (j < b.length) out.push(b[j++]!);

  return out;
}
// merge([1, 4, 7], [2, 3, 9]) -> [1, 2, 3, 4, 7, 9]
