def bfs_tree(head, needle):
    if not head:
        return False

    queue = [head]

    i = 0
    while i < len(queue):
        curr = queue[i]
        i += 1

        if curr.value == needle:
            return True

        if curr.left:
            queue.append(curr.left)

        if curr.right:
            queue.append(curr.right)

    return False


def bfs_graph(head, needle):
    if not head:
        return False

    queue = [head]
    visited = set()

    while queue:
        curr = queue.pop(0)

        if curr in visited:
            continue
        
        visited.add(curr)

        if curr.value == needle:
            return True

        for neighbour in curr.neighbors:
            if neighbour not in visited:
                queue.append(neighbour)

    return False