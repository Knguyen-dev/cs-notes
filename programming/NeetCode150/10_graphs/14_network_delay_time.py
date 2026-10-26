from typing import List
import heapq

class Solution:
  def networkDelayTime(self, times: List[List[int]], n: int, k: int):
    res: int = 0

    # Where dist[i] is the minimum distance to node i.
    dist: List[float] = [float("inf") for x in range(n+1)]
    min_heap = [] # in form (current_dist, node)
    
    # Starting node has zero distance and is enqueued immediately.
    dist[k] = 0
    heapq.heappush(min_heap, (0, k))

    # Build adjacency list
    adj_list = {}
    for e in times:
      if e[0] not in adj_list:
        adj_list[e[0]] = []
      adj_list[e[0]].append((e[2], e[1])) # node: [(weight, neighbor), ...]

    while min_heap:
      current_dist, node = heapq.heappop(min_heap)
      if current_dist > dist[node]:
        continue

      if node in adj_list:
        for weight, neighbor in adj_list[node]:
          new_dist = dist[node] + weight
          if new_dist < dist[neighbor]:
            dist[neighbor] = new_dist
            heapq.heappush(min_heap, (new_dist, neighbor))

    for i in range(1, n+1):
      # If it's still infinity, then the node is unvisited.
      # Therefore we return -1 since not all nodes are reachable.
      if dist[i] == float("inf"):
        return -1

      # Otherwise, the total time it takes is simply the 
      # maximum latency.
      res = max(res, dist[i])
    return res

    