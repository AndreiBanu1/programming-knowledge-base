from trees import TreeNode


def compare_binary_trees(a: TreeNode | None, b: TreeNode | None) -> bool:
    if a is None and b is None:
        return False

    if a is None or b is None:
        return False

    if a.value != b.value:
        return False

    return compare_binary_trees(a.left, b.left) and compare_binary_trees(a.right, b.right)
