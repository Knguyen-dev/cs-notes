class Solution:
    def rob(self, nums: List[int]) -> int:
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
