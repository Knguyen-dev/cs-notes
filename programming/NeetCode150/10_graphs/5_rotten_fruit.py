from typing import List, Tuple
from collections import deque

class Solution:
  def orangesRotting(self, grid: List[List[int]]) -> int:
    res: int = 0
    numFruit: int = 0
    ROWS: int = len(grid)
    COLS: int = len(grid[0])
    q: deque[Tuple[int, int, int]] = deque()

    # Enqueue all rotten fruit and count fresh fruits.
    for i in range(ROWS):
      for j in range(COLS):
        if grid[i][j] == 2:
          q.append((i, j, 0))
        elif grid[i][j] == 1:
          numFruit += 1

    # Up, down, right, and left
    directions: List[Tuple[int, int]] = [(0, 1), (0, -1), (1,0), (-1, 0)]

    while q:
      curr: Tuple[int, int, int] = q.popleft()
      res = curr[2] # Track the timestep

      for dr, dc in directions:
        nr = curr[0] + dr 
        nc = curr[1] + dc

        # Skip the neighbor if:
        # a. If out of bounds
        # b. If empty or rotten (implies already visited)
        if (nr < 0 or nr >= ROWS) or (nc < 0 or nc >= COLS):
          continue 
        if grid[nr][nc] == 0 or grid[nr][nc] == 2:
          continue

        # Otherwise it's an fresh fruit (implied unvisited):
        # a. Mark as rotten (implies visitation).
        # b. Add to FIFO queue.
        # c. Decrement fresh fruit count
        grid[nr][nc] = 2
        q.append((nr, nc, curr[2]+1))
        numFruit -= 1

    if numFruit > 0:
      return -1
    return res




      

      
                    
