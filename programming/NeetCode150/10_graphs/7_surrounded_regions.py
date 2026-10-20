from typing import List, Tuple
from collections import deque

class Solution:
  def solve(self, board: List[List[str]]) -> None:
    q: deque[Tuple[int, int]] = deque()
    ROWS: int = len(board)
    COLS: int = len(board[0])
    
    # Up, down, right, and left
    directions: List[Tuple[int, int]] = [(0, 1), (0, -1), (1,0), (-1, 0)]
    
    for r in range(ROWS):
      for c in range(COLS):
        if board[r][c] == 'X':
          continue
        if (r == 0 or r == ROWS - 1) or (c == 0 or c == COLS - 1):
          q.append((r, c))
          board[r][c] = 'T'

    while q:
      curr: Tuple[int, int] = q.popleft()
      for dr, dc in directions:
        nr = curr[0] + dr
        nc = curr[1] + dc

        # Skip if:
        # a. Out of bounds.
        # b. If cell is 'X' or cell has already been visited/added to the set.
        if (nr < 0 or nr >= ROWS) or (nc < 0 or nc >= COLS):
          continue
        if board[nr][nc] == 'X' or board[nr][nc] == 'T':
          continue

        # Otherwise, enqueue and add to the unsurrounded set
        q.append((nr, nc))
        board[nr][nc] = 'T'

    # Attempt a second pass
    for r in range(ROWS):
      for c in range(COLS):
        if board[r][c] == 'T':
          board[r][c] = 'O'
        elif board[r][c] == 'O':
          board[r][c] = 'X'