/*
+ Dijkstra's Algorithm:
- Finds shortest path from a source node to all other nodes.
- Steps:
    1. Set source distance to 0, others to infinity.
    2. Record distances of adjacent nodes from source.
    3. Visit unvisited node with smallest weight from source, updating distances if shorter path found.
    4. Iterate n-1 times to visit all vertices.
- Credit: [Tutorialspoint](https://www.tutorialspoint.com/dijkstra-s-algorithm-to-compute-the-shortest-path-through-a-graph), [YouTube](https://www.youtube.com/watch?v=pVfj6mxhdMw)

+ Minimal Spanning Tree (MST) Algorithm:
- Goal: Connect all vertices with minimum total edge weight.
- Types: Free Tree, Rooted Tree, Weighted Tree.
- MST Criteria: Spanning tree with minimum weight.
- A graph has an MST if and only if it is connected.
- Algorithms: Prim, Kruskal.

+ Prim's Algorithm:
- Finds MST.
- Steps:
    1. Create empty 'visited' list.
    2. Add arbitrary node to 'visited'.
    3. Choose smallest edge to unvisited node, add node to 'visited'.
    4. Repeat until all nodes visited.
- Credit: [Tutorialspoint](https://www.tutorialspoint.com/data_structures_algorithms/prims_spanning_tree_algorithm.htm), [YouTube](https://youtu.be/cplfcGZmX7I)
*/

#include <iostream>
#include <vector>
#include <limits>

class Graph {
private:
    int numVertices;
    std::vector<std::vector<int>> weightMatrix;

    int getMinDistVertex(std::vector<int> dist, std::vector<bool> visited) {
        int minDist = std::numeric_limits<int>::max();
        int minDistVertex = -1;
        for (int v = 0; v < numVertices; v++) {
            if (!visited[v] && dist[v] < minDist) {
                minDist = dist[v];
                minDistVertex = v;
            }
        }
        return minDistVertex;
    }

public:
    Graph(int num) : numVertices(num), weightMatrix(num, std::vector<int>(num, 0)) {}

    void addEdge(int v1, int v2, int weight) {
        if ((v1 < 0 || v1 >= numVertices) || (v2 < 0 || v2 >= numVertices)) {
            std::cout << "Graph Error: Vertex out of range!" << std::endl;
            return;
        }
        weightMatrix[v1][v2] = weight;
        weightMatrix[v2][v1] = weight;
    }

    bool isEdge(int v1, int v2) {
        return weightMatrix[v1][v2] != 0;
    }

    int getWeight(int v1, int v2) {
        return weightMatrix[v1][v2];
    }

    int dijkstraShortestPath(int source, int destination) {
        std::vector<int> dist(numVertices, std::numeric_limits<int>::max());
        std::vector<bool> visited(numVertices, false);
        dist[source] = 0;

        for (int count = 0; count < numVertices - 1; count++) {
            int minDistVertex = getMinDistVertex(dist, visited);
            visited[minDistVertex] = true;

            for (int v = 0; v < numVertices; v++) {
                if (!visited[v] && isEdge(minDistVertex, v)) {
                    if (dist[minDistVertex] + getWeight(minDistVertex, v) < dist[v]) {
                        dist[v] = dist[minDistVertex] + getWeight(minDistVertex, v);
                    }
                }
            }
        }
        return dist[destination];
    }
};

int main() {
    int numVertices = 5;
    Graph myGraph(numVertices);

    myGraph.addEdge(0, 1, 2);
    myGraph.addEdge(0, 2, 4);
    myGraph.addEdge(1, 2, 1);
    myGraph.addEdge(1, 3, 7);
    myGraph.addEdge(2, 3, 3);
    myGraph.addEdge(0, 4, 5);
    myGraph.addEdge(4, 2, 2);

    std::cout << myGraph.dijkstraShortestPath(0, 3) << std::endl;

    return 0;
}
