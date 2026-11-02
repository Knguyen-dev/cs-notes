from typing import List
from collections import deque
import heapq

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
  def minCostConnectPoints(self, points: List[List[int]]) -> int:

    # Function for calculating manhattan distance between two points.
    def manhattan(x: List[int], y: List[int]) -> int:
      x_delta: int = x[0]-y[0]
      y_delta: int = x[1]-y[1]
      if x_delta < 0:
        x_delta = -x_delta
      if y_delta < 0:
        y_delta = -y_delta
      return x_delta+y_delta

    # Initiialize a union find 
    n = len(points)
    union_find = UnionFind(n)
    
    # For each node i, generate the weighted edge to 
    # each other node j in an adjacency list
    edges = []
    for i in range(n):
      for j in range(n):
        if i == j:
          continue
        edges.append((manhattan(points[i], points[j]), i, j))

    # Sort by distance; edges should be sorted by weight in ascending order
    # NOTE: Distance is the first element in the tuple
    edges.sort()

    # Start adding edges into the graph
    total_weight: int = 0
    for e in edges:
      if union_find.union(e[1], e[2]):
        total_weight += e[0]

    return total_weight