from typing import List

class UnionFind:
  def __init__(self, N: int):
    self.parents = [x for x in range(N)]
    self.ranks = [0 for x in range(N)]

  def find(self, node: int) -> int:
    if node == self.parents[node]:
      return node

    rep = self.find(self.parents[node])
    self.parents[node] = rep
    return rep

  def union(self, x: int, y: int) -> bool:
    rep_x = self.find(x)
    rep_y = self.find(y)
    if rep_x == rep_y:
      return False

    if self.ranks[rep_x] > self.ranks[rep_y]:
      self.parents[rep_y] = rep_x
    elif self.ranks[rep_x] < self.ranks[rep_y]:
      self.parents[rep_x] = rep_y
    else:
      self.parents[rep_y] = rep_x
      self.ranks[rep_x] += 1

    return True

class Solution:
  def findRedundantConnection(self, edges: List[List[int]]) -> List[int]:

    # A connected graph has n-1 edges at minimum. Therefore by passing 
    # (n-1) + 1 = n, the number of nodes. However, we know that there's 
    # at least one extraneous edge, therefore len(edges) >= number of nodes. 
    # So technically, you can just pass in len(edges) and that should create 
    # enough array slots for your nodes. But I'll always do +1 because maybe they'll use 
    # a graph that has no extraneous edges as an edge case, and +1 would ensure we'd create n slots.
    res: List[int] = []
    union_find: UnionFind = UnionFind(len(edges))
    for e in edges:
      is_valid = union_find.union(e[0] - 1, e[1] - 1)
      if not is_valid:
        res = e

    return res
