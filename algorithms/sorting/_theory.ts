/**
 * Sorting — mostly a preprocessing step
 * =====================================
 *
 * In interviews you rarely need to WRITE a sort; you need to know the cost of
 * calling one (O(n log n)) and that sorting first is what unlocks two pointers,
 * greedy and binary search.  Implement them to understand the trade-offs.
 *
 *   Algorithm    Time (avg)   Worst       Space      Stable?
 *   ---------    ----------   ---------   --------   -------
 *   Bubble       O(n^2)       O(n^2)      O(1)       yes      teaching only
 *   Insertion    O(n^2)       O(n^2)      O(1)       yes      great for n small
 *                                                             / nearly sorted
 *   Merge        O(n log n)   O(n log n)  O(n)       yes      predictable
 *   Quick        O(n log n)   O(n^2)      O(log n)   no       fastest in practice
 *   Heap         O(n log n)   O(n log n)  O(1)       no       no extra array
 *
 * STABLE = equal elements keep their original relative order. Matters when you
 * sort by one key after another (sort by name, then by age -> ages grouped,
 * names still alphabetical inside each group).
 *
 * Quicksort in one line: pick a pivot, PARTITION so smaller elements sit left
 * and larger right, then recurse on each side. The partition step is the part
 * worth being able to write from memory.
 * Worst case O(n^2) happens on already-sorted input with a first/last pivot —
 * a random or middle pivot avoids it.
 *
 * The built-in `.sort()`:
 *   - Mutates the array. `[...arr].sort()` if you need the original.
 *   - Default comparator stringifies: [10, 9, 1].sort() -> [1, 10, 9]. ALWAYS
 *     pass `(a, b) => a - b` for numbers.
 *   - Comparator contract: negative = a first, 0 = tie, positive = b first.
 *   - Stable (guaranteed since ES2019).
 */

// --- Bubble sort: n passes, swap adjacent pairs ----------------------------
// After pass i, the last i elements are final — hence `- 1 - i`.
export function bubbleSort(nums: number[]): number[] {
  for (let i = 0; i < nums.length; i++) {
    let swapped = false;

    for (let j = 0; j < nums.length - 1 - i; j++) {
      if (nums[j]! > nums[j + 1]!) {
        [nums[j], nums[j + 1]] = [nums[j + 1]!, nums[j]!];
        swapped = true;
      }
    }
    if (!swapped) break; // already sorted -> best case O(n)
  }
  return nums;
}
// bubbleSort([5, 1, 4, 2]) -> [1, 2, 4, 5]

// --- Quicksort: partition in place, then recurse on both sides -------------
// `partition` returns the pivot's final resting index: everything left of it is
// smaller, everything right is larger. That index never needs to move again.
function partition(nums: number[], lo: number, hi: number): number {
  const pivot = nums[hi]!; // last element as pivot
  let boundary = lo - 1; // last index known to be < pivot

  for (let i = lo; i < hi; i++) {
    if (nums[i]! <= pivot) {
      boundary++;
      [nums[boundary], nums[i]] = [nums[i]!, nums[boundary]!];
    }
  }
  // drop the pivot just past the smaller-than block
  boundary++;
  [nums[boundary], nums[hi]] = [nums[hi]!, nums[boundary]!];

  return boundary;
}

export function quickSort(nums: number[], lo = 0, hi = nums.length - 1): number[] {
  if (lo >= hi) return nums; // 0 or 1 element -> sorted

  const pivotIndex = partition(nums, lo, hi);
  quickSort(nums, lo, pivotIndex - 1); // pivotIndex itself is already final
  quickSort(nums, pivotIndex + 1, hi);

  return nums;
}
// quickSort([9, 3, 7, 4, 69, 420, 42]) -> [3, 4, 7, 9, 42, 69, 420]

// --- Comparators worth remembering ----------------------------------------
export const byNumberAsc = (a: number, b: number) => a - b;
export const byNumberDesc = (a: number, b: number) => b - a;
// Multi-key: age ascending, then name alphabetically as the tiebreaker.
export const byAgeThenName = (
  a: { age: number; name: string },
  b: { age: number; name: string },
) => a.age - b.age || a.name.localeCompare(b.name);
