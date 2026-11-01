class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 0:
            return 0

        cache = dict()

        def recursion_helper(n: int):
            if n in cache:
                return cache[n]
            if n < 0:
                return 0
            if n == 0:
                return 1

            left = recursion_helper(n-2)
            right = recursion_helper(n-1)
            cache[n] = left + right
            return cache[n]

        num_ways: int = recursion_helper(n)
        return num_ways
