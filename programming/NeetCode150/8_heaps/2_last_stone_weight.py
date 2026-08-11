from typing import List
import heapq

class Solution:
    def lastStoneWeight(self, stones: List[int]) -> int:
        max_heap = []
        for s in stones:
            max_heap.append(-s)
        heapq.heapify(max_heap)
        while len(max_heap) > 1:
            a = heapq.heappop(max_heap)
            b = heapq.heappop(max_heap)

            # Remember that both a and b are negative.
            # Therefore a difference between them would 
            # still result in a negative number.
            if (a < b):
                heapq.heappush(max_heap, a-b)
            elif (a > b):
                heapq.heappush(max_heap, b-a)

        if len(max_heap) > 0:
            return -heapq.heappop(max_heap)
        return 0



        