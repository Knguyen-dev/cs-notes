from typing import List, Tuple
from collections import deque

class Node:
   def __init__(self, i: int, j: int, dist: int):
      self.i = i
      self.j = j
      self.dist = dist

class Solution:
    def islandsAndTreasure(self, grid: List[List[int]]) -> None:

      q: deque[Node] = deque()
      directions: List[Tuple[int, int]] = [(0, 1), (0, -1), (1,0), (-1, 0)]
      ROWS: int = len(grid)
      COLS: int = len(grid[0])
      INFINITY: int = 2147483647

      # Enqueue treasure cell nodes.
      for i in range(ROWS):
         for j in range(COLS):
            if grid[i][j] == 0:
               q.append(Node(i, j, 0))

      while q:
         curr: Node = q.popleft()
         for dr, dc in directions:
            nr = curr.i + dr
            nc = curr.j + dc
            new_dist = curr.dist + 1

            # Skip the neighbor if
            # a. If out of bounds
            # b. If water or treasure
            # c. If less than infinity (implies already visited), then skip
            if (nr < 0 or nr >= ROWS) or (nc < 0 or nc >= COLS):
              continue 
            if grid[nr][nc] == 0 or grid[nr][nc] == -1:
              continue
            if grid[nr][nc] < INFINITY:
              continue

            # Update the grid's distance (marking as visited) 
            # and append to the end of the queue
            grid[nr][nc] = new_dist
            q.append(Node(nr, nc, new_dist))