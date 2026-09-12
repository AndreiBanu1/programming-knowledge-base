/**
 * 🔹 Graph (TypeScript Implementation)
 *
 * Definition:
 *  - A graph is a collection of nodes (vertices) connected by edges.
 *  - Can be directed or undirected.
 *  - Can be weighted or unweighted.
 *
 * Characteristics:
 *  - Vertices: the nodes.
 *  - Edges: the connections between nodes.
 *  - Can represent networks, relationships, dependencies, etc.
 *  - Common representations: adjacency list, adjacency matrix.
 *  - Time Complexity (Adjacency List):
 *      - Add vertex: O(1)
 *      - Add edge: O(1)
 *      - Search (DFS/BFS): O(V + E) where V = vertices, E = edges
 */

class Graph {
    adjacencyList: Map<string, string[]>;

    constructor() {
        this.adjacencyList = new Map();
    }

    // Add a vertex
    addVertex(vertex: string): void {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
        }
    }

    // Add an edge (undirected)
    addEdge(v1: string, v2: string): void {
        this.adjacencyList.get(v1)?.push(v2);
        this.adjacencyList.get(v2)?.push(v1);
    }

    // Remove an edge
    removeEdge(v1: string, v2: string): void {
        this.adjacencyList.set(v1, this.adjacencyList.get(v1)!.filter(v => v !== v2));
        this.adjacencyList.set(v2, this.adjacencyList.get(v2)!.filter(v => v !== v1));
    }

    // Remove a vertex
    removeVertex(vertex: string): void {
        for (const neighbor of this.adjacencyList.get(vertex) || []) {
            this.removeEdge(vertex, neighbor);
        }
        this.adjacencyList.delete(vertex);
    }

    // BFS Traversal
    bfs(start: string): string[] {
        const queue: string[] = [start];
        const visited: Set<string> = new Set();
        const result: string[] = [];

        while (queue.length > 0) {
            const vertex = queue.shift()!;
            if (!visited.has(vertex)) {
                visited.add(vertex);
                result.push(vertex);
                for (const neighbor of this.adjacencyList.get(vertex) || []) {
                    if (!visited.has(neighbor)) {
                        queue.push(neighbor);
                    }
                }
            }
        }

        return result;
    }

    // DFS Traversal (recursive)
    dfs(vertex: string, visited: Set<string> = new Set(), result: string[] = []): string[] {
        visited.add(vertex);
        result.push(vertex);
        for (const neighbor of this.adjacencyList.get(vertex) || []) {
            if (!visited.has(neighbor)) {
                this.dfs(neighbor, visited, result);
            }
        }
        return result;
    }
}

// Example usage
const g = new Graph();
g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
g.addVertex("D");

g.addEdge("A", "B");
g.addEdge("A", "C");
g.addEdge("B", "D");
g.addEdge("C", "D");

console.log("BFS Traversal from A:", g.bfs("A")); // ['A', 'B', 'C', 'D']
console.log("DFS Traversal from A:", g.dfs("A")); // ['A', 'B', 'D', 'C']
