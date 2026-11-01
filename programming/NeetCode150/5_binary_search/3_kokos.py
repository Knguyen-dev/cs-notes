import math
from typing import List
class Solution:
    def is_valid(self, piles: List[int], h: int, k: int) -> bool:
        sum = 0
        for p in piles:
            sum += math.ceil(p / k)
        # true if sum <= h, otherwise false
        return sum <= h

    def minEatingSpeed(self, piles: List[int], h: int) -> int:
        i = 1
        j = max(piles)
        res = j
        while (i <= j):
            mid_rate = int((i+j) / 2)
            if (self.is_valid(piles, h, mid_rate)):
                res = mid_rate
                j = mid_rate - 1
            else:
                i = mid_rate + 1
        return res

            
            
