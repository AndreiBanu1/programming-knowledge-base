/**
 * Searches — how to find a thing
 * ==============================
 *
 * Pick the cheapest search the data structure allows:
 *
 *   LINEAR       O(n)     unsorted anything. Check every element.
 *   BINARY       O(log n) SORTED array. Halve the range each step.
 *   JUMP + BACK  O(√n)    sorted, but you can only "fail" a limited number of
 *                         times (two crystal balls).
 *   BFS          O(V + E) graphs/trees. Level by level, with a QUEUE.
 *                         Finds the SHORTEST path in an unweighted graph.
 *   DFS          O(V + E) graphs/trees. Go deep first, with a STACK/recursion.
 *                         Natural fit for "does a path exist", cycles, ordering.
 *
 * Binary search's invariant (this is the whole algorithm):
 *   The answer, if it exists, is always inside [lo, hi]. Every iteration
 *   discards a half that provably can't contain it.
 *
 * BFS vs DFS — the only structural difference is queue vs stack:
 *   BFS: shift() from the front  -> shortest path, level order
 *   DFS: pop() from the back / recursion -> path existence, backtracking
 *
 * Tell-tale signs in a problem statement:
 *   "sorted array" + "O(log n)" -> binary search
 *   "shortest path" / "fewest steps" / "minimum moves" -> BFS
 *   "does a path exist" / "all paths" / "connected components" -> DFS
 *   "first position where a condition becomes true" -> binary search on the
 *   PREDICATE, not on the values (see the boolean array in interview-exercise)
 *
 * Watch out for:
 *   - `(lo + hi) / 2` without `Math.floor` — you get a fractional index.
 *   - `while (lo < hi)` vs `<=`: with `<=` and an inclusive `hi`, the loop ends
 *     when the range is empty; mixing conventions causes infinite loops.
 *   - Forgetting the `seen` set in BFS/DFS on a graph — cycles loop forever.
 *   - Marking a node as visited when you POP it rather than when you ENQUEUE
 *     it: the same node gets queued many times.
 */

// --- Binary search: does `target` exist in a SORTED array? -----------------
// Inclusive hi, so the loop condition is `<=`.
export function binarySearch(nums: number[], target: number): number {
  let lo = 0;
  let hi = nums.length - 1;

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2); // floor, always
    const value = nums[mid]!;

    if (value === target) return mid;
    if (value < target) lo = mid + 1; // answer is right of mid
    else hi = mid - 1; // answer is left of mid
  }
  return -1;
}
// binarySearch([1, 3, 5, 7, 9], 7) -> 3

// --- Binary search on a predicate: first index where it turns true ---------
// The values don't matter — only where false flips to true. Same halving.
export function firstTrue(flags: boolean[]): number {
  let lo = 0;
  let hi = flags.length - 1;
  let answer = -1;

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (flags[mid]) {
      answer = mid; // candidate — but maybe an earlier one exists
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }
  return answer;
}
// firstTrue([false, false, true, true]) -> 2

// --- BFS: fewest steps between two nodes (unweighted) ---------------------
// Queue + visited-on-enqueue. The first time you reach the target, you reached
// it in the fewest steps possible.
export function shortestPathLength(
  graph: Map<string, string[]>,
  start: string,
  end: string,
): number {
  const queue: [node: string, dist: number][] = [[start, 0]];
  const seen = new Set([start]); // mark on ENQUEUE, not on dequeue

  while (queue.length > 0) {
    const [node, dist] = queue.shift()!; // front -> breadth-first
    if (node === end) return dist;

    for (const next of graph.get(node) ?? []) {
      if (!seen.has(next)) {
        seen.add(next);
        queue.push([next, dist + 1]);
      }
    }
  }
  return -1;
}
// graph a->b->c, shortestPathLength(g, "a", "c") -> 2

// --- DFS: is `end` reachable at all? --------------------------------------
// Same traversal, stack instead of queue — so no distance guarantee.
export function isReachable(
  graph: Map<string, string[]>,
  start: string,
  end: string,
  seen = new Set<string>(),
): boolean {
  if (start === end) return true;
  if (seen.has(start)) return false; // cycle guard
  seen.add(start);

  return (graph.get(start) ?? []).some((next) => isReachable(graph, next, end, seen));
}
