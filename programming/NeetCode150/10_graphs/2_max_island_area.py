from typing import List
from collections import deque

class Solution:    
    def maxAreaOfIsland(self, grid: List[List[int]]) -> int:
        ROWS, COLS = len(grid), len(grid[0])
        res: int = 0
        directions = [[1,0], [-1, 0], [0, 1], [0, -1]]

        def bfs_helper(r: int, c: int):
            q = deque()
            q.append((r,c))
            grid[r][c] = 0
            area: int = 0
            while q:

                # Pop off a land cell, and add it to our area list.
                area += 1
                row, col = q.popleft()

                # Visit all neighbors
                # a. Calculate neighbor location
                # b. If out of bounds or water (implies visited), the nskip
                # c. If so mark as visited and add to the double ended queue
                for dr, dc in directions:
                    nr, nc = row + dr, col + dc
                    if (nr < 0 or nc < 0) or (nr >= ROWS or nc >= COLS) or (grid[nr][nc] == 0):
                        continue
                    q.append((nr, nc))
                    grid[nr][nc] = 0
                    
            return area

        for r in range(ROWS):
            for c in range(COLS):
                # If land; which implies not visited
                if grid[r][c] == 1:
                    res = max(res, bfs_helper(r, c))
        return res