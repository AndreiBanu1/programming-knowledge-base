/**
 * 🔹 Tree (TypeScript Implementation)
 *
 * Definition:
 *  - A tree is a hierarchical data structure consisting of nodes.
 *  - The topmost node is called the root.
 *  - A node can have zero or more children.
 *
 * Binary Tree:
 *  - Each node has at most two children: left and right.
 *
 * Binary Search Tree (BST):
 *  - A binary tree where:
 *      - values smaller than the current node go to the left
 *      - values greater than or equal to the current node go to the right
 *
 * Characteristics:
 *  - Root: topmost node.
 *  - Leaf: node with no children.
 *  - Height: longest path from the root to a leaf.
 *  - Branching factor: maximum number of children a node can have.
 *  - Balanced tree: left and right subtrees have similar heights.
 *
 * Traversals:
 *  - Pre-order:  Root -> Left -> Right
 *  - In-order:   Left -> Root -> Right
 *  - Post-order: Left -> Right -> Root
 *
 * Time Complexity for a BST:
 *  - Search:   O(log n) average/balanced, O(n) worst case
 *  - Insert:   O(log n) average/balanced, O(n) worst case
 *  - Delete:   O(log n) average/balanced, O(n) worst case
 */

export class TreeNode<T> {
  value: T
  left: TreeNode<T> | null = null
  right: TreeNode<T> | null = null

  constructor(value: T) {
    this.value = value
  }
}

class Tree<T> {
  root: TreeNode<T> | null = null

  // Insert value using Binary Search Tree rules
  insert(value: T): void {
    const newNode = new TreeNode(value)

    if (this.root === null) {
      this.root = newNode
      return
    }

    this.insertNode(this.root, newNode)
  }

  private insertNode(node: TreeNode<T>, newNode: TreeNode<T>): void {
    if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode
      } else {
        this.insertNode(node.left, newNode)
      }
    } else {
      if (node.right === null) {
        node.right = newNode
      } else {
        this.insertNode(node.right, newNode)
      }
    }
  }

  // Pre-order: Root -> Left -> Right
  preorderTraversal(): T[] {
    const path: T[] = []

    this.walkPreorder(this.root, path)

    return path
  }

  private walkPreorder(curr: TreeNode<T> | null, path: T[]): void {
    if (!curr) return

    // PRE
    path.push(curr.value)

    this.walkPreorder(curr.left, path)
    this.walkPreorder(curr.right, path)
  }

  // In-order: Left -> Root -> Right
  inorderTraversal(): T[] {
    const path: T[] = []

    this.walkInorder(this.root, path)

    return path
  }

  private walkInorder(curr: TreeNode<T> | null, path: T[]): void {
    if (!curr) return

    // LEFT
    this.walkInorder(curr.left, path)

    // ROOT
    path.push(curr.value)

    // RIGHT
    this.walkInorder(curr.right, path)
  }

  // Post-order: Left -> Right -> Root
  postorderTraversal(): T[] {
    const path: T[] = []

    this.walkPostorder(this.root, path)

    return path
  }

  private walkPostorder(curr: TreeNode<T> | null, path: T[]): void {
    if (!curr) return

    // LEFT
    this.walkPostorder(curr.left, path)

    // RIGHT
    this.walkPostorder(curr.right, path)

    // POST
    path.push(curr.value)
  }

  // Search for a value
  search(node: TreeNode<T> | null, value: T): boolean {
    if (node === null) {
      return false
    }

    if (node.value === value) {
      return true
    }

    if (value < node.value) {
      return this.search(node.left, value)
    }

    return this.search(node.right, value)
  }
}

// Example usage

const tree = new Tree<number>()

tree.insert(50)
tree.insert(30)
tree.insert(70)
tree.insert(20)
tree.insert(40)
tree.insert(60)
tree.insert(80)

console.log('In-order:', tree.inorderTraversal())
// [20, 30, 40, 50, 60, 70, 80]

console.log('Pre-order:', tree.preorderTraversal())
// [50, 30, 20, 40, 70, 60, 80]

console.log('Post-order:', tree.postorderTraversal())
// [20, 40, 30, 60, 80, 70, 50]

console.log('Search 40:', tree.search(tree.root, 40))
// true

console.log('Search 90:', tree.search(tree.root, 90))
// false
