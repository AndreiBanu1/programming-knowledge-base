/**
 * 🔹 Depth-First Search (DFS)
 *
 * Definition:
 *  - DFS explores a data structure by going as deep as possible
 *    before backtracking.
 *
 *  - DFS can be implemented using:
 *      - Recursion
 *      - Stack (LIFO)
 *
 * Tree Traversals:
 *  - Pre-order  = DFS: Root -> Left -> Right
 *  - In-order   = DFS: Left -> Root -> Right
 *  - Post-order  = DFS: Left -> Right -> Root
 *
 * BFS vs DFS:
 *  - DFS -> Stack / Recursion -> go deep first
 *  - BFS -> Queue -> go level by level
 *
 * Time Complexity:
 *  - Tree: O(n)
 *  - Graph: O(V + E)
 *
 * Common use cases:
 *  - Tree traversal
 *  - Graph traversal
 *  - Maze / path finding
 *  - Connected components
 *  - Backtracking
 */

type Graph = Map<number, number[]>

// ============================================================
// DFS - Recursive
// ============================================================

function dfsRecursive(graph: Graph, curr: number, seen: Set<number>, path: number[]): void {
  // Base case:
  // We have already visited this node
  if (seen.has(curr)) {
    return
  }

  // PRE:
  // Process current node before its children
  seen.add(curr)
  path.push(curr)

  // Recurse:
  for (const neighbor of graph.get(curr) ?? []) {
    dfsRecursive(graph, neighbor, seen, path)
  }

  // POST:
  // Nothing to do here for this example
}

// ============================================================
// DFS - Iterative using Stack
// ============================================================

function dfs(graph: Graph, start: number): number[] {
  const stack: number[] = [start]
  const seen = new Set<number>()
  const path: number[] = []

  while (stack.length > 0) {
    // LIFO:
    // Last node added is the first one removed
    const curr = stack.pop()!

    if (seen.has(curr)) {
      continue
    }

    seen.add(curr)
    path.push(curr)

    // Add neighbors to the stack
    for (const neighbor of graph.get(curr) ?? []) {
      if (!seen.has(neighbor)) {
        stack.push(neighbor)
      }
    }
  }

  return path
}

// ============================================================
// Example
// ============================================================

const graph: Graph = new Map([
  [1, [2, 3]],
  [2, [4]],
  [3, [5]],
  [4, []],
  [5, []],
])

console.log(dfs(graph, 1))
// Example DFS order:
// [1, 3, 5, 2, 4]

/**
 * Connection with Trees.ts
 *
 * The tree traversals implemented in Trees.ts are DFS:
 *
 *          1
 *        /   \
 *       2     3
 *      / \
 *     4   5
 *
 * Pre-order:
 *   1 -> 2 -> 4 -> 5 -> 3
 *
 * In-order:
 *   4 -> 2 -> 5 -> 1 -> 3
 *
 * Post-order:
 *   4 -> 5 -> 2 -> 3 -> 1
 *
 * All three are Depth-First traversals.
 *
 * BFS would visit:
 *   1 -> 2 -> 3 -> 4 -> 5
 */