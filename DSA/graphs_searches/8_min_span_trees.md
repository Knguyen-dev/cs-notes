# Minimum Spanning Trees

## Spanning Tree (Definition)
Let $G=(V,E)$ be a connected, undirected graph, where:
- $V$ is the set of vertices 
- $E \subseteq {{u,v} | u,v \in V, u \ne v}$ is the set of edges

A **spanning tree of G** is a subgraph $T=(V, E_{T})$, where:
- $E_{T} \subseteq E$
- T is connected and acyclic

TLDR: A spanning tree is a subgraph that connects all vertices and has no cycles.

## Minimum Spanning Tree (Definition)
If $G=(V,E,w)$ is a connected, undirected, weighted graph, where:
- $V$ is the set of vertices 
- $E$ is the set of edges
- $w$: $E\rightarrow R$ is a weight function that assigns a real-valued cost ot each edge.

A **minimum spanning tree (MST) of G** denoted as $T=(V, E_{T})$ is a spanning tree such that the total weight of $T$ is the minimum among all possible spanning trees of $G$. 

TLDR: A minimum spanning tree is a subgraph that connects all vertices, has no cycles, and connects all vertices using the smallest total edge weight possible.

## Prim's Algorithm for MSTs

### Pseudocode and Step by Step
- Pick an arbitrary start vertex `s`.
- For each vertex `v`: Set `key[v] = inf`, `parent[v] = NIL`, `inMST[v] = false`
  - **Note:** `inMST` is basically your visited list.
- Set `key[s] = 0` and insert all vertices into the min-priority queue keyed by `key`.
- While the priority queue is not empty:
    - Extract vertex `u` with the smallest key value
    - Mark `inMST[u] = true` since we're visiting the vertex.
    - If `parent[u] != NIL`, include edge `(parent[u], u)` in MST.
      - **Note:** On the first iteration, this should fire and include the edge. This probably starts up the function.
    - For each neighbor `v` of `u`:
        - If `inMST[v] == false` and `w < key[v]`:
            - Set `parent[v] = u`
            - Set `key[v] = w`
        - **Note:** If the vertex is unvisited and this new edge to it is cheaper than our current edge to it, then include the edge. We record the parent that we came from and the new cheaper weight of the edge. 
        - **Note 2:** This is the thing that makes it different from Dijkstra
- When loop finishes, `parent[v]` describes the MST edges (and collect edges as they are added).

### Intuition
Prim's Algorithm is the exact same as Dijkstra's algorithm, but with one change:
- **Dijkstra:** If the cost from the start to the neighbor through our current node is cheaper than the recorded start-to-neighbor, then enqueue that neighbor, update the cost of start-to-neighbor, update parent. 
- **Prim's:** If edge cost between the current node and neighbor is cheaper than our recorded edge cost to that neighbor, then enqueue, etc. 

With Prim's the goal is "Hey minimize the edge to get to vertex v". However with Dijkstra, the goal is "Minimize the sum of weights (cost) from start to vertex v".

## Kruskal's Algorithm for MSTs
Sort edges by weight and add them one by one, skipping any edge that would create a cycle. Intuitively, imagine you've erased all the edges in the graph, and one by one, we're rebuilding the graph again.

The actual implementation for this is a little more involved. It uses a disjoint  set, and other stuff that's a little extra.