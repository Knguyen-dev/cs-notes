from typing import List, Dict

class Solution:
  def lengthOfLIS(self, nums: List[int]) -> int:
    n: int = len(nums)
    cache: Dict[tuple, int] = {}

    def dfs(i: int, j: int) -> int:
      # If one past the end, then we're done.
      if i == n:
        return 0
      
      if (i,j) in cache:
        return cache[(i,j)]

      # Skip including i and get length of LIS 
      # starting at i+1
      skip_i: int = dfs(i+1, j)

      # Include 'i' in subsequence if no number has been included yet
      # or if j is less than i. Doing "+1" includes i and then adds
      # the length of the subsequence at i+1
      include_i: int = 0
      if (j == -1 or nums[j] < nums[i]):
        include_i = 1 + dfs(i+1, i)

      cache[(i,j)] = max(skip_i, include_i)
      return cache[(i,j)]
    return dfs(0, -1)