from typing import List


class Solution:
  def rob(self, nums: List[int]) -> int:
    def helper(sublist: List[int]) -> int:
      n = len(sublist)
      if n == 0:
        return 0
      if n == 1:
        return sublist[0]

      dp: List[int] = [0 for x in range(n)]
      dp[n-1] = sublist[n-1]
      dp[n-2] = max(sublist[n-2], sublist[n-1])
      for i in range(n-3, -1, -1):
        include_i = sublist[i] + dp[i+2]
        exclude_i = dp[i+1]
        dp[i] = max(include_i, exclude_i)
      return dp[0]

    total_len: int = len(nums)

    # NOTE: If total_len == 1, the splitting would process two 
    # empty arrays and both return zero. Which is erroneous since at 
    # that point, just pick the single value
    if total_len == 1:
      return nums[0]

    val1: int = helper(nums[1:])
    val2: int = helper(nums[:total_len-1])
    return max(val1, val2)