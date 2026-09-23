/**
 * Big-O Notation — measuring how an algorithm SCALES
 * ===================================================
 *
 * Big-O answers: as the input n grows, how does the work grow?
 * It ignores constants and small terms — we care about the SHAPE, not the
 * exact count.  O(2n + 5) is just O(n).
 *
 * Two things to state for any solution:
 *   TIME  — how many steps as n grows
 *   SPACE — how much EXTRA memory as n grows (not counting the input itself)
 *
 * Runnable:  npx tsx algorithms/notes/big-o.ts
 */

// ===========================================================================
// THE COMMON CLASSES, best -> worst  (for n = 1,000,000)
// ---------------------------------------------------------------------------
//   O(1)        constant     ~1 step            hash lookup, arr[i], push
//   O(log n)    logarithmic  ~20 steps          binary search (halve each step)
//   O(n)        linear       ~1,000,000         single loop over the input
//   O(n log n)  linearithmic ~20,000,000        good sorts (.sort(), mergesort)
//   O(n^2)      quadratic    ~1,000,000,000,000 nested loop over the input
//   O(2^n)      exponential  astronomically bad naive recursion (e.g. subsets)
//   O(n!)       factorial    worse still        permutations / brute-force TSP
// ===========================================================================

const line = (label: string, val: unknown) => console.log(label.padEnd(46), val);

// --- O(1) constant — work doesn't depend on n ------------------------------
// One lookup, regardless of array size.
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

// --- O(n) linear — one pass over the input ---------------------------------
// This is the shape of most of your solutions: sum, max, tally, single scan.
function sum(nums: number[]): number {
  let total = 0;
  for (const n of nums) total += n; // n steps
  return total;
}

// --- O(log n) logarithmic — the search space HALVES each step --------------
// Binary search on a SORTED array. 1,000,000 items -> ~20 comparisons.
function binarySearch(sorted: number[], target: number): number {
  let lo = 0, hi = sorted.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (sorted[mid] === target) return mid;
    if (sorted[mid] < target) lo = mid + 1; // throw away the lower half
    else hi = mid - 1;                       // throw away the upper half
  }
  return -1;
}

// --- O(n^2) quadratic — a loop inside a loop over the same input -----------
// This was your first `hasDuplicate` brute force. Watch nested loops!
function hasDuplicatePairs(nums: number[]): boolean {
  for (let i = 0; i < nums.length; i++) {       // n
    for (let j = i + 1; j < nums.length; j++) { //   * n  => n^2
      if (nums[i] === nums[j]) return true;
    }
  }
  return false;
}

// --- Trading TIME for SPACE ------------------------------------------------
// Same problem as above, but a Set turns O(n^2) time into O(n) time...
// at the cost of O(n) extra SPACE. This trade-off is the heart of Big-O work.
function hasDuplicateSet(nums: number[]): boolean {
  const seen = new Set<number>(); // O(n) extra space
  for (const n of nums) {         // O(n) time
    if (seen.has(n)) return true;
    seen.add(n);
  }
  return false;
}

// ===========================================================================
// HOW TO READ THE COMPLEXITY OF YOUR OWN CODE
// ---------------------------------------------------------------------------
//   1. Sequential steps ADD:      loop n, then loop n  -> O(n) + O(n) = O(n)
//   2. Nested steps MULTIPLY:     loop n inside loop n -> O(n) * O(n) = O(n^2)
//   3. Drop constants & lowers:   O(3n + 7)            -> O(n)
//   4. Keep the biggest term:     O(n^2 + n)           -> O(n^2)
//   5. Halving the work each step -> a log n appears    (binary search, balanced trees)
//   6. State the WORST case unless asked otherwise.
//
// SPACE: count only the EXTRA memory you allocate.
//   - a few variables (i, count, total)        -> O(1)
//   - a Map/Set/array that grows with the input-> O(n)
// ===========================================================================

console.log("=== quick demonstrations ===");
const data = [5, 2, 9, 1, 7, 3];
line("first(data)  O(1)", first(data));
line("sum(data)  O(n)", sum(data));
line("binarySearch([1,3,5,7,9], 7)  O(log n)", binarySearch([1, 3, 5, 7, 9], 7));
line("hasDuplicatePairs([1,2,3,2])  O(n^2)", hasDuplicatePairs([1, 2, 3, 2]));
line("hasDuplicateSet([1,2,3,2])  O(n) time", hasDuplicateSet([1, 2, 3, 2]));

export { first, sum, binarySearch, hasDuplicatePairs, hasDuplicateSet };
