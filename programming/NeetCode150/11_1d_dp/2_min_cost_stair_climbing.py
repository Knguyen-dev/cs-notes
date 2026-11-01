class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
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
        return min_climbing_costi
