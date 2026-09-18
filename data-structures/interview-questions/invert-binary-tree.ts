class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function invertBinaryTreeRecursive(root: TreeNode | null): TreeNode | null {
  if (root === null) return null;

  const temp = root.left;
  root.left = root.right;
  root.right = temp;

  invertBinaryTreeRecursive(root.left);
  invertBinaryTreeRecursive(root.right);
  return root;
}

function invertBinaryTree(root: TreeNode | null): TreeNode | null {
  if (root === null) return null;

  const stack: TreeNode[] = [root];

  while (stack.length > 0) {
    const current = stack.pop()!;
    const temp = current.left;
    current.left = current.right;
    current.right = temp;

    if (current.left !== null) {
      stack.push(current.left);
    }

    if (current.right !== null) {
      stack.push(current.right);
    }
  }
  return root;
}

console.log(
  invertBinaryTree(new TreeNode(4, new TreeNode(2), new TreeNode(7))),
);

console.log(invertBinaryTreeRecursive(new TreeNode(1, new TreeNode(2), null)));
