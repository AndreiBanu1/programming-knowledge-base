import { TreeNode } from '../../data-structures/Trees'
// we use Queue - FIFO
// O(n)

function bfs<T>(head: TreeNode<T> | null, needle: T): boolean {
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
