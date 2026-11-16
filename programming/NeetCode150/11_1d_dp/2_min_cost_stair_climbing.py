from typing import Dict, List


class Solution:
    def minCostClimbingStairs_topDown(self, cost: List[int]) -> int:
        cache: Dict[int, int] = {}        
        def recursion_helper(i: int) -> int:
            if i > len(cost) - 1:
                return 0
            if i in cache:
                return cache[i]

            left_cost = recursion_helper(i+1)
            right_cost = recursion_helper(i+2)

            # Cost of jumping off current + minimum cost going left or right
            # NOTE: However if i==-1, then just return the left and right costs since 
            # this means there is no parent node, just the caller.
            if i == -1:
                cache[i] = min(left_cost, right_cost)
            else:
                cache[i] = cost[i] + min(left_cost, right_cost)    
            return cache[i]

        min_climbing_cost = recursion_helper(-1)
        return min_climbing_cost

    def minCostClimbingStairs_bottomUp(self, cost: List[int]) -> int:

      # dp[n]=0 be the top of the staircase
      # dp[n-1] be the second-last step
      n = len(cost)
      dp = [0 for x in range(n+1)]
  
      # Top of the staircase costs nothing
      # Second to last step only costs the second to last step
      dp[n] = 0  
      dp[n-1] = cost[n-1]

      i = n-2
      while (i >= 0):
        # cost[i] the cost of leaving the current step i
        # dp[i+1] = minimize cost when climbing from step i+1
        # dp[i+2] = minimum cost when climbinb from step i+2
        dp[i] = cost[i] + min(dp[i+1], dp[i+2])  
        i -= 1
      
      return min(dp[0], dp[1])