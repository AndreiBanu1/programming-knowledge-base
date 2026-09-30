def dfs_tree(curr, path):
    if not curr:
        return False
    
    path.append(curr.value)
    dfs_tree(curr.left, path)
    dfs_tree(curr.right, path)
    
def dfs_graph(graph, curr, seen, path):
    if curr in seen:
        return
    
    seen.add(curr)
    path.append(curr)
    
    for neighbor in graph.neighbors[curr]:
        dfs_graph(graph, neighbor, seen, path)