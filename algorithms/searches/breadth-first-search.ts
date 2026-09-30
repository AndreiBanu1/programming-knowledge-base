import { TreeNode } from '../../data-structures/trees'
import { GraphNode } from '../../data-structures/graphs'

// we use Queue - FIFO
// O(n)
// used for Shortest path problems

function bfsTree<T>(head: TreeNode<T> | null, needle: T): boolean {
  if (!head) {
    return false
  }

  const q: TreeNode<T>[] = [head]

  let i = 0

  while (i < q.length) {
    const curr = q[i]
    i++

    if (curr.value === needle) {
      return true
    }

    if (curr.left) {
      q.push(curr.left)
    }

    if (curr.right) {
      q.push(curr.right)
    }
  }

  return false
}

function bfsGraph<T>(head: GraphNode<T> | null, needle: T): boolean {
  if (!head) {
    return false
  }

  const q: GraphNode<T>[] = [head]
  const visited = new Set<GraphNode<T>>()

  let i = 0

  while (i < q.length) {
    const curr = q[i]
    i++

    if (visited.has(curr)) {
      continue
    }

    visited.add(curr)

    if (curr.value === needle) {
      return true
    }

    for (const neighbor of curr.neighbors) {
      if (!visited.has(neighbor)) {
        q.push(neighbor)
      }
    }
  }

  return false
}