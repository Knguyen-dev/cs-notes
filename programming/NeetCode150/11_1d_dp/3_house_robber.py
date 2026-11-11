from typing import Dict, List

class Solution:
  def rob_topdown(self, nums: List[int]) -> int:
    cache: Dict[int, int] = {}

    def recursion_helper(i: int) -> int:
      if i > len(nums) - 1:
          return 0
      if i in cache:
          return cache[i]

      # Simulate robbing the current house and choose best from [i+2, ...,]
      include = nums[i] + recursion_helper(i+2)

      # Ignore current house and choose best from [i+1, ...]
      exclude = recursion_helper(i+1)

      # The best cost is the higher path from both
      cache[i] = max(include, exclude)
      return cache[i]


    best_cost = recursion_helper(0)
    return best_cost

  def rob_bottomup(self, nums: List[int]) -> int:
    n: int = len(nums)
    if n == 0: return 0
    if n == 1: return nums[0]
    if n == 2: return max(nums[0], nums[1])

    dp = [0] * n
    dp[n-1] = nums[n-1]
    dp[n-2] = max(nums[n-2], nums[n-1])
    i: int = n-3
    while i >= 0:
      skip_sum = dp[i+1]
      include_sum = nums[i] + dp[i+2]
      dp[i] = max(skip_sum, include_sum)
      i -= 1
    return max(dp[0], dp[1])