from typing import List, Dict

class Solution:
  def validTree(self, n: int, edges: List[List[int]]) -> bool:
    if not edges:
        return True     

    adj_list: Dict[int, List[int]] = {}
    visited: set[int] = set()

    def dfs_helper(parent: int, node: int) -> bool:
      # If we're visiting an already visited node, that means a loop exists
      if node in visited:
        return False

      visited.add(node)
      for neighbor in adj_list[node]:
        if parent != -1 and parent == neighbor:
          continue
        is_good = dfs_helper(node, neighbor)
        if not is_good:
          return False
      return True

    # Build adjacency list

    start_node: int = -1
    for x in range(len(edges)):
        edge: list[int, int] = edges[x] 
        if x == 0:
            start_node = edge[0]

        if edge[0] not in adj_list:  
            adj_list[edge[0]] = []
        adj_list[edge[0]].append(edge[1])

        if edge[1] not in adj_list:
            adj_list[edge[1]] = []
        adj_list[edge[1]].append(edge[0])

    # Start at any node, do a DFS
    # a. If true, the DFS didn't find loops.
    # b. Check for connectedness
    doesnt_have_loops = dfs_helper(-1, start_node)
    if not doesnt_have_loops:
        return False
    if len(visited) < n:
        return False

    return True