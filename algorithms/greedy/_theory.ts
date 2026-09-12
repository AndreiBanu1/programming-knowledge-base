/**
 * Greedy — take the locally best choice and never look back
 * =========================================================
 *
 * At each step, commit to whatever looks best right now, and never revisit the
 * decision.  No backtracking, no memo table.  Usually O(n log n) because the
 * hard part is SORTING the input into the order that makes "best right now"
 * actually correct.
 *
 * The recipe:
 *   1. Find the greedy criterion — what does "best" mean here?
 *   2. Sort by it (or keep a heap if "best" changes as you go).
 *   3. One pass, committing as you go.
 *   4. Sanity-check: does an early choice ever block a better later one?
 *      If yes, greedy is WRONG — you need DP or backtracking.
 *
 * Two shapes here:
 *
 *   1. SORT, THEN SCAN     intervals sorted by END time: always keep the
 *                          interval that frees up soonest.
 *                          -> intervalScheduling
 *
 *   2. DEFER THE CHOICE    collect options as you pass them, and only spend
 *                          one (the biggest) when you're forced to.  A max-heap
 *                          is the natural container.
 *                          -> minimumRefuelStops
 *
 * Tell-tale signs in a problem statement:
 *   "minimum number of ..." / "maximum number of ..." · "non-overlapping"
 *   · "as few X as possible" · schedules, intervals, coins, fuel stops
 *
 * Watch out for:
 *   - Sorting by the wrong key. Intervals: sort by END, not start — sorting by
 *     start makes one long interval eat all the short ones.
 *   - Assuming greedy works. Coin change with arbitrary denominations is the
 *     classic counter-example (1, 3, 4 for 6: greedy gives 4+1+1, best is 3+3).
 *   - `a - b` for numeric sorts; bare `.sort()` compares as strings.
 */

// --- 1. Sort, then scan: max non-overlapping intervals ---------------------
// Sorted by end time, the interval that ends earliest always leaves the most
// room for what follows — so keeping it is never a mistake.
export function maxNonOverlapping(intervals: [number, number][]): number {
  const sorted = [...intervals].sort((a, b) => a[1] - b[1]); // by END

  let kept = 0;
  let lastEnd = -Infinity;

  for (const [start, end] of sorted) {
    if (start >= lastEnd) {
      // no clash with what we've already committed to
      kept++;
      lastEnd = end;
    }
  }
  return kept;
}
// maxNonOverlapping([[1,2],[2,3],[3,4],[1,3]]) -> 3   (so 1 removal)

// --- 2. Defer the choice: fewest refuel stops -------------------------------
// Drive as far as the tank allows. Only when you're stuck do you "go back" and
// use the biggest station you drove past. Reaching for the largest reserve is
// always at least as good as any smaller one.
export function minRefuelStops(
  target: number,
  startFuel: number,
  stations: [number, number][],
): number {
  const passed: number[] = []; // fuel amounts we drove past but didn't use
  let fuel = startFuel;
  let stops = 0;
  let i = 0;

  while (fuel < target) {
    // bank every station now within reach
    while (i < stations.length && stations[i]![0] <= fuel) {
      passed.push(stations[i]![1]);
      i++;
    }
    if (passed.length === 0) return -1; // stranded

    // spend the largest banked station (a heap would make this O(log n))
    passed.sort((a, b) => b - a);
    fuel += passed.shift()!;
    stops++;
  }
  return stops;
}
// minRefuelStops(100, 10, [[10,60],[20,30],[30,30],[60,40]]) -> 2
