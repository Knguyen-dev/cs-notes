

from typing import Optional
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