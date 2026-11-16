from typing import List
import heapq
class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        min_heap = []
        
        # 1. Build the k-largest numbers in the stream
        for n in nums:
            if len(min_heap) < k:
                heapq.heappush(min_heap, n)
            elif len(min_heap) == k:
                if n > min_heap[0]:
                    heapq.heappop(min_heap)
                    heapq.heappush(min_heap, n)
        
        # 2. kth-largest number overall is the minimum 
        return min_heap[0]
        
        