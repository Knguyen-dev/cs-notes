from typing import List
class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        res: List[List[int]] = []
        picked = set()
        sublist: List[int] = []

        def dfs_helper():
            if len(picked) == len(nums):
                res.append(sublist.copy())
                return
            for n in nums:
                if n not in picked:
                    picked.add(n)
                    sublist.append(n)
                    dfs_helper()
                    picked.remove(n)
                    sublist.pop()

        dfs_helper()
        return res
