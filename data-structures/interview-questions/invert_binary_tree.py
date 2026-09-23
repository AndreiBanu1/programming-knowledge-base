class TreeNode:
    def __init__(
        self,
        val: int = 0,
        left: "TreeNode | None" = None,
        right: "TreeNode | None" = None,
    ):
        self.val = val
        self.left = left
        self.right = right


def invert_binary_tree_recursive(root: TreeNode | None) -> TreeNode | None:
    if root is None:
        return None

    temp = root.left
    root.left = root.right
    root.right = temp

    invert_binary_tree_recursive(root.left)
    invert_binary_tree_recursive(root.right)
    return root


def invert_binary_tree(root: TreeNode | None) -> TreeNode | None:
    if root is None:
        return None

    stack: list[TreeNode] = [root]

    while stack:
        current = stack.pop()
        temp = current.left
        current.left = current.right
        current.right = temp

        if current.left is not None:
            stack.append(current.left)

        if current.right is not None:
            stack.append(current.right)

    return root


print(
    invert_binary_tree(TreeNode(4, TreeNode(2), TreeNode(7))),
)
print(invert_binary_tree_recursive(TreeNode(1, TreeNode(2), None)))
