# Graph Theory

## Representations of graphs
- **Def. (Adjacent):** If there's an edge between v and w, then v and w are adjacent. They are neighbors.
- **Def. (Degree):** The number of neighbors for a given vertex is called its degree. However the degree of an entire graph is 
just the maximum degree of any vertex in the graph.

A graph is an ordered pair (V, E) such that:
  - V: Set of vertices in the graph.
  - E: Set of edges, where an edge is a pair of vertices. E.g ${v, w} \in E$. So there's an edge that connects v and w. 
  Note that here the pair is a set, meaning the order doesn't matter. This is good for undirected graphs where an edge (connection)
  doesn't have an arrow. For a directed graph, we use an ordered pair.

### Example 1: Representing a graph
G = (V, E). 
V = {0,1,2,3,4,5}
E = { {0,1}, {1,2}, {0,2}, {3,4} }; This is in edge-list notation.

So v and w are adjacent if $(v,w) \in E$.

### Adjacency List
A list of lists, where we have one list for each vertex that contains all the neighbors for that vertex.
[
  [1,2], ; So node #0 has two neighbors, it's connected with 1 and 2.
  [0,2],
  [0,1],
  [4],
  [3],
  [] ; So node #5 doesn't have any neighbors.
]

### Adjacency Matrix
[
  [0,1,1,0,0,0],
  [1,0,1,0,0,0],
  [1,1,0,0,0,0],
  [0,0,0,0,1,0],
  [0,0,0,1,0,0],
  [0,0,0,0,0,0]
]
So here G[0][2] = 1, and so G[2][0] = 1 also. This means that nodes 0 and 2 are neighbors.

There are advantages and disadvantages to each:
For edge-list notation, you can easily add a connection by adding another set. For an adjacency list, let's say you wanted 
to add an edge between 0 and 5. To do this you need to add 5 to [1,2], and then a 5 to []. Then for an adjacency matrix you'd need 
to do G[0][5] = 1 = G[5][0]. So there are many different representations of a graph.

## Directed Graphs
- **Def. (Directed Graph):** A graph but the edges have a direction. Also vertices can point to themselves. We'd still represent it as an ordered pair (V, E). 
For example E = {(0,1), (5,0), (1,2), (2,0), (3,4), (4,3), (1,0)}
- **Def. (Weighted Directed Graph):** A directed graph, but each edge has a weight. Here we use a triplet. An edge between u and v, that has a weight of 0.34, would be denoted by (u, v, 0.34). 
Typically weighted graphs are going to be directed, whilst it's not really common to have a undirected weight graph.

## Traversing a graph:
- **Def. (Cycle):** A cycle in a graph is a trail from one vertex to itself where the only repeated vertex is the starting and ending vertex, and has at least one edge.
- **Def. (Walk):** A walk in a graph G is a sequence of vertices where each vertex is adjacent to the next one. For example, '1,2,0,1,0,5,2,3'. So there's an edge between 1 and 2, 
another edge for 2 to 0, etc.
- **Def. (Trail):** A trail from vertex v to w is a walk with no repeated edges. For example, '4,0,1,0,5' isn't a trail because the trail from 0 and 1 is traversed twice.
- **Def. (Path):** A path from v to w is a trail with no repeated vertices. For example '4,0,1,2,4' isn't a path since the vertex 4 is visited twice.
  - **NOTE:** Every path is a walk. Every trail is a path.
- **Def. (Connected):** Two vertices are connected IFF there's a path between the two. 
  - How to prove if a graph is connected? You just have to check every vertex. For every vertex, there needs to be a path to every other vertex. So a good test would be the idea of 
  starting at a random node, and being able to reach any other node. Or choose a random node, do a DFS or BFS, of all nodes are visited then it's a connected graph, else disconnected.
- **Theorem. (Walk and paths):** If there's a walk between 2 vertices, then there's also a path
- **Def. (Connected component):** A connected component is the maximum set of vertices that are all connected to each other. It's a subgraph. For any given vertex So 'maximal' means that if 
you add any more vertices, then it wont' be connected anymore. It's connected, meaning that there exists a path between every pair of vertices. So given any two random 
vertices, there will be a path between them. More simply, given any vertex, you can reach any other vertex. Note that a single isolated vertex is also considered a single component.
- **Def. (Equal Paths):** Two paths are equal if they include the exact same edges and vertices. So paths 
are called 'different' if they're not equal. For example, the path '0,6,3,2' and '0,3,2' are different since the 
latter is missing the vertex '6' and the edges {0,6} and {6,3}.
- **Def. (Intersecting Paths):** Two paths from v and w are intersecting if the only vertices they have in common are the start and end. For example, in G1: 0,3,8,5,2 and 0,6,3,2 are intersecting. However 


#### Proof example 1
- Claim: In a graph G, if there's a walk from v to w, then v and 2 are connected.
- Goal: v and w are connected, so show there's a path from v to w.
1. Assume: Let X be a walk from v to w in G. Let x = x0, x1, ..., xn, where x0 = v and xn = w.. 
2. **Case 1:** If x has no repeated vertices, it's a trail and every trail is a path. Since there aren't any repeats, then it is already a path, so v and w are connected.
3. **Case 2:** Suppose X has repeated vertices, so $x_i = x_j$ be the first occurrence of a repeated vertex in X, with $j \geq i+i$.
  4. **Removing repeated vertices:**
    - The vertices $x_{i+i}$, ..., $x_{j-1}$ are between $x_i$ and $x_j$. We can remove these vertices in between and form a new walk.
    $Y=x_0,...,x_i,x_j,x_{j+1},...,x_n$.
    - Since there's an edge from $x_i$ to $x_j+1$ and $x_i=x_j$, this new sequence is still a valid walk from $v$ to $w$. 
  5. **Iterative Process:** The new walk Y has at least one fewer repeated vertex than X. We can then repeat this process:
    -  Each time we find a repeated vertex, create a new walk that removes the vertices between the wto occurrences of that vertex.
    - This process continues until there are no repeated vertices left in the walk.

#### Proof example 2
- Claim: For any graph, if it contains a cycle, there there exists two vertices v and w with two different paths from v to w.
- Goal: Show that there are 2 different paths from v to w. 
1. Assume: Let C be a cycle from v to w in graph G. Let C = v1, ..., vk, v1, where v1, ..., vk are distinct vertices, and the edge {vk, v1} closes the cycle.
2. Let v1 and v2 be any two vertices from the cycle C.
3. Let the first path, P1, from v1 to v2. It can be traversed as P1 = v1, v2. However since this is a cycle, we can see this as P1 = v1, v2, ... vk, v1, v2.
4. Let the second path, P2, from v1 to v2 be traversed in the opposite direction. P2 = v1, vk, vk-1, ..., v2. 
5. These two paths are not equal, as P2, includes different vertices and edges, for example it includes vk and {v1, vk}, P1 does not, showing that they are 2 different paths by definition. 
6. Thus, we can conclude that for any graph containing a cycle, there exist two vertices v and w, (in this case, v1 and v2) such that there are two different paths connecting them.

#### Proof example 3 
- Claim: For any graph G, if there are two vertices v and w with two different paths from v to w, then there is a cycle in G.
1. Let there be two different paths P1 and P2:
  - **P1:** v, v1, ..., vn, w
  - **P2:** v, u1, ..., um, w
- **Case 1: The paths are non-intersecting**
In this case the only shared vertices are v and w. As a result, you can traverse 
from v to w using P1, and then from w to v using P2. Thus, there is a cycle in G.
- **Case 2: The paths are intersecting**
  1. Since the paths are different, there exist some vertex besides v and w, that P1 and P2 
  share. Let this be point p, and it can be the first point of divergence.
  - We can reason that Path 1 passes through p and continues to w. As well
  path 2 also passes through p, but continues on a different route to w.
  2. Starting from p, we can follow the rest of Path 1 to w. Then go from w to p using 
  path 2. This is a closed loop, and is a cycle in G
In both cases, we have two different paths, which form a cycle in G, therefore proven.

- Claim: For any connected graph G (with at least one edge) that has a Eulerian circuit, G has degree at least 2.
1. Let e in the Eulerian circuit represented by $e=(x_1,x_2,...,x_n,x_1)$, where $x_14 is the starting and ending vertex.
2. For a given vertex, $x_i$, we can reason that $\exists$ 2 edges $(x_i-1, x_i)$ and $(x_i, x_{i+1})$. So these vertex must be adjacent to $x_1$ for the Eulerian circuit to exist.
3. $\therefore$ at minimum, $\exists$ a vertex $x_1$ with degree 2, so by definition the degree of the graph will have degree = 2, $\therefore$ claim is true.  