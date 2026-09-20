from typing import List
import heapq

class Solution:    
    def lastStoneWeight(self, stones: List[int]) -> int:
        max_heap = []
        for s in stones:
            max_heap.append(-s)
        heapq.heapify(max_heap)

        while len(max_heap) > 1:
            # Reason that a < b or a == b is an invariant
            a = heapq.heappop(max_heap)
            b = heapq.heappop(max_heap)
            # If a is bigger than b, take the difference
            # Otherwise, a == b so discard them.
            if a < b: 
                heapq.heappush(max_heap, a - b)

        if len(max_heap) == 1:
            # Stone weight is still negative, so we'll
            # have to negate it again to make it positive
            return -max_heap[0]
        return 0


        