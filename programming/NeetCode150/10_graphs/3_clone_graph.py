

from typing import Dict, Optional
from collections import deque

class Node:
  def __init__(self, val: int = 0, neighbors: list[int] = []):
    self.val: int = val
    self.neighbors: list[int] = neighbors


"""
# Definition for a Node.
class Node:
    def __init__(self, val = 0, neighbors = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []
"""

class Solution:
  def cloneGraph(self, node: Optional['Node']) -> Optional['Node']:
    oldToNew = {}

    def dfs(node):

      # If we've already visited this node, then don't recur (avoids infinite recursion)
      # Instead return an already allocated pointer to the dynamic node up to the caller.
      if node in oldToNew:
        return oldToNew[node]

      # First time visiting the node:
      # a. Create dynamic copy
      # b. Record it in global hash table.
      copy = Node(node.val)
      oldToNew[node] = copy

      # Recur on all neighbors:
      # a. For each neighbor, after recurring, we should be returned a dynamic copy
      #    of the immediate neighbor that we can put in our `Node::neighbors` list.
      # After the loop, return dynamic copy of current node to parent.
      for nei in node.neighbors:
        copy.neighbors.append(dfs(nei))
      return copy

    # Return a dynamic copy of the current node; ir none if the node is null
    return dfs(node) if node else None

  def cloneGraph(self, node: Optional['Node']) -> Optional['Node']:
    if not node:
      return None

    q: deque[Node] = deque()
    visited_cache: Dict[Node, Node] = {}

    # Allocate new node, mark it as visited in the cache, insert visited node in the queue for expansion.
    new_node: Node = Node(node.val)
    visited_cache[node] = new_node
    q.append(node)

    while q:

      # Get the popped node and its dynamic copy we need
      # to fill with neighbors
      popped = q.popleft()
      new_popped = visited_cache[popped]

      if popped.neighbors:
        for n in popped.neighbors:

          # If neighbor is already visited, just return a copy of that dynamically allocated
          # memory rather than allocating again.
          if n in visited_cache:
            new_popped.neighbors.append(
              visited_cache[n]
            )
          else:
          # Otherwise, neighbor hasn't been visited yet:
          # Create dynamic copy, add it to our neighbors, mark it as visited in cache.
          # Then finally add the original copy of the neighbor in the FIFO queue so that 
          # we can keep traversing.
            new_n: Node = Node(n.val)
            new_popped.neighbors.append(new_n)
            visited_cache[n] = new_n
            q.append(n)

    return visited_cache[node]    