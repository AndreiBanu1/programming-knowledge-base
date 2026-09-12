/**
 * Recursion — solve a smaller version of the same problem
 * ======================================================
 *
 * Every recursive function is three parts, written in this order:
 *
 *   1. BASE CASE(S)   when do we stop? Handle these FIRST, and be exhaustive —
 *                     a missing base case is a stack overflow.
 *   2. RECURSE        call yourself on a strictly SMALLER input.
 *   3. COMBINE        turn the sub-answer(s) into this level's answer.
 *
 * "Strictly smaller" is the contract. If the input doesn't shrink on every
 * call, it never terminates.
 *
 * The three shapes:
 *
 *   1. LINEAR / DIVIDE & CONQUER   one or two calls, combine results.
 *                                  -> factorial, fib, merge sort, tree height
 *
 *   2. BACKTRACKING                try a move -> recurse -> UNDO the move.
 *                                  The undo (`path.pop()`) is what makes it
 *                                  backtracking rather than plain DFS.
 *                                  -> maze-solver, permutations, N-queens
 *
 *   3. MEMOISED                    cache results by input when the same
 *                                  subproblem recurs. Turns O(2^n) into O(n).
 *                                  -> fib, grid paths, coin change
 *
 * The backtracking skeleton (memorise this):
 *
 *   function walk(state, path) {
 *     if (isInvalid(state)) return false;   // wall, off-grid, already seen
 *     if (isGoal(state)) { path.push(state); return true; }
 *     seen.add(state);
 *     path.push(state);                     // pre
 *     for (const next of moves(state)) {
 *       if (walk(next, path)) return true;  // recurse
 *     }
 *     path.pop();                           // post — UNDO, this is the point
 *     return false;
 *   }
 *
 * Watch out for:
 *   - Base cases in the wrong order: check "off the grid" BEFORE reading
 *     `grid[y][x]`, or you crash on undefined.
 *   - Forgetting the `seen` set — cycles in a maze/graph loop forever.
 *   - Forgetting the undo, so state leaks into sibling branches.
 *   - Mutating a shared array and returning it: callers see later mutations.
 *     Push a COPY (`[...path]`) when collecting results.
 *   - JS has no tail-call optimisation: ~10k deep is the practical ceiling.
 *     Deep recursion on big inputs -> rewrite with an explicit stack.
 */

// --- 1. Linear: the shape in its simplest form -----------------------------
export function factorial(n: number): number {
  if (n <= 1) return 1; // base case first
  return n * factorial(n - 1); // smaller input, then combine
}
// factorial(5) -> 120

// --- 3. Memoised: naive fib is O(2^n), this is O(n) -----------------------
export function fib(n: number, memo = new Map<number, number>()): number {
  if (n <= 1) return n;

  const cached = memo.get(n);
  if (cached !== undefined) return cached;

  const result = fib(n - 1, memo) + fib(n - 2, memo);
  memo.set(n, result);
  return result;
}
// fib(50) -> 12586269025   (instant; without the memo it never finishes)

// --- 2. Backtracking: collect every permutation ---------------------------
// `path` is shared and mutated, so we push a COPY when a branch completes.
export function permutations<T>(items: T[]): T[][] {
  const results: T[][] = [];
  const path: T[] = [];
  const used = new Array(items.length).fill(false);

  function walk(): void {
    if (path.length === items.length) {
      results.push([...path]); // copy — path keeps changing
      return;
    }
    for (let i = 0; i < items.length; i++) {
      if (used[i]) continue;

      used[i] = true;
      path.push(items[i]!); // choose
      walk(); // explore
      path.pop(); // UNDO
      used[i] = false;
    }
  }

  walk();
  return results;
}
// permutations([1, 2, 3]) -> [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
