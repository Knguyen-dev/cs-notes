
from typing import List, Tuple
from collections import deque

class Solution:
  def pacificAtlantic(self, heights: List[List[int]]) -> List[List[int]]:
    if not heights:
      return []

    NUM_ROWS: List[int] = len(heights)
    NUM_COLS: List[int] = len(heights[0])

    # (row_delta, col_delta); up, down, right, left.
    directions: List[Tuple[int, int]] = [(1,0), (-1,0), (0,1), (0,-1)]
    pacific_queue: deque[int] = deque()
    atlantic_queue: deque[int] = deque()

    def bfs_helper(queue: deque[int], reachable: List[List[int]]):
      while queue:
        r, c, height = queue.popleft()
        for dr, dc in directions:
          nr = r + dr
          nc = c + dc

          # If out of bounds, already visited, or the neighbor's height is smaller
          if (nr < 0 or nr >= NUM_ROWS) or (nc < 0 or nc >= NUM_COLS):
            continue
          if reachable[nr][nc] == 1:
            continue
          if height > heights[nr][nc]:
            continue
          reachable[nr][nc] = 1
          queue.append((nr, nc, heights[nr][nc]))

    # Initialize both matrices of zeros: O(m*n) + O(m*n)
    pacific_states = []
    atlantic_states = []
    for i in range(NUM_ROWS):
      pacific_states.append([0 for _ in range(NUM_COLS)])
      atlantic_states.append([0 for _ in range(NUM_COLS)])

    # Seed both matrices and queues
    for i in range(NUM_ROWS):
      for j in range(NUM_COLS):
        cell = (i, j, heights[i][j])
        # 1. If a top or left cell, then it's pacific-reachable: 
        #   a. enqueue it for pacific BFS
        #   b. Mark as pacific-flowable (visited)
        # 2. If bottom or right cell, then it's atlantic-reachable:
        #   a. Enqueue it for atlantic BFS.
        #   b. Mark as atlantic-flowable (visited)
        # NOTE: Both conditionals need to run for top left 
        # and bottom right corners to be processed into both
        # queues and matrices.
        if i == 0 or j == 0:
          pacific_queue.append(cell)
          pacific_states[i][j] = 1

        if i == NUM_ROWS-1 or j == NUM_COLS-1:
          atlantic_queue.append(cell)
          atlantic_states[i][j] = 1

    bfs_helper(pacific_queue, pacific_states)
    bfs_helper(atlantic_queue, atlantic_states)
    
    # Iterate through both to find both
    res = []
    for i in range(NUM_ROWS):
      for j in range(NUM_COLS):
        if pacific_states[i][j] == 1 and atlantic_states[i][j] == 1:
          res.append((i, j))

    return res