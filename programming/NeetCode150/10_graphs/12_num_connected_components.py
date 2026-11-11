from typing import List, Dict

class Solution:
    def countComponents(self, n: int, edges: List[List[int]]) -> int:
      res: int = 0
      adj_list: Dict[int, List[int]] = {}
      visited_set: set[int] = set()

      def dfs_helper(node: int):
        if node in visited_set:
          return
        visited_set.add(node)
        if node in adj_list:
          for neighbor in adj_list[node]:
            dfs_helper(neighbor)

      for e in edges:
        if e[0] not in adj_list:
          adj_list[e[0]] = []
        adj_list[e[0]].append(e[1])
        if e[1] not in adj_list:
          adj_list[e[1]] = []
        adj_list[e[1]].append(e[0])

      for node in range(n):
        if node not in visited_set:
          dfs_helper(node)
          res += 1

      return res