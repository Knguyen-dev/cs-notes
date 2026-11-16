from typing import List

class Solution:
  def __init__(self):
    self.subset = set()
    self.res = []
    self.nums = []
    self.nums.append([]) # Added empty subset

  def dfs_helper(self, i: int) -> None:
    if i > len(self.nums) - 1:
      # Convert into list to match expected type
      self.res.append(list(self.subset)) 
      return
    self.subset.add(self.nums[i])
    self.dfs_helper(i+1)
    self.subset.remove(self.nums[i])
    self.dfs_helper(i+1)

  def subsets(self, nums: List[int]) -> List[List[int]]:
    self.nums = nums
    self.dfs_helper(0)
    return self.res