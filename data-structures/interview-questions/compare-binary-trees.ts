// Compare 2 binary trees to see if they are equal in both shape and structure

import { TreeNode } from '../trees'

// we compare them in Structure and Shape using DFS
function compareBinaryTrees(a: TreeNode<number> | null, b: TreeNode<number> | null): boolean {
  if (a === null && b === null) {
    return true
  }

  if (a === null || b === null) {
    return false
  }

  if (a.value !== b.value) {
    return false
  }

  return compareBinaryTrees(a.left, b.left) && compareBinaryTrees(a.right, b.right)
}
