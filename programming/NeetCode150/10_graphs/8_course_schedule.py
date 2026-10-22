from typing import List
class Solution:
  def canFinish(self, numCourses: int, prerequisites: List[List[int]]):
    adjacency_list: dict[int, List[int]] = {}
    states: List[int] = [0 for x in range(numCourses)]

    # NOTE: If a node has no outgoing edges, it 
    # won't have an entry in this 'adjacency_list'
    for edge in prerequisites:
      if edge[0] not in adjacency_list:
        adjacency_list[edge[0]] = []
      adjacency_list[edge[0]].append(edge[1])

    def dfs_helper(node: int) -> bool:
      if states[node] == 1:
        return False
      elif states[node] == 2:
        return True

      # Mark the current node as visiting and 
      # visit all outgoing neighbors.
      # a. Recur through each new node.
      # b. Immediately return whe nthere's a loop.
      states[node] = 1

      if node in adjacency_list:
        for neighbor in adjacency_list[node]:
          is_success = dfs_helper(neighbor)
          if not is_success:
            return False

      # All outgoing neighbors were successfully exited, now it's time 
      # for the current node to do the same. Also return true to indicate 
      # a successful finish (as opposed to a loop detection).
      states[node] = 2 
      return True

    for node in adjacency_list.keys():
      is_success = dfs_helper(node)
      if not is_success:
        return False
    return True
    