from typing import List

class Solution:
  def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
    adjacency_list: dict[int, List[int]] = {}
    states: List[int] = [0 for x in range(numCourses)]
    finished: List[int] = []
    
    # NOTE: If a node has no outgoing edges, it 
    # won't have an entry in this 'adjacency_list'
    for edge in prerequisites:
      if edge[0] not in adjacency_list:
        adjacency_list[edge[0]] = []
      adjacency_list[edge[0]].append(edge[1])

    def dfs_helper(node: int) -> bool:
      # a. If already finished/visited, early return success
      # b. If already visiting, return false since a loop
      if states[node] == 2:
        return True
      elif states[node] == 1:
        return False

      # Otherwise unvisited node, mark it as visiting
      states[node] = 1
      if node in adjacency_list:
        for neighbor in adjacency_list[node]:
          is_good: bool = dfs_helper(neighbor)
          if not is_good:
            return False

      # Mark as visited, add to the end of the visited list
      # and return true since all children have finished.
      # NOTE: we build the topological sequence when finishing a node.
      states[node] = 2
      finished.append(node)
      return True

    # Iterate through all unvisited nodes and do dfs
    # NOTE: Again nodes are labeled [0, numCourses - 1] 
    for node in range(numCourses):
      if states[node] == 0:
        is_good: bool = dfs_helper(node)

        # Found a loop, return empty sequence
        if not is_good:
          return []

    # There are no loops, therefore a topological
    # sequence is possible. Return the current sequence.
    return finished






        