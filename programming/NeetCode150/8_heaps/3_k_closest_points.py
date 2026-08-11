from typing import List
import heapq
import math

class Solution:
    def kClosest(self, points: List[List[int]], k: int) -> List[List[int]]:
        minHeap = []
        for i in range(len(points)):
            # Calculate euclidean distance from origin.
            # Then append to the min-heap
            p = points[i]
            dist = math.sqrt((p[0] ** 2) + (p[1] ** 2))
            minHeap.append((dist, i))

        heapq.heapify(minHeap) # TODO: I think this is correct?

        res = []
        for i in range(k):
            node = heapq.heappop(minHeap)
            res.append(points[node[1]])
        return res
