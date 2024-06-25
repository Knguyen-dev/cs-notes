/*
+ What is graph theory and how does it work?
    1. Graph theory has been applied to a variety of problem such as maps, circuits, finding the shortest route
    for something, genetics, etc.

+ Discrete Math Key Ideas: 
    1. Subset: Y is a subset of X, means every element in Y is also in X.
    2. Intersection: Y intersection X, means set of all elements that are in both Y and X.
    3. Union: Y union X, means set of all elements in Y or X
    4. n ∈ X: Means n is an element of set X.
    5. A x B: Set of all ordered pairs (a, b), where a and b are elements of their respective sets.

+ Graph: A pair G = (V,E). Where V is the set of vertices of the graph, and E is the set of edges. 
Elements in the set of edges, are just pairs of vertices, which makes sense as each edge or connection, shows
which two vertices compose that connection. It's worth noting E ⊆ V x V, since V x V is all possible combinations
of pairs of edges (connections), while E is just the set of edges happening in the graph.

    1. Vertices (Nodes): Individual entities/elements in a graph. Represented by V or V(G), which denotes
    the set of vertices in graph G.
    
    2. Edges: Connections or relationships between vertices in a graph. Defined by two vertices on its ends.
    Indicated by E or sometimes E(G), which is the set of edges in graph G. Edges can be directed, denoted by 
    an arrow as a one way relationship, or undirected, denoted by a normal. Or even weighted, and all of these 
    give the graph more information and details. 
    
    3. Directed graph (digraph): Elements of E(G), our set of edges, are ordered pairs. 
        - For pair (u, v), u is often the origin or where the edge starts, and vertex v is the desination,
        or where the edge goes to.  
        - Adjacent vertices in a directed graph: Assume edge e = (u, v), u is adjacent to v and v is adjacent from u.
        Given some vertex u, any vertex adjacent to u are called immediate successors. 
        - Strongly connected: if any two vertices are connected; Important since directed graphs have arrows, the 
        path must be followed without breaking the direction of the arrows (edges) for the path to be valid.
        
    4. Undirected graph: Elements of E(G), are not ordered pairs. As a pair (u, v) and (v, u) are count
    as the same edge. Which can help indicate that there's a two-way relationship or something similar between
    the vertices. Visually, the edges look like line segments.
        - Adjacent vertices in an undirected graph: Vertices u and v are adjacent if there's an edge 
        from one to the other. Meaning if they compose an edge (u, v). 
        
    5. Subgraph: Graph H is a subgraph of graph G if V(H) ⊆ V(G) and E(H) ⊆ E(G). Meaning every vertice in H 
    is in G, and every edge in H is in G.

    7. Incident: If there's an edge e = (u, v), then we say edge e is incident on vertices u and v. Essentially 
    the edge connects the vertices u and v or is connected/associated with those vertices. 
        - Loop: Edge incident on a single vertex. Essentially, the edge starts and ends at the same vertex, as 
        a result it creates a connection or loop back to itself.

    8. Parallel Edges: Edges that are connected to/associated with the same pair of vertices.

    9. Simple Graph: Graph that has no loops or parallel edges.
        - Free tree: A simple graph such that if u and v are two vertices, there is a unique path from u to v.

    10. Path: There's a path or connection from u to v if there's a sequence of vertices u1, u2, uN. So u = u1, and uN = v.
    Essentially vertices are connected by edges and create a connection from u (our starting vertex) 
    to v (our ending vertex), which we can call a path.
        - Connected: Vertices u and v are connected if there's a path from u to v.
        - Component: A maximal subset of connected vertices. So a component is when you can't add any more vertices
        because if you do, then it'll break some connections. Note that in a component each vertex is connected
        to every other vertice.

    12. Simple path: All vertices, except possibly the first and last, are distinct.
        - Cycle: Simple path where the first and last vertices are actually the same.
        - Circuit: A path of nonzero length from vertex u to v with no repeated edges.

	13. Weight:
		- Weight of an edge: Non-negative real numbers assigned to the edges or connections. Like if an edge
		represented a road, the weight could represent the distance.
		- Weighted graph: Every edge has a weight
		- Weighted path: Given some path, the weight of that path is the sum of the weights of all the edges
		on that path. 
		- Source: Starting vertex in the path.
		- Shortest Path: Path with the smallest weight.
    
    14. Spanning Tree: A tree representation of a graph; all vertices are connected. It has no cycles, so 
    there isn't a path where the first and last vertices are the same. Also it uses the minimum amount of 
    edges so given you have n vertices, the spanning tree has n-1 edges. 
    NOTE: Easiest way to get a spanning tree is to do a breadth or depth first traversal on it.

    15. Minimal Spanning tree: A spanning tree, but it uses the least amount of weights/costs. NOTE: To get 
    this you use an algorithm such as prim's algorithm.

+ How are graphs represented?
    1. Adjacency matrices: Represented as A(G) is a two dimensional n x n matrix. If (vi, vj) belong to E(G), the 
    (ith, jth) entry is 1, else it doesn't belong E(G) so that entry has 0. 
    2. Adjacency lists: Each vertex in V(G), v is associated with a linked list. Then each node of said linked
    list contains another vertex, u, such at (u, v) belongs in E(G). Each node has the component 'vertex' and 
    then 'link', of course the link to the next node. This composes a personalized linked list for each vertex, 
    in which each node has another vertex that creates an existing edge in the graph!  

+ Graph Operations:
    1. Create/Clear graph
    3. Check graph size, and whether it's empty or not. 
    4. Traverse graph
    5. Print graph

+ Various graph traversal algorithms

- Depth First Traversal (Recursive Algrithm):
	- Goes to the deepest vertices in branch, and finishes that deep branch before moving onto other 
	possible branches.


- Breadth (broad/wide) First Traversal: It searches horizontally first before going down vertically.
uses a queue, generally a fifo one, to help accomplish this.
    - Breadth first search algorithm or instructions:
    BFS(graph, source) {
        1. Create queue and enqueue source vertex/node that we start from
        2. Create a set to keep track of visited vertices
        3. While queue isn't empty:
            - Dequeue a vertex from the queue
            - Mark the vertex as visited
            - Process the vertex (print it)
            - Enqueue all unvisited neighbors
        4. End function
    }

+ Spanning Trees: Spanning trees are just tree representations of graphs. With a spanning tree there aren't 
any cycles in the graph, and it uses the minimum amount of edges to keep all of the vertices connected. 
There are n vertices, and n - 1 edges.
    - NOTE: To find the spanning tree, actually the easiest way is to just do a breadth or depth first search, 
    which traverse the graph. These methods of traversing the graph, offer an organized and tree-like way of 
    visualizing the graph, and so the simplest way to get a spanning tree from a graph is to do a breadth or depth
    first traversal on it. 
    
*/

#include <iostream>
#include <vector>
#include <list>

class Graph {
private:
    int numVertices;

    // A list of lists, a matrix
    std::vector<std::list<int>> adjList;

public:
    Graph(int vertices) : numVertices(vertices), adjList(vertices) {}

    void addEdge(int src, int dest) {
        adjList[src].push_back(dest);
        adjList[dest].push_back(src); // Uncomment this line for undirected graph
    }

    void printGraph() {
        for (int i = 0; i < numVertices; ++i) {
            std::cout << "Vertex " << i << " is connected to:";
            for (int v : adjList[i]) {
                std::cout << " " << v;
            }
            std::cout << std::endl;
        }
    }
};

int main() {
    Graph graph(5);
    graph.addEdge(0, 1);
    graph.addEdge(0, 4);
    graph.addEdge(1, 2);
    graph.addEdge(1, 3);
    graph.addEdge(1, 4);
    graph.addEdge(2, 3);
    graph.addEdge(3, 4);

    graph.printGraph();

    return 0;
}
