from dataclasses import dataclass


@dataclass
class TreeNode:
    value: int
    left: "TreeNode | None" = None
    right: "TreeNode | None" = None


class Tree:
    def __init__(self):
        self.root: TreeNode | None = None

    # Insert value using Binary Search Tree rules
    def insert(self, value: int) -> None:
        new_node = TreeNode(value)

        if self.root is None:
            self.root = new_node
            return

        self._insert_node(self.root, new_node)

    def _insert_node(
            self,
            node: TreeNode,
            new_node: TreeNode,
    ) -> None:
        if new_node.value < node.value:
            if node.left is None:
                node.left = new_node
            else:
                self._insert_node(node.left, new_node)
        else:
            if node.right is None:
                node.right = new_node
            else:
                self._insert_node(node.right, new_node)

    # Pre-order: Root -> Left -> Right
    def preorder_traversal(self) -> list[int]:
        path: list[int] = []

        self._walk_preorder(self.root, path)

        return path

    def _walk_preorder(
            self,
            curr: TreeNode | None,
            path: list[int],
    ) -> None:
        if curr is None:
            return

        path.append(curr.value)

        self._walk_preorder(curr.left, path)
        self._walk_preorder(curr.right, path)

    # In-order: Left -> Root -> Right
    def inorder_traversal(self) -> list[int]:
        path: list[int] = []

        self._walk_inorder(self.root, path)

        return path

    def _walk_inorder(
            self,
            curr: TreeNode | None,
            path: list[int],
    ) -> None:
        if curr is None:
            return

        self._walk_inorder(curr.left, path)

        path.append(curr.value)

        self._walk_inorder(curr.right, path)

    # Post-order: Left -> Right -> Root
    def postorder_traversal(self) -> list[int]:
        path: list[int] = []

        self._walk_postorder(self.root, path)

        return path

    def _walk_postorder(
            self,
            curr: TreeNode | None,
            path: list[int],
    ) -> None:
        if curr is None:
            return

        self._walk_postorder(curr.left, path)
        self._walk_postorder(curr.right, path)

        path.append(curr.value)

    # Search for a value
    def search(
            self,
            node: TreeNode | None,
            value: int,
    ) -> bool:
        if node is None:
            return False

        if node.value == value:
            return True

        if value < node.value:
            return self.search(node.left, value)

        return self.search(node.right, value)


# Example usage

tree = Tree()

tree.insert(50)
tree.insert(30)
tree.insert(70)
tree.insert(20)
tree.insert(40)
tree.insert(60)
tree.insert(80)

print("In-order:", tree.inorder_traversal())
# [20, 30, 40, 50, 60, 70, 80]

print("Pre-order:", tree.preorder_traversal())
# [50, 30, 20, 40, 70, 60, 80]

print("Post-order:", tree.postorder_traversal())
# [20, 40, 30, 60, 80, 70, 50]

print("Search 40:", tree.search(tree.root, 40))
# True

print("Search 90:", tree.search(tree.root, 90))
# False
