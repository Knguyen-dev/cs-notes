# Cycle Detection

## Cycle Detection: Directed Graphs
The idea is that if you visit/encounter a node that's already being processed (visiting state), then that means you have a cycle. You encountered the node, but you're already processing it, you'll never exit out of the node before having to encounter it and push it on the stack again.

We'll achieve this with DFS and we'll  split the nodes into three states:
- **Unvisited:** Has not been discovered yet. We'll color this as white.
- **Visiting:**  Currently in the recursion stack. Colored as gray.
- **Visited/Finished:**  All descendants have been fully explored. Colored as black.

### Recursive Variant Pseudocode
```
Function DetectCycle_Directed(G):
  // 1. Initialize all vertices to unvisited
  Set Status[v] = WHITE for all vertices v in G

  // 2. Iterate through all vertices (handles disconnected components)
  For each vertex u in G:
    If Status[u] is WHITE:
      If DFS_Visit(u) is TRUE:
        Return TRUE (Cycle Found)
  Return FALSE (No Cycle Found)

// Recursive Helper Function
Function DFS_Visit(u):
  Status[u] = GRAY // Mark as visiting (On recursion stack)
  For each neighbor v of u:

    // FOUND CYCLE: We're visiting a node that's already in the process of being visited.
    If Status[v] is GRAY:
      Return TRUE
    
    // Else an unvisited node 
    If Status[v] is WHITE:
      If DFS_Visit(v) is TRUE: // Propagating up boolean when cycle exists.
        Return TRUE
   
  Status[u] = BLACK // Mark as finished (leaving recursion stack)
  Return False
```
A cycle is detected `Status[v] is GRAY`. This means the DFS has followed a path $p = v, ..., u$, where v is an ancestor of u (i.e. v is already on the callstack). And now we just discovered an edge from (u, v), forming an a cycle.



### Iterative Variant Pseudocode
```
Function DetectCycle_Iterative(G):
  // 1. Initialization
  Set Status[V] = WHITE for all vertices in G

  // 2. Iterate through all vertices (to handle disconnected components)
  For each vertex u in G:
    If Status[u] is WHITE:
      If DFS_Check_Iterative(u) is TRUE:
        Return TRUE (Cycle Found)
  Return FALSE (No Cycle Found)

// Iterative Helper Function
Function DFS_Check_Iterative(start_node):
  Stack = new Stack()
  Stack.push(start_node)
  Status[start_node] = GRAY // Mark as visiting

  While Stack is not empty:
    u = Stack.peek()
    is_exploring_neighbors = FALSE
    For each neighbor v of u:
      If Status[v] is GRAY:
        // FOUND CYCLE: Back edge to a node currently in the stack.
        Return TRUE
      
      If Status[v] is WHITE:
        // Mark new node as visiting and 
        Status[v] = GRAY
        Stack.push(v)
        is_exploring_neighbors = TRUE
        break // go to the inner loop with this new node

    // If no WHITE neighbors were found, we are finished with node u
    If is_exploring_neighbors is FALSE:
      Stack.pop()
      Status[u] = BLACK // Mark node as finished (Black)
  
  Return FALSE
```


## Cycle Detection: Undirected Graph

### Direct Parent Algorithm
In an undirected graph, encountering an already visited node isn't enough to prove a cycle. That visited node could be a direct parent node that we just traversed from.
```
Function DetectCycle_Undirected(G):
  Set Visited[v] = False for all vertices v in G
  
  // Iterate through all unvisited vertices (handles disconnected graphs)
  For each vertex u in G: 
    If Visited[u] is FALSE:
      If DFS_Check(u, parent = NULL) is TRUE:
        Return TRUE // Cycle Found
  Return FALSE // No Cycle Found

Function DFS_Check(u, parent):
  Visited[u] = TRUE
  For each neighbor v of u:

    // Recursively explore unvisited 
    If Visited[v] is FALSE:
      If DFS_Check(v, u) is TRUE:
        Return TRUE 

    // Else the current node has already been visited. The only scenario where this is fine is if 
    // the neighbor is simply the parent node we came from.

    // Else if the neighbor isn't the parent node we came from, then we just found a new path
    // to an already visited node.
    Else if v is NOT equal to parent:
      // FOUND CYCLE: Encountered an already visited node that isn't the immediate parent of u
      Return TRUE
  
  Return FALSE
```

### Multiple Paths Algorithm
**Input:** Graph $G=(V,E)$ and start vertex $s\in V$
- Initialize empty stack $S$
- Initialize arrays $visit[1:n]$ and $disc[1:n]$
- Set $visit[i]=0, \forall i \in {1, 2, ..., n}$ and $disc[i] = 0, \forall i \in {1, 2, ..., n}$
- $S.push(s)$
- While $S$ is not empty:
  - $v = S.pop()$
  - If $visit[v] = 1$, then skip to the next iteration.
  - Process v.
  - For $w \in N_{G}(v)$:
    - if $visit[w] = 0$:
      - $S.push(w)$
      - $disc[w] = disc[w]+1$


## Theory
The idea is that when we visit some node, we're not done visiting it (ongoing) until we've finished visiting its children. We'll keep track of the nodes that are ongoing by marking them as `visiting`. We know that we have a cycle when the neighbor we're exploring is already a node marked as `visiting`. The idea is that, "Hey we're supposed to be currently processing that node's children, but now we found this node again through some other path?". You'll expand the node again, and get its children. You'll never be able to finish processing its children because you'll expand the node again before it. And as a result, you'll never finish processing that node, and therefore we have a cycle. 

Another approach would be realizing that there's a cycle in a graph when G contains two vertices u, v such that there exists 2 or more paths connecting them in the graph.

## TLDR and Credits
TLDR: If you expand a node and then find the node again when you're not done processing its children, then we have a cycle. You can use this information to indicate "hey there's a cycle in this graph". 