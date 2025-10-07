# Topological Ordering 

## Topological Ordering (Definition)

Given a directed graph $G=(V,E)$, a topological ordering is a permutation $\pi: [n]\rightarrow V$ such that for every edge $(i, j)\in E$, i must appear before j in $\pi$ i.e. $pos_{\pi}(i) \leq pos_{\pi}(j)$

In English, the topological ordering is an ordering such that, "from vertices" come before and "to vertices" come after. Nodes that depend on other nodes will come after, whilst nodes with no dependencies come before.

## Cycles, Source Vertices, and Terminology
We only talk about topological ordering when we have directed graphs, which gives us this idea of vertices depending on other vertices. However, only a **directed acyclic graph (DAG)** will have a topological ordering. If we have a DAG, it's will contain at least one vertex with no incoming edges. Formally, it'll have at least one vertex $i$ such that there doesn't exist an edge $(j,i) \in E$, and we call these **source vertices**. Finally the process of finding the topological ordering is often called a **topological sort**.  

## Finding the Topological Ordering 

Given that G is a DAG, the idea is to repeatedly do DFS on unvisited vertices. Then during every DFS, we'd track at what time step we finish processing the vertex. The source vertices will finish last, well at least they'll finish later than non-source-vertices. You'd likely end up with a list containing vertices in the order of finished first to finished last, and then you just reverse that list.

Thinking about the theory, consider a simple DAG. If you randomly pick a vertex, and it's the source node, given that you're running a DFS, that source node will finish last. Let's say you pick a non-source node, okay fine you just visit that node, and that node finished first. Even if you continue to randomly pick non-source nodes, that just lets those non source nodes be processed and finished/exiting. And then last you'll eventually have to pick the source node to be finished last.

### Topological Sort DFS Pseudocode
```
Function topological_sort(g):
  visited[1:n]
  ordering[1:n]
  For vertex u in g:
    If not visited[u]:
      dfs_visit(u, visited, ordering)
  return reverse(ordering)

Function dfs_visit(u, visited_list, order_list):
  visited_list[u] = TRUE
  For neighbor v in u:
    If not visited_list[v]:
      dfs_visit(v, visited_list, order_list)
  order_list.append(u)
```

### Topological Sort BFS Pseudocode
Kahn's algorithm is an iterative approach that uses a queue and the concept of in-degree (the number of incoming edges to a vertex). It repeatedly finds and removes source nodes (nodes with an in-degree of 0).
- **Compute In-Degrees:** Calculate the in-degree for every vertex in the graph. You can do this by counting up the neighbors for each node.
- **Initialize Queue:** Create a queue and add all vertices with an in-degree of zero (these are the source nodes).
- Initialize an empty list $ordering$ to store the topological sort.
- While the queue is not empty:
  - Dequeue vertex $u$
  - Append $u$ to the $ordering$ list.
  - For each neighbor $v$ of $u$:
    - Decrement the in-degree of $v$, to simulate removing edge $(u, j)\in E$
    - If the in-degree of $v$ is zero:
      - Append $v$ to the queue. The idea that this becomes the new vertex for processing the next layer.
  
**Note:** Notice how the BFS version doesn't need to reverse the ordering list because we start at the source nodes.