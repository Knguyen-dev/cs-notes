# Search Algorithms

## Depth First Search
- **Input:** Graph `G` and starting vertex `s`
- Initialize stack and a `visited` set (or array) to keep track of explored node .
- Push `s` onto the stack.
- Initialize `array[1:n]` called `parent_tree` (could be a map).
- While stack is not empty:
    - Pop `current_node` from the stack.
    - Process current node (e.g. print it, check if it's the goal).
    - For all neighbors of `current_node`:
        - If neighbor is not visited:
            - Label neighbor as visited.
            - Push the neighbor onto the stack.
            - Do `parent_tree[neighbor] = current_node`

**Note:** This is a "visit-on-push" variant of the dfs. This ensures that each node is pushed onto the stack a maximum of one time. Generally the most efficient version of BFS. Regardless though, the runtime of this is $O(|V|+|E|)$.

Another variant is: Pop from stack, check if visited. If not visited, process the node and mark it as visited. Then process all non visited neighbors, for each neighbor we only enqueue it, so we don't mark neighbors as visited. We only mark something as visited when we pop from the stack. This is perfectly valid as well, and we can call it "visit-on-pop".

## Breadth First Search
Literally the same algorithm, but we use a queue instead. As a result, we're not going deepest into a layer, but rather doing it layer by layer. Below is the algorithm:

- **Input:** Graph `G` and starting vertex `s`
- Initialize an empty queue and a `visited` set (or array) to keep track of explored nodes.
- Initialize an `array[1:n]` called `bfs_tree` that maps a given node to its parent node.
- Enqueue vertex `s`
- While the queue is not empty:
    - Dequeue a node, call it the `current_node`
    - Process `current_node` (e.g. check if it's the goal)
    - For each `neighbor` of `current_node`:
        - If `neighbor` has not been visited:
            - Mark `neighbor` as visited.
            - Set `bfs_tree[neighbor] = current_node`
            - Enqueue `neighbor`

Note: This algorithm works on a undirected connected graph. If we want it to work on a directed/connected graph, it would need to be a little different. Notice that on a unweighted graph, a goal oriented bfs search will find the shortest path from A to B. The runtime of bfs is $O(|V|+|E|)$.

## Dijkstra: Shortest Path Algorithm
Given a weighted graph, find the cheapest path between two nodes. Dijkstra's algorithm solves this problem by finding the shortest path from the starting node to any other node. 

- **Input:** A weighted graph $G=(V,E)$ and starting vertex $s$.
- **Output:** The shortest distance $dist[v]$ from $s$ to every other vertex $v \in V$, and a $parent[v]$ array to reconstruct the path.

### Dijkstra Algorithm Pseudocode
Algorithm:
- Initialize `dist[1:n]` array, set `dist[s]=0` and `dist[v]= infinity` for all other vertices.
- Initialize $parent$ array/map to track the shortest path tree.
- Initialize a min-heap (aka priority queue) `pq`, which stores (distance, vertex).
- Insert the starting node into the priority queue as `(0, s)`.
- While the priority queue isn't empty:
    - **Extract minimum:** `current_dist, u = pq.extract_min()`
    - **Stale Check:** If `current_dist > dist[u]`, skip to the next iteration.
        - **Rationale:** This node `u` was pushed onto PQ earlier by some other neighbor, there was some other path to it. However, our current path through our current node `u` seems to yield a higher distance than the previous path. As a result, we don't care about the current path, so skip it. This acts like a visited list, preventing us from visiting the same nodes twice in Dijkstra's.
    - **Relaxation:** For each neighbor `v` of `u` with edge weight `w`
        - Calculate the new path distance to `v` from `u`, where `new_dist = dist[u] + w`
        - If `new_dist < dist[v]` (the new path is shorter):
            - Update distance: Set `dist[v] = new_dist`
            - Update parent: Set `parent[v] = u`
            - Insert into PQ: Insert the updated pair `(new_dist, v)` into `pq`
- You can return `dist[1:n]`, which can be used to reconstruct the path or get the distances you want.

### Theory Behind Dijkstra's Shortest Path Algorithm
Set a start vertex with the of zero, whilst all other vertices start with a cost of infinity to indicate that they haven't been visited yet, so their costs are unknown. The reason they do this is with the algorithm, you want to pick the node from the queue with the cheapest cost. The cost of a node is the cost to get from the start vertex to the given vertex.

The algorithm will expand the vertex with the cheapest cost from the start. As a result once you visit a vertex, we can reason that we've found the cheapest cost from the start to that vertex, eliminating the need to visit it again. Again, the **first time** extract a vertex from the priority queue, you've found the shortest path from the start vertex to that particular vertex. 

However there's this idea of "finding a cheaper path" in Dijkstra. This happens when you're expanding a node and comparing the costs of unvisited neighbors. You may find that the cost of going to a neighbor, through your current node, is cheaper the previous cost of getting to that neighbor (presumably through another path). As a result, you're going to update the the cost of that neighbor in the cost map. The algorithm is $O((V+E)log(V))$ runtime.

**Note:** It should be obvious but Dijkstra only shines when you're in a weighted graph. If you wanted to find the shortest path in an unweighted graph, goal-oriented BFS will work.

### What is Uniform Cost Search (UCS)?
In classical AI/Path-finding you'll probably hear of an algorithm called Uniform Cost Search, which is a variant of Dijkstra's that's simply goal oriented:
- With Dijkstra, we calculate the shortest distance from a start to every other node. 
- UCS is used when we want to find the shortest path from a start node to a specific goal node. As a result, it stops once it visits the goal node. When putting a node on the min-heap, Dijkstra calculates the distance as $f(n) = g(n)$, where g is the distance from the start to the current node n.

**TLDR:** UCS is simply a goal oriented dijkstra. To implement it, you'd just put a conditional check in your main loop to check if the current node is the goal node.

## Greedy Best First Search (GBFS)
The general idea of greedy algorithms is that they always choose the cheapest immediate path. The idea is that whilst this is good in the short term, it doesn't guarantee that we get the optimal solution in the long term. In common AI search and graph related problems, you'll have a weighted graph. However alongside your edge weights at each edge, each node is assigned a "heuristic". This heuristic is an approximation is typically an approximation of how far the that node is away from the goal. For our purposes, this algorithm just chooses the neighbor with the smallest heuristic value, ignoring the edge weights.

If you were to define a distance function that describes how this algorithm compares the distances between two nodes, it would be $f(n)=h(n)$, where $f(n)$ is the distance and $h(n)$ is the heuristic.
 
**Note:** For future reference, when a search algorithm can use heuristic values, we call that an **informed search algorithm**. This is because it has extra information about the location of the goal.

### Greedy Search Pseudocode
- **Input:** Graph G, starting vertex s, goal vertex g,
- Initialize a min-priority queue `pq` which stores `(heuristic, vertex)` pairs.
- Initialize a `visited` set to track explored nodes, which is essential to prevent infinite loops in graphs with cycles.
- Initialize `parent` map/array to reconstruct the path, which is standard by now in path finding.
- Insert the starting node into the priority queue and mark it as visited.
- While `pq` is not empty:
    - Extract minimum: `current_h, u = pq.extract_min()`.
    - Goal Check: if `u` is the goal node, end the search and return the path.
    - For each neighbor `v` of `u`:
        - If `v` hasn't been visited:
            - Mark `v` as visited.
            - Set `parent[v] = u`
            - Calculate heuristic `neighbor_h = h(v)`
            - Insert into PQ: `pq.insert((neighbor_h, v))`

**Note:** Notice how this only focuses on the heuristic, ignoring the actual cost traveled so far `g(n)`. Since it's purely heuristic, it's generally not optimal (doesn't guarantee shortest path), but it's much faster than BFS or Dijkstra's as it quickly guides the search towards the goal. UCS uses the total path cost `g(n)` whilst GBFS uses `h(n)`, which is the estimated remaining cost.

## A-star (A*)
A* is an informed search, path-finding algorithm used to find the shortest path between two points when we not only have edge weights, but also heuristic values. It's a combination of:
- **UCS:** Finds shortest path from start to vertex n so far.
- **GBFS:** Takes advantage of a heuristic, typically the estimated cost from the goal. 

A* uses a cost function $f(n) = g(n) + h(n)$, where $g(n)$ is the cost of the path so far, and $h(n)$ is the estimated cost to the goal. A* is typically hailed as the king of path finding, being used in the real world constantly in robotics and navigation software. Again, you'll pull out A* when you also have a heuristic value allowing the algorithm to rely on the total distance so far to the neighbor `g(n)` and the estimated distance a given neighbor is to the goal `h(n)`. Without a heuristic value, A* is equivalent to UCS, with both relying on `g(n)`. 

### A-star Pseudocode
- **Input:** Graph `G`, starting vertex `s`, and goal vertex `t`, and heuristic function `h(n)`.
- Initialize a min-priority queue `pq` to store `(f(n), n)`
- Initialize a cost-so-far map/array `g`, where `g[s] = 0` and `g[v] = infinity` for all other vertices.
- Calculate the starting node's f-cost `f[s] = g[s] + h[s]`
- Initialize a `parent` map/array for path reconstruction
- Insert the starting node into the priority queue `pq.insert((f[s], s))`
- While the priority queue isn't empty:
    - **Extract minimum:** Extract the node `u` with the smallest f-cost. Do `current_f, u = pq.extract_min()`.
    - **Stale Check:** If `current_f > g[u]`, skip to the next iteration.
        - **Rationale:** This is the same as the Dijkstra check. It means a shorter path to `u` has been already processed.
    - **Goal Check:** If `u` is the goal node `t`, end the search, return a reconstructed path, etc.
    - **Relaxation:** For each neighbor `v` of `u`:
        - Calculate the new path cost to `v` through `u` as `new_g = g[u] + w(u,v)`.
        - If `new_g < g[v]` (The new path is shorter):
            - **Update Distance:** Set `g[v] = new_g`.
            - **Update Parent:** Set `parent[v] = u`
            - **Calculate f-cost:** `new_f = new_g + h(v)`
            - **Insert into PQ:** `pq.insert((new_f, v))`

### A-Star Heuristics and Theory
In AI we have the idea of an admissible vs a consistent heuristic value:

- **Admissible Heuristic:** An admissible heuristic is the minimum requirement for A* to be effective.
  - **Formal Condition:** The estimated cost to the goal, $h(n)$, must never overestimate the true cost to the goal.
  - **Formal Effect:** This condition guarantees that A* is optimal (it always returns the globally shortest path). If the heuristic overestimates, the algorithm can prematurely ignore the optimal path.
  - **Practical Takeaway:** When using an admissible heuristic without consistency, you must allow a node to be re-inserted into the priority queue or have its cost updated. The check, if `new_g < g[v]`, is necessary because a longer path found earlier might need to be replaced by a shorter path discovered later. TLDR: Extracting the node on the first time doesn't guarantee that we found the shortest path to that particular node. We may find a shorter path through path relaxation.
- **Consistent Heuristic:** A stronger and more efficient form of admissibility.
  - **Formal Condition:** The heuristic adheres to the triangle inequality: $h(n) \leq w(n,p) + h(p)$ for all nodes, where $w(n,p)$ is the actual weight of the edge between n and neighbor p. A consistent heuristic is always admissible.
  - **Formal Effect:** Consistency guarantees distance finalization: The first time a node is extracted from the priority queue, A* has found the shortest path from the start node to that extracted node.
  - **Practical Takeaway:** Since consistency is so powerful, the A* algorithm behaves like Dijkstra's. So on the first time a node is extracted, the stale check will be false because that's the optimal entry. Then any subsequent entries for that node will be caught in that stale check. We'll never run into a scenario where we need to update a node's g-cost after it's already been extracted once.