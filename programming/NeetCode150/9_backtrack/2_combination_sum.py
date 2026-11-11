from typing import List


class Solution:
    def __init__(self):
        self.res = []
        self.target = 0
        self.nums = []

    def dfs_helper(self, i: int, currentList: list[int], total: int) -> None:
        if total > self.target:
            return
        if total == self.target:
            self.res.append(currentList.copy())
            return
        if i > len(self.nums) - 1:
            return
        # Choose the number at index i
        currentList.append(self.nums[i])
        self.dfs_helper(i, currentList, total + self.nums[i])

        # Undo our choice, and move onto the next number
        currentList.pop()
        self.dfs_helper(i + 1, currentList, total)
        
    def combinationSum(self, nums: List[int], target: int) -> List[List[int]]:
        self.nums = nums
        self.target = target
        self.dfs_helper(0, [], 0)
        return self.res






        