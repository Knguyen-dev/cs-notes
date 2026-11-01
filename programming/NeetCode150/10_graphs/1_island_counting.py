from collections import deque
from typing import List


class UnionFind:
    def __init__(self, size: int):
        self.parent = list(range(size))
        self.rank = [0 for x in range(size)]

    def find_root(self, node: int):
        """Return the root of a given 'node'."""
        
        # Root is found, propagate the root up to 
        # parent nodes.
        if (node == self.parent[node]):
            return node

        # Recursively find the root. Once root is found
        # set the current node's parent to the root (path compression)
        res = self.find_root(self.parent[node])
        self.parent[node] = res

        # Propagate the root up to the parent/caller
        return res

    def union_by_rank(self, x, y) -> bool:
        """Unites two sets containing x and y using union by rank.
        Args:
            x (int): An element in the first set; 
            y (int): An element in the second set; 

        Returns:
          True when two disjoint sets were actually joined. False when nothing happened.
        NOTE: x and y are both indices 
        """
        # Belong to the same group, no merge happens
        root_x = self.find_root(x)
        root_y = self.find_root(y)
        if root_x == root_y:
            return False

        # If x has a larger height, x comes out on top
        # If y has a larger height, y comes out on top
        # If they're equal, merge (it doesn't matter how) and increase the 
        # rank of the merged tree.
        if self.rank[root_x] > self.rank[root_y]:
            self.parent[root_y] = root_x
        elif self.rank[root_x] < self.rank[root_y]:
            self.parent[root_x] = root_y
        else:
            self.parent[root_y] = root_x
            self.rank[root_x] += 1
        return True


class Solution:
    def numIslands_dfs(self, grid: List[List[str]]) -> int:
        directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]
        ROWS, COLS = len(grid), len(grid[0])
        res = 0

        def dfs_helper(r, c):
            # If out of bounds, 'water' or already visited.
            if (r < 0 or c < 0 or r >= ROWS or c >= COLS or grid[r][c] == "0"):
                return

            # Mark as 'visited'; then recur on neighbors 
            # NOTE: Marking as water allows us to clear it from
            # the map and be ignored later. Again this DFS is 
            # for clearing an entire island off the grid.
            grid[r][c] = "0"
            for delta_r, delta_c in directions:
                dfs_helper(r + delta_r, c + delta_c)
        
        for r in range(ROWS):
            for c in range(COLS):
                if (grid[r][c] == "1"):
                    dfs_helper(r, c)
                    res += 1
        return res

    def numIslands_bfs(self, grid: List[List[str]]) -> int:
        directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]
        ROWS, COLS = len(grid), len(grid[0])
        res = 0

        def bfs_helper(r: int, c: int) -> None:
            q = deque()

            # Visit node and add it to the queue
            grid[r][c] = "0"
            q.append((r,c))

            while q:
                row, col = q.popleft()
                for dr, dc in directions:
                  nr = row + dr
                  nc = col + dc
                  # If out of bounds, 'water', or already visited.
                  if (nr < 0 or nc < 0 or nr >= ROWS or nc >= COLS or grid[nr][nc] == "0"):
                      continue
                  
                  # Visit the neighbor and add it to the queue.
                  q.append((nr, nc))
                  grid[nr][nc] = "0"

        for i in range(ROWS):
            for j in range(COLS):
                if grid[i][j] == "1":
                  res += 1
                  bfs_helper(i, j)

        return res

    def numIslands_union_find(self, grid: List[List[str]]) -> int:
        directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]
        ROWS, COLS = len(grid), len(grid[0])
        res = 0
        disjoint_set = UnionFind(ROWS * COLS)

        # Each row col needs a unique index
        def index(r, c):
            return r * COLS + c

        for i in range(ROWS):
            for j in range(COLS):
                if grid[i][j] == "1":
                  res += 1
                  for dr, dc in directions:

                      # Only accept inbounds, unvisited, land cells
                      nr, nc = i + dr, j + dc
                      if (nr < 0 or nc < 0 or nr >= ROWS or nc >= COLS or grid[nr][nc] == "0"):
                          continue

                      # Attempt to merge current land cell with neighbor.
                      if disjoint_set.union_by_rank(index(i,j), index(nr, nc)):
                          res -= 1

        return res
                    



